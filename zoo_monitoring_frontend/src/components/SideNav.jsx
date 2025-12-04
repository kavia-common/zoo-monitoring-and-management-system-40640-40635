import { NavLink } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function SideNav({ currentPath }) {
  const links = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/animals', label: 'Animals' },
    { to: '/timeline', label: 'Timeline' },
    { to: '/reports', label: 'Reports' },
    { to: '/chat', label: 'Chat' },
  ];

  return (
    <nav aria-label="Primary">
      {links.map((l) => (
        <NavLink
          key={l.to}
          to={l.to}
          className={({ isActive }) =>
            `nav-item ${isActive || currentPath === l.to ? 'active' : ''}`
          }
        >
          <span aria-hidden="true">•</span>
          <span>{l.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
