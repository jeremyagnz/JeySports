import { useState, useEffect } from 'react';
import { dataService } from '../services/dataService';
import './StandingsPage.css';

export default function StandingsPage() {
  const [standings, setStandings] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dataService.getStandings().then(data => {
      setStandings(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="standings-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Standings</h1>
          <p className="page-subtitle">2025 MLB Season</p>
        </div>

        <div className="standings-divisions">
          {Object.entries(standings).map(([division, teams]) => (
            <div key={division} className="standings-division-block">
              <h2 className="division-title">{division}</h2>
              <div className="standings-full-table">
                <table>
                  <thead>
                    <tr>
                      <th className="team-col">Team</th>
                      <th>W</th>
                      <th>L</th>
                      <th>PCT</th>
                      <th>GB</th>
                      <th>Streak</th>
                      <th>L10</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teams.map((team, index) => (
                      <tr key={team.teamId} className={index === 0 ? 'division-leader' : ''}>
                        <td className="team-col">
                          {index === 0 && <span className="leader-indicator">★</span>}
                          <span className="team-full">{team.team}</span>
                          <span className="team-short">{team.shortName}</span>
                        </td>
                        <td className="wins-col">{team.wins}</td>
                        <td className="losses-col">{team.losses}</td>
                        <td>{team.pct}</td>
                        <td>{team.gb}</td>
                        <td>
                          <span className={`streak-badge ${team.streak.startsWith('W') ? 'win' : 'loss'}`}>
                            {team.streak}
                          </span>
                        </td>
                        <td>{team.last10}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
