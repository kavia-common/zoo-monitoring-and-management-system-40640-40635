import React from 'react';

/**
 * PUBLIC_INTERFACE
 * ExportButtons renders actions to print (PDF via browser) and download CSV.
 * Props:
 * - getCsvRows: () => Array<Record<string, any>> - rows to convert into CSV
 * - fileName?: string - base filename for CSV
 */
export default function ExportButtons({ getCsvRows, fileName = 'report' }) {
  const onPrint = () => {
    // Trigger browser print UI; users can choose "Save as PDF"
    window.print();
  };

  const onCsv = () => {
    try {
      const rows = (typeof getCsvRows === 'function' ? getCsvRows() : []) || [];
      if (!Array.isArray(rows) || rows.length === 0) {
        downloadText(`${fileName}.csv`, 'No data\n');
        return;
      }
      const headers = Array.from(
        rows.reduce((set, r) => {
          Object.keys(r || {}).forEach((k) => set.add(k));
          return set;
        }, new Set())
      );
      const escape = (val) => {
        const s = String(val ?? '');
        if (s.includes(',') || s.includes('"') || s.includes('\n')) {
          return `"${s.replace(/"/g, '""')}"`;
        }
        return s;
      };
      const lines = [
        headers.join(','),
        ...rows.map((r) => headers.map((h) => escape(r[h])).join(',')),
      ];
      downloadText(`${fileName}.csv`, lines.join('\n'));
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('[CSV] Failed to generate CSV', e);
      downloadText(`${fileName}.csv`, 'Error generating CSV\n');
    }
  };

  return (
    <div className="row">
      <button className="btn" onClick={onPrint} title="Print or save to PDF">
        Print / PDF
      </button>
      <button className="btn secondary" onClick={onCsv} title="Download CSV">
        Export CSV
      </button>
    </div>
  );
}

/** Utility to trigger a download of plain text content */
function downloadText(filename, text) {
  const blob = new Blob([text], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 0);
}
