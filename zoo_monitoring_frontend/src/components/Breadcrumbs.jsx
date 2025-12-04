import { Link, useLocation } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function Breadcrumbs() {
  const { pathname } = useLocation();
  const parts = pathname.split('/').filter(Boolean);

  const crumbs = [
    { label: 'Home', to: '/' },
    ...parts.map((p, idx) => ({
      label: p.charAt(0).toUpperCase() + p.slice(1),
      to: '/' + parts.slice(0, idx + 1).join('/'),
    })),
  ];

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      {crumbs.map((c, idx) => (
        <span key={c.to}>
          {idx > 0 && <span aria-hidden="true" style={{ margin: '0 6px' }}>/</span>}
          <Link to={c.to} style={{ color: idx === crumbs.length - 1 ? '#111827' : '#6b7280', textDecoration: 'none' }}>
            {c.label}
          </Link>
        </span>
      ))}
    </nav>
  );
}
