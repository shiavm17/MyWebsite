# 🚀 Step-by-Step Commands to Deploy

## Copy & Paste These Commands (In Order)

### STEP 1: Create Local .env File

```bash
# Create .env file in project root:
# Use any text editor or run this in terminal:

# On Windows (PowerShell):
"PORT=3000`nNODE_ENV=development`nEMAIL_USER=your-email@gmail.com`nEMAIL_PASS=your-16-char-password" | Out-File -Encoding UTF8 .env

# OR manually create file named: .env
# And add these lines:
PORT=3000
NODE_ENV=development
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-char-app-password
```

**Get Gmail App Password:**
1. Visit: https://myaccount.google.com/apppasswords
2. Select: Mail + Windows Computer
3. Copy 16-character password
4. Paste into EMAIL_PASS (remove spaces)

---

### STEP 2: Test Locally

```bash
# Install dependencies
npm install

# Start server
npm start

# Should see:
# Server is running on http://localhost:3000

# Visit: http://localhost:3000 in browser
# Test contact form

# Stop: Press Ctrl + C
```

---

### STEP 3: Setup Git & Push to GitHub

```bash
# Navigate to project folder
cd "C:\Users\hp\OneDrive\Desktop\Personal Portfolio Website"

# Initialize git
git init

# Configure git (one-time setup if not done before)
git config --global user.name "Your Name"
git config --global user.email "your-email@gmail.com"

# Add remote (REPLACE YOUR_USERNAME and YOUR_REPO)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Verify remote was added
git remote -v

# Switch to main branch
git branch -M main

# Add all files
git add .

# First commit
git commit -m "Initial commit: Portfolio website with contact form"

# Push to GitHub (you'll be prompted for GitHub login)
git push -u origin main

# Verify - should see:
# Branch 'main' set up to track remote branch 'main' from 'origin'.
```

---

### STEP 4: Deploy on Render

```
1. Go to: https://render.com
2. Sign up with GitHub (click "Sign up with GitHub")
3. Authorize GitHub access
4. Click: Dashboard → New (+) → Web Service
5. Select your "portfolio" repository
6. Click: Connect

7. Configure:
   - Disk: Auto
   - Env: Node
   - Region: Oregon (or your region)
   - Build Command: npm install
   - Start Command: npm start

8. Add Environment Variables:
   - Click: Add Environment Variable
   - Add four variables:
     PORT = 3000
     NODE_ENV = production
     EMAIL_USER = your-email@gmail.com
     EMAIL_PASS = your-16-char-app-password

9. Plan: Free (fine for portfolio)

10. Click: Create Web Service

11. Wait 2-3 minutes for deployment
    You'll see: "Your service is live at: 
                 https://portfolio-website.onrender.com"
```

---

### STEP 5: Verify Live Deployment

```bash
# In terminal, verify code was pushed:
git log --oneline

# Should show your commits

# Then:
# 1. Visit: https://portfolio-website.onrender.com
# 2. Test contact form
# 3. Check your email for test message
# 4. Everything should work!
```

---

## Future Updates (After First Deployment)

```bash
# Every time you make changes:

# 1. Make changes to files in VS Code
# 2. Test locally: npm start
# 3. Then:

git add .
git commit -m "Description of what you changed"
git push origin main

# That's it! Render auto-deploys (2-3 min)
# Visit your URL again - changes are live!

# Check status: https://render.com/dashboard
```

---

## Troubleshooting Commands

### Contact Form Not Sending?

```bash
# Check 1: Verify .env locally
cat .env

# Check 2: Restart server
npm start

# Check 3: Check Gmail app password
# (Must be 16-character password, not regular Gmail password)

# Check 4: Verify in Render dashboard
# Settings → Environment → Check EMAIL_USER & EMAIL_PASS
```

### Can't Push to GitHub?

```bash
# Check git config
git config --list

# Set username (if needed)
git config --global user.name "Your Name"

# Set email (if needed)
git config --global user.email "your-email@gmail.com"

# Try push again
git push origin main
```

### Port 3000 Already in Use?

```bash
# Change PORT in .env to 3001:
# Edit .env and change: PORT=3001

# Then restart:
npm start
```

### Need to Install Dependencies Again?

```bash
# Remove node_modules
rmdir /s node_modules

# Or clear npm cache
npm cache clean --force

# Then reinstall
npm install
```

---

## Git Commands Cheat Sheet

```bash
# Check status
git status

# See commit history
git log --oneline

# See what changed
git diff

# Unstage a file
git reset filename

# Undo last commit (before push)
git reset --soft HEAD~1

# Create new branch
git checkout -b feature/your-feature

# Switch branch
git checkout main

# Merge branch
git merge feature/your-feature

# Delete branch
git branch -d feature/your-feature
```

---

## Important Notes

⚠️ **Never commit .env file**
- It's in .gitignore automatically
- This protects your credentials

⚠️ **Use App Password, Not Regular Password**
- Gmail App Passwords: https://myaccount.google.com/apppasswords
- Only 16-character passwords (with spaces removed)

⚠️ **Render Auto-Deploys on Push**
- Every time you git push, Render redeploys
- Takes about 2-3 minutes
- Check logs at: https://render.com/dashboard

✅ **Test Locally First**
- Always run `npm start` locally before pushing
- Verify everything works
- Then push to GitHub

---

## Example Commands (Copy & Paste)

### Setup Example:
```bash
cd "C:\Users\hp\OneDrive\Desktop\Personal Portfolio Website"
git init
git remote add origin https://github.com/shicam23/portfolio.git
git branch -M main
git add .
git commit -m "Initial commit: Portfolio website"
git push -u origin main
```

### Future Updates Example:
```bash
git add .
git commit -m "Update portfolio with new projects"
git push origin main
```

### Check Status Example:
```bash
git status
git log --oneline
```

---

## Timeline

```
T+00m   Run: npm install
T+01m   Run: npm start (test locally)
T+05m   Test contact form locally
T+10m   Run git commands to push to GitHub
T+11m   Create Render account & web service
T+12m   Set environment variables in Render
T+13m   Click "Create Web Service"
T+15m   Wait for Render build (check logs)
T+18m   Deployment complete!
T+19m   Visit your live URL
T+20m   Test contact form on live site
T+25m   Share your portfolio! 🎉
```

---

## Need Help?

| Issue | Solution |
|-------|----------|
| Don't know git commands | See **Git Commands Cheat Sheet** above |
| GitHub login fails | Use GitHub username + personal access token |
| Render deployment fails | Check **Build Logs** in Render dashboard |
| Contact form not sending | Verify EMAIL_PASS is correct Gmail app password |
| Code cached by browser | Hard refresh: Ctrl+Shift+R or Cmd+Shift+R |
| Port 3000 in use | Change PORT in .env to 3001 |

---

## You've Got This! 🚀

Follow these commands in order, and you'll have your portfolio live and deployed!

**Questions?** See documentation files:
- `00_START_HERE.md` - Overview
- `DEPLOYMENT_GUIDE.md` - Detailed guide
- `QUICK_REFERENCE.md` - Command cheatsheet
