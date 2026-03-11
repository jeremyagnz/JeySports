import './GameCard.css';

export default function GameCard({ game }) {
  const isUpcoming = game.status === 'upcoming';
  const isFinal = game.status === 'final';

  return (
    <div className={`game-card ${game.status}`}>
      <div className="game-card-header">
        <span className={`game-status-badge ${isFinal ? 'final' : 'upcoming'}`}>
          {isFinal ? 'Final' : 'Upcoming'}
        </span>
        <span className="game-tv">{game.tv}</span>
      </div>

      <div className="game-teams">
        <div className="game-team away">
          <span className="team-name-short">{game.awayTeam}</span>
          {isFinal && <span className="game-score">{game.awayScore}</span>}
        </div>
        <div className="game-vs">
          {isUpcoming ? <span>VS</span> : <span>@</span>}
        </div>
        <div className="game-team home">
          {isFinal && <span className="game-score">{game.homeScore}</span>}
          <span className="team-name-short">{game.homeTeam}</span>
        </div>
      </div>

      <div className="game-card-footer">
        <span className="game-date">📅 {new Date(game.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
        {isUpcoming && <span className="game-time">🕐 {game.time}</span>}
        <span className="game-venue">🏟 {game.venue}</span>
      </div>
    </div>
  );
}
