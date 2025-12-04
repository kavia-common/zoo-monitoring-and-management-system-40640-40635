import { useEffect, useState } from 'react';
import { Loading, Empty, ErrorState } from '../../components/ui/States';
import useOnlineStatus from '../../hooks/useOnlineStatus';

// PUBLIC_INTERFACE
export default function AnimalsList() {
  const [animals, setAnimals] = useState([]);
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
        setErr('Offline: cannot load animals.');
        setLoading(false);
        return;
      }
      // mock data
      setAnimals([
        { id: 1, name: 'Giant Anteater', status: 'Monitored', enclosure: 'Savannah 2' },
        { id: 2, name: 'African Elephant', status: 'Stable', enclosure: 'Savannah 1' },
        { id: 3, name: 'Snow Leopard', status: 'Observation', enclosure: 'Mountain 3' },
      ]);
      setLoading(false);
    }, 500);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [online]);

  if (loading) return <Loading message="Loading animals…" />;
  if (err) return <ErrorState error={err} onRetry={() => { setErr(null); setLoading(true); }} />;
  if (!animals.length) return <Empty title="No animals found" description="Try adjusting filters or check back later." />;

  return (
    <div>
      <h2>Animals</h2>
      <div className="card mt-16">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Enclosure</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {animals.map((a) => (
              <tr key={a.id}>
                <td>{a.name}</td>
                <td>{a.enclosure}</td>
                <td><span className="badge">{a.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
