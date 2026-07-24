import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import {
  pendingContractorConfig,
  productModelConfig,
  productSerialConfig,
  registeredContractorConfig,
  registrationConfig,
  roleConfig,
  userConfig,
} from "./config/entities";
import { Dashboard } from "./pages/Dashboard";
import { EntityPage } from "./pages/EntityPage";
import { Login } from "./pages/Login";
import { NotFound } from "./pages/NotFound";
import { UploadProductSerials } from "./pages/UploadProductSerials";
import { ProtectedRoute } from "./routes/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="product-models" element={<EntityPage {...productModelConfig} />} />
        <Route path="product-serials" element={<EntityPage {...productSerialConfig} />} />
        <Route path="product-registrations" element={<EntityPage {...registrationConfig} />} />
        <Route
          path="registered-contractors"
          element={<EntityPage {...registeredContractorConfig} />}
        />
        <Route
          path="pending-contractors"
          element={<EntityPage {...pendingContractorConfig} />}
        />
        <Route path="upload-product-serials" element={<UploadProductSerials />} />
        <Route
          path="users"
          element={
            <ProtectedRoute roles={["Super Admin"]}>
              <EntityPage {...userConfig} />
            </ProtectedRoute>
          }
        />
        <Route
          path="roles"
          element={
            <ProtectedRoute roles={["Super Admin"]}>
              <EntityPage {...roleConfig} />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
