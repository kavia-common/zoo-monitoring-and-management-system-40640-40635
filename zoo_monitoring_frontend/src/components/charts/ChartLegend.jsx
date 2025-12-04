import React from 'react';

/**
 * PUBLIC_INTERFACE
 * ChartLegend component renders a horizontal legend for chart placeholders.
 * Props:
 * - labels: string[] legend item labels
 * - colors: string[] corresponding color tokens
 * - onItemClick?: function(index) optional click handler
 */
export default function ChartLegend({ labels = [], colors = [], onItemClick }) {
  /** Render legend items with color dots and accessible buttons */
  return (
    <div className="row" role="list" aria-label="Chart legend" style={{ flexWrap: 'wrap', gap: 10 }}>
      {labels.map((label, idx) => {
        const color = colors[idx % colors.length] || '#1E3A8A';
        return (
          <button
            key={`${label}-${idx}`}
            role="listitem"
            type="button"
            onClick={() => onItemClick && onItemClick(idx)}
            className="btn ghost"
            title={`Filter: ${label}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 10px',
              borderRadius: 999,
              lineHeight: 1.2,
            }}
          >
            <span
              aria-hidden="true"
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: color,
                boxShadow: '0 0 0 2px rgba(17,24,39,0.06)',
              }}
            />
            <span style={{ color: '#111827' }}>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
