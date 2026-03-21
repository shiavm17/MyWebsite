# Project Architecture & Deployment Flow

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    USER BROWSER (Frontend)                  │
│  • index.html, CSS, JavaScript, Game Component              │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ HTTP/REST
                     │
┌────────────────────┴────────────────────────────────────────┐
│            EXPRESS.JS BACKEND SERVER (Port 3000)            │
│                                                              │
│  • Serves static frontend files                             │
│  • Handles /api/contact endpoint                            │
│  • CORS enabled for cross-origin requests                   │
│  • Body-parser for JSON                                     │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ SMTP Protocol
                     │
      ┌──────────────┴──────────────┐
      │                             │
┌─────▼──────┐         ┌─────────────▼──────┐
│   Gmail     │         │    nodemailer      │
│ SMTP Server │◄────────┤  (Email Library)   │
└────────────┘         └────────────────────┘
```

## Deployment Architecture (After Render)

```
┌─────────────────────────────────────────────────────────────┐
│                     GitHub Repository                        │
│  • Source code stored safely                                │
│  • Version control & history                                │
│  • Automatic CI/CD with GitHub Actions                      │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ git push
                     │
┌────────────────────▼────────────────────────────────────────┐
│                   Render.com                                │
│  • Auto-detects push to GitHub                              │
│  • Runs: npm install (build)                                │
│  • Runs: npm start (start command)                          │
│  • Deploys on Docker container                              │
│  • Assigns URL: portfolio-website.onrender.com              │
│  • Watches for future pushes (auto-redeploy)               │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ HTTPS
                     │
┌────────────────────▼────────────────────────────────────────┐
│              Your Live Website                               │
│  URL: https://portfolio-website.onrender.com                │
│  • Accessible 24/7 globally                                 │
│  • Contact form sends emails via Gmail                      │
│  • Portfolio content displayed beautifully                  │
└─────────────────────────────────────────────────────────────┘
```

## Development Workflow

```
1. LOCAL DEVELOPMENT
   ┌─────────────────────┐
   │  Edit files locally │
   │  - HTML, CSS, JS    │
   │  - Backend routes   │
   └──────────┬──────────┘
              │
              ▼
   ┌─────────────────────┐
   │   npm start         │
   │   Test locally      │
   │   http://localhost. │
   │         3000        │
   └──────────┬──────────┘

2. VERSION CONTROL
   ┌─────────────────────┐
   │  git add .          │
   │  git commit -m "..."│
   └──────────┬──────────┘
              │
              ▼
   ┌─────────────────────┐
   │  git push origin    │
   │  main               │
   │  (Push to GitHub)   │
   └──────────┬──────────┘

3. AUTOMATIC DEPLOYMENT
   ┌─────────────────────┐
   │  Render detects     │
   │  push to GitHub     │
   └──────────┬──────────┘
              │
              ▼
   ┌─────────────────────┐
   │  Render runs:       │
   │  npm install        │
   │  npm start          │
   └──────────┬──────────┘
              │
              ▼
   ┌─────────────────────┐
   │  Visit live URL:    │
   │  portfolio-website. │
   │  onrender.com       │
   └─────────────────────┘
```

## File Organization

```
portfolio/
│
├── FRONTEND (Static Files)
│   └── frontend/
│       ├── index.html ........... Main page structure
│       ├── styles.css ........... Global styles
│       ├── game.css ............ Game component styles
│       ├── script.js ........... Page interactions & form handling
│       ├── game.js ............ Interactive game logic
│       ├── images/ ........... Asset files (PNG, JPG, etc)
│       └── Resume/ ........... PDF & documents
│
├── BACKEND (Express Server)
│   └── backend/
│       ├── server.js .......... Main Express server
│       ├── package.json ....... Backend dependencies
│       └── routes/
│           └── contact.js .... Contact form API endpoint
│
├── Configuration Files
│   ├── package.json .......... Root dependencies
│   ├── .env ................. (LOCAL ONLY) Credentials
│   ├── .env.example ......... (PUSHED) Template
│   ├── .gitignore .......... Which files to ignore
│   ├── render.yaml ......... Render deployment config
│   └── .github/
│       └── workflows/
│           └── deploy.yml .. GitHub Actions (optional CI/CD)
│
└── Documentation Files
    ├── 00_START_HERE.md ......... 👈 Start with this!
    ├── README.md ............... Full documentation
    ├── DEPLOYMENT_GUIDE.md ..... Step-by-step guide
    └── QUICK_REFERENCE.md ..... Command cheatsheet
