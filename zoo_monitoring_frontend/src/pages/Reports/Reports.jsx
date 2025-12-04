import dayjs from 'dayjs';

// PUBLIC_INTERFACE
export default function Reports() {
  const reports = [
    { id: 1, title: 'Weekly Health Summary', date: dayjs().subtract(2, 'day').format('YYYY-MM-DD') },
    { id: 2, title: 'Behavior Analysis', date: dayjs().subtract(8, 'day').format('YYYY-MM-DD') },
  ];

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
              <button className="btn">Open</button>
              <button className="btn secondary">Download</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
