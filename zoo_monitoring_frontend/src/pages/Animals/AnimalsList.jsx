import { useMemo } from 'react';

// PUBLIC_INTERFACE
export default function AnimalsList() {
  const animals = useMemo(() => ([
    { id: 1, name: 'Giant Anteater', status: 'Monitored', enclosure: 'Savannah 2' },
    { id: 2, name: 'African Elephant', status: 'Stable', enclosure: 'Savannah 1' },
    { id: 3, name: 'Snow Leopard', status: 'Observation', enclosure: 'Mountain 3' },
  ]), []);

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
