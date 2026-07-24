import { Plus } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { ConfirmDialog } from "../components/common/ConfirmDialog";
import { type Column, DataTable } from "../components/common/DataTable";
import { EntityForm, type FieldConfig } from "../components/common/EntityForm";
import { PageHeader } from "../components/layout/AppLayout";
import type { PaginatedResult, SortDirection } from "../types";

type EntityPageProps<T extends { id: string }> = {
  title: string;
  description: string;
  addLabel: string;
  columns: Column<T>[];
  fields: FieldConfig<T>[];
  createEmpty: () => T;
  list: (options: {
    page: number;
    pageSize: number;
    search: string;
    sortKey?: keyof T;
    sortDirection: SortDirection;
  }) => Promise<PaginatedResult<T>>;
  save: (row: T) => Promise<T>;
  remove?: (id: string) => Promise<void>;
  getFormTitle?: (row: T, mode: "add" | "edit") => string;
  extraAction?: (row: T, refresh: () => void) => React.ReactNode;
};

const pageSize = 50;

export function EntityPage<T extends { id: string }>({
  title,
  description,
  addLabel,
  columns,
  fields,
  createEmpty,
  list,
  save,
  remove,
  getFormTitle,
  extraAction,
}: EntityPageProps<T>) {
  const [rows, setRows] = useState<T[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<keyof T | undefined>(columns[0]?.key);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<"table" | "add" | "edit">("table");
  const [draft, setDraft] = useState<T | null>(null);
  const [pendingDelete, setPendingDelete] = useState<T | null>(null);

  const loadRows = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await list({ page, pageSize, search, sortKey, sortDirection });
      setRows(result.items);
      setTotal(result.total);
    } catch {
      toast.error(`Unable to load ${title.toLowerCase()}.`);
    } finally {
      setIsLoading(false);
    }
  }, [list, page, search, sortDirection, sortKey, title]);

  useEffect(() => {
    loadRows();
  }, [loadRows]);

  const breadcrumbs = useMemo(() => {
    if (mode === "add") return [title, "Add"];
    if (mode === "edit") return [title, "Edit"];
    return [title];
  }, [mode, title]);

  const openAdd = () => {
    setDraft(createEmpty());
    setMode("add");
  };

  const openEdit = (row: T) => {
    setDraft(row);
    setMode("edit");
  };

  const handleSortChange = (key: keyof T) => {
    if (sortKey === key) {
      setSortDirection((current) => (current === "asc" ? "desc" : "asc"));
      return;
    }
    setSortKey(key);
    setSortDirection("asc");
  };

  const handleSave = async () => {
    if (!draft) return;
    try {
      await save(draft);
      toast.success(`${title.slice(0, -1)} saved.`);
      setMode("table");
      setDraft(null);
      loadRows();
    } catch {
      toast.error(`Unable to save ${title.toLowerCase()}.`);
    }
  };

  const confirmDelete = async () => {
    if (!pendingDelete || !remove) return;
    try {
      await remove(pendingDelete.id);
      toast.success(`${title.slice(0, -1)} deleted.`);
      setPendingDelete(null);
      setMode("table");
      setDraft(null);
      loadRows();
    } catch {
      toast.error(`Unable to delete ${title.toLowerCase()}.`);
    }
  };

  if (mode !== "table" && draft) {
    return (
      <>
        <EntityForm
          title={getFormTitle?.(draft, mode) ?? (mode === "add" ? addLabel : `Edit ${title}`)}
          breadcrumbs={breadcrumbs}
          fields={fields}
          value={draft}
          canDelete={mode === "edit" && Boolean(remove)}
          onChange={setDraft}
          onSave={handleSave}
          onCancel={() => {
            setMode("table");
            setDraft(null);
          }}
          onDelete={() => setPendingDelete(draft)}
          extraAction={extraAction?.(draft, loadRows)}
        />
        {pendingDelete ? (
          <ConfirmDialog
            title={`Delete ${title.slice(0, -1)}`}
            message="This action will remove the selected record from the current list."
            confirmLabel="Delete"
            onConfirm={confirmDelete}
            onCancel={() => setPendingDelete(null)}
          />
        ) : null}
      </>
    );
  }

  return (
    <div className="page-stack">
      <PageHeader
        title={title}
        description={description}
        action={
          <button className="button button-primary" onClick={openAdd}>
            <Plus size={18} />
            {addLabel}
          </button>
        }
      />
      <DataTable
        rows={rows}
        columns={columns}
        total={total}
        page={page}
        pageSize={pageSize}
        search={search}
        sortKey={sortKey}
        sortDirection={sortDirection}
        isLoading={isLoading}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        onSortChange={handleSortChange}
        onPageChange={setPage}
        onRowClick={openEdit}
      />
    </div>
  );
}
