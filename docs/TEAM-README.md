# Memento Frontend - Team Guide

## Project Tree

```
memento-frontend/
│
├── index.html                # Entry HTML
├── package.json
├── vite.config.js            # Vite configuration
├── .env.example              # Copy to .env
├── .gitignore
│
├── src/
│   ├── main.jsx              # App entry point
│   ├── App.jsx               # Routes setup
│   │
│   ├── context/
│   │   └── AuthContext.jsx   # 🟠 CRISTAL - Auth state management
│   │
│   ├── services/
│   │   ├── api.js            # 🟠 CRISTAL - Axios setup
│   │   ├── authService.js    # 🟠 CRISTAL - Auth API calls
│   │   ├── storyService.js   # 🟠 CRISTAL - Story API calls
│   │   └── commentService.js # 🟣 TITO - Comment API calls
│   │
│   ├── components/
│   │   ├── Navbar.jsx        # 🔴 PABLO - Navigation
│   │   ├── ProtectedRoute.jsx# 🟠 CRISTAL - Route protection
│   │   ├── StoryCard.jsx     # 🟠 CRISTAL - Story display
│   │   └── CommentSection.jsx# 🟣 TITO - Comments component
│   │
│   ├── pages/
│   │   ├── Home/Home.jsx     # 🟠 CRISTAL - Story feed (landing particles implemented by 🔴 PABLO)
│   │   ├── Login.jsx         # 🟠 CRISTAL - Login form
│   │   ├── Signup.jsx        # 🟠 CRISTAL - Signup form
│   │   ├── StoryDetail.jsx   # 🔴 PABLO - Full story view
│   │   └── CreateStory.jsx   # 🔴 PABLO - New story form
│   │
│   └── styles/
│       └── global.css        # 🔴 PABLO - Styling
│
└── docs/
    ├── TEAM-README.md        # You are here!
    └── team-plan/
        ├── cristal.md        # 🟠 Detailed tasks + pseudocode
        ├── tito.md           # 🟣 Detailed tasks + pseudocode
        └── pablo.md          # 🔴 Integration tasks
```

---

## Team Assignments

| Color | Name        | Files                                                                    | Tasks                            |
| ----- | ----------- | ------------------------------------------------------------------------ | -------------------------------- |
| 🟠    | **CRISTAL** | Services, AuthContext, Auth pages, StoryCard, Home                       | API layer, Auth flow, Story feed |
| 🟣    | **TITO**    | `commentService.js`, `CommentSection.jsx`                                | Comment functionality            |
| 🔴    | **PABLO**   | Navbar, StoryDetail, CreateStory, CSS, Landing/particles (Home/Home.jsx) | Integration, styling             |

---

## Getting Started

### 1. Fork & Clone

```bash
git clone <your-fork-url>
cd memento-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment

```bash
cp .env.example .env
# Edit .env with backend URL if different
```

### 4. Create Your Branch

```bash
git checkout -b feature/your-name-task
# Example: feature/crystal-auth
```

### 5. Run the App

```bash
npm run dev
```

App runs at http://localhost:5173

---

## Your Task Files

- **Cristal** → Read `docs/team-plan/crystal.md`
- **Tito** → Read `docs/team-plan/tito.md`
- **Pablo** → Read `docs/team-plan/pablo.md`

---

## Important Notes

### Backend Setup (Required)

The frontend needs the backend running. Follow these steps:

```bash
# 1. Navigate to the backend folder
cd memento-backend

# 2. Install dependencies
npm install

# 3. Copy the environment file (already configured with shared MongoDB)
cp .env.example .env

# 4. Start the backend server
npm run dev
```

Backend runs at `http://localhost:3000`

### Dev User Credentials

Use this account to login and test the app:

| Email             | Password     |
| ----------------- | ------------ |
| `dev@memento.com` | `devpass123` |

### Frontend Setup

```bash
# 1. Navigate to frontend folder
cd memento-frontend

# 2. Install dependencies
npm install

# 3. Copy environment file
cp .env.example .env

# 4. Start the frontend
npm run dev
```

Frontend runs at `http://localhost:5173`

### Quick Start (Both)

```bash
# Terminal 1 - Backend
cd memento-backend && npm install && npm run dev

# Terminal 2 - Frontend
cd memento-frontend && npm install && npm run dev
```

Then open http://localhost:5173 and login with `dev@memento.com` / `devpass123`

---

## Workflow

1. Read your task file in `docs/team-plan/`
2. Find the TODO comments in your assigned files
3. Implement following the pseudocode
4. Test in browser
5. Commit and push
6. Create Pull Request

---

## Need Help?

1. Check your task file for pseudocode
2. Look at the TODO comments in the code
3. Check browser DevTools console/network tab
4. Ask a teammate in Slack/Discord
