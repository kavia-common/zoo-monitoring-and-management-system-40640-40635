import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function NotFound() {
  return (
    <div className="card" style={{ margin: '40px auto', maxWidth: 560 }}>
      <h2 style={{ marginTop: 0 }}>Page not found</h2>
      <p>The page you are looking for doesn’t exist.</p>
      <Link to="/dashboard" className="btn">Back to Dashboard</Link>
    </div>
  );
}
