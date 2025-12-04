import { useMemo } from 'react';
import dayjs from 'dayjs';
import { useDateRange, getDateRangeFromPreset } from '../store/uiState';

const presetsList = [
  { key: '24h', label: 'Last 24h' },
  { key: '7d', label: 'Last 7 days' },
  { key: '30d', label: 'Last 30 days' },
];

// PUBLIC_INTERFACE
export default function DateRangePicker() {
  const [dateRange, setDateRange] = useDateRange();
  const selected = dateRange?.preset || '7d';
  const customFrom = selected === 'custom' ? dateRange?.from || '' : '';
  const customTo = selected === 'custom' ? dateRange?.to || '' : '';

  const display = useMemo(() => {
    if (selected === 'custom') {
      const from = customFrom ? dayjs(customFrom) : dayjs().subtract(7, 'day');
      const to = customTo ? dayjs(customTo) : dayjs();
      return `${from.format('YYYY-MM-DD')} → ${to.format('YYYY-MM-DD')}`;
    }
    // presets
    const dr = getDateRangeFromPreset(selected);
    return `${dr.from} → ${dr.to}`;
  }, [selected, customFrom, customTo]);

  const onPresetChange = (value) => {
    if (value === 'custom') {
      setDateRange({ preset: 'custom', from: customFrom || '', to: customTo || '' });
    } else {
      setDateRange(getDateRangeFromPreset(value));
    }
  };

  const onFromChange = (v) => {
    setDateRange({ preset: 'custom', from: v, to: customTo || '' });
  };

  const onToChange = (v) => {
    setDateRange({ preset: 'custom', from: customFrom || '', to: v });
  };

  return (
    <div className="row" aria-label="Date range">
      <select
        aria-label="Date preset"
        className="input"
        style={{ width: 140 }}
        value={selected}
        onChange={(e) => onPresetChange(e.target.value)}
      >
        {presetsList.map((p) => (
          <option key={p.key} value={p.key}>{p.label}</option>
        ))}
        <option value="custom">Custom…</option>
      </select>
      {selected === 'custom' && (
        <div className="row">
          <input className="input" type="date" value={customFrom} onChange={(e) => onFromChange(e.target.value)} aria-label="From date" />
          <input className="input" type="date" value={customTo} onChange={(e) => onToChange(e.target.value)} aria-label="To date" />
        </div>
      )}
      <span className="badge" title="Active range">{display}</span>
    </div>
  );
}
