import type {
  AdminRole,
  AdminUser,
  Contractor,
  ProductModel,
  ProductRegistration,
  ProductSerial,
  UploadBatch,
} from "../types";

const states = ["TX", "CA", "FL", "AZ", "NY", "GA"];
const cities = ["Dallas", "Austin", "Phoenix", "Miami", "Atlanta", "Buffalo"];

export const productModels: ProductModel[] = Array.from({ length: 74 }, (_, index) => {
  const number = index + 1;
  const tons = [1.5, 2, 2.5, 3, 3.5, 4][index % 6];

  return {
    id: `model-${number}`,
    model: `GREE-${2000 + number}`,
    seriesName: ["Signature", "ProComfort", "EcoLine", "Builder"][index % 4],
    categoryDescription: ["Split AC", "Heat Pump", "Packaged Unit"][index % 3],
    voltage: ["115V", "208/230V", "460V"][index % 3],
    chType: ["Cooling", "Heating", "Hybrid"][index % 3],
    capacityBtu: tons * 12000,
    capacityTon: tons,
    createdAt: `2026-0${(index % 7) + 1}-12`,
  };
});

export const productSerials: ProductSerial[] = Array.from({ length: 88 }, (_, index) => {
  const number = index + 1;
  const model = productModels[index % productModels.length];

  return {
    id: `serial-${number}`,
    serialNo: `SN-${String(900000 + number)}`,
    customerSerialNo: `CUS-${String(30000 + number)}`,
    productModel: model.model,
    createdAt: `2026-0${(index % 7) + 1}-18`,
  };
});

export const contractors: Contractor[] = Array.from({ length: 42 }, (_, index) => {
  const number = index + 1;
  const pending = index % 4 === 0;

  return {
    id: `contractor-${number}`,
    contractorName: `${["Summit", "Northstar", "Canyon", "Premier", "Metro"][index % 5]} HVAC ${number}`,
    phoneNo: `(555) 21${index}-${String(1000 + number)}`,
    emailAddress: `contractor${number}@example.com`,
    address: `${120 + number} Market Street`,
    city: cities[index % cities.length],
    zipcode: String(75000 + number),
    state: states[index % states.length],
    applicantName: `${["Avery", "Jordan", "Morgan", "Riley", "Casey"][index % 5]} Patel`,
    applicantTitle: ["Owner", "Operations Manager", "Service Lead"][index % 3],
    status: pending ? "Pending" : "Approved",
    approvedBy: pending ? "" : "Gree Admin",
    createdAt: `2026-0${(index % 6) + 1}-08`,
    updatedAt: `2026-0${(index % 6) + 1}-20`,
  };
});

export const productRegistrations: ProductRegistration[] = Array.from(
  { length: 67 },
  (_, index) => {
    const number = index + 1;
    const serial = productSerials[index % productSerials.length];
    const contractor = contractors[index % contractors.length];

    return {
      id: `registration-${number}`,
      firstName: ["Gree", "Alex", "Maya", "Noah", "Sara"][index % 5],
      lastName: ["Khan", "Ali", "Parker", "Smith", "Reed"][index % 5],
      phone: `(555) 44${index}-${String(2000 + number)}`,
      email: `customer${number}@example.com`,
      address1: `${310 + number} Elm Avenue`,
      address2: index % 3 === 0 ? "Suite 4" : "",
      zipCode: String(73000 + number),
      city: cities[index % cities.length],
      state: states[index % states.length],
      country: "USA",
      differentMailingAddress: index % 5 === 0,
      marketingPromotion: index % 2 === 0,
      registrantRole: ["Homeowner", "Contractor", "Builder"][index % 3],
      installationDate: `2026-0${(index % 6) + 1}-15`,
      installationType: ["Replacement", "New Construction", "Retrofit"][index % 3],
      inactive: index % 13 === 0,
      productSerialId: serial.serialNo,
      contractorId: contractor.contractorName,
      createdAt: `2026-0${(index % 7) + 1}-21`,
    };
  },
);

export const uploadBatches: UploadBatch[] = [
  {
    id: "upload-1",
    filename: "june-product-serials.xlsx",
    uploadStatus: "Completed",
    uploadedAt: "2026-06-30",
  },
  {
    id: "upload-2",
    filename: "contractor-bulk-import.xlsx",
    uploadStatus: "Processing",
    uploadedAt: "2026-07-18",
  },
  {
    id: "upload-3",
    filename: "legacy-serial-correction.xlsx",
    uploadStatus: "Failed",
    uploadedAt: "2026-07-21",
  },
];

export const adminUsers: AdminUser[] = [
  {
    id: "user-1",
    name: "Gree Admin",
    email: "admin@gree.com",
    role: "Super Admin",
    status: "Active",
    createdAt: "2026-01-01",
  },
  {
    id: "user-2",
    name: "Gree Manager",
    email: "manager@gree.com",
    role: "Admin",
    status: "Active",
    createdAt: "2026-02-14",
  },
  {
    id: "user-3",
    name: "Support Desk",
    email: "support@example.com",
    role: "Support",
    status: "Inactive",
    createdAt: "2026-03-09",
  },
];

export const adminRoles: AdminRole[] = [
  {
    id: "role-1",
    roleName: "Super Admin",
    description: "Full access to users, roles, contractor approvals, uploads, and product data.",
    userCount: 1,
    createdAt: "2026-01-01",
  },
  {
    id: "role-2",
    roleName: "Admin",
    description: "Manages product models, serials, registrations, contractors, and uploads.",
    userCount: 4,
    createdAt: "2026-01-01",
  },
  {
    id: "role-3",
    roleName: "Support",
    description: "Read access for dashboards, registrations, and contractor records.",
    userCount: 8,
    createdAt: "2026-01-01",
  },
];
