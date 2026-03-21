# Quick Command Reference

## Local Development

```bash
# First time setup
git init
git remote add origin https://github.com/USERNAME/REPO.git
git branch -M main
npm install
cp .env.example .env  # Then edit with your Gmail credentials

# Development
npm start             # Runs server on http://localhost:3000

# Debugging
npm run dev          # Runs with nodemon (auto-restart on file changes)

# Stop server
Ctrl + C
```

## Git Commands

```bash
# Check status
git status

# Stage all changes
git add .

# Commit
git commit -m "Description of changes"

# Push to GitHub
git push origin main

# Pull latest changes
git pull origin main

# View commit history
git log --oneline

# Switch/create branch
git checkout -b feature/your-feature
git checkout main    # Switch back to main
```

## Render Deployment

1. Push to GitHub: `git push origin main`
2. Render auto-deploys (check logs at render.com/dashboard)
3. Live URL: `https://your-service-name.onrender.com`

## Email Setup (One-time)

1. Go to: https://myaccount.google.com/apppasswords
2. Generate 16-char password
3. Add to `.env`: `EMAIL_PASS=xxxx xxxx xxxx xxxx`
4. Test locally: `npm start` → fill contact form

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Contact form not sending | Check `.env` has correct `EMAIL_USER` & `EMAIL_PASS` |
| Port 3000 in use | Change `PORT=3001` in `.env` |
| Dependencies not installed | Run `npm install` |
| Can't commit (git error) | Run `git config --global user.name "Your Name"` first |
| Render deployment failing | Check **Logs** in Render dashboard |

## File Locations

| File | Purpose |
|------|---------|
| `.env` | Local secrets (NOT pushed) |
| `.env.example` | Template (pushed to GitHub) |
| `.gitignore` | Files to ignore in git |
| `render.yaml` | Render deployment config |
| `README.md` | Project documentation |
| `DEPLOYMENT_GUIDE.md` | Step-by-step deployment |

## Environment Variables (Render Dashboard)

Set these in Render → Settings → Environment:

- `PORT=3000`
- `NODE_ENV=production`
- `EMAIL_USER=your-email@gmail.com`
- `EMAIL_PASS=your-app-password`

---

**Bookmark this file for quick reference!**
