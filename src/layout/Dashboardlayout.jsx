// DashboardLayout.jsx
// Composes: DashboardTopbar + DashboardLeftSidebar + <Outlet> + DashboardRightSidebar

import { useState } from "react";
import { Outlet } from "react-router-dom";
import TopBar from "../components/TopBar";
import LeftSideBar from "../components/LeftSideBar"
import RightSideBar from "../components/RightSideBar"

export default function DashboardLayout({ user }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-[#f0f3fa] flex flex-col">

      {/* ── Top bar ── */}
      <TopBar
        user={user}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onMenuToggle={() => setMobileOpen((v) => !v)}
        mobileOpen={mobileOpen}
      />

      <div className="flex flex-1 overflow-hidden">

        {/* ── Left Sidebar ── */}
        <LeftSideBar
          user={user}
          collapsed={collapsed}
          onCollapseToggle={() => setCollapsed((v) => !v)}
          mobileOpen={mobileOpen}
          onMobileClose={() => setMobileOpen(false)}
        />

        {/* ── Main Content ── */}
        <main className={`flex-1 min-w-0 overflow-auto p-5 lg:p-7 transition-all duration-300 ${collapsed ? "md:ml-[68px]" : "md:ml-[220px]"} xl:mr-[280px]`}>
          <Outlet context={{ searchQuery, user }} />
        </main>

        {/* ── Right Sidebar (desktop xl+) ── */}
        <aside className="hidden xl:fixed xl:flex flex-col w-[280px] top-16 right-0 h-[calc(100vh-4rem)] p-5 gap-5 overflow-y-auto bg-[#f0f3fa]">
          <RightSideBar user={user} />
        </aside>
      </div>
    </div>
  );
}