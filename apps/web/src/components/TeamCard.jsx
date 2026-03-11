import './TeamCard.css';

export default function TeamCard({ team, onEdit, onDelete, showActions = false }) {
  const winPct = ((team.wins / (team.wins + team.losses)) * 100).toFixed(1);

  return (
    <div className="team-card">
      <div className="team-card-header" style={{ background: `linear-gradient(135deg, ${team.primaryColor}22 0%, transparent 100%)`, borderTop: `3px solid ${team.primaryColor}` }}>
        <div className="team-logo">{team.logo || '⚾'}</div>
        <div className="team-info">
          <h3 className="team-name">{team.name}</h3>
          <p className="team-meta">{team.division} · {team.stadium}</p>
        </div>
        <span className="team-badge">{team.shortName}</span>
      </div>

      <div className="team-card-body">
        <div className="team-record">
          <div className="record-item">
            <span className="record-value" style={{ color: '#68D391' }}>{team.wins}</span>
            <span className="record-label">Wins</span>
          </div>
          <div className="record-divider" />
          <div className="record-item">
            <span className="record-value" style={{ color: '#FC8181' }}>{team.losses}</span>
            <span className="record-label">Losses</span>
          </div>
          <div className="record-divider" />
          <div className="record-item">
            <span className="record-value">{winPct}%</span>
            <span className="record-label">Win %</span>
          </div>
        </div>

        {team.description && (
          <p className="team-description">{team.description}</p>
        )}

        {showActions && (
          <div className="team-card-actions">
            <button className="btn btn-secondary btn-sm" onClick={() => onEdit && onEdit(team)}>Edit</button>
            <button className="btn btn-danger btn-sm" onClick={() => onDelete && onDelete(team.id)}>Delete</button>
          </div>
        )}
      </div>
    </div>
  );
}
