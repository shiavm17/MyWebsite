# 🚀 GitHub & Render Deployment Guide

## Quick Start Checklist

- [ ] **Create GitHub Repository**
- [ ] **Configure Email for Contact Form**
- [ ] **Test Locally**
- [ ] **Push to GitHub**
- [ ] **Deploy on Render**
- [ ] **Set Environment Variables on Render**
- [ ] **Test Production**

---

## Step 1: Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. **Repository name:** `portfolio` (or your preferred name)
3. **Description:** "Shivam Chaturvedi's Professional Portfolio Website"
4. Choose **Public** or **Private**
5. **DO NOT** initialize with README (we have one)
6. Click **Create repository**

---

## Step 2: Initialize Git & Push

### Open Terminal/PowerShell in your project folder:

```bash
cd "C:\Users\hp\OneDrive\Desktop\Personal Portfolio Website"

# Initialize git
git init

# Add remote (replace YOUR_USERNAME and YOUR_REPO)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Rename branch to main (Render prefers main)
git branch -M main

# Add all files
git add .

# First commit
git commit -m "Initial commit: Portfolio website setup"

# Push to GitHub
git push -u origin main
```

---

## Step 3: Setup Email for Contact Form (Gmail)

### Enable Gmail App Password:

1. Go to [myaccount.google.com](https://myaccount.google.com)
2. **Security** (left menu)
3. Enable **2-Step Verification** if not already enabled
4. **Create app password**
   - Device: Windows Computer
   - App: Mail
5. Copy the **16-character password** (remove spaces)

### Create .env File Locally:

```bash
# In your project root, create .env file
```

**Add these to .env:**

```
PORT=3000
NODE_ENV=development
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx
```

**Example:**

```
PORT=3000
NODE_ENV=development
EMAIL_USER=shivam.email@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop
```

⚠️ **Important:** `.env` is already in `.gitignore` - it will NOT be pushed to GitHub

---

## Step 4: Test Locally

### Install Dependencies:

```bash
npm install
```

### Start Server:

```bash
npm start
```

You should see:
```
Server is running on http://localhost:3000
```

### Test the Website:

- Open browser: `http://localhost:3000`
- Navigate through the site
- **Test Contact Form:**
  1. Fill in name, email, subject, message
  2. Click "Send Message"
  3. Check server console for confirmation
  4. Check your email for the message

### Stop Server:

Press `Ctrl + C` in terminal

---

## Step 5: Deploy on Render

### 1. Create Render Account

- Go to [render.com](https://render.com)
- Sign up with GitHub (easier)
- Authorize GitHub access

### 2. Create Web Service

1. Dashboard → **New +** → **Web Service**
2. **Connect Repository:**
   - Select your GitHub account
   - Find and select your `portfolio` repository
   - Click **Connect**
3. **Configure Settings:**
   - **Name:** `portfolio-website` (or your preference)
   - **Environment:** `Node`
   - **Region:** `Oregon` (or your location)
   - **Branch:** `main`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** `Free` (good for testing)

### 3. Set Environment Variables

**Before deploying**, add environment variables:

1. Scroll down to **Environment**
2. Click **Add Environment Variable** for each:

| Key | Value |
|-----|-------|
| `PORT` | `3000` |
| `NODE_ENV` | `production` |
| `EMAIL_USER` | `your-gmail@gmail.com` |
| `EMAIL_PASS` | `xxxx xxxx xxxx xxxx` |

### 4. Deploy

- Click **Create Web Service**
- Wait for build to complete (2-3 minutes)
- You'll get a URL like: `https://portfolio-website.onrender.com`
- Visit the URL to verify it's working!

---

## Step 6: Test Production Deployment

1. Open your Render URL in browser
2. Navigate through pages
3. **Test Contact Form:**
   - Fill and submit
   - Check your email
   - Should receive the message

---

## Step 7: Update GitHub (Optional)

Add your live Render URL to your GitHub repository:

1. Go to repository settings
2. **About** section
3. Add your website URL
4. Click **Save**

---

## Post-Deployment Workflow

### Making Updates:

```bash
# Make changes to your files locally

# Commit changes
git add .
git commit -m "Description of changes"

# Push to GitHub
git push origin main

# Render automatically redeploys! (takes 1-2 minutes)
```

### Check Deployment Status:

- Go to [render.com/dashboard](https://render.com/dashboard)
- Click your service
- **Logs** tab shows real-time deployment status

---

## Troubleshooting

### Contact Form Not Sending on Render

**Check 1:** Verify environment variables in Render

```
Setting → Environment → Verify EMAIL_USER & EMAIL_PASS are set
```

**Check 2:** View Render logs

```
Logs tab → Look for email errors
```

**Check 3:** Verify Gmail App Password

- Is it a 16-character password? (not regular Gmail password)
- Did you enable 2-Step Verification?

### Website Not Loading on Render

1. Check **Build Logs** in Render (Settings → Build & Deploy)
2. Common issues:
   - Missing dependencies
   - Syntax errors
   - PORT not set correctly

**Fix:** 
```bash
# Test locally first
npm start

# If error, check terminal output
# Fix locally, then push to GitHub
git push origin main
```

### Port Conflicts Locally

```bash
npm start  # Uses PORT from .env (default 3000)

# If 3000 is busy, change in .env:
PORT=3001

# Then restart npm start
```

---

## File Structure Verification

Before pushing, verify this structure exists:

```
portfolio/
├── .git/                           (created by git init)
├── .gitignore                      ✅ (we created this)
├── .env.example                    ✅ (we created this)
├── .env                            ⚠️ (local only, not pushed)
├── .github/
│   └── workflows/
│       └── deploy.yml              ✅ (CI/CD workflow)
├── README.md                       ✅ (we created this)
├── render.yaml                     ✅ (deployment config)
├── package.json                    ✅ (root package.json)
├── backend/
│   ├── server.js
│   ├── package.json                ✅ (updated)
│   └── routes/
│       └── contact.js
└── frontend/
    ├── index.html
    ├── script.js
    ├── styles.css
    ├── game.js
    ├── game.css
    ├── images/
    └── Resume/
```

---

## Commands Reference

```bash
# Initialize git locally
git init

# Add remote repository
git remote add origin https://github.com/USERNAME/REPO.git

# Verify remote
git remote -v

# Add all files
git add .

# Commit
git commit -m "Your message"

# Push to GitHub
git push -u origin main

# After first push, simple push:
git push

# Check status
git status

# Check git logs
git log --oneline
```

---

## Security Checklist

- ✅ `.env` is in `.gitignore` (never pushed)
- ✅ `.env.example` shows structure (safe to push)
- ✅ Using App Password (not Gmail password)
- ✅ Email credentials only in `.env` (local & Render)
- ✅ No secrets in code
- ✅ README doesn't contain credentials

---

## Support

### Common Documentation:

- [Express.js Docs](https://expressjs.com/)
- [Render Docs](https://render.com/docs)
- [GitHub Guide](https://guides.github.com/)
- [Nodemailer Guide](https://nodemailer.com/)

### Getting Help:

1. Check Render **Logs** for errors
2. Check browser **Console** (F12) for frontend errors
3. Check terminal output locally
4. Review this guide's Troubleshooting section

---

## Next Steps After Deployment

1. ✅ Verify website is live
2. ✅ Test contact form works
3. ✅ Share your portfolio URL
4. 🎯 Continue updating/improving website
5. 📝 Update GitHub README with your actual URL
6. 🔄 Create branches for new features

---

**Last Updated:** March 2026  
**Status:** Ready for Deployment ✅
