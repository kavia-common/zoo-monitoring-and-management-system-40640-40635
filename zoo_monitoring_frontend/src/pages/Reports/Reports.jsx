import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Loading, Empty, ErrorState, toast } from '../../components/ui/States';
import useOnlineStatus from '../../hooks/useOnlineStatus';
import BarPlaceholder from '../../components/charts/BarPlaceholder';
import LinePlaceholder from '../../components/charts/LinePlaceholder';
import ReportPreview from '../../components/reports/ReportPreview';
import ExportButtons from '../../components/reports/ExportButtons';
import { useDateRange } from '../../store/uiState';

// PUBLIC_INTERFACE
export default function Reports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const online = useOnlineStatus();

  // Local selections that should be carried into preview/export
  const [behaviors, setBehaviors] = useState(['Feeding', 'Movement']);
  const [options, setOptions] = useState({
    includeCharts: true,
    includeNotes: true,
    includeDetails: false,
  });

  // Pull the global date range from UI state so it carries into preview
  const [dateRange] = useDateRange();

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setErr(null);
    const t = setTimeout(() => {
      if (cancelled) return;
      if (!online) {
        setErr('Offline: cannot load reports.');
        setLoading(false);
        return;
      }
      setReports([
        { id: 1, title: 'Weekly Health Summary', date: dayjs().subtract(2, 'day').format('YYYY-MM-DD') },
        { id: 2, title: 'Behavior Analysis', date: dayjs().subtract(8, 'day').format('YYYY-MM-DD') },
      ]);
      setLoading(false);
    }, 420);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [online]);

  // CSV rows will include the selected filters and the report metadata for demo purposes
  const csvRows = reports.map((r) => ({
    id: r.id,
    title: r.title,
    date: r.date,
    range_from: dateRange?.from,
    range_to: dateRange?.to,
    behaviors: behaviors.join('|'),
    includeCharts: options.includeCharts,
    includeNotes: options.includeNotes,
    includeDetails: options.includeDetails,
  }));

  // Placeholder actions for cards list
  const open = (r) => toast.info(`Opening ${r.title}…`);
  const download = (r) => toast.success(`Downloading ${r.title}…`);

  // Behavior multi-select toggle
  const toggleBehavior = (name) => {
    setBehaviors((prev) =>
      prev.includes(name) ? prev.filter((b) => b !== name) : [...prev, name]
    );
  };

  if (loading) return <Loading message="Loading reports…" />;
  if (err) return <ErrorState error={err} onRetry={() => { setErr(null); setLoading(true); }} />;
  if (!reports.length) return <Empty title="No reports" description="No reports available for the selected range." />;

  return (
    <div>
      <h2>Reports</h2>

      {/* Controls: behavior selections and options that carry into preview/export */}
      <div className="card mt-16">
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <div className="row" style={{ flexWrap: 'wrap' }}>
            <label style={{ fontWeight: 600 }}>Behaviors:</label>
            {['Feeding', 'Movement', 'Health', 'Other'].map((b) => (
              <label key={b} className="row" style={{ gap: 6 }}>
                <input
                  type="checkbox"
                  checked={behaviors.includes(b)}
                  onChange={() => toggleBehavior(b)}
                />
                <span>{b}</span>
              </label>
            ))}
          </div>
          <div className="row" style={{ flexWrap: 'wrap' }}>
            <label className="row" style={{ gap: 6 }}>
              <input
                type="checkbox"
                checked={options.includeCharts}
                onChange={(e) => setOptions((o) => ({ ...o, includeCharts: e.target.checked }))}
              />
              <span>Include charts</span>
            </label>
            <label className="row" style={{ gap: 6 }}>
              <input
                type="checkbox"
                checked={options.includeNotes}
                onChange={(e) => setOptions((o) => ({ ...o, includeNotes: e.target.checked }))}
              />
              <span>Include notes</span>
            </label>
            <label className="row" style={{ gap: 6 }}>
              <input
                type="checkbox"
                checked={options.includeDetails}
                onChange={(e) => setOptions((o) => ({ ...o, includeDetails: e.target.checked }))}
              />
              <span>Include details</span>
            </label>
          </div>
        </div>

        <div className="row mt-16" style={{ justifyContent: 'space-between' }}>
          <ExportButtons getCsvRows={() => csvRows} fileName="vizai_report" />
          <span className="badge" title="The date range in TopBar is applied automatically">
            Using global date range
          </span>
        </div>
      </div>

      {/* Preview section */}
      <div className="mt-16">
        <ReportPreview
          title="Giant Anteater - Summary Report"
          dateRange={dateRange}
          behaviors={behaviors}
          options={options}
          summaryData={[
            { key: 'Activity score', value: '82' },
            { key: 'Feeding events', value: '12' },
            { key: 'Sensor uptime', value: '99.3%' },
          ]}
        />
      </div>

      {/* Existing mock list of reports for context */}
      <div className="grid-2 mt-24">
        {reports.map((r, idx) => (
          <div key={r.id} className="card">
            <div className="row" style={{ justifyContent: 'space-between' }}>
              <strong>{r.title}</strong>
              <span className="badge">{r.date}</span>
            </div>
            <div style={{ marginTop: 8 }}>
              {idx % 2 === 0 ? (
                <BarPlaceholder
                  title="Events by Category"
                  data={[12, 7, 5, 3]}
                  labels={['Feeding', 'Movement', 'Health', 'Other']}
                  colors={['#1E3A8A', '#F59E0B', '#059669', '#DC2626']}
                />
              ) : (
                <LinePlaceholder
                  title="Activity Over Time"
                  data={[4, 6, 5, 9, 8, 10, 7]}
                  labels={['Activity']}
                  colors={['#1E3A8A']}
                />
              )}
            </div>
            <div className="row mt-16">
              <button className="btn" onClick={() => open(r)}>Open</button>
              <button className="btn secondary" onClick={() => download(r)}>Download</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
