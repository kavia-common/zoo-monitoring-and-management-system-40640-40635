import React from 'react';
import { useNavigate } from 'react-router-dom';
import ChartLegend from './ChartLegend';

/**
 * PUBLIC_INTERFACE
 * BarPlaceholder renders a minimalist bar chart placeholder.
 * Props:
 * - data: number[] values for bars
 * - labels: string[] labels for bars/legend
 * - colors: string[] color palette for bars
 * - title?: string section title
 * - onBarClick?: function(index) custom click handler; default navigates to /timeline
 */
export default function BarPlaceholder({
  data = [],
  labels = [],
  colors = ['#1E3A8A', '#F59E0B', '#059669', '#DC2626'],
  title = 'Bar Chart',
  onBarClick,
}) {
  const navigate = useNavigate();
  const max = Math.max(1, ...data);
  const handleClick = (i) => {
    if (onBarClick) return onBarClick(i);
    // Default intent: navigate to Timeline with basic query hint
    navigate('/timeline', { state: { intent: 'from_chart', seriesIndex: i, type: 'bar' } });
  };

  return (
    <div className="card" style={{ minHeight: 240 }}>
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <h3 style={{ margin: 0 }}>{title}</h3>
        <span className="badge">Preview</span>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: 10,
          height: 140,
          marginTop: 16,
          borderBottom: '1px dashed rgba(17,24,39,0.12)',
          paddingBottom: 8,
        }}
        aria-label="Bar chart placeholder"
        role="img"
      >
        {data.map((v, i) => {
          const h = Math.round((v / max) * 120) + 8;
          const color = colors[i % colors.length];
          return (
            <button
              key={i}
              className="btn ghost"
              title={`See events for ${labels[i] ?? `Series ${i + 1}`}`}
              onClick={() => handleClick(i)}
              style={{
                padding: 0,
                width: 26,
                height: h + 10,
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  width: 22,
                  height: h,
                  background: color,
                  borderRadius: 6,
                  boxShadow: 'var(--shadow-sm)',
                }}
              />
            </button>
          );
        })}
      </div>

      <div style={{ marginTop: 12 }}>
        <ChartLegend
          labels={labels}
          colors={colors}
          onItemClick={(i) => handleClick(i)}
        />
      </div>
    </div>
  );
}
