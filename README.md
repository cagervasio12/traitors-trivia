# The Traitors: Game Night

A live trivia game night web app themed after *The Traitors* TV show. Players answer 13 questions on their phones, racing to finish fastest. A real-time leaderboard tracks completions via WebSockets.

---

## How to Get This Live on the Internet (Step by Step)

This guide assumes you have never used GitHub or the command line before. Follow every step in order.

---

### PART 1 — Install the Tools You Need

#### Step 1: Install Node.js

Node.js is what runs the app. You need to install it on your computer.

1. Go to https://nodejs.org
2. Click the big green button that says **LTS** (the recommended version)
3. Open the downloaded file and click through the installer — keep clicking **Next** and accept all the defaults
4. When it finishes, click **Finish**

#### Step 2: Install Git

Git is how you send your files up to the internet.

1. Go to https://git-scm.com/download/win
2. Click the download link — it should start automatically
3. Open the downloaded file and click through the installer — keep clicking **Next** and accept all the defaults
4. When it finishes, click **Finish**

> After installing both, **restart your computer** before continuing.

---

### PART 2 — Create a Free GitHub Account

GitHub is where your app's files will be stored online.

1. Go to https://github.com
2. Click **Sign up** in the top right corner
3. Enter your email, create a password, and choose a username
4. Verify your email when GitHub sends you a confirmation
5. On the "What kind of work do you do?" screen, you can just click **Skip personalization**

---

### PART 3 — Put Your Files on GitHub

#### Step 3: Open PowerShell

PowerShell is a text-based way to control your computer. Don't worry — you're just copying and pasting commands.

1. Press the **Windows key** on your keyboard
2. Type **PowerShell** and press **Enter**
3. A blue (or black) window with white text will open — this is PowerShell

#### Step 4: Navigate to your project folder

In PowerShell, **copy and paste** the following exactly (the quotes are required) and press **Enter**:

```
cd "C:\Users\cgger\OneDrive\Documents\Claude Code Projects\traitors-trivia"
```

> **Important:** Always include the `cd` at the start and keep the quotes around the path — the spaces in the folder name will cause errors without them.

You should now see the folder path appear before the cursor. This means you're "inside" your project folder.

#### Step 5: Set up Git with your name and email

Copy and paste these two commands one at a time, replacing the name and email with your own, and press **Enter** after each:

```
git config --global user.name "Your Name"
```
```
git config --global user.email "youremail@example.com"
```

#### Step 6: Create a new repository on GitHub

1. Go to https://github.com/new
2. In the **Repository name** box, type: `traitors-trivia`
3. Leave everything else as-is (make sure **Public** is selected)
4. Click the green **Create repository** button
5. On the next page, you'll see a URL near the top that looks like:
   `https://github.com/YOUR-USERNAME/traitors-trivia.git`
   **Copy that URL** — you'll need it in the next step

#### Step 7: Send your files to GitHub

Back in Command Prompt, paste these commands one at a time, pressing **Enter** after each:

```
git init
```
```
git add .
```
```
git commit -m "Initial commit"
```
```
git branch -M main
```

Now paste this command, but **replace the URL** with the one you copied from GitHub in the previous step:

```
git remote add origin https://github.com/YOUR-USERNAME/traitors-trivia.git
```

Then run:

```
git push -u origin main
```

A login prompt may appear. Enter your GitHub username and password. If GitHub asks for a "personal access token" instead of a password:
1. Go to https://github.com/settings/tokens/new
2. Give it a name (anything), set expiration to **No expiration**, and check the **repo** checkbox
3. Click **Generate token**, copy the long code it gives you
4. Paste that code as your password

After this step, refresh your GitHub page — you should see your files there!

---

### PART 4 — Deploy on Render (Free Hosting)

#### Step 8: Create a Render account

1. Go to https://render.com
2. Click **Get Started for Free**
3. Click **Sign in with GitHub** — this connects Render to your GitHub account
4. Authorize Render when prompted

