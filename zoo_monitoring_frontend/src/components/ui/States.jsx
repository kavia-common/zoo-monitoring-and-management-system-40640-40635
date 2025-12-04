import React from 'react';

/**
 * Reusable UI state components and utilities for consistent UX scaffolding.
 * - Loading: shows a spinner and optional message
 * - Empty: shows an empty state with action
 * - ErrorState: shows an error message with retry button
 * - Toaster: minimal toast manager
 */

// PUBLIC_INTERFACE
export function Loading({ message = 'Loading…', inline = false }) {
  /** Loading indicator with optional inline style */
  return (
    <div
      className={inline ? '' : 'card'}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: inline ? 0 : 16,
      }}
      role="status"
      aria-live="polite"
    >
      <span
        aria-hidden="true"
        style={{
          width: 16,
          height: 16,
          borderRadius: '50%',
          border: '2px solid rgba(30,58,138,0.25)',
          borderTopColor: 'var(--color-primary)',
          animation: 'spin 0.8s linear infinite',
        }}
      />
      <span>{message}</span>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0) }
          100% { transform: rotate(360deg) }
        }
      `}</style>
    </div>
  );
}

// PUBLIC_INTERFACE
export function Empty({ title = 'No data', description = 'Nothing to show here yet.', actionLabel, onAction }) {
  /** Empty state with optional primary action */
  return (
    <div className="card" role="status" aria-live="polite" style={{ textAlign: 'center' }}>
      <div
        aria-hidden="true"
        style={{
          width: 48,
          height: 48,
          borderRadius: 12,
          margin: '0 auto 8px',
          background: 'linear-gradient(135deg, rgba(30,58,138,.1), rgba(245,158,11,.1))',
          display: 'grid',
          placeItems: 'center',
          color: 'var(--color-primary)',
          fontWeight: 800,
        }}
      >
        ∅
      </div>
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      <p style={{ marginTop: 4, color: '#6b7280' }}>{description}</p>
      {actionLabel && onAction && (
        <button className="btn mt-16" onClick={onAction}>{actionLabel}</button>
      )}
    </div>
  );
}

// PUBLIC_INTERFACE
export function ErrorState({ title = 'Something went wrong', error, onRetry }) {
  /** Error state with optional retry */
  return (
    <div className="card" role="alert" aria-live="assertive" style={{ borderColor: 'rgba(220,38,38,.25)' }}>
      <div className="row" style={{ color: 'var(--color-error)', fontWeight: 600 }}>
        <span aria-hidden="true">⚠</span>
        <span>{title}</span>
      </div>
      {error && (
        <pre style={{ background: '#fef2f2', padding: 12, borderRadius: 8, overflowX: 'auto', color: '#7f1d1d' }}>
          {String(error)}
        </pre>
      )}
      {onRetry && (
        <button className="btn error" onClick={onRetry}>Retry</button>
      )}
    </div>
  );
}

/**
 * Minimalistic global Toaster
 * Usage:
 *  import { Toaster, toast } from './States';
 *  <Toaster /> at app root once
 *  toast.success('Saved'); toast.error('Failed');
 */
const listeners = new Set();
let idCounter = 1;

function emit(action) {
  listeners.forEach((l) => l(action));
}

export const toast = {
  // PUBLIC_INTERFACE
  success(message) {
    emit({ type: 'add', toast: { id: idCounter++, kind: 'success', message } });
  },
  // PUBLIC_INTERFACE
  error(message) {
    emit({ type: 'add', toast: { id: idCounter++, kind: 'error', message } });
  },
  // PUBLIC_INTERFACE
  info(message) {
    emit({ type: 'add', toast: { id: idCounter++, kind: 'info', message } });
  },
};

// PUBLIC_INTERFACE
export function Toaster() {
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    const listener = (action) => {
      if (action.type === 'add') {
        setItems((prev) => [...prev, action.toast]);
        // auto remove
        setTimeout(() => {
          setItems((prev) => prev.filter((t) => t.id !== action.toast.id));
        }, 3000);
      } else if (action.type === 'remove') {
        setItems((prev) => prev.filter((t) => t.id !== action.id));
      }
    };
    listeners.add(listener);
    return () => listeners.delete(listener);
  }, []);

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      style={{
        position: 'fixed',
        right: 16,
        bottom: 16,
        display: 'grid',
        gap: 8,
        zIndex: 2000,
      }}
    >
      {items.map((t) => (
        <div
          key={t.id}
          className="card"
          style={{
            minWidth: 220,
            background: t.kind === 'error' ? '#fef2f2' : t.kind === 'success' ? '#ecfdf5' : '#eff6ff',
            border: `1px solid ${
              t.kind === 'error' ? 'rgba(220,38,38,.25)' : t.kind === 'success' ? 'rgba(5,150,105,.25)' : 'rgba(30,64,175,.25)'
            }`,
          }}
        >
          <div className="row" style={{ color: t.kind === 'error' ? '#991b1b' : t.kind === 'success' ? '#065f46' : '#1e40af' }}>
            <span aria-hidden="true">{t.kind === 'error' ? '⛔' : t.kind === 'success' ? '✅' : 'ℹ️'}</span>
            <span>{t.message}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
