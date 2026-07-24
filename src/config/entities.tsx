import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { adminApi } from "../api/adminApi";
import { Badge } from "../components/common/Badge";
import type { Column } from "../components/common/DataTable";
import type { FieldConfig } from "../components/common/EntityForm";
import type {
  AdminRole,
  AdminUser,
  Contractor,
  ProductModel,
  ProductRegistration,
  ProductSerial,
} from "../types";

const today = () => new Date().toISOString().slice(0, 10);
const id = (prefix: string) => `${prefix}-${crypto.randomUUID()}`;

export const productModelConfig = {
  title: "Product Models",
  description: "Manage model specifications, series, voltage, CH type, and capacities.",
  addLabel: "Add Product Model",
  columns: [
    { key: "model", label: "Model No", sortable: true },
    { key: "seriesName", label: "Series Name", sortable: true },
    { key: "categoryDescription", label: "Description", sortable: true },
    { key: "voltage", label: "Voltage", sortable: true },
    { key: "chType", label: "CH Type", sortable: true },
    { key: "capacityBtu", label: "Capacity(BTU)", sortable: true },
    { key: "capacityTon", label: "Capacity(Ton)", sortable: true },
  ] satisfies Column<ProductModel>[],
  fields: [
    { name: "model", label: "Model No" },
    { name: "seriesName", label: "Series Name" },
    { name: "categoryDescription", label: "Description", type: "textarea" },
    { name: "voltage", label: "Voltage", type: "select", options: ["115V", "208/230V", "460V"] },
    { name: "chType", label: "CH Type", type: "select", options: ["Cooling", "Heating", "Hybrid"] },
    { name: "capacityBtu", label: "Capacity(BTU)", type: "number" },
    { name: "capacityTon", label: "Capacity(Ton)", type: "number" },
  ] satisfies FieldConfig<ProductModel>[],
  createEmpty: (): ProductModel => ({
    id: id("model"),
    model: "",
    seriesName: "",
    categoryDescription: "",
    voltage: "208/230V",
    chType: "Cooling",
    capacityBtu: 0,
    capacityTon: 0,
    createdAt: today(),
  }),
  list: adminApi.listProductModels,
  save: adminApi.saveProductModel,
  remove: adminApi.deleteProductModel,
};

export const productSerialConfig = {
  title: "Product Serials",
  description: "Manage serial numbers and map them to product models.",
  addLabel: "Add Product Serial",
  columns: [
    { key: "serialNo", label: "Serial No", sortable: true },
    { key: "customerSerialNo", label: "Customer Serial No", sortable: true },
    { key: "productModel", label: "Product Model", sortable: true },
  ] satisfies Column<ProductSerial>[],
  fields: [
    { name: "serialNo", label: "Serial No" },
    { name: "customerSerialNo", label: "Customer Serial No" },
    { name: "productModel", label: "Product Model" },
  ] satisfies FieldConfig<ProductSerial>[],
  createEmpty: (): ProductSerial => ({
    id: id("serial"),
    serialNo: "",
    customerSerialNo: "",
    productModel: "",
    createdAt: today(),
  }),
  list: adminApi.listProductSerials,
  save: adminApi.saveProductSerial,
  remove: adminApi.deleteProductSerial,
};

export const registrationConfig = {
  title: "Product Registrations",
  description: "Review and maintain submitted product registration details.",
  addLabel: "Add Product Registration",
  columns: [
    { key: "firstName", label: "First Name", sortable: true },
    { key: "lastName", label: "Last Name", sortable: true },
    { key: "phone", label: "Phone", sortable: true },
    { key: "email", label: "Email", sortable: true },
    { key: "productSerialId", label: "Product Serial", sortable: true },
    { key: "contractorId", label: "Contractor", sortable: true },
    { key: "createdAt", label: "Created At", sortable: true },
  ] satisfies Column<ProductRegistration>[],
  fields: [
    { name: "firstName", label: "First Name" },
    { name: "lastName", label: "Last Name" },
    { name: "phone", label: "Phone" },
    { name: "email", label: "Email", type: "email" },
    { name: "address1", label: "Address 1" },
    { name: "address2", label: "Address 2" },
    { name: "zipCode", label: "Zip Code" },
    { name: "city", label: "City" },
    { name: "state", label: "State" },
    { name: "country", label: "Country" },
    { name: "differentMailingAddress", label: "Different Mailing Address", type: "checkbox" },
    { name: "marketingPromotion", label: "Marketing Promotion", type: "checkbox" },
    { name: "registrantRole", label: "Registrant Role", type: "select", options: ["Homeowner", "Contractor", "Builder"] },
    { name: "installationDate", label: "Installation Date", type: "date" },
    { name: "installationType", label: "Installation Type", type: "select", options: ["Replacement", "New Construction", "Retrofit"] },
    { name: "inactive", label: "Inactive", type: "checkbox" },
    { name: "productSerialId", label: "Product Serial ID" },
    { name: "contractorId", label: "Contractor ID" },
  ] satisfies FieldConfig<ProductRegistration>[],
  createEmpty: (): ProductRegistration => ({
    id: id("registration"),
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address1: "",
    address2: "",
    zipCode: "",
    city: "",
    state: "",
    country: "USA",
    differentMailingAddress: false,
    marketingPromotion: false,
    registrantRole: "Homeowner",
    installationDate: today(),
    installationType: "Replacement",
    inactive: false,
    productSerialId: "",
    contractorId: "",
    createdAt: today(),
  }),
  list: adminApi.listProductRegistrations,
  save: adminApi.saveProductRegistration,
  remove: adminApi.deleteProductRegistration,
};

