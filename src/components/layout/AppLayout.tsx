import { Menu, PanelLeftClose, Search, ShieldCheck, X } from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { navItems } from "../../config/navigation";

export function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const visibleItems = useMemo(
    () => navItems.filter((item) => user && item.roles.includes(user.role)),
    [user],
  );

  const activeTitle =
    visibleItems.find((item) => location.pathname.startsWith(item.path))?.label ??
    "Admin Panel";

  return (
    <div className="app-shell">
      <Sidebar
        isOpen={isSidebarOpen}
        visibleItems={visibleItems}
        onClose={() => setIsSidebarOpen(false)}
      />
      <div className="shell-main">
        <header className="topbar">
          <div className="topbar-left">
            <button
              className="icon-button topbar-menu"
              aria-label="Open menu"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>
            <div className="brand-lockup">
              <div className="brand-mark" aria-hidden="true">
                G
              </div>
              <div>
                <strong>Gree</strong>
                <span>Admin Panel</span>
              </div>
            </div>
          </div>
          <div className="topbar-center" role="search">
            <Search size={18} />
            <input aria-label="Global search" placeholder="Search admin records" />
          </div>
          <div className="topbar-actions">
            <div className="user-pill">
              <ShieldCheck size={16} />
              <span>{user?.role}</span>
            </div>
            <button className="button button-ghost" onClick={logout}>
              Logout
            </button>
          </div>
        </header>
        <main className="content-frame">
          <div className="page-kicker">{activeTitle}</div>
          <Outlet />
        </main>
        <footer className="footer">
          Gree Admin Panel. All trademarks belong to their respective owners.
        </footer>
      </div>
    </div>
  );
}

function Sidebar({
  isOpen,
  visibleItems,
  onClose,
}: {
  isOpen: boolean;
  visibleItems: typeof navItems;
  onClose: () => void;
}) {
  return (
    <>
      <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-head">
          <div className="sidebar-logo">
            <span>G</span>
            <strong>Operations</strong>
          </div>
          <button className="icon-button sidebar-close" aria-label="Close menu" onClick={onClose}>
            <X size={18} />
          </button>
          <PanelLeftClose className="sidebar-pin" size={18} aria-hidden="true" />
        </div>
        <nav className="side-nav" aria-label="Main navigation">
          {visibleItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={`${item.label}-${item.path}`}
                to={item.path}
                className={({ isActive }) => `side-link ${isActive ? "active" : ""}`}
                onClick={onClose}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>
      {isOpen ? <button className="sidebar-backdrop" aria-label="Close menu" onClick={onClose} /> : null}
    </>
  );
}

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="page-header">
      <div>
        <h1>{title}</h1>
        {description ? <p>{description}</p> : null}
      </div>
      {action ? <div className="page-action">{action}</div> : null}
    </div>
  );
}