#### Step 9: Create your web service

1. Once logged into Render, click the **New +** button at the top
2. Select **Web Service**
3. Under "Connect a repository," click **Connect** next to `traitors-trivia`
   - If you don't see your repo, click **Configure account** and grant Render access
4. Fill in the settings:
   - **Name:** `traitors-trivia` (or anything you want)
   - **Region:** Pick the one closest to you (US East or US West)
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Instance Type:** Select **Free**
5. Scroll down and click **Create Web Service**

#### Step 10: Wait for it to deploy

Render will now build and start your app. This takes about 2–4 minutes. You'll see a log of text scrolling — this is normal. When it's done, the status at the top will change from **Deploying** to **Live** with a green dot.

At the top of the page you'll see your URL — something like:
`https://traitors-trivia.onrender.com`

**That's your live app!**

- **Player link (share this with guests):** `https://traitors-trivia.onrender.com`
- **Leaderboard (open on your TV/laptop):** `https://traitors-trivia.onrender.com/leaderboard`

---

### PART 5 — Connect a Custom Domain (Optional)

If you bought a domain like `LaurenIsATraitor.com`, here's how to connect it.

#### Step 11: Add the domain in Render

1. In your Render web service, click **Settings** in the left menu
2. Scroll down to **Custom Domains** and click **Add Custom Domain**
3. Type your domain (e.g. `LaurenIsATraitor.com`) and click **Save**
4. Render will show you a **CNAME record** — it looks something like:
   - **Name/Host:** `@` or `www`
   - **Value:** something like `traitors-trivia.onrender.com`
   Keep this page open — you need it for the next step

#### Step 12: Point your domain to Render

1. Log into your domain registrar (Namecheap, GoDaddy, etc.)
2. Find **DNS Settings** or **Manage DNS** for your domain
3. Look for a section to add a **CNAME record**
4. Add the record exactly as Render showed you in the previous step
5. Save the changes

DNS changes take 10–30 minutes to kick in. After that, your custom domain will point to your game!

---

### PART 6 — Pushing Updates to Your Live Site

Any time you make changes to the app files (questions, code, anything), follow these steps to push them live.

1. Open PowerShell
2. Navigate to your folder:
   ```
   cd "C:\Users\cgger\OneDrive\Documents\Claude Code Projects\traitors-trivia"
   ```
3. Run these three commands one at a time, pressing **Enter** after each:
   ```
   git add .
   ```
   ```
   git commit -m "Updated app"
   ```
   ```
   git push
   ```
4. Render will automatically detect the change and redeploy — takes about 2–3 minutes
5. You can watch the progress by going to your Render dashboard and clicking on your service — you'll see a **Deploying** status while it rebuilds

> **Tip:** The message in quotes after `git commit -m` can say anything — it's just a note to yourself about what changed. For example: `"Added password"` or `"Updated questions"`.

---

### How to Use the New Features

#### Game Password
- Players now see a **Game Password** field on the landing page
- The password is: **Luca Puca Shell**
- Anyone who enters the wrong password will see an error and can't start the game
- The password check ignores capitalization, so "luca puca shell" also works

#### Clear the Leaderboard
- On the leaderboard page (`/leaderboard`), there is a subtle **Clear Leaderboard** button at the top
- Click it and enter the game password (**Luca Puca Shell**) to wipe all scores
- This is useful if you want to do a practice run before the real game, or reset between rounds
- The leaderboard will update instantly on all screens

---

## Game Night Tips

- **Wake the server before guests arrive** — Render's free tier goes to sleep after 15 minutes of no visitors. Just open the URL yourself 5 minutes before game night starts
- **QR code for guests** — Go to https://qr.io, paste your URL, and print or display the QR code so guests can scan it instead of typing the URL
- **Leaderboard** — Open `/leaderboard` on a laptop or TV connected to the big screen before anyone starts playing
- **Scores reset if the server restarts** — This is by design since it's built for a one-night event. Don't restart it mid-game!
