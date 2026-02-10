# 🚀 Shivam Chaturvedi — Personal Portfolio

> A clean, responsive personal portfolio with an interactive game component and a Node.js contact backend.

![Status](https://img.shields.io/badge/status-active-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-green)

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Setup & Installation](#-setup--installation)
- [Running Locally](#-running-locally)
- [Contact Form & Backend](#-contact-form--backend)
- [Customization Guide](#-customization-guide)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License & Contact](#-license--contact)

---

## 📌 Project Overview

This repository contains all files for my personal portfolio website. It features a responsive landing page, an interactive in-browser game, a downloadable resume section, and a lightweight Express backend that powers the contact form.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎨 Responsive Design | Clean, mobile-friendly portfolio landing page |
| 🎮 Interactive Game | Client-side browser game built with vanilla JS |
| 📬 Contact Form | Form submissions handled by a Node.js backend |
| 📄 Resume Download | Static Resume folder with downloadable assets |

---

## 🛠 Tech Stack

**Frontend**
- HTML5, CSS3, Vanilla JavaScript

**Backend**
- Node.js (`v14+`)
- Express.js

---

## 📁 Project Structure

```
chaturvedi-portfolio/
│
├── frontend/                   # All static frontend assets
│   ├── index.html              # Main portfolio page (entry point)
│   ├── script.js               # Page behaviors & contact form logic
│   ├── game.js                 # Interactive game component
│   ├── styles.css              # Main site styling
│   ├── game.css                # Game-specific styling
│   ├── images/                 # Site images & assets
│   └── Resume/                 # Downloadable resume files
│
├── backend/                    # Express server for contact form
│   ├── server.js               # Server entry point
│   ├── package.json            # Dependencies & scripts
│   └── routes/
│       └── contact.js          # POST /contact route handler
│
└── README.md                   # Project documentation
```

---



## 🖥 Running Locally

Quick checklist before testing:

- [ ] Backend server is running (`npm start` inside `backend/`)
- [ ] Frontend is served (browser or static dev server)
- [ ] Visit `http://localhost:5000` (or whichever port is configured)
- [ ] Test the **contact form** submission
- [ ] Test the **interactive game** component

---

## 📬 Contact Form & Backend

The frontend form sends a `POST` request to the backend `/contact` route.

**Expected request body:**

```json
{
  "name": "Shivam Chaturvedi",
  "email": "shivamchaturvedi.in@gmail.com",
  "message": "Hey Shivam, let's connect!"
}
```

**Route handler:** `backend/routes/contact.js`

**Extending the backend:**

- 📧 **Send emails** — Integrate [Nodemailer](https://nodemailer.com/) with Gmail or SendGrid.
- 💾 **Persist messages** — Connect a MongoDB or PostgreSQL database.
- 🔔 **Notifications** — Forward to Slack, Discord webhook, or Telegram bot.

---

## 🎨 Customization Guide

| What to change | Where to edit |
|---|---|
| Content & sections | `frontend/index.html` |
| Fonts, colors, layout | `frontend/styles.css` |
| Game logic & rules | `frontend/game.js` + `game.css` |
| Contact route behavior | `backend/routes/contact.js` |
| Resume files | `frontend/Resume/` |

---

## 🌐 Deployment

### Frontend (Static)

| Platform | Notes |
|---|---|
| [GitHub Pages](https://pages.github.com/) | Free, great for static sites |
| [Netlify](https://netlify.com/) | Supports form handling, instant deploys |
| [Vercel](https://vercel.com/) | Fast global CDN, zero config |

### Backend (Node.js)

| Platform | Notes |
|---|---|
| [Render](https://render.com/) | Free tier available, simple deploys |
| [Railway](https://railway.app/) | Easy env vars, auto-deploys from Git |
| [Heroku](https://heroku.com/) | Classic choice, paid plans |

> **Tip:** Set your `PORT` environment variable on the hosting platform and update the API base URL in `frontend/script.js` to point to the deployed backend URL.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

For major changes, please open an issue first to discuss your idea.

---

## 📄 License & Contact

- **License:** MIT — feel free to use, modify, and distribute. Add a `LICENSE` file to formalize it.
- **Portfolio:** Submit a message directly via the contact form on the site.
- **Issues:** Open a GitHub Issue for bug reports or collaboration requests.

---

<div align="center">
  Made with ❤️ by <strong>Shivam Chaturvedi</strong>
</div>
