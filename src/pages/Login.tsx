import { LogIn, ShieldCheck } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../auth/AuthContext";
import { allRoles } from "../config/navigation";
import type { RoleName } from "../types";

export function Login() {
  const [email, setEmail] = useState("admin@gree.com");
  const [password, setPassword] = useState("password");
  const [role, setRole] = useState<RoleName>("Super Admin");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      await login(email, password, role);
      toast.success("Login successful.");
      const redirect = (location.state as { from?: string } | null)?.from ?? "/dashboard";
      navigate(redirect, { replace: true });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to login.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="login-screen">
      <section className="login-panel">
        <div className="login-brand">
          <div className="brand-mark large">G</div>
          <div>
            <span>Company Admin</span>
            <h1>Gree</h1>
          </div>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-title">
            <ShieldCheck size={22} />
            <h2>Sign in to continue</h2>
          </div>
          <label className="field">
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
            />
          </label>
          <label className="field">
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
            />
          </label>
          <label className="field">
            <span>Role</span>
            <select value={role} onChange={(event) => setRole(event.target.value as RoleName)}>
              {allRoles.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <button className="button button-primary login-button" type="submit" disabled={isSubmitting}>
            <LogIn size={18} />
            {isSubmitting ? "Signing in..." : "Login"}
          </button>
        </form>
      </section>
    </main>
  );
}
