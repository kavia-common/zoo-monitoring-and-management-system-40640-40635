import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Loading, Empty, ErrorState, toast } from '../../components/ui/States';
import useOnlineStatus from '../../hooks/useOnlineStatus';

// PUBLIC_INTERFACE
export default function Reports() {
  const [reports, setReports] = useState([]);
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
        setErr('Offline: cannot load reports.');
        setLoading(false);
        return;
      }
      setReports([
        { id: 1, title: 'Weekly Health Summary', date: dayjs().subtract(2, 'day').format('YYYY-MM-DD') },
        { id: 2, title: 'Behavior Analysis', date: dayjs().subtract(8, 'day').format('YYYY-MM-DD') },
      ]);
      setLoading(false);
    }, 420);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [online]);

  if (loading) return <Loading message="Loading reports…" />;
  if (err) return <ErrorState error={err} onRetry={() => { setErr(null); setLoading(true); }} />;
  if (!reports.length) return <Empty title="No reports" description="No reports available for the selected range." />;

  const open = (r) => toast.info(`Opening ${r.title}…`);
  const download = (r) => toast.success(`Downloading ${r.title}…`);

  return (
    <div>
      <h2>Reports</h2>
      <div className="grid-2 mt-16">
        {reports.map((r) => (
          <div key={r.id} className="card">
            <div className="row" style={{ justifyContent: 'space-between' }}>
              <strong>{r.title}</strong>
              <span className="badge">{r.date}</span>
            </div>
            <div style={{ color: '#6b7280', marginTop: 8 }}>
              Preview: [PDF/Image placeholder]
            </div>
            <div className="row mt-16">
              <button className="btn" onClick={() => open(r)}>Open</button>
              <button className="btn secondary" onClick={() => download(r)}>Download</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
