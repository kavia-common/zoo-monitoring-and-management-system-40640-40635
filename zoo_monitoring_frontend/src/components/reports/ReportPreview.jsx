import React from 'react';
import dayjs from 'dayjs';

/**
 * PUBLIC_INTERFACE
 * ReportPreview renders a printable preview of the report with current filters.
 * Props:
 * - title: string - report title
 * - dateRange: { preset: string, from: string, to: string }
 * - behaviors: string[] - selected behavior categories
 * - options: { includeCharts?: boolean, includeNotes?: boolean, includeDetails?: boolean }
 * - summaryData?: { key: string, value: string|number }[] - optional summary pairs to render
 */
export default function ReportPreview({
  title = 'Report Preview',
  dateRange,
  behaviors = [],
  options = { includeCharts: true, includeNotes: true, includeDetails: false },
  summaryData = [],
}) {
  const { from, to, preset } = dateRange || {};
  const dateDisplay = from && to
    ? `${from} → ${to}`
    : preset
    ? preset
    : `${dayjs().subtract(7, 'day').format('YYYY-MM-DD')} → ${dayjs().format('YYYY-MM-DD')}`;

  return (
    <section
      id="report-print-area"
      className="card"
      style={{
        background: 'white',
        color: '#111827',
      }}
    >
      <header className="row" style={{ justifyContent: 'space-between' }}>
        <div>
          <div className="brand" style={{ marginBottom: 4 }}>
            <span className="dot" />
            <span>VizAI</span>
          </div>
          <h2 style={{ margin: 0 }}>{title}</h2>
          <div style={{ color: '#6b7280', fontSize: 13, marginTop: 4 }}>
            Date range: <strong>{dateDisplay}</strong>
          </div>
          <div style={{ color: '#6b7280', fontSize: 13, marginTop: 4 }}>
            Behaviors: <strong>{behaviors.length ? behaviors.join(', ') : 'All'}</strong>
          </div>
        </div>
        <div className="badge" title="Preview mode">Preview</div>
      </header>

      {summaryData && summaryData.length > 0 && (
        <div className="mt-16">
          <h3 style={{ marginTop: 0 }}>Summary</h3>
          <div className="grid-3">
            {summaryData.map((s) => (
              <div key={s.key} className="card" style={{ padding: 12 }}>
                <div style={{ color: '#6b7280', fontSize: 13 }}>{s.key}</div>
                <div style={{ fontSize: 22, fontWeight: 700 }}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {options?.includeCharts && (
        <div className="mt-16">
          <h3 style={{ marginTop: 0 }}>Visuals</h3>
          <div
            className="card"
            style={{
              minHeight: 120,
              background:
                'repeating-linear-gradient(45deg, rgba(30,58,138,.05), rgba(30,58,138,.05) 10px, rgba(245,158,11,.05) 10px, rgba(245,158,11,.05) 20px)',
            }}
            aria-label="Charts placeholder"
          >
            <div className="row" style={{ color: '#6b7280' }}>
              <span>Charts will be included in the final report export.</span>
            </div>
          </div>
        </div>
      )}

      {options?.includeDetails && (
        <div className="mt-16">
          <h3 style={{ marginTop: 0 }}>Details</h3>
          <p style={{ marginTop: 4, color: '#374151' }}>
            Detailed event logs and per-interval metrics will appear here when connected to the backend.
          </p>
        </div>
      )}

      {options?.includeNotes && (
        <div className="mt-16">
          <h3 style={{ marginTop: 0 }}>Notes</h3>
          <div className="card" style={{ background: '#f8fafc' }}>
            <p style={{ margin: 0, color: '#374151' }}>
              Add operator notes or observations to include in the exported report.
            </p>
          </div>
        </div>
      )}

      <style>{`
        @media print {
          /* Hide UI chrome when printing */
          .topbar, .sidenav, .btn, .breadcrumbs, .Toaster, .nav-item, .row .btn {
            display: none !important;
          }
          .content {
            padding: 0 !important;
          }
          #report-print-area {
            border: none !important;
            box-shadow: none !important;
          }
        }
      `}</style>
    </section>
  );
}
