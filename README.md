# JeySports ⚾

A baseball management web application built with React + Vite and Firebase Authentication.

## Features

- 🏠 **Home** — Hero section with upcoming games, featured players, and standings preview
- 👤 **Players** — Browse and search players with detailed stats
- 🏆 **Teams** — Team cards with roster view
- 📅 **Schedule** — Upcoming and completed games
- 📊 **Standings** — Division standings
- ⚙️ **Admin** — Protected dashboard for managing players and teams (admin only)
- 🔐 **Google Sign-In** — Firebase Authentication with demo mode fallback

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install dependencies

```bash
cd apps/web
npm install
```

### Configure environment variables

Copy the example file and fill in your Firebase credentials:

```bash
cp .env.example .env
```

Edit `.env`:

```
VITE_ADMIN_EMAIL=your-admin-email@gmail.com
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

> **Without a `.env` file, the app runs in Demo Mode** — sign-in creates a local mock user and no real Firebase calls are made. The navbar shows a "🎮 Modo Demo" notice with a link to Firebase Console.

### Run the dev server

```bash
npm run dev
```

---

## Setting up Firebase Google Sign-In (real mode)

Follow these steps to switch from Demo Mode to real Google authentication:

### 1. Create a Firebase project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **Add project** → give it a name → Continue
3. Disable Google Analytics (optional) → **Create project**

### 2. Enable Google Sign-In

1. In the Firebase Console, go to **Authentication** → **Sign-in method**
2. Click **Google** → toggle **Enable** → add your support email → **Save**

### 3. Register your web app

1. In the Firebase Console, click the gear icon → **Project settings**
2. Under **Your apps**, click the **`</>`** (Web) icon
3. Give the app a nickname → **Register app**
4. Copy the `firebaseConfig` values shown

### 4. Fill in your `.env` file

Paste the values from step 3 into `apps/web/.env`:

```
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
VITE_ADMIN_EMAIL=your-admin@gmail.com
```

### 5. Add authorized domains

1. In Firebase Console → **Authentication** → **Settings** → **Authorized domains**
2. Add your deployment domain (e.g. `your-app.netlify.app`) or `localhost` for local dev

### 6. Restart the dev server

```bash
npm run dev
```

The "Modo Demo" notice will disappear and the **Sign in with Google** button will open the real Google OAuth popup.

---

## How authentication works

| Scenario | Behavior |
|---|---|
| No `.env` / placeholder values | **Demo mode** — mock user stored in `localStorage` |
| Real Firebase credentials | **Real mode** — Google OAuth popup, falls back to redirect if popup is blocked |
| Popup blocked by browser | Automatic fallback to `signInWithRedirect` |
| Auth error | Red banner shown below the navbar with a localized Spanish message |

The detection logic is in `src/config/firebase.js`:

```js
export const isFirebaseConfigured = !!(
  firebaseConfig.apiKey &&
  firebaseConfig.authDomain &&
  firebaseConfig.projectId &&
  firebaseConfig.apiKey !== 'your-api-key'
);
```

---

## Build & Deploy

```bash
cd apps/web
npm run build
```

The `netlify.toml` at the repo root is pre-configured for Netlify deployment. Set the environment variables in the Netlify dashboard under **Site settings → Environment variables**.

---

## Project structure

```
apps/web/
├── src/
│   ├── auth/
│   │   └── AuthContext.jsx      # Google Sign-In, demo mode, error handling
│   ├── config/
│   │   └── firebase.js          # Firebase init + isFirebaseConfigured flag
│   ├── components/
│   │   ├── Navbar.jsx            # Sign-in button, error banner, demo notice
│   │   ├── PlayerCard.jsx
│   │   ├── GameCard.jsx
│   │   ├── TeamCard.jsx
│   │   └── StatsPanel.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── PlayersPage.jsx
│   │   ├── TeamsPage.jsx
│   │   ├── SchedulePage.jsx
│   │   ├── StandingsPage.jsx
│   │   └── AdminPage.jsx        # Protected — admin email only
│   ├── data/                    # Mock JSON data
│   ├── services/
│   │   └── dataService.js       # localStorage + JSON data layer
│   └── styles/
│       └── globals.css
├── .env.example                 # Copy to .env and fill in Firebase values
└── package.json
```
