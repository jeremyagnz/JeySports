import { Link } from 'react-router-dom';
import './PlayerCard.css';

export default function PlayerCard({ player, onEdit, onDelete, showActions = false }) {
  const initials = player.name.split(' ').map(n => n[0]).join('').substring(0, 2);

  return (
    <div className="player-card">
      <div className="player-card-photo">
        {player.photo ? (
          <img src={player.photo} alt={player.name} onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }} />
        ) : null}
        <div className="player-card-initials" style={{ display: player.photo ? 'none' : 'flex' }}>
          {initials}
        </div>
        <span className="player-card-position">{player.position}</span>
      </div>

      <div className="player-card-body">
        <h3 className="player-card-name">{player.name}</h3>
        <p className="player-card-team">{player.team}</p>

        <div className="player-card-stats">
          <div className="stat-item">
            <span className="stat-value">{player.stats?.avg || '.---'}</span>
            <span className="stat-label">AVG</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{player.stats?.hr ?? '--'}</span>
            <span className="stat-label">HR</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{player.stats?.rbi ?? '--'}</span>
            <span className="stat-label">RBI</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{player.stats?.ops || '.---'}</span>
            <span className="stat-label">OPS</span>
          </div>
        </div>

        {showActions && (
          <div className="player-card-actions">
            <button className="btn btn-secondary btn-sm" onClick={() => onEdit && onEdit(player)}>Edit</button>
            <button className="btn btn-danger btn-sm" onClick={() => onDelete && onDelete(player.id)}>Delete</button>
          </div>
        )}
      </div>
    </div>
  );
}
