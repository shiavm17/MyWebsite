# Shivam Chaturvedi — Personal Portfolio

Welcome to the source for my personal portfolio website. This repository contains a simple static frontend and a small Node.js backend used for handling the contact form. The README below explains the project structure, how to run the site locally, and how to modify or deploy it.

## Table of Contents

- Project Overview
- Features
- Tech Stack
- Project Structure (step-by-step)
- Setup & Installation
- Running Locally
- Contact Form / Backend
- Customization
- Deployment Suggestions
- Contributing
- License & Contact

## Project Overview

This repository hosts the files for my portfolio website. The frontend provides a landing page, an interactive game component, styles, images, and a Resume folder. The backend is a small Express-based server providing a contact route used by the frontend contact form.

## Features

- Clean, responsive portfolio landing page
- Interactive browser game (client-side)
- Contact form with a backend endpoint
- Static Resume folder for downloadable assets

## Tech Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js with Express (simple API for contact messages)

## Project Structure (step-by-step)

Top-level layout:

- `frontend/` — All static frontend files you can open directly in a browser.
  - `index.html` — Main portfolio page and entry point.
  - `script.js` — Frontend scripting for page behaviors and contact form.
  - `game.js` — JavaScript for the interactive game component.
  - `styles.css`, `game.css` — Styling for the site and the game.
  - `images/` — Images used on the site.
  - `Resume/` — Resume files you can link or download.

- `backend/` — Small Node/Express server handling form submissions.
  - `package.json` — Backend dependencies and scripts.
  - `server.js` — Server entry; starts the Express app.
  - `routes/contact.js` — Route handling POST requests from the contact form.

- `README.md` — This document (project overview and instructions).

## Setup & Installation (step-by-step)

Prerequisites:

- Node.js (v14+ recommended) for the backend

1. Clone the repository (or download the ZIP):

```bash
git clone <your-repo-url>
cd "chaturvedi portfolio"
```

2. Install backend dependencies:

```bash
cd backend
npm install
```

3. Start the backend server (from the `backend` folder):

```bash
# either (if package.json defines a start script)
npm start

# or directly with Node
node server.js
```

4. Open the frontend:

- The simplest approach is to open `frontend/index.html` directly in your browser.
- For a better development experience (CORS or API calls to the backend), use a static server (e.g., VS Code Live Server extension) and ensure the backend is running at the expected host/port.

## Running Locally (quick checklist)

- Ensure backend is running (see step 3).
- Serve the frontend (open `frontend/index.html` or run a static server in `frontend/`).
- Visit the page in your browser and test the contact form and the game component.

## Contact Form / Backend Details

- The frontend contact form submits data to the backend contact route. By convention the route handler is implemented in `backend/routes/contact.js`.
- The route expects JSON or URL-encoded form fields such as `name`, `email`, and `message` (see the code in `script.js` / `routes/contact.js` for exact field names).
- The backend can be extended to send emails, save to a database, or forward messages to a third-party service.

## Customization (step-by-step suggestions)

1. Update `frontend/index.html` to change text, sections, or add new pages.
2. Edit `styles.css` / `game.css` to adjust styling and layout.
3. Modify `game.js` to change or extend the interactive game logic.
4. If you need contact persistence, add a database and update `routes/contact.js` accordingly.

## Deployment Suggestions

- Static frontend can be deployed to GitHub Pages, Netlify, or Vercel.
- Backend (if used) can be deployed to Heroku, Render, Railway, or any Node-supporting host. Configure environment variables and production ports as needed.

## Contributing

- Feel free to open issues or pull requests for bug fixes, improvements, or feature suggestions.
- For major changes, please open an issue first to discuss the design.

## License & Contact

- This repository uses a permissive approach — add a `LICENSE` file for a formal license (MIT is common).
- Contact or collaboration requests can be sent via the contact form on the site or by opening an issue on this repository.

---

If you'd like, I can also:

- Add example `.env` and configuration notes for the backend,
- Add a small `start` script to `backend/package.json` if missing,
- Or tailor the README wording for GitHub Pages or a specific hosting service.

Would you like me to make any of those follow-ups now?
