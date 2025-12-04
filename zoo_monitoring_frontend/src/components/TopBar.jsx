import React from 'react';
import Breadcrumbs from './Breadcrumbs';
import DateRangePicker from './DateRangePicker';
import UserMenu from './UserMenu';
import HealthcheckStatus from './HealthcheckStatus';
import EnvDebug from './EnvDebug';
import { getEnv } from '../services/config';

/**
 * PUBLIC_INTERFACE
 * TopBar shows brand, breadcrumbs, date range selector, health status, and user menu.
 * In development builds, provides a small "Env" link to open a debug panel.
 * Breadcrumbs and DateRangePicker are wired to global UI state.
 */
export default function TopBar() {
  const [openDebug, setOpenDebug] = React.useState(false);
  const { nodeEnv } = getEnv();
  const isDev = (nodeEnv || process.env.NODE_ENV || 'development') === 'development';

  return (
    <>
      <div className="brand" aria-label="VizAI brand">
        <span className="dot" />
        <span>VizAI</span>
      </div>
      <div className="spacer" />
      <div className="row" style={{ gap: 16 }}>
        <Breadcrumbs />
        <DateRangePicker />
        <HealthcheckStatus />
        {isDev && (
          <button
            className="btn ghost"
            title="Open environment debug (development only)"
            onClick={() => setOpenDebug(true)}
            style={{ padding: '6px 10px' }}
          >
            Env
          </button>
        )}
        <UserMenu />
      </div>
      {isDev && openDebug && <EnvDebug onClose={() => setOpenDebug(false)} />}
    </>
  );
}
