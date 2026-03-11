# ⚾ JeySports — Baseball Management App

A full-stack baseball management application inspired by the MLB app.

## 🗂️ Project Structure

```
JeySports/
├── apps/
│   ├── web/          # React + Vite web application
│   └── mobile/       # React Native + Expo mobile app
├── packages/
│   ├── data/         # Shared mock JSON data
│   ├── ui/           # (Shared UI components - future)
│   └── auth/         # (Shared auth utilities - future)
└── netlify.toml      # Netlify deployment config
```

## 🌐 Web App (React + Vite)

### Features
- **Home** — Featured players, upcoming games, standings preview
- **Players** — Player profiles, stats, search & filter
- **Teams** — Team cards, rosters by team
- **Schedule** — Games with filter by status (upcoming/final)
- **Standings** — Division standings
- **Admin Dashboard** — CRUD for players & teams (restricted to admin email)

### Pages & Components
| Component | Description |
|---|---|
| `Navbar` | Sticky nav with Google auth |
| `PlayerCard` | Player photo/initials, position badge, stats grid |
| `TeamCard` | Team color accent, win/loss record |
| `GameCard` | Upcoming vs. final game display |
| `StatsPanel` | Full player season stats |
| `AdminDashboard` | Add/edit/delete players & teams |

### Design
- Dark sports theme: `#0B0C10` background, `#D50032` red accent
- MLB-inspired minimal modern UI
- Mobile responsive

### Tech Stack
- React 19 + Vite
- React Router DOM
- Firebase Auth (Google Sign-In)
- CSS custom properties

## 📱 Mobile App (React Native + Expo)

### Screens
- `HomeScreen` — Hero, upcoming games, featured players
- `PlayersScreen` — Player list with search, tap to see stats
- `TeamsScreen` — Team list, tap to drill into roster
- `ScheduleScreen` — Games with filter tabs
- `StandingsScreen` — Division standings table

### Navigation
Bottom tab navigator with 5 tabs: Home, Players, Teams, Schedule, Standings.

### iOS Compatible
Built with Expo for iOS and Android compatibility.

## 🔐 Authentication

Uses **Firebase Google Sign-In**.

Admin access is controlled by the `VITE_ADMIN_EMAIL` environment variable:
```javascript
if (user.email === ADMIN_EMAIL) {
  setIsAdmin(true);
}
```

## 🗄️ Data Layer

Mock JSON database (easy to migrate to PostgreSQL or Firebase):
- `players.json` — 10 MLB players with full stats
- `teams.json` — 8 MLB teams
- `games.json` — Upcoming and completed games
- `standings.json` — Division standings

Data is persisted to `localStorage` when modified via the admin panel.

## 🚀 Deployment

### Netlify (Web)
The `netlify.toml` at the project root configures deployment:
```toml
[build]
  base = "apps/web"
  command = "npm run build"
  publish = "dist"
```

### Environment Variables
Create `apps/web/.env` based on `.env.example`:
```env
VITE_ADMIN_EMAIL=your-admin-email@gmail.com
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

## 🧑‍💻 Local Development

### Web
```bash
cd apps/web
npm install
npm run dev
```

### Mobile
```bash
cd apps/mobile
npm install
npx expo start
```

## 🎨 Color Palette

| Name | Hex |
|---|---|
| Primary Red | `#D50032` |
| Dark Background | `#0B0C10` |
| Card Background | `#1F2833` |
| Text White | `#FFFFFF` |
| Accent Gray | `#C5C6C7` |