export const registeredContractorConfig = {
  title: "Registered Contractors",
  description: "Manage approved contractor profiles and approval attribution.",
  addLabel: "Add Contractor",
  columns: [
    { key: "contractorName", label: "Contractor Name", sortable: true },
    { key: "phoneNo", label: "Phone No", sortable: true },
    { key: "emailAddress", label: "Email Address", sortable: true },
    { key: "city", label: "City", sortable: true },
    { key: "state", label: "State", sortable: true },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (row) => <Badge tone="success">{row.status}</Badge>,
    },
    { key: "approvedBy", label: "Approved By", sortable: true },
  ] satisfies Column<Contractor>[],
  fields: contractorFields(),
  createEmpty: (): Contractor => ({
    id: id("contractor"),
    contractorName: "",
    phoneNo: "",
    emailAddress: "",
    address: "",
    city: "",
    zipcode: "",
    state: "",
    applicantName: "",
    applicantTitle: "",
    status: "Approved",
    approvedBy: "Gree Admin",
    createdAt: today(),
    updatedAt: today(),
  }),
  list: (options: Parameters<typeof adminApi.listContractors>[0]) =>
    adminApi.listContractors(options, "Approved"),
  save: adminApi.saveContractor,
  remove: adminApi.deleteContractor,
};

export const pendingContractorConfig = {
  ...registeredContractorConfig,
  title: "Pending Contractors",
  description: "Review contractor applications and approve eligible records.",
  addLabel: "Add Pending Contractor",
  columns: [
    { key: "contractorName", label: "Contractor Name", sortable: true },
    { key: "phoneNo", label: "Phone No", sortable: true },
    { key: "emailAddress", label: "Email Address", sortable: true },
    { key: "applicantName", label: "Applicant Name", sortable: true },
    { key: "applicantTitle", label: "Applicant Title", sortable: true },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (row: Contractor) => <Badge tone="warning">{row.status}</Badge>,
    },
  ] satisfies Column<Contractor>[],
  createEmpty: (): Contractor => ({
    ...registeredContractorConfig.createEmpty(),
    id: id("contractor"),
    status: "Pending",
    approvedBy: "",
  }),
  list: (options: Parameters<typeof adminApi.listContractors>[0]) =>
    adminApi.listContractors(options, "Pending"),
  extraAction: (row: Contractor, refresh: () => void) =>
    row.status === "Pending" ? (
      <button
        className="button button-success"
        type="button"
        onClick={async () => {
          await adminApi.approveContractor(row.id, "Gree Admin");
          toast.success("Contractor approved.");
          refresh();
        }}
      >
        <CheckCircle2 size={18} />
        Approve
      </button>
    ) : null,
};

export const userConfig = {
  title: "Users",
  description: "Manage admin users and assigned roles.",
  addLabel: "Add User",
  columns: [
    { key: "name", label: "Name", sortable: true },
    { key: "email", label: "Email", sortable: true },
    { key: "role", label: "Role", sortable: true },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (row) => (
        <Badge tone={row.status === "Active" ? "success" : "neutral"}>{row.status}</Badge>
      ),
    },
    { key: "createdAt", label: "Created At", sortable: true },
  ] satisfies Column<AdminUser>[],
  fields: [
    { name: "name", label: "Name" },
    { name: "email", label: "Email", type: "email" },
    { name: "role", label: "Role", type: "select", options: ["Super Admin", "Admin", "Support"] },
    { name: "status", label: "Status", type: "select", options: ["Active", "Inactive"] },
  ] satisfies FieldConfig<AdminUser>[],
  createEmpty: (): AdminUser => ({
    id: id("user"),
    name: "",
    email: "",
    role: "Admin",
    status: "Active",
    createdAt: today(),
  }),
  list: adminApi.listUsers,
  save: adminApi.saveUser,
  remove: adminApi.deleteUser,
};

export const roleConfig = {
  title: "Roles",
  description: "Manage role names, descriptions, and user allocation counts.",
  addLabel: "Add Role",
  columns: [
    { key: "roleName", label: "Role", sortable: true },
    { key: "description", label: "Description", sortable: true },
    { key: "userCount", label: "Users", sortable: true },
    { key: "createdAt", label: "Created At", sortable: true },
  ] satisfies Column<AdminRole>[],
  fields: [
    { name: "roleName", label: "Role", type: "select", options: ["Super Admin", "Admin", "Support"] },
    { name: "description", label: "Description", type: "textarea" },
    { name: "userCount", label: "Users", type: "number" },
  ] satisfies FieldConfig<AdminRole>[],
  createEmpty: (): AdminRole => ({
    id: id("role"),
    roleName: "Admin",
    description: "",
    userCount: 0,
    createdAt: today(),
  }),
  list: adminApi.listRoles,
  save: adminApi.saveRole,
  remove: adminApi.deleteRole,
};

function contractorFields(): FieldConfig<Contractor>[] {
  return [
    { name: "contractorName", label: "Contractor Name" },
    { name: "phoneNo", label: "Phone No" },
    { name: "emailAddress", label: "Email Address", type: "email" },
    { name: "address", label: "Address" },
    { name: "city", label: "City" },
    { name: "zipcode", label: "Zipcode" },
    { name: "state", label: "State" },
    { name: "applicantName", label: "Applicant Name" },
    { name: "applicantTitle", label: "Applicant Title" },
    { name: "status", label: "Status", type: "select", options: ["Approved", "Pending", "Rejected"] },
    { name: "approvedBy", label: "Approved By" },
  ];
}
