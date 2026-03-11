import { useState, useEffect } from 'react';
import TeamCard from '../components/TeamCard';
import PlayerCard from '../components/PlayerCard';
import { dataService } from '../services/dataService';
import './TeamsPage.css';

export default function TeamsPage() {
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([dataService.getTeams(), dataService.getPlayers()]).then(([t, p]) => {
      setTeams(t);
      setPlayers(p);
      setSelectedTeam(null);
      setLoading(false);
    });
  }, []);

  const filtered = teams.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.division.toLowerCase().includes(search.toLowerCase())
  );

  const teamRoster = selectedTeam
    ? players.filter(p => p.teamId === selectedTeam.id)
    : [];

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="teams-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Teams</h1>
          <p className="page-subtitle">{teams.length} teams</p>
        </div>

        <input
          className="search-input"
          type="text"
          placeholder="🔍 Search teams..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ marginBottom: '1.5rem' }}
        />

        {selectedTeam ? (
          <div className="team-detail">
            <button className="btn btn-secondary back-btn" onClick={() => setSelectedTeam(null)}>
              ← Back to Teams
            </button>
            <div className="team-detail-header" style={{ borderTop: `4px solid ${selectedTeam.primaryColor}` }}>
              <div className="team-detail-logo">{selectedTeam.logo}</div>
              <div>
                <h2 className="team-detail-name">{selectedTeam.name}</h2>
                <p className="team-detail-meta">
                  <span className="badge badge-blue">{selectedTeam.league}</span>
                  <span style={{ color: 'var(--color-gray)' }}>{selectedTeam.division}</span>
                  <span style={{ color: 'var(--color-gray-dark)' }}>🏟 {selectedTeam.stadium}</span>
                </p>
                <div className="team-detail-record">
                  <span style={{ color: '#68D391' }}>{selectedTeam.wins}W</span>
                  <span style={{ color: 'var(--color-gray-dark)' }}>-</span>
                  <span style={{ color: '#FC8181' }}>{selectedTeam.losses}L</span>
                </div>
                {selectedTeam.description && <p className="team-detail-desc">{selectedTeam.description}</p>}
              </div>
            </div>

            <h3 className="section-title">Team Roster</h3>
            {teamRoster.length > 0 ? (
              <div className="grid-4">
                {teamRoster.map(player => (
                  <PlayerCard key={player.id} player={player} />
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--color-gray-dark)' }}>No players found for this team in the database.</p>
            )}
          </div>
        ) : (
          <div className="grid-3">
            {filtered.map(team => (
              <div key={team.id} className="team-card-wrapper" onClick={() => setSelectedTeam(team)}>
                <TeamCard team={team} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
