import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PlayerCard from '../components/PlayerCard';
import GameCard from '../components/GameCard';
import { dataService } from '../services/dataService';
import './HomePage.css';

export default function HomePage() {
  const [players, setPlayers] = useState([]);
  const [games, setGames] = useState([]);
  const [standings, setStandings] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [p, g, s] = await Promise.all([
          dataService.getPlayers(),
          dataService.getGames(),
          dataService.getStandings(),
        ]);
        setPlayers(p.slice(0, 4));
        setGames(g.filter(g => g.status === 'upcoming').slice(0, 3));
        setStandings(s);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  const topDivisions = Object.entries(standings).slice(0, 2);

  return (
    <div className="home-page">
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">⚾ 2025 MLB Season</div>
            <h1 className="hero-title">
              Baseball<br /><span>Like Never Before</span>
            </h1>
            <p className="hero-subtitle">
              Your complete baseball hub — live scores, player stats, team standings, and more.
            </p>
            <div className="hero-actions">
              <Link to="/players" className="btn btn-primary">View Players</Link>
              <Link to="/schedule" className="btn btn-secondary">See Schedule</Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-ball">⚾</div>
          </div>
        </div>
      </section>

      <div className="container home-content">
        {/* Upcoming Games */}
        <section className="home-section">
          <div className="section-header">
            <h2 className="section-title">Upcoming Games</h2>
            <Link to="/schedule" className="see-all">See All →</Link>
          </div>
          <div className="grid-3">
            {games.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </section>

        {/* Featured Players */}
        <section className="home-section">
          <div className="section-header">
            <h2 className="section-title">Featured Players</h2>
            <Link to="/players" className="see-all">See All →</Link>
          </div>
          <div className="grid-4">
            {players.map(player => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        </section>

        {/* Standings Preview */}
        <section className="home-section">
          <div className="section-header">
            <h2 className="section-title">Standings</h2>
            <Link to="/standings" className="see-all">See All →</Link>
          </div>
          <div className="grid-2">
            {topDivisions.map(([division, teams]) => (
              <div key={division} className="standings-preview">
                <h3 className="standings-division">{division}</h3>
                <table className="standings-table">
                  <thead>
                    <tr>
                      <th>Team</th>
                      <th>W</th>
                      <th>L</th>
                      <th>PCT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teams.map((team, i) => (
                      <tr key={team.teamId} className={i === 0 ? 'leader' : ''}>
                        <td>{team.shortName}</td>
                        <td>{team.wins}</td>
                        <td>{team.losses}</td>
                        <td>{team.pct}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
