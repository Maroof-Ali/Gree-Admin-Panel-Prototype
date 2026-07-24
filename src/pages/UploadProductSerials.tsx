import { Download, Upload } from "lucide-react";
import { useCallback, useEffect, useState, type ChangeEvent } from "react";
import { toast } from "sonner";
import { adminApi } from "../api/adminApi";
import { Badge } from "../components/common/Badge";
import { type Column, DataTable } from "../components/common/DataTable";
import { PageHeader } from "../components/layout/AppLayout";
import type { SortDirection, UploadBatch } from "../types";

const pageSize = 50;

export function UploadProductSerials() {
  const [rows, setRows] = useState<UploadBatch[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<keyof UploadBatch>("uploadedAt");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadRows = useCallback(async () => {
    setIsLoading(true);
    const result = await adminApi.listUploads({
      page,
      pageSize,
      search,
      sortKey,
      sortDirection,
    });
    setRows(result.items);
    setTotal(result.total);
    setIsLoading(false);
  }, [page, search, sortDirection, sortKey]);

  useEffect(() => {
    loadRows();
  }, [loadRows]);

  const handleUpload = async () => {
    if (!file) {
      toast.error("Choose an Excel file first.");
      return;
    }

    await adminApi.uploadSerialFile(file);
    toast.success("Product serial upload started.");
    setFile(null);
    loadRows();
  };

  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files?.[0] ?? null);
  };

  const downloadReport = (row: UploadBatch) => {
    const report = `Filename,Status,Uploaded At\n${row.filename},${row.uploadStatus},${row.uploadedAt}\n`;
    const blob = new Blob([report], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${row.filename.replace(/\.[^.]+$/, "")}-report.xlsx`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Report downloaded.");
  };

  const columns: Column<UploadBatch>[] = [
    { key: "filename", label: "Filename", sortable: true },
    {
      key: "uploadStatus",
      label: "Upload Status",
      sortable: true,
      render: (row) => (
        <Badge
          tone={
            row.uploadStatus === "Completed"
              ? "success"
              : row.uploadStatus === "Processing"
                ? "warning"
                : "error"
          }
        >
          {row.uploadStatus}
        </Badge>
      ),
    },
    { key: "uploadedAt", label: "Uploaded At", sortable: true },
    {
      key: "id",
      label: "Report",
      render: (row) => (
        <button className="icon-text-button" onClick={() => downloadReport(row)}>
          <Download size={16} />
          Download
        </button>
      ),
    },
  ];

  return (
    <div className="page-stack">
      <PageHeader
        title="Upload Product Serials"
        description="Upload Excel files for background processing and download import reports."
      />
      <section className="upload-panel">
        <label className="file-input">
          <input type="file" accept=".xlsx,.xls" onChange={handleFile} />
          <span>{file?.name ?? "Choose Excel file"}</span>
        </label>
        <button className="button button-primary" onClick={handleUpload}>
          <Upload size={18} />
          Upload
        </button>
      </section>
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
        onSortChange={(key) => {
          if (sortKey === key) {
            setSortDirection((current) => (current === "asc" ? "desc" : "asc"));
          } else {
            setSortKey(key);
            setSortDirection("asc");
          }
        }}
        onPageChange={setPage}
      />
    </div>
  );
}
