import dayjs from 'dayjs';

// PUBLIC_INTERFACE
export default function Timeline() {
  const items = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    ts: dayjs().subtract(i * 3, 'hour').format('YYYY-MM-DD HH:mm'),
    text: i % 2 === 0 ? 'Feeding event' : 'Movement spike',
  }));

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
