import { useMemo, useState } from 'react';
import dayjs from 'dayjs';

const presetsList = [
  { key: '24h', label: 'Last 24h', from: () => dayjs().subtract(24, 'hour') },
  { key: '7d', label: 'Last 7 days', from: () => dayjs().subtract(7, 'day') },
  { key: '30d', label: 'Last 30 days', from: () => dayjs().subtract(30, 'day') },
];

// PUBLIC_INTERFACE
export default function DateRangePicker() {
  const [selected, setSelected] = useState('7d');
  const [customFrom, setCustomFrom] = useState('');
  const [customTo, setCustomTo] = useState('');

  const display = useMemo(() => {
    const preset = presetsList.find((p) => p.key === selected);
    const from = preset ? preset.from() : (customFrom ? dayjs(customFrom) : dayjs().subtract(7, 'day'));
    const to = customTo ? dayjs(customTo) : dayjs();
    return `${from.format('YYYY-MM-DD')} → ${to.format('YYYY-MM-DD')}`;
  }, [selected, customFrom, customTo]);

  return (
    <div className="row" aria-label="Date range">
      <select
        aria-label="Date preset"
        className="input"
        style={{ width: 140 }}
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
      >
        {presetsList.map((p) => (
          <option key={p.key} value={p.key}>{p.label}</option>
        ))}
        <option value="custom">Custom…</option>
      </select>
      {selected === 'custom' && (
        <div className="row">
          <input className="input" type="date" value={customFrom} onChange={(e) => setCustomFrom(e.target.value)} aria-label="From date" />
          <input className="input" type="date" value={customTo} onChange={(e) => setCustomTo(e.target.value)} aria-label="To date" />
        </div>
      )}
      <span className="badge" title="Active range">{display}</span>
    </div>
  );
}
