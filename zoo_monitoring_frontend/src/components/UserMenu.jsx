import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function UserMenu() {
  return (
    <div className="row">
      <div
        aria-label="User avatar"
        style={{
          width: 28,
          height: 28,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
          boxShadow: '0 0 0 2px rgba(30,58,138,0.15)',
        }}
      />
      <Link to="/login" className="btn ghost">Sign out</Link>
    </div>
  );
}