```

## Technology Stack

### Frontend
- **HTML5** - Structure
- **CSS3** - Styling
- **JavaScript (Vanilla)** - Interactivity
- **Tailwind CSS** - Utility-first CSS framework
- **SVG** - Vector graphics (game component)

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **nodemailer** - Email sending
- **CORS** - Cross-origin resource sharing
- **body-parser** - Request parsing
- **dotenv** - Environment variables

### Deployment
- **GitHub** - Version control & hosting
- **Render** - Hosting platform
- **Docker** - Containerization (handled by Render)
- **Gmail SMTP** - Email service

## Data Flow (Contact Form)

```
User fills form (Frontend)
         ↓
JavaScript validates input
         ↓
Sends POST to /api/contact (Backend)
         ↓
Backend validates request
         ↓
Creates email with nodemailer
         ↓
Connects to Gmail SMTP server
         ↓
Sends email to EMAIL_USER
         ↓
Backend responds with success
         ↓
Frontend shows confirmation message
         ↓
Email arrives in user's inbox
```

## Environment Variables

```
LOCAL DEVELOPMENT (.env)
├── PORT=3000 ................. Server port
├── NODE_ENV=development ..... Environment type
├── EMAIL_USER=xxx@gmail.com . Your email
└── EMAIL_PASS=xxxx xxxx xxxx . Gmail app password

RENDER PRODUCTION (Environment Variables)
├── PORT=3000 ................. Server port
├── NODE_ENV=production ...... Environment type
├── EMAIL_USER=xxx@gmail.com . Your email
└── EMAIL_PASS=xxxx xxxx xxxx . Gmail app password
```

## Build & Deploy Commands

```
LOCAL
├── npm install ......... Install dependencies
├── npm start ........... Start server on localhost:3000
└── npm run dev ........ Start with auto-reload (nodemon)

RENDER (Automatic)
├── npm install ........ Happens during build phase
└── npm start ......... Happens when service starts
```

## Security Flow

```
User enters credentials
         ↓
.env file (LOCAL only, not pushed)
         ↓
Environment variables (Render dashboard only)
         ↓
Backend reads from process.env
         ↓
Used only for Gmail SMTP connection
         ↓
Never exposed to frontend
         ↓
GIT SECURITY: .env in .gitignore
```

## Deployment Timeline

```
T+0:00    You make changes & run: git push origin main

T+0:01    GitHub receives the push
          ↓
T+0:02    Render detects new push
          ↓
T+0:03    Render starts build process
          ├─ Checkout code from GitHub
          ├─ Run: npm install
          ├─ Build Docker container
          └─ Run: npm start
          ↓
T+2:00    Deployment completes
          ↓
T+2:01    Your changes are LIVE!
          Your URL now serves new code
```

## Monitoring & Debugging

```
LOCALLY:
├── npm start terminal ... See server logs
├── Browser console (F12) .. Frontend errors
└── Network tab .......... Request/response inspection

RENDER:
├── Logs tab ............ Real-time server output
├── Deployments tab .... Build history & logs
├── Metrics tab ........ CPU, memory, requests
└── Environment tab .... Verify variables are set
```

## Scaling Options (Future)

```
Current: Free tier (fine for portfolio)
         ├─ Limited resources
         └─ May sleep when inactive

Paid Tiers (if needed):
         ├─ Starter: Persistent + faster builds
         ├─ Standard: More resources
         └─ Pro: Production-ready with advanced features

Consider paid tier when:
- Website needs to be always-on
- Expecting high traffic
- Using custom domain
- Need uptime guarantees
```

## Next Steps

1. ✅ Read **00_START_HERE.md**
2. ✅ Follow the 5-step deployment process
3. ✅ Monitor Render logs during first deployment
4. ✅ Test contact form on live site
5. ✅ Share your portfolio URL!

---

**Questions about architecture?** This diagram shows how everything connects!
