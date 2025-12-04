import { useEffect, useState } from 'react';
import { Loading, Empty, ErrorState } from '../../components/ui/States';
import useOnlineStatus from '../../hooks/useOnlineStatus';

// PUBLIC_INTERFACE
export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [stats, setStats] = useState([]);
  const online = useOnlineStatus();

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setErr(null);
    // Simulate async fetch with possible empty/error states
    const t = setTimeout(() => {
      if (cancelled) return;
      if (!online) {
        setErr('Cannot fetch dashboard while offline.');
        setLoading(false);
        return;
      }
      // Mock success with data
      setStats([
        { label: 'Activity score', value: '82', trend: '+4%' },
        { label: 'Feeding events', value: '12', trend: '-1' },
        { label: 'Sensor uptime', value: '99.3%', trend: '+0.1%' },
      ]);
      setLoading(false);
    }, 400);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [online]);

  if (loading) return <Loading message="Loading dashboard…" />;
  if (err) return <ErrorState error={err} onRetry={() => { setErr(null); setLoading(true); }} />;
  if (!stats.length) return <Empty title="No stats" description="No dashboard metrics available for the selected range." />;

  // No hooks below conditional returns. Use a simple derived variable.
  const cards = stats;

  return (
    <div>
      <h2>Giant Anteater Dashboard</h2>
      <div className="grid-3 mt-16">
        {cards.map((s) => (
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
