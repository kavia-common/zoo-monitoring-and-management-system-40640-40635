import { Outlet, useLocation } from 'react-router-dom';
import TopBar from '../components/TopBar';
import SideNav from '../components/SideNav';
import React from 'react';
import { useLastView } from '../store/uiState';

// PUBLIC_INTERFACE
export default function MainLayout() {
  const location = useLocation();
  const [__, setLastView] = useLastView();

  React.useEffect(() => {
    setLastView(location.pathname || '/dashboard');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

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
