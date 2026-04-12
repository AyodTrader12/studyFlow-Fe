// src/pages/admin/AdminUsers.jsx
// Admin user management: view all users, search, see stats, verify status.

import { useState, useEffect, useCallback } from "react";
import { get } from "../../api/client";

export default function AdminUsers() {
  const [users,    setUsers]    = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [search,   setSearch]   = useState("");
  const [filter,   setFilter]   = useState("all"); // all | verified | unverified | admin

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (filter !== "all") params.set("filter", filter);
      const data = await get(`/api/admin/users?${params.toString()}`);
      setUsers(data.users || []);
    } catch (err) {
      console.error("Failed to fetch users:", err.message);
    } finally {
      setLoading(false);
    }
  }, [search, filter]);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const FILTERS = [
    { value: "all",         label: "All Users" },
    { value: "verified",    label: "Verified" },
    { value: "unverified",  label: "Unverified" },
    { value: "admin",       label: "Admins" },
  ];

  return (
    <div className="flex flex-col gap-6 max-w-5xl">

      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-white">Users</h1>
        <p className="text-gray-500 text-sm mt-1">
          {loading ? "Loading..." : `${users.length} user${users.length !== 1 ? "s" : ""}`}
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48 max-w-sm">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-sm text-white placeholder-gray-500 outline-none focus:border-blue-500 transition"
          />
        </div>

        <div className="flex gap-2">
          {FILTERS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition ${
                filter === value
                  ? "bg-[#1a2a5e] text-white border border-blue-700"
                  : "bg-gray-800 border border-gray-700 text-gray-400 hover:border-gray-600"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
        {/* Table header */}
        <div className="grid grid-cols-12 gap-3 px-5 py-3 border-b border-gray-800 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
          <div className="col-span-4">User</div>
          <div className="col-span-2">Class</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Resources</div>
          <div className="col-span-2">Streak</div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col divide-y divide-gray-800">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="px-5 py-3 animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-800 rounded-xl flex-shrink-0" />
                  <div className="flex-1">
                    <div className="h-3 bg-gray-800 rounded w-1/3 mb-1.5" />
                    <div className="h-2.5 bg-gray-800 rounded w-1/2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && users.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-600 text-sm">No users found.</p>
          </div>
        )}

        {/* Rows */}
        {!loading && users.length > 0 && (
          <div className="flex flex-col divide-y divide-gray-800">
            {users.map((u) => (
              <div
                key={u._id}
                className="grid grid-cols-12 gap-3 px-5 py-3 items-center hover:bg-gray-800/50 transition"
              >
                {/* User */}
                <div className="col-span-4 flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-[#1a2a5e] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {u.displayName?.charAt(0)?.toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white truncate flex items-center gap-1.5">
                      {u.displayName}
                      {u.isAdmin && (
                        <span className="text-[9px] font-bold bg-yellow-900/60 text-yellow-400 px-1.5 py-0.5 rounded-md">
                          ADMIN
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{u.email}</p>
                  </div>
                </div>

                {/* Class */}
                <div className="col-span-2">
                  <span className="text-xs text-gray-400">{u.classLevel || "—"}</span>
                </div>

                {/* Status */}
                <div className="col-span-2">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    u.isVerified
                      ? "bg-green-900/60 text-green-400"
                      : "bg-amber-900/60 text-amber-400"
                  }`}>
                    {u.isVerified ? "Verified" : "Unverified"}
                  </span>
                </div>

                {/* Resources viewed */}
                <div className="col-span-2">
                  <span className="text-xs text-gray-400">{u.totalResourcesViewed ?? 0}</span>
                </div>

                {/* Streak */}
                <div className="col-span-2">
                  <span className="text-xs text-orange-400 font-bold">
                    {u.streak?.current > 0 ? `${u.streak.current} 🔥` : "—"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}