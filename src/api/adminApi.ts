import {
  adminRoles,
  adminUsers,
  contractors,
  productModels,
  productRegistrations,
  productSerials,
  uploadBatches,
} from "../data/mockData";
import type {
  AdminRole,
  AdminUser,
  Contractor,
  ContractorStatus,
  PaginatedResult,
  ProductModel,
  ProductRegistration,
  ProductSerial,
  SortDirection,
  UploadBatch,
} from "../types";

type QueryOptions<T> = {
  page: number;
  pageSize: number;
  search?: string;
  sortKey?: keyof T;
  sortDirection?: SortDirection;
};

const delay = (ms = 250) => new Promise((resolve) => window.setTimeout(resolve, ms));

let modelRows = [...productModels];
let serialRows = [...productSerials];
let registrationRows = [...productRegistrations];
let contractorRows = [...contractors];
let uploadRows = [...uploadBatches];
let userRows = [...adminUsers];
let roleRows = [...adminRoles];

function matchesSearch<T extends Record<string, unknown>>(row: T, search = "") {
  const normalized = search.trim().toLowerCase();
  if (!normalized) return true;

  return Object.values(row).some((value) =>
    String(value).toLowerCase().includes(normalized),
  );
}

function queryRows<T extends { id: string } & Record<string, unknown>>(
  rows: T[],
  options: QueryOptions<T>,
): PaginatedResult<T> {
  const filtered = rows.filter((row) => matchesSearch(row, options.search));
  const sorted = [...filtered];

  if (options.sortKey) {
    sorted.sort((a, b) => {
      const left = a[options.sortKey!];
      const right = b[options.sortKey!];
      const result = String(left).localeCompare(String(right), undefined, {
        numeric: true,
      });
      return options.sortDirection === "desc" ? -result : result;
    });
  }

  const start = (options.page - 1) * options.pageSize;
  return {
    items: sorted.slice(start, start + options.pageSize),
    total: filtered.length,
  };
}

function upsertRow<T extends { id: string }>(rows: T[], row: T) {
  const exists = rows.some((item) => item.id === row.id);
  return exists ? rows.map((item) => (item.id === row.id ? row : item)) : [row, ...rows];
}

export const adminApi = {
  async login() {
    await delay();
    return { ok: true };
  },

  async getDashboard() {
    await delay();
    const approvedContractors = contractorRows.filter((row) => row.status === "Approved");
    return {
      registeredThisYear: registrationRows.filter((row) => row.createdAt.startsWith("2026"))
        .length,
      activeContractors: approvedContractors.length,
      pendingContractors: contractorRows.filter((row) => row.status === "Pending").length,
      serialsUploaded: serialRows.length,
      mostSellingProducts: modelRows.slice(0, 5).map((model, index) => ({
        name: model.model,
        series: model.seriesName,
        units: [320, 284, 241, 199, 162][index],
      })),
      topContractors: approvedContractors.slice(0, 5).map((contractor, index) => ({
        name: contractor.contractorName,
        registrations: [146, 132, 118, 96, 81][index],
      })),
    };
  },

  async listProductModels(options: QueryOptions<ProductModel>) {
    await delay();
    return queryRows(modelRows, options);
  },
  async saveProductModel(row: ProductModel) {
    await delay();
    modelRows = upsertRow(modelRows, row);
    return row;
  },
  async deleteProductModel(id: string) {
    await delay();
    modelRows = modelRows.filter((row) => row.id !== id);
  },

  async listProductSerials(options: QueryOptions<ProductSerial>) {
    await delay();
    return queryRows(serialRows, options);
  },
  async saveProductSerial(row: ProductSerial) {
    await delay();
    serialRows = upsertRow(serialRows, row);
    return row;
  },
  async deleteProductSerial(id: string) {
    await delay();
    serialRows = serialRows.filter((row) => row.id !== id);
  },

  async listProductRegistrations(options: QueryOptions<ProductRegistration>) {
    await delay();
    return queryRows(registrationRows, options);
  },
  async saveProductRegistration(row: ProductRegistration) {
    await delay();
    registrationRows = upsertRow(registrationRows, row);
    return row;
  },
  async deleteProductRegistration(id: string) {
    await delay();
    registrationRows = registrationRows.filter((row) => row.id !== id);
  },

  async listContractors(options: QueryOptions<Contractor>, status?: ContractorStatus) {
    await delay();
    const rows = status ? contractorRows.filter((row) => row.status === status) : contractorRows;
    return queryRows(rows, options);
  },
  async saveContractor(row: Contractor) {
    await delay();
    contractorRows = upsertRow(contractorRows, row);
    return row;
  },
  async deleteContractor(id: string) {
    await delay();
    contractorRows = contractorRows.filter((row) => row.id !== id);
  },
  async approveContractor(id: string, approvedBy: string) {
    await delay();
    const updated = contractorRows.map((row) =>
      row.id === id
        ? {
            ...row,
            status: "Approved" as ContractorStatus,
            approvedBy,
            updatedAt: new Date().toISOString().slice(0, 10),
          }
        : row,
    );
    contractorRows = updated;
    return contractorRows.find((row) => row.id === id)!;
  },

  async listUploads(options: QueryOptions<UploadBatch>) {
    await delay();
    return queryRows(uploadRows, options);
  },
  async uploadSerialFile(file: File) {
    await delay(550);
    const row: UploadBatch = {
      id: crypto.randomUUID(),
      filename: file.name,
      uploadStatus: "Processing",
      uploadedAt: new Date().toISOString().slice(0, 10),
    };
    uploadRows = [row, ...uploadRows];
    return row;
  },

  async listUsers(options: QueryOptions<AdminUser>) {
    await delay();
    return queryRows(userRows, options);
  },
  async saveUser(row: AdminUser) {
    await delay();
    userRows = upsertRow(userRows, row);
    return row;
  },
  async deleteUser(id: string) {
    await delay();
    userRows = userRows.filter((row) => row.id !== id);
  },

  async listRoles(options: QueryOptions<AdminRole>) {
    await delay();
    return queryRows(roleRows, options);
  },
  async saveRole(row: AdminRole) {
    await delay();
    roleRows = upsertRow(roleRows, row);
    return row;
  },
  async deleteRole(id: string) {
    await delay();
    roleRows = roleRows.filter((row) => row.id !== id);
  },
};
