import { Outlet, useLocation } from 'react-router-dom';
import TopBar from '../components/TopBar';
import SideNav from '../components/SideNav';

// PUBLIC_INTERFACE
export default function MainLayout() {
  const location = useLocation();

  return (
    <div className="app-shell" data-testid="app-shell">
      <header className="topbar">
        <TopBar />
      </header>
      <aside className="sidenav">
        <SideNav currentPath={location.pathname} />
      </aside>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
