// Data service - loads from localStorage or falls back to mock data
// This abstraction makes it easy to migrate to PostgreSQL or Firebase later

const STORAGE_KEYS = {
  players: 'jeysports_players',
  teams: 'jeysports_teams',
  games: 'jeysports_games',
  standings: 'jeysports_standings',
};

async function loadPlayers() {
  const stored = localStorage.getItem(STORAGE_KEYS.players);
  if (stored) return JSON.parse(stored);
  const data = await import('../data/players.json');
  return data.default;
}

async function loadTeams() {
  const stored = localStorage.getItem(STORAGE_KEYS.teams);
  if (stored) return JSON.parse(stored);
  const data = await import('../data/teams.json');
  return data.default;
}

async function loadGames() {
  const stored = localStorage.getItem(STORAGE_KEYS.games);
  if (stored) return JSON.parse(stored);
  const data = await import('../data/games.json');
  return data.default;
}

async function loadStandings() {
  const stored = localStorage.getItem(STORAGE_KEYS.standings);
  if (stored) return JSON.parse(stored);
  const data = await import('../data/standings.json');
  return data.default;
}

function savePlayers(players) {
  localStorage.setItem(STORAGE_KEYS.players, JSON.stringify(players));
}

function saveTeams(teams) {
  localStorage.setItem(STORAGE_KEYS.teams, JSON.stringify(teams));
}

export const dataService = {
  getPlayers: loadPlayers,
  getTeams: loadTeams,
  getGames: loadGames,
  getStandings: loadStandings,

  addPlayer: async (player) => {
    const players = await loadPlayers();
    const newPlayer = { ...player, id: crypto.randomUUID() };
    const updated = [...players, newPlayer];
    savePlayers(updated);
    return newPlayer;
  },

  updatePlayer: async (id, updates) => {
    const players = await loadPlayers();
    const updated = players.map(p => p.id === id ? { ...p, ...updates } : p);
    savePlayers(updated);
    return updated.find(p => p.id === id);
  },

  deletePlayer: async (id) => {
    const players = await loadPlayers();
    const updated = players.filter(p => p.id !== id);
    savePlayers(updated);
  },

  addTeam: async (team) => {
    const teams = await loadTeams();
    const newTeam = { ...team, id: crypto.randomUUID() };
    const updated = [...teams, newTeam];
    saveTeams(updated);
    return newTeam;
  },

  updateTeam: async (id, updates) => {
    const teams = await loadTeams();
    const updated = teams.map(t => t.id === id ? { ...t, ...updates } : t);
    saveTeams(updated);
    return updated.find(t => t.id === id);
  },

  deleteTeam: async (id) => {
    const teams = await loadTeams();
    const updated = teams.filter(t => t.id !== id);
    saveTeams(updated);
  },

  generatePlayer: () => {
    const firstNames = ['Juan', 'Pedro', 'Carlos', 'Luis', 'Miguel', 'Jose', 'Rafael', 'Fernando', 'Diego', 'Andres'];
    const lastNames = ['Soto', 'Rodriguez', 'Martinez', 'Perez', 'Gomez', 'Hernandez', 'Lopez', 'Gonzalez', 'Torres', 'Ramirez'];
    const positions = ['OF', '1B', '2B', '3B', 'SS', 'C', 'SP', 'RP'];
    const teams = ['New York Yankees', 'Los Angeles Dodgers', 'Atlanta Braves', 'Houston Astros', 'Boston Red Sox'];
    return {
      name: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
      team: teams[Math.floor(Math.random() * teams.length)],
      teamId: Math.floor(Math.random() * 5) + 1,
      position: positions[Math.floor(Math.random() * positions.length)],
      number: String(Math.floor(Math.random() * 99) + 1),
      photo: '',
      stats: {
        avg: `.${(250 + Math.floor(Math.random() * 100)).toString()}`,
        hr: Math.floor(Math.random() * 40),
        rbi: Math.floor(Math.random() * 120),
        ops: (0.700 + Math.random() * 0.400).toFixed(3),
        hits: Math.floor(Math.random() * 180) + 50,
        runs: Math.floor(Math.random() * 100) + 20,
        sb: Math.floor(Math.random() * 40),
        obp: (0.300 + Math.random() * 0.150).toFixed(3),
        slg: (0.400 + Math.random() * 0.250).toFixed(3),
      },
      bio: 'A talented baseball player making their mark in the league.',
    };
  },
};
