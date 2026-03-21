# Shivam Chaturvedi - Portfolio Website

A modern, fully-functional portfolio website built with Express.js backend and responsive frontend with interactive features.

## Features

✨ **Modern Design**
- Responsive layout (mobile, tablet, desktop)
- Smooth animations and transitions
- Tailwind CSS styling

🎮 **Interactive Elements**
- Circuit building game component
- Smooth navigation
- Contact form with email integration

📧 **Contact Form**
- Email notifications via nodemailer
- Form validation
- Backend API integration

## Tech Stack

**Backend:**
- Node.js
- Express.js
- nodemailer (email sending)
- cors (cross-origin requests)
- body-parser (request parsing)
- dotenv (environment variables)

**Frontend:**
- HTML5
- CSS3
- Vanilla JavaScript
- Tailwind CSS
- Responsive Design

## Project Structure

```
├── backend/
│   ├── server.js           # Express server
│   ├── package.json        # Backend dependencies
│   └── routes/
│       └── contact.js      # Contact form API endpoint
├── frontend/
│   ├── index.html          # Main page
│   ├── script.js           # JavaScript functionality
│   ├── styles.css          # Custom styles
│   ├── game.js             # Interactive game component
│   ├── game.css            # Game styles
│   ├── images/             # Image assets
│   └── Resume/             # Resume PDF
└── package.json            # Root package.json
```

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Gmail account with App Password (for contact form)

## Local Development

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

### 2. Setup Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` with your credentials:

```
PORT=3000
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password
NODE_ENV=development
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm start
```

The server will run on `http://localhost:3000`

## Setting Up Email (Gmail)

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an [App Password](https://myaccount.google.com/apppasswords)
3. Copy the 16-character password (remove spaces)
4. Paste it in `.env` as `EMAIL_PASS`

**Note:** If you don't set up email credentials, the contact form will work in "Mock Mode" (logs to console).

## API Endpoints

### POST `/api/contact`

Send a contact form message.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Hello",
  "message": "Your message here"
}
```

**Response:**
```json
{
  "message": "Message sent successfully!"
}
```

## Deployment on Render

### 1. Connect Your Repository

1. Go to [Render.com](https://render.com)
2. Sign in with GitHub
3. Create a new **Web Service**
4. Select your repository
5. Choose branch: `main`

### 2. Configure Deployment

- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Environment:** Node

### 3. Set Environment Variables

In Render Dashboard → Environment:

```
PORT=3000
NODE_ENV=production
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password
```

### 4. Deploy

Click **Create Web Service**. Render will automatically deploy and redeploy on every push to `main` branch.

## GitHub Pages Setup (Optional - for Static Frontend Only)

If you want to deploy just the frontend to GitHub Pages:

1. Push `frontend/` folder to a `gh-pages` branch
2. Enable GitHub Pages in repository settings
3. Select `gh-pages` branch as source

**Note:** This won't work with the contact form (no backend)

## Scripts

```bash
npm start     # Start the server (runs on PORT from .env)
npm run build # Build command (frontend is static, no build needed)
```

## Troubleshooting

### Contact Form Not Sending

1. ✅ Check `.env` has correct `EMAIL_USER` and `EMAIL_PASS`
2. ✅ Ensure Gmail App Password is set (not regular password)
3. ✅ Check browser console for error messages
4. ✅ Server logs will show details (run in development mode)

### Port Already in Use

```bash
# Change PORT in .env, or kill process on port 3000:
# Linux/Mac:
lsof -ti:3000 | xargs kill -9

# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### CORS Issues

The backend already has CORS enabled. If you still get errors:
- Check that backend is running on `http://localhost:3000`
- Try accessing from the same origin or Render deployed URL

## Git Workflow

```bash
# Clone repo
git clone https://github.com/yourusername/portfolio.git
cd portfolio

# Create a new branch for changes
git checkout -b feature/your-feature

# Make changes, then:
git add .
git commit -m "description of changes"
git push origin feature/your-feature

# Create Pull Request on GitHub, then merge to main
# Render will auto-deploy after merge
```

## Performance Tips

1. **Images:** Compress images before adding to `frontend/images/`
2. **CSS:** Tailwind CSS is already optimized via CDN
3. **Caching:** Add caching headers in production (see backend/server.js)

## Security Notes

- 🔒 Never commit `.env` file (use `.env.example`)
- 🔒 Use App Passwords, never share actual Gmail password
- 🔒 Validate all form inputs (already done in backend)
- 🔒 Keep dependencies updated: `npm audit fix`

## License

This project is personal portfolio and is not open source.

## Questions?

Check the issue tracker or contact via the portfolio contact form.

---

**Deployed on:** [Your Render URL]  
**Repository:** [Your GitHub URL]  
**Last Updated:** March 2026
