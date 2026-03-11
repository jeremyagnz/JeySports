import './StatsPanel.css';

export default function StatsPanel({ player }) {
  const stats = player?.stats || {};

  const statRows = [
    { label: 'Batting Average', value: stats.avg, key: 'avg' },
    { label: 'Home Runs', value: stats.hr, key: 'hr' },
    { label: 'RBI', value: stats.rbi, key: 'rbi' },
    { label: 'OPS', value: stats.ops, key: 'ops' },
    { label: 'Hits', value: stats.hits, key: 'hits' },
    { label: 'Runs', value: stats.runs, key: 'runs' },
    { label: 'Stolen Bases', value: stats.sb, key: 'sb' },
    { label: 'On-Base %', value: stats.obp, key: 'obp' },
    { label: 'Slugging %', value: stats.slg, key: 'slg' },
  ];

  return (
    <div className="stats-panel">
      <h3 className="stats-panel-title">Season Stats</h3>
      <div className="stats-grid">
        {statRows.map(stat => (
          <div key={stat.key} className="stats-row">
            <span className="stats-label">{stat.label}</span>
            <span className="stats-value">{stat.value ?? '--'}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
