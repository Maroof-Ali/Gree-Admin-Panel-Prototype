import type { LucideIcon } from "lucide-react";

export type RoleName = "Super Admin" | "Admin" | "Support";

export type UserSession = {
  id: string;
  name: string;
  email: string;
  role: RoleName;
};

export type NavItem = {
  label: string;
  path: string;
  icon: LucideIcon;
  roles: RoleName[];
};

export type ProductModel = {
  id: string;
  model: string;
  seriesName: string;
  categoryDescription: string;
  voltage: string;
  chType: string;
  capacityBtu: number;
  capacityTon: number;
  createdAt: string;
};

export type ProductSerial = {
  id: string;
  serialNo: string;
  customerSerialNo: string;
  productModel: string;
  createdAt: string;
};

export type ProductRegistration = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address1: string;
  address2: string;
  zipCode: string;
  city: string;
  state: string;
  country: string;
  differentMailingAddress: boolean;
  marketingPromotion: boolean;
  registrantRole: string;
  installationDate: string;
  installationType: string;
  inactive: boolean;
  productSerialId: string;
  contractorId: string;
  createdAt: string;
};

export type ContractorStatus = "Approved" | "Pending" | "Rejected";

export type Contractor = {
  id: string;
  contractorName: string;
  phoneNo: string;
  emailAddress: string;
  address: string;
  city: string;
  zipcode: string;
  state: string;
  applicantName: string;
  applicantTitle: string;
  status: ContractorStatus;
  approvedBy: string;
  createdAt: string;
  updatedAt: string;
};

export type UploadBatch = {
  id: string;
  filename: string;
  uploadStatus: "Completed" | "Processing" | "Failed";
  uploadedAt: string;
};

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: RoleName;
  status: "Active" | "Inactive";
  createdAt: string;
};

export type AdminRole = {
  id: string;
  roleName: RoleName;
  description: string;
  userCount: number;
  createdAt: string;
};

export type SortDirection = "asc" | "desc";

export type PaginatedResult<T> = {
  items: T[];
  total: number;
};
