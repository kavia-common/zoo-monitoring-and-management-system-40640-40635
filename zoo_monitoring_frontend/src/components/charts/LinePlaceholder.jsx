import React from 'react';
import { useNavigate } from 'react-router-dom';
import ChartLegend from './ChartLegend';

/**
 * PUBLIC_INTERFACE
 * LinePlaceholder renders a minimalist line chart placeholder.
 * Props:
 * - data: number[] values across time
 * - labels: string[] legend labels (single or multiple series conceptually)
 * - colors: string[] palette
 * - title?: string section title
 * - onPointClick?: function(index)
 */
export default function LinePlaceholder({
  data = [],
  labels = ['Activity'],
  colors = ['#1E3A8A', '#F59E0B'],
  title = 'Line Chart',
  onPointClick,
}) {
  const navigate = useNavigate();
  const max = Math.max(1, ...data);
  const handleClick = (i) => {
    if (onPointClick) return onPointClick(i);
    navigate('/timeline', { state: { intent: 'from_chart', pointIndex: i, type: 'line' } });
  };

  // Render as small dots connected via borders to suggest a line
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
        aria-label="Line chart placeholder"
        role="img"
      >
        {data.map((v, i) => {
          const h = Math.round((v / max) * 120) + 6;
          const color = colors[0];
          return (
            <button
              key={i}
              className="btn ghost"
              title={`See events for point ${i + 1}`}
              onClick={() => handleClick(i)}
              style={{
                padding: 0,
                width: 22,
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
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: color,
                  boxShadow: '0 0 0 2px rgba(30,58,138,0.15)',
                  marginBottom: h - 8,
                }}
              />
            </button>
          );
        })}
      </div>

      <div style={{ marginTop: 12 }}>
        <ChartLegend labels={labels} colors={colors} onItemClick={(i) => handleClick(i)} />
      </div>
    </div>
  );
}
