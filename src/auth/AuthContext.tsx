import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { RoleName, UserSession } from "../types";

type AuthContextValue = {
  user: UserSession | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: RoleName) => Promise<void>;
  logout: () => void;
};

const STORAGE_KEY = "admin-panel-session";
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserSession | null>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setUser(JSON.parse(saved) as UserSession);
    }
  }, []);

  const login = useCallback(
    async (email: string, password: string, role: RoleName) => {
      await new Promise((resolve) => window.setTimeout(resolve, 450));

      if (!email.trim() || !password.trim()) {
        throw new Error("Email and password are required.");
      }

      const nextUser: UserSession = {
        id: "usr-current",
        name: email.includes("@") ? email.split("@")[0] : "Admin User",
        email,
        role,
      };

      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
      setUser(nextUser);
    },
    [],
  );

  const logout = useCallback(() => {
    window.localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      logout,
    }),
    [login, logout, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }
  return value;
}
