import { ArrowDown, ArrowUp, ChevronLeft, ChevronRight, Search } from "lucide-react";
import type { ReactNode } from "react";
import type { SortDirection } from "../../types";

export type Column<T> = {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (row: T) => ReactNode;
};

type DataTableProps<T extends { id: string }> = {
  rows: T[];
  columns: Column<T>[];
  total: number;
  page: number;
  pageSize: number;
  search: string;
  sortKey?: keyof T;
  sortDirection: SortDirection;
  isLoading?: boolean;
  emptyLabel?: string;
  onSearchChange: (value: string) => void;
  onSortChange: (key: keyof T) => void;
  onPageChange: (page: number) => void;
  onRowClick?: (row: T) => void;
};

export function DataTable<T extends { id: string }>({
  rows,
  columns,
  total,
  page,
  pageSize,
  search,
  sortKey,
  sortDirection,
  isLoading = false,
  emptyLabel = "No records found.",
  onSearchChange,
  onSortChange,
  onPageChange,
  onRowClick,
}: DataTableProps<T>) {
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  return (
    <section className="table-panel">
      <div className="table-toolbar">
        <label className="table-search">
          <Search size={18} />
          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Filter records"
          />
        </label>
        <span className="table-count">
          {start}-{end} of {total}
        </span>
      </div>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              {columns.map((column) => {
                const isSorted = sortKey === column.key;
                return (
                  <th key={String(column.key)}>
                    {column.sortable ? (
                      <button
                        className="sort-button"
                        onClick={() => onSortChange(column.key)}
                      >
                        {column.label}
                        {isSorted ? (
                          sortDirection === "asc" ? (
                            <ArrowUp size={14} />
                          ) : (
                            <ArrowDown size={14} />
                          )
                        ) : null}
                      </button>
                    ) : (
                      column.label
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={columns.length} className="table-state">
                  Loading records...
                </td>
              </tr>
            ) : rows.length ? (
              rows.map((row) => (
                <tr
                  key={row.id}
                  className={onRowClick ? "clickable-row" : ""}
                  onClick={() => onRowClick?.(row)}
                >
                  {columns.map((column) => (
                    <td key={String(column.key)}>
                      {column.render ? column.render(row) : String(row[column.key] ?? "")}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="table-state">
                  {emptyLabel}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button
          className="icon-button"
          aria-label="Previous page"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
        >
          <ChevronLeft size={18} />
        </button>
        <span>
          Page {page} of {pageCount}
        </span>
        <button
          className="icon-button"
          aria-label="Next page"
          disabled={page === pageCount}
          onClick={() => onPageChange(page + 1)}
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
}
