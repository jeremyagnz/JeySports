import { useState, useEffect } from 'react';
import GameCard from '../components/GameCard';
import { dataService } from '../services/dataService';
import './SchedulePage.css';

export default function SchedulePage() {
  const [games, setGames] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dataService.getGames().then(data => {
      setGames(data);
      setLoading(false);
    });
  }, []);

  const filtered = games.filter(g => {
    if (filter === 'upcoming') return g.status === 'upcoming';
    if (filter === 'final') return g.status === 'final';
    return true;
  });

  const grouped = filtered.reduce((acc, game) => {
    const date = game.date;
    if (!acc[date]) acc[date] = [];
    acc[date].push(game);
    return acc;
  }, {});

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="schedule-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Schedule</h1>
          <p className="page-subtitle">{games.length} games</p>
        </div>

        <div className="schedule-filters">
          {['all', 'upcoming', 'final'].map(f => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f === 'all' ? 'All Games' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b)).map(([date, dayGames]) => (
          <div key={date} className="schedule-day">
            <h3 className="schedule-date">
              {new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </h3>
            <div className="grid-3">
              {dayGames.map(game => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </div>
        ))}

        {Object.keys(grouped).length === 0 && (
          <p style={{ color: 'var(--color-gray-dark)', textAlign: 'center', padding: '3rem' }}>
            No games found.
          </p>
        )}
      </div>
    </div>
  );
}
