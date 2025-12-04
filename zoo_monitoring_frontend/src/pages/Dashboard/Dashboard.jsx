import { useMemo } from 'react';

// PUBLIC_INTERFACE
export default function Dashboard() {
  const stats = useMemo(() => ([
    { label: 'Activity score', value: '82', trend: '+4%' },
    { label: 'Feeding events', value: '12', trend: '-1' },
    { label: 'Sensor uptime', value: '99.3%', trend: '+0.1%' },
  ]), []);

  return (
    <div>
      <h2>Giant Anteater Dashboard</h2>
      <div className="grid-3 mt-16">
        {stats.map((s) => (
          <div key={s.label} className="card">
            <div style={{ color: '#6b7280', fontSize: 13 }}>{s.label}</div>
            <div style={{ fontSize: 28, fontWeight: 700 }}>{s.value}</div>
            <div className="badge" style={{ marginTop: 8 }}>{s.trend}</div>
          </div>
        ))}
      </div>

      <div className="grid-2 mt-24">
        <div className="card" style={{ minHeight: 240 }}>
          <h3 style={{ marginTop: 0 }}>Activity Timeline</h3>
          <div style={{ color: '#6b7280' }}>[Chart placeholder]</div>
        </div>
        <div className="card" style={{ minHeight: 240 }}>
          <h3 style={{ marginTop: 0 }}>Health Indicators</h3>
          <div style={{ color: '#6b7280' }}>[Chart placeholder]</div>
        </div>
      </div>
    </div>
  );
}
