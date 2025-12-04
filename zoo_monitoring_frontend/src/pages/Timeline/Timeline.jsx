import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Loading, Empty, ErrorState } from '../../components/ui/States';
import useOnlineStatus from '../../hooks/useOnlineStatus';

// PUBLIC_INTERFACE
export default function Timeline() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const online = useOnlineStatus();

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setErr(null);
    const t = setTimeout(() => {
      if (cancelled) return;
      if (!online) {
        setErr('Offline: cannot load timeline.');
        setLoading(false);
        return;
      }
      setItems(
        Array.from({ length: 8 }, (_, i) => ({
          id: i + 1,
          ts: dayjs().subtract(i * 3, 'hour').format('YYYY-MM-DD HH:mm'),
          text: i % 2 === 0 ? 'Feeding event' : 'Movement spike',
        }))
      );
      setLoading(false);
    }, 450);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [online]);

  if (loading) return <Loading message="Loading timeline…" />;
  if (err) return <ErrorState error={err} onRetry={() => { setErr(null); setLoading(true); }} />;
  if (!items.length) return <Empty title="No events" description="There are no events in the selected time range." />;

  return (
    <div>
      <h2>Timeline</h2>
      <div className="card mt-16">
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {items.map((e) => (
            <li key={e.id} className="row" style={{ padding: '10px 0', borderBottom: '1px solid rgba(17,24,39,0.06)' }}>
              <span className="badge">{e.ts}</span>
              <span>{e.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
