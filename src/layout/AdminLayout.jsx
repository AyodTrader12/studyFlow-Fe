// src/layouts/AdminLayout.jsx
// Separate layout for the admin dashboard.
// Different sidebar, header style, and color scheme from the student dashboard.

import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NAV_ITEMS = [
  {
    to:    "/admin",
    label: "Overview",
    end:   true,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
      </svg>
    ),
  },
  {
    to:    "/admin/resources",
    label: "Resources",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
      </svg>
    ),
  },
  {
    to:    "/admin/past-questions",
    label: "Past Questions",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M9 11l3 3L22 4"/>
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
      </svg>
    ),
  },
  {
    to:    "/admin/users",
    label: "Users",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
  },
  {
    to:    "/admin/analytics",
    label: "Analytics",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <line x1="18" y1="20" x2="18" y2="10"/>
        <line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
  },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate  = useNavigate();
  const [mobile, setMobile] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/auth/login");
  };

  const initials = user?.displayName
    ?.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() || "A";

  return (
    <div className="min-h-screen bg-gray-950 flex">

      {/* ── Sidebar ── */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-60 bg-gray-900 border-r border-gray-800
        flex flex-col transition-transform duration-300
        ${mobile ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-gray-800">
          <div className="w-8 h-8 rounded-lg bg-[#1a2a5e] flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 48 48" fill="none">
              <path d="M8 12C8 10.3 9.3 9 11 9H24V39H11C9.3 39 8 37.7 8 36V12Z" fill="white"/>
              <path d="M40 12C40 10.3 38.7 9 37 9H24V39H37C38.7 39 40 37.7 40 36V12Z" fill="white" opacity="0.7"/>
            </svg>
          </div>
          <div>
            <p className="text-white text-sm font-bold">StudyFlow</p>
            <p className="text-gray-500 text-[10px] font-medium uppercase tracking-widest">Admin</p>
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          {NAV_ITEMS.map(({ to, label, icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setMobile(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? "bg-[#1a2a5e] text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`
              }
            >
              {icon}
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Bottom — user + student view link */}
        <div className="px-3 py-4 border-t border-gray-800 flex flex-col gap-2">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-gray-500 hover:bg-gray-800 hover:text-gray-300 transition w-full"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3"/>
            </svg>
            Switch to student view
          </button>

          <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-gray-800">
            <div className="w-7 h-7 rounded-lg bg-[#1a2a5e] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-semibold truncate">{user?.displayName}</p>
              <p className="text-gray-500 text-[10px] truncate">{user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              title="Log out"
              className="text-gray-500 hover:text-red-400 transition"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>
              </svg>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobile && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobile(false)}
        />
      )}

      {/* ── Main content ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden md:ml-60">

        {/* Top bar */}
        <header className="h-14 bg-gray-900 border-b border-gray-800 flex items-center px-5 gap-4 flex-shrink-0">
          {/* Mobile menu button */}
          <button
            className="md:hidden w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-800 transition"
            onClick={() => setMobile((v) => !v)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>

          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-gray-400 text-xs">Admin Panel</span>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <span className="text-gray-600 text-xs">
              {new Date().toLocaleDateString("en-NG", { weekday: "short", month: "short", day: "numeric" })}
            </span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto bg-gray-950 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}