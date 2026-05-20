import { useState } from 'react';
import { Badge } from './Badge';

export const DataTable = ({
  columns = [],
  data = [],
  onEdit = () => {},
  onDelete = () => {},
}) => {
  const [sortBy, setSortBy] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter
  const filtered = data.filter((row) =>
    columns.some((col) =>
      String(row[col.key]).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    if (!sortBy) return 0;
    const aVal = a[sortBy];
    const bVal = b[sortBy];
    return aVal > bVal ? 1 : -1;
  });

  return (
    <div className="bg-aeco-light-card dark:bg-aeco-dark-card border border-aeco-light-border dark:border-aeco-dark-border rounded-lg overflow-hidden">
      {/* Search */}
      <div className="p-4 border-b border-aeco-light-border dark:border-aeco-dark-border">
        <input
          type="text"
          placeholder="🔍 Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-aeco-light-bg dark:bg-aeco-dark-bg border border-aeco-light-border dark:border-aeco-dark-border focus:outline-none focus:ring-2 focus:ring-aeco-cyan text-sm"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-aeco-light-border dark:border-aeco-dark-border bg-aeco-light-bg dark:bg-aeco-dark-bg/50">
              {columns.map((col) => (
                <th key={col.key} className="px-4 py-3 text-left font-semibold">
                  <button
                    onClick={() => setSortBy(sortBy === col.key ? null : col.key)}
                    className="hover:text-aeco-cyan transition-colors"
                  >
                    {col.label} {sortBy === col.key ? '↑' : ''}
                  </button>
                </th>
              ))}
              <th className="px-4 py-3 text-center font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="px-4 py-8 text-center text-aeco-light-text/50 dark:text-aeco-dark-text/50">
                  No data available
                </td>
              </tr>
            ) : (
              sorted.map((row, idx) => (
                <tr
                  key={idx}
                  className="border-b border-aeco-light-border dark:border-aeco-dark-border hover:bg-aeco-light-bg dark:hover:bg-aeco-dark-bg/50 transition-colors"
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3">
                      {col.render
                        ? col.render(row[col.key], row)
                        : row[col.key]}
                    </td>
                  ))}
                  <td className="px-4 py-3 flex justify-center gap-2">
                    <button
                      onClick={() => onEdit(row)}
                      className="p-1 text-aeco-cyan hover:bg-aeco-cyan/10 rounded transition-colors"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => onDelete(row)}
                      className="p-1 text-aeco-danger hover:bg-aeco-danger/10 rounded transition-colors"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
