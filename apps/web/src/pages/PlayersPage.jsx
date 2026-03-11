import { useState, useEffect } from 'react';
import PlayerCard from '../components/PlayerCard';
import StatsPanel from '../components/StatsPanel';
import { dataService } from '../services/dataService';
import './PlayersPage.css';

export default function PlayersPage() {
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [search, setSearch] = useState('');
  const [positionFilter, setPositionFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dataService.getPlayers().then(data => {
      setPlayers(data);
      setSelectedPlayer(data[0] || null);
      setLoading(false);
    });
  }, []);

  const positions = ['All', ...new Set(players.map(p => p.position))];
  const filtered = players.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.team.toLowerCase().includes(search.toLowerCase());
    const matchPos = positionFilter === 'All' || p.position === positionFilter;
    return matchSearch && matchPos;
  });

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="players-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Players</h1>
          <p className="page-subtitle">{players.length} players in the database</p>
        </div>

        <div className="players-filters">
          <input
            className="search-input"
            type="text"
            placeholder="🔍 Search players..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <div className="position-filters">
            {positions.map(pos => (
              <button
                key={pos}
                className={`position-btn ${positionFilter === pos ? 'active' : ''}`}
                onClick={() => setPositionFilter(pos)}
              >
                {pos}
              </button>
            ))}
          </div>
        </div>

        <div className="players-layout">
          <div className="players-grid">
            {filtered.map(player => (
              <div
                key={player.id}
                className={`player-card-wrapper ${selectedPlayer?.id === player.id ? 'selected' : ''}`}
                onClick={() => setSelectedPlayer(player)}
              >
                <PlayerCard player={player} />
              </div>
            ))}
            {filtered.length === 0 && (
              <p className="no-results">No players found matching your search.</p>
            )}
          </div>

          {selectedPlayer && (
            <div className="player-detail">
              <div className="player-detail-card">
                <div className="player-detail-header">
                  <div className="player-detail-photo">
                    {selectedPlayer.photo ? (
                      <img src={selectedPlayer.photo} alt={selectedPlayer.name} />
                    ) : (
                      <div className="player-detail-initials">
                        {selectedPlayer.name.split(' ').map(n => n[0]).join('').substring(0,2)}
                      </div>
                    )}
                  </div>
                  <div>
                    <h2 className="player-detail-name">{selectedPlayer.name}</h2>
                    <p className="player-detail-info">
                      <span className="badge badge-red">{selectedPlayer.position}</span>
                      <span style={{ color: 'var(--color-gray)' }}>{selectedPlayer.team}</span>
                      {selectedPlayer.number && <span style={{ color: 'var(--color-gray-dark)' }}>#{selectedPlayer.number}</span>}
                    </p>
                    {selectedPlayer.bio && <p className="player-detail-bio">{selectedPlayer.bio}</p>}
                  </div>
                </div>
                <StatsPanel player={selectedPlayer} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
