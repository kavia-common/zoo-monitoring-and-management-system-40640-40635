import useOnlineStatus from '../hooks/useOnlineStatus';

// PUBLIC_INTERFACE
export default function OfflineBanner() {
  /** Displays a sticky banner when offline */
  const online = useOnlineStatus();

  if (online) return null;
  return (
    <div
      role="status"
      aria-live="assertive"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1200,
        background: '#fff7ed',
        color: '#9a3412',
        borderBottom: '1px solid rgba(194,65,12,.25)',
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}
    >
      <span aria-hidden="true">📴</span>
      <strong>Offline mode</strong>
      <span style={{ marginLeft: 6 }}>Some features may be unavailable.</span>
    </div>
  );
}
