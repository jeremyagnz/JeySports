import { useState, useEffect } from 'react';
import { useAuth } from '../auth/useAuth';
import { dataService } from '../services/dataService';
import PlayerCard from '../components/PlayerCard';
import TeamCard from '../components/TeamCard';
import './AdminPage.css';

const INITIAL_PLAYER = {
  name: '', team: '', teamId: '', position: '', number: '',
  photo: '', bio: '',
  stats: { avg: '', hr: '', rbi: '', ops: '', hits: '', runs: '', sb: '', obp: '', slg: '' }
};

const INITIAL_TEAM = {
  name: '', shortName: '', city: '', league: 'AL', division: '',
  logo: '⚾', primaryColor: '#D50032', secondaryColor: '#FFFFFF',
  stadium: '', wins: '', losses: '', description: ''
};

export default function AdminPage() {
  const { user, isAdmin } = useAuth();
  const [tab, setTab] = useState('players');
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [playerForm, setPlayerForm] = useState(INITIAL_PLAYER);
  const [teamForm, setTeamForm] = useState(INITIAL_TEAM);
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [editingTeam, setEditingTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!isAdmin) return;
    Promise.all([dataService.getPlayers(), dataService.getTeams()]).then(([p, t]) => {
      setPlayers(p);
      setTeams(t);
      setLoading(false);
    });
  }, [isAdmin]);

  function showMessage(text, type = 'success') {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  }

  // Player form handlers
  function handlePlayerFormChange(e) {
    const { name, value } = e.target;
    if (name.startsWith('stats.')) {
      const stat = name.split('.')[1];
      setPlayerForm(f => ({ ...f, stats: { ...f.stats, [stat]: value } }));
    } else {
      setPlayerForm(f => ({ ...f, [name]: value }));
    }
  }

  async function handlePlayerSubmit(e) {
    e.preventDefault();
    try {
      if (editingPlayer) {
        const updated = await dataService.updatePlayer(editingPlayer.id, playerForm);
        setPlayers(prev => prev.map(p => p.id === editingPlayer.id ? updated : p));
        showMessage('Player updated successfully!');
      } else {
        const newPlayer = await dataService.addPlayer(playerForm);
        setPlayers(prev => [...prev, newPlayer]);
        showMessage('Player added successfully!');
      }
      setPlayerForm(INITIAL_PLAYER);
      setEditingPlayer(null);
    } catch {
      showMessage('Error saving player', 'error');
    }
  }

  function handleEditPlayer(player) {
    setEditingPlayer(player);
    setPlayerForm({ ...player });
    setTab('players');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handleDeletePlayer(id) {
    if (!confirm('Delete this player?')) return;
    await dataService.deletePlayer(id);
    setPlayers(prev => prev.filter(p => p.id !== id));
    showMessage('Player deleted');
  }

  function handleGeneratePlayer() {
    setPlayerForm(dataService.generatePlayer());
    setEditingPlayer(null);
  }

  // Team form handlers
  function handleTeamFormChange(e) {
    const { name, value } = e.target;
    setTeamForm(f => ({ ...f, [name]: value }));
  }

  async function handleTeamSubmit(e) {
    e.preventDefault();
    try {
      if (editingTeam) {
        const updated = await dataService.updateTeam(editingTeam.id, { ...teamForm, wins: Number(teamForm.wins), losses: Number(teamForm.losses) });
        setTeams(prev => prev.map(t => t.id === editingTeam.id ? updated : t));
        showMessage('Team updated successfully!');
      } else {
        const newTeam = await dataService.addTeam({ ...teamForm, wins: Number(teamForm.wins), losses: Number(teamForm.losses) });
        setTeams(prev => [...prev, newTeam]);
        showMessage('Team added successfully!');
      }
      setTeamForm(INITIAL_TEAM);
      setEditingTeam(null);
    } catch {
      showMessage('Error saving team', 'error');
    }
  }

  function handleEditTeam(team) {
    setEditingTeam(team);
    setTeamForm({ ...team });
    setTab('teams');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handleDeleteTeam(id) {
    if (!confirm('Delete this team?')) return;
    await dataService.deleteTeam(id);
    setTeams(prev => prev.filter(t => t.id !== id));
    showMessage('Team deleted');
  }

  if (!user) {
    return (
      <div className="admin-locked container">
        <div className="locked-card">
          <div className="locked-icon">🔒</div>
          <h2>Authentication Required</h2>
          <p>You must be signed in to access this page.</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="admin-locked container">
        <div className="locked-card">
          <div className="locked-icon">⛔</div>
          <h2>Access Denied</h2>
          <p>This page is restricted to administrators only.</p>
          <p style={{ color: 'var(--color-gray-dark)', fontSize: '0.85rem', marginTop: '0.5rem' }}>
            Signed in as: {user.email}
          </p>
        </div>
      </div>
    );
  }

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="admin-page">
      <div className="container">
        <div className="admin-header">
          <div>
            <h1 className="page-title">Admin Dashboard</h1>
            <p className="page-subtitle">Logged in as {user.email}</p>
          </div>
          <div className="admin-stats">
            <div className="admin-stat"><span>{players.length}</span><small>Players</small></div>
            <div className="admin-stat"><span>{teams.length}</span><small>Teams</small></div>
          </div>
        </div>

        {message && (
          <div className={`admin-message ${message.type}`}>
            {message.text}
          </div>
        )}

        <div className="admin-tabs">
          <button className={`admin-tab ${tab === 'players' ? 'active' : ''}`} onClick={() => setTab('players')}>
            Players ({players.length})
          </button>
          <button className={`admin-tab ${tab === 'teams' ? 'active' : ''}`} onClick={() => setTab('teams')}>
            Teams ({teams.length})
          </button>
        </div>

        {tab === 'players' && (
          <div className="admin-section">
            <div className="admin-layout">
              <div className="admin-form-panel">
                <h3 className="form-title">{editingPlayer ? 'Edit Player' : 'Add Player'}</h3>
                <form className="admin-form" onSubmit={handlePlayerSubmit}>
                  <div className="form-group">
                    <label>Name *</label>
                    <input name="name" value={playerForm.name} onChange={handlePlayerFormChange} required placeholder="Juan Soto" />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Team</label>
                      <input name="team" value={playerForm.team} onChange={handlePlayerFormChange} placeholder="New York Yankees" />
                    </div>
                    <div className="form-group">
                      <label>Position</label>
                      <select name="position" value={playerForm.position} onChange={handlePlayerFormChange}>
                        <option value="">Select</option>
                        {['SP','RP','C','1B','2B','3B','SS','OF','DH','P'].map(p => <option key={p}>{p}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Number</label>
                    <input name="number" value={playerForm.number} onChange={handlePlayerFormChange} placeholder="22" />
                  </div>
                  <div className="form-group">
                    <label>Photo URL</label>
                    <input name="photo" value={playerForm.photo} onChange={handlePlayerFormChange} placeholder="https://..." />
                  </div>
                  <div className="form-group">
                    <label>Bio</label>
                    <textarea name="bio" value={playerForm.bio} onChange={handlePlayerFormChange} rows={2} placeholder="Player bio..." />
                  </div>
                  <div className="stats-fields">
                    <h4>Stats</h4>
                    <div className="stats-form-grid">
                      {['avg','hr','rbi','ops','hits','runs','sb','obp','slg'].map(stat => (
                        <div key={stat} className="form-group">
                          <label>{stat.toUpperCase()}</label>
                          <input name={`stats.${stat}`} value={playerForm.stats?.[stat] || ''} onChange={handlePlayerFormChange} placeholder="--" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="btn btn-primary">{editingPlayer ? 'Update Player' : 'Add Player'}</button>
                    <button type="button" className="btn btn-secondary" onClick={handleGeneratePlayer}>🎲 Generate</button>
                    {editingPlayer && (
                      <button type="button" className="btn btn-secondary" onClick={() => { setEditingPlayer(null); setPlayerForm(INITIAL_PLAYER); }}>
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>

              <div className="admin-list-panel">
                <h3 className="form-title">All Players ({players.length})</h3>
                <div className="admin-cards-grid">
                  {players.map(player => (
                    <PlayerCard
                      key={player.id}
                      player={player}
                      showActions={true}
                      onEdit={handleEditPlayer}
                      onDelete={handleDeletePlayer}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'teams' && (
          <div className="admin-section">
            <div className="admin-layout">
              <div className="admin-form-panel">
                <h3 className="form-title">{editingTeam ? 'Edit Team' : 'Add Team'}</h3>
                <form className="admin-form" onSubmit={handleTeamSubmit}>
                  <div className="form-group">
                    <label>Team Name *</label>
                    <input name="name" value={teamForm.name} onChange={handleTeamFormChange} required placeholder="New York Yankees" />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Short Name</label>
                      <input name="shortName" value={teamForm.shortName} onChange={handleTeamFormChange} placeholder="NYY" maxLength={4} />
                    </div>
                    <div className="form-group">
                      <label>City</label>
                      <input name="city" value={teamForm.city} onChange={handleTeamFormChange} placeholder="New York" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>League</label>
                      <select name="league" value={teamForm.league} onChange={handleTeamFormChange}>
                        <option value="AL">AL</option>
                        <option value="NL">NL</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Division</label>
                      <input name="division" value={teamForm.division} onChange={handleTeamFormChange} placeholder="AL East" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Stadium</label>
                    <input name="stadium" value={teamForm.stadium} onChange={handleTeamFormChange} placeholder="Yankee Stadium" />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Wins</label>
                      <input name="wins" type="number" value={teamForm.wins} onChange={handleTeamFormChange} min={0} />
                    </div>
                    <div className="form-group">
                      <label>Losses</label>
                      <input name="losses" type="number" value={teamForm.losses} onChange={handleTeamFormChange} min={0} />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Primary Color</label>
                      <input name="primaryColor" type="color" value={teamForm.primaryColor} onChange={handleTeamFormChange} />
                    </div>
                    <div className="form-group">
                      <label>Secondary Color</label>
                      <input name="secondaryColor" type="color" value={teamForm.secondaryColor} onChange={handleTeamFormChange} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea name="description" value={teamForm.description} onChange={handleTeamFormChange} rows={2} />
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="btn btn-primary">{editingTeam ? 'Update Team' : 'Add Team'}</button>
                    {editingTeam && (
                      <button type="button" className="btn btn-secondary" onClick={() => { setEditingTeam(null); setTeamForm(INITIAL_TEAM); }}>
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>

              <div className="admin-list-panel">
                <h3 className="form-title">All Teams ({teams.length})</h3>
                <div className="admin-cards-grid">
                  {teams.map(team => (
                    <TeamCard
                      key={team.id}
                      team={team}
                      showActions={true}
                      onEdit={handleEditTeam}
                      onDelete={handleDeleteTeam}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
