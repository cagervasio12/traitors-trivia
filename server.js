const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Load questions from JSON file
const questions = JSON.parse(fs.readFileSync(path.join(__dirname, 'questions.json'), 'utf-8'));

const GAME_PASSWORD = 'Luca Puca Shell';

// In-memory storage
const players = {}; // { id: { name, startTime, currentQuestion, finished, finishTime } }
const leaderboard = []; // [{ name, time }] sorted by time

// Normalize answer: lowercase, strip spaces
function normalize(str) {
  return str.toLowerCase().replace(/\s+/g, '');
}

// API: Register a player
app.post('/api/register', (req, res) => {
  const { name, password } = req.body;
  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Name is required' });
  }
  if (!password || normalize(password) !== normalize(GAME_PASSWORD)) {
    return res.status(401).json({ error: 'Wrong password' });
  }

  const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  players[id] = {
    name: name.trim(),
    startTime: Date.now(),
    currentQuestion: 0,
    finished: false,
    finishTime: null
  };

  res.json({ playerId: id, totalQuestions: questions.length });
});

// API: Get current question for a player
app.get('/api/question/:playerId', (req, res) => {
  const player = players[req.params.playerId];
  if (!player) return res.status(404).json({ error: 'Player not found' });
  if (player.finished) return res.json({ finished: true, time: player.finishTime });

  const q = questions[player.currentQuestion];
  res.json({
    number: q.number,
    question: q.question,
    current: player.currentQuestion + 1,
    total: questions.length
  });
});

// API: Submit an answer
app.post('/api/answer/:playerId', (req, res) => {
  const player = players[req.params.playerId];
  if (!player) return res.status(404).json({ error: 'Player not found' });
  if (player.finished) return res.json({ finished: true, time: player.finishTime });

  const { answer } = req.body;
  if (!answer) return res.status(400).json({ error: 'Answer is required' });

  const correctAnswer = questions[player.currentQuestion].answer;
  const accepted = Array.isArray(correctAnswer) ? correctAnswer : [correctAnswer];
  const isCorrect = accepted.some(a => normalize(answer) === normalize(a));

  if (isCorrect) {
    player.currentQuestion++;

    if (player.currentQuestion >= questions.length) {
      player.finished = true;
      const elapsed = Date.now() - player.startTime;
      player.finishTime = elapsed;

      leaderboard.push({ name: player.name, time: elapsed });
      leaderboard.sort((a, b) => a.time - b.time);

      // Notify all leaderboard viewers
      io.emit('leaderboard-update', leaderboard);

      return res.json({ correct: true, finished: true, time: elapsed });
    }

    const nextQ = questions[player.currentQuestion];
    return res.json({
      correct: true,
      finished: false,
      next: {
        number: nextQ.number,
        question: nextQ.question,
        current: player.currentQuestion + 1,
        total: questions.length
      }
    });
  }

  const hint = questions[player.currentQuestion].hint || null;
  res.json({ correct: false, hint });
});

// Serve leaderboard page
app.get('/leaderboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'leaderboard.html'));
});

// API: Clear leaderboard (admin)
app.post('/api/admin/clear', (req, res) => {
  const { password } = req.body;
  if (!password || normalize(password) !== normalize(GAME_PASSWORD)) {
    return res.status(401).json({ error: 'Wrong password' });
  }
  leaderboard.length = 0;
  io.emit('leaderboard-update', leaderboard);
  res.json({ success: true });
});

// API: Get leaderboard
app.get('/api/leaderboard', (req, res) => {
  res.json(leaderboard);
});

// Socket.io for real-time leaderboard
io.on('connection', (socket) => {
  socket.emit('leaderboard-update', leaderboard);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`The Traitors: Game Night is running on port ${PORT}`);
});
