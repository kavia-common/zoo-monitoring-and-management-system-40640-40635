import React from 'react';
import { useNavigate } from 'react-router-dom';
import ChartLegend from './ChartLegend';

/**
 * PUBLIC_INTERFACE
 * DonutPlaceholder renders a simple ring with segmented arcs suggestion.
 * Props:
 * - data: number[] segment values
 * - labels: string[] segment labels
 * - colors: string[] palette
 * - title?: string
 * - onSliceClick?: function(index)
 */
export default function DonutPlaceholder({
  data = [],
  labels = [],
  colors = ['#1E3A8A', '#F59E0B', '#059669', '#DC2626'],
  title = 'Donut Chart',
  onSliceClick,
}) {
  const navigate = useNavigate();
  const total = data.reduce((a, b) => a + b, 0) || 1;

  const handleClick = (i) => {
    if (onSliceClick) return onSliceClick(i);
    navigate('/timeline', { state: { intent: 'from_chart', sliceIndex: i, type: 'donut' } });
  };

  return (
    <div className="card" style={{ minHeight: 240 }}>
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <h3 style={{ margin: 0 }}>{title}</h3>
        <span className="badge">Preview</span>
      </div>
      <div className="row" style={{ marginTop: 12, alignItems: 'center', gap: 20 }}>
        <div
          aria-label="Donut chart placeholder"
          role="img"
          style={{
            position: 'relative',
            width: 140,
            height: 140,
            borderRadius: '50%',
            background: 'conic-gradient(rgba(30,58,138,0.12), rgba(245,158,11,0.12), rgba(5,150,105,0.12), rgba(220,38,38,0.12))',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 16,
              borderRadius: '50%',
              background: 'white',
              boxShadow: 'inset 0 0 0 1px rgba(17,24,39,0.06)',
            }}
          />
          {/* Click targets for slices (overlay buttons) */}
          {data.map((v, i) => {
            const startRatio = data.slice(0, i).reduce((a, b) => a + b, 0) / total;
            const endRatio = (data.slice(0, i).reduce((a, b) => a + b, 0) + v) / total;
            // Create a simple sector click area by placing a button roughly on the arc midpoint
            const angle = (startRatio + (endRatio - startRatio) / 2) * 2 * Math.PI;
            const r = 48;
            const cx = 70 + Math.cos(angle) * r;
            const cy = 70 + Math.sin(angle) * r;
            const color = colors[i % colors.length];

            return (
              <button
                key={i}
                title={`See events for ${labels[i] ?? `Slice ${i + 1}`}`}
                onClick={() => handleClick(i)}
                className="btn ghost"
                style={{
                  position: 'absolute',
                  left: cx - 8,
                  top: cy - 8,
                  width: 16,
                  height: 16,
                  padding: 0,
                  borderRadius: '50%',
                  background: color,
                  border: 'none',
                  boxShadow: '0 0 0 2px rgba(255,255,255,0.9), 0 1px 2px rgba(0,0,0,0.08)',
                  cursor: 'pointer',
                }}
              />
            );
          })}
        </div>
        <div style={{ flex: 1 }}>
          <ChartLegend labels={labels} colors={colors} onItemClick={(i) => handleClick(i)} />
        </div>
      </div>
    </div>
  );
}
