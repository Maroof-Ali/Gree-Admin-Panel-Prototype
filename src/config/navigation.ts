import {
  BarChart3,
  Boxes,
  CircleUserRound,
  ClipboardCheck,
  FileSpreadsheet,
  LayoutDashboard,
  ShieldCheck,
  Tag,
  UserCheck,
  Users,
} from "lucide-react";
import type { NavItem, RoleName } from "../types";

export const allRoles: RoleName[] = ["Super Admin", "Admin", "Support"];
const managerRoles: RoleName[] = ["Super Admin", "Admin"];

export const navItems: NavItem[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    roles: allRoles,
  },
  {
    label: "Product Models",
    path: "/product-models",
    icon: Boxes,
    roles: managerRoles,
  },
  {
    label: "Product Serials",
    path: "/product-serials",
    icon: Tag,
    roles: managerRoles,
  },
  {
    label: "Product Registrations",
    path: "/product-registrations",
    icon: ClipboardCheck,
    roles: allRoles,
  },
  {
    label: "Registered Contractors",
    path: "/registered-contractors",
    icon: UserCheck,
    roles: allRoles,
  },
  {
    label: "Pending Contractors",
    path: "/pending-contractors",
    icon: CircleUserRound,
    roles: managerRoles,
  },
  {
    label: "Upload Product Serials",
    path: "/upload-product-serials",
    icon: FileSpreadsheet,
    roles: managerRoles,
  },
  {
    label: "Users",
    path: "/users",
    icon: Users,
    roles: ["Super Admin"],
  },
  {
    label: "Roles",
    path: "/roles",
    icon: ShieldCheck,
    roles: ["Super Admin"],
  },
  {
    label: "Analytics",
    path: "/dashboard",
    icon: BarChart3,
    roles: allRoles,
  },
];
