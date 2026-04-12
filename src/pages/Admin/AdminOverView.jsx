// src/pages/admin/AdminOverview.jsx
// Admin dashboard home page.
// Shows platform-wide stats, recent users, recent resources, quick actions.

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { get } from "../../api/client";

function StatCard({ label, value, sub, color, icon }) {
  return (
    <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
          {icon}
        </div>
      </div>
      <p className="text-2xl font-extrabold text-white">{value ?? "—"}</p>
      <p className="text-sm font-medium text-gray-400 mt-0.5">{label}</p>
      {sub && <p className="text-xs text-gray-600 mt-0.5">{sub}</p>}
    </div>
  );
}

export default function AdminOverview() {
  const navigate = useNavigate();
  const [stats,         setStats]         = useState(null);
  const [recentUsers,   setRecentUsers]   = useState([]);
  const [recentRes,     setRecentRes]     = useState([]);
  const [loading,       setLoading]       = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [statsData, usersData, resData] = await Promise.all([
          get("/api/admin/stats"),
          get("/api/admin/users?limit=5&sort=newest"),
          get("/api/resources?limit=5"),
        ]);
        setStats(statsData);
        setRecentUsers(usersData.users || []);
        setRecentRes(resData.resources || []);
      } catch (err) {
        console.error("Admin overview error:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const STAT_CARDS = [
    {
      label: "Total Users",
      value: stats?.totalUsers,
      sub:   `${stats?.verifiedUsers ?? 0} verified`,
      color: "bg-blue-900/50",
      icon:  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="1.8" strokeLinecap="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
    },
    {
      label: "Total Resources",
      value: stats?.totalResources,
      sub:   `${stats?.publishedResources ?? 0} published`,
      color: "bg-purple-900/50",
      icon:  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.8" strokeLinecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
    },
    {
      label: "Past Questions",
      value: stats?.totalPastQuestions,
      sub:   "across all exam bodies",
      color: "bg-green-900/50",
      icon:  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="1.8" strokeLinecap="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>,
    },
    {
      label: "Resources Viewed",
      value: stats?.totalViews,
      sub:   "total views across platform",
      color: "bg-orange-900/50",
      icon:  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fb923c" strokeWidth="1.8" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
    },
  ];

  const QUICK_ACTIONS = [
    { label: "Add Resource",       path: "/admin/resources",      color: "bg-blue-600 hover:bg-blue-700" },
    { label: "Add Past Question",  path: "/admin/past-questions", color: "bg-purple-600 hover:bg-purple-700" },
    { label: "View All Users",     path: "/admin/users",          color: "bg-gray-700 hover:bg-gray-600" },
    { label: "View Analytics",     path: "/admin/analytics",      color: "bg-gray-700 hover:bg-gray-600" },
  ];

  return (
    <div className="flex flex-col gap-7 max-w-6xl">

      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-white">Dashboard Overview</h1>
        <p className="text-gray-500 text-sm mt-1">
          {new Date().toLocaleDateString("en-NG", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>

      {/* Stats */}
      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-900 rounded-2xl border border-gray-800 p-5 animate-pulse">
              <div className="w-10 h-10 bg-gray-800 rounded-xl mb-3" />
              <div className="h-7 bg-gray-800 rounded w-1/2 mb-2" />
              <div className="h-3 bg-gray-800 rounded w-2/3" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STAT_CARDS.map((s) => <StatCard key={s.label} {...s} />)}
        </div>
      )}

      {/* Quick actions */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5">
        <h2 className="text-sm font-bold text-white mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          {QUICK_ACTIONS.map(({ label, path, color }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`px-4 py-2.5 rounded-xl text-white text-sm font-semibold transition ${color}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Recent users */}
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-white">Recent Users</h2>
            <button
              onClick={() => navigate("/admin/users")}
              className="text-xs text-blue-400 hover:underline"
            >
              View all →
            </button>
          </div>

          {loading ? (
            <div className="flex flex-col gap-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-10 bg-gray-800 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : recentUsers.length === 0 ? (
            <p className="text-gray-600 text-sm text-center py-6">No users yet.</p>
          ) : (
            <div className="flex flex-col divide-y divide-gray-800">
              {recentUsers.map((u) => (
                <div key={u._id} className="flex items-center gap-3 py-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#1a2a5e] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {u.displayName?.charAt(0)?.toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{u.displayName}</p>
                    <p className="text-xs text-gray-500 truncate">{u.email}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      u.isVerified ? "bg-green-900/60 text-green-400" : "bg-amber-900/60 text-amber-400"
                    }`}>
                      {u.isVerified ? "Verified" : "Unverified"}
                    </span>
                    <span className="text-[10px] text-gray-600">
                      {u.classLevel || "No class"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent resources */}
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-white">Recent Resources</h2>
            <button
              onClick={() => navigate("/admin/resources")}
              className="text-xs text-blue-400 hover:underline"
            >
              Manage →
            </button>
          </div>

          {loading ? (
            <div className="flex flex-col gap-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-10 bg-gray-800 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : recentRes.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-gray-600 text-sm mb-3">No resources yet.</p>
              <button
                onClick={() => navigate("/admin/resources")}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition"
              >
                Add your first resource
              </button>
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-gray-800">
              {recentRes.map((r) => (
                <div key={r._id} className="flex items-center gap-3 py-2.5">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-[10px] font-bold ${
                    r.type === "youtube" ? "bg-red-900/60 text-red-400" :
                    r.type === "notes"   ? "bg-purple-900/60 text-purple-400" :
                    r.type === "pdf"     ? "bg-blue-900/60 text-blue-400" :
                                           "bg-green-900/60 text-green-400"
                  }`}>
                    {r.type === "youtube" ? "VID" : r.type === "notes" ? "TXT" : r.type === "pdf" ? "PDF" : "ART"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{r.title}</p>
                    <p className="text-xs text-gray-500">{r.subject} · {r.level}</p>
                  </div>
                  <span className="text-xs text-gray-600 flex-shrink-0">{r.views} views</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}