// src/pages/admin/AdminAnalytics.jsx
// What the analytics page shows:
//
// ROW 1 — Summary stats: signups this week, views this week, active subjects, top resource
// ROW 2 — Line chart: daily signups vs daily views (last 30 days)
// ROW 3 — Left: pie chart of resources by subject | Right: bar chart of resources by type
// ROW 4 — Left: subject engagement (what students are studying) | Right: top resources table
// ROW 5 — Class level distribution (horizontal bar)
//
// Uses recharts — no extra install needed (already listed in many React setups).
// If recharts is not installed: npm install recharts

import { useState, useEffect } from "react";
import {
  LineChart, Line, BarChart, Bar,
  PieChart, Pie, Cell, Tooltip,
  XAxis, YAxis, CartesianGrid,
  ResponsiveContainer, Legend,
} from "recharts";
import { get } from "../../api/client";

// ── Color palette ─────────────────────────────────────────────────────────────
const COLORS = [
  "#3b82f6", "#8b5cf6", "#10b981", "#f59e0b",
  "#ef4444", "#06b6d4", "#ec4899", "#84cc16",
  "#f97316", "#6366f1", "#14b8a6", "#a855f7",
];

const TYPE_COLORS = {
  youtube: "#ef4444",
  notes:   "#8b5cf6",
  pdf:     "#3b82f6",
  article: "#10b981",
};

const TYPE_LABELS = {
  youtube: "Video",
  notes:   "Notes",
  pdf:     "PDF",
  article: "Article",
};

// ── Shared dark chart styles ──────────────────────────────────────────────────
const CHART_STYLE = {
  background:  "transparent",
  fontFamily:  "inherit",
};

const AXIS_STYLE = {
  tick:  { fill: "#6b7280", fontSize: 11 },
  axisLine: { stroke: "#374151" },
  tickLine: { stroke: "#374151" },
};

const GRID_STYLE = { stroke: "#1f2937", strokeDasharray: "3 3" };

const TOOLTIP_STYLE = {
  contentStyle: {
    background: "#111827",
    border:     "1px solid #374151",
    borderRadius: "12px",
    color:      "#f9fafb",
    fontSize:   "12px",
  },
  labelStyle:   { color: "#9ca3af" },
};

// ── Stat card ─────────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, color }) {
  return (
    <div className={`rounded-2xl border border-gray-800 p-5 ${color}`}>
      <p className="text-2xl font-extrabold text-white">{value ?? "—"}</p>
      <p className="text-sm font-medium text-gray-400 mt-0.5">{label}</p>
      {sub && <p className="text-xs text-gray-600 mt-0.5">{sub}</p>}
    </div>
  );
}

// ── Section wrapper ───────────────────────────────────────────────────────────
function ChartCard({ title, subtitle, children, className = "" }) {
  return (
    <div className={`bg-gray-900 rounded-2xl border border-gray-800 p-5 ${className}`}>
      <div className="mb-4">
        <p className="text-sm font-bold text-white">{title}</p>
        {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

// ── Custom pie label ──────────────────────────────────────────────────────────
function PieLabel({ cx, cy, midAngle, innerRadius, outerRadius, name, percent }) {
  if (percent < 0.05) return null; // skip tiny slices
  const RADIAN = Math.PI / 180;
  const r  = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x  = cx + r * Math.cos(-midAngle * RADIAN);
  const y  = cy + r * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={10} fontWeight={600}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
}

// ── Loading skeleton ──────────────────────────────────────────────────────────
function ChartSkeleton({ height = 220 }) {
  return (
    <div className={`animate-pulse bg-gray-800 rounded-xl`} style={{ height }} />
  );
}

// ── Format date for X axis ───────────────────────────────────────────────────
function shortDate(dateStr) {
  const d = new Date(dateStr);
  return `${d.getDate()}/${d.getMonth() + 1}`;
}

function formatMinutes(seconds) {
  if (!seconds) return "0m";
  const m = Math.round(seconds / 60);
  if (m < 60) return `${m}m`;
  return `${Math.floor(m / 60)}h ${m % 60}m`;
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function AdminAnalytics() {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    get("/api/admin/analytics")
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (error) return (
    <div className="flex flex-col items-center justify-center py-20 gap-3">
      <p className="text-red-400 text-sm">{error}</p>
      <button
        onClick={() => { setError(null); setLoading(true); get("/api/admin/analytics").then(setData).catch((e) => setError(e.message)).finally(() => setLoading(false)); }}
        className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition"
      >
        Retry
      </button>
    </div>
  );

  // ── Summary stats ─────────────────────────────────────────────────────────
  const totalViews     = data?.viewsPerDay?.reduce((s, d) => s + d.count, 0) ?? 0;
  const recentSignups  = data?.recentSignups ?? 0;
  const topResource    = data?.topResources?.[0];
  const activeSubjects = data?.subjectEngagement?.length ?? 0;

  const STATS = [
    {
      label: "New users (7 days)",
      value: recentSignups,
      sub:   "signed up this week",
      color: "bg-blue-950/60",
    },
    {
      label: "Views (30 days)",
      value: totalViews,
      sub:   "resources opened",
      color: "bg-purple-950/60",
    },
    {
      label: "Active subjects",
      value: activeSubjects,
      sub:   "studied this week",
      color: "bg-green-950/60",
    },
    {
      label: "Most viewed resource",
      value: topResource ? `${topResource.views} views` : "—",
      sub:   topResource?.title?.slice(0, 30) + (topResource?.title?.length > 30 ? "..." : "") || "",
      color: "bg-orange-950/60",
    },
  ];

  // ── Combine signups + views for dual line chart ───────────────────────────
  const lineData = (data?.signupsPerDay ?? []).map((d, i) => ({
    date:    shortDate(d.date),
    signups: d.count,
    views:   data?.viewsPerDay?.[i]?.count ?? 0,
  }));
  // ── Pie chart data ────────────────────────────────────────────────────────
  const pieData = (data?.resourcesBySubject ?? []) 
    .slice(0, 8)
    .map((d) => ({ name: d.subject, value: d.count }));

  // ── Bar chart data ────────────────────────────────────────────────────────
  const barData = (data?.resourcesByType ?? []).map((d) => ({
    name:  TYPE_LABELS[d.type] || d.type,
    count: d.count,
    views: d.views,
    color: TYPE_COLORS[d.type] || "#6b7280",
  }));

  // ── Subject engagement ────────────────────────────────────────────────────
  const maxEngagement = Math.max(...(data?.subjectEngagement ?? []).map((d) => d.views), 1);

  return (
    <div className="flex flex-col gap-6 max-w-6xl">

      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-white">Analytics</h1>
        <p className="text-gray-500 text-sm mt-1">Platform activity over the last 30 days.</p>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {loading
          ? [...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-900 rounded-2xl border border-gray-800 p-5 animate-pulse">
                <div className="h-7 bg-gray-800 rounded w-1/2 mb-2" />
                <div className="h-3 bg-gray-800 rounded w-3/4" />
              </div>
            ))
          : STATS.map((s) => <StatCard key={s.label} {...s} />)
        }
      </div>

      {/* Daily activity — dual line chart */}
      <ChartCard
        title="Daily activity — last 30 days"
        subtitle="New user signups vs resources viewed each day"
      >
        {loading ? <ChartSkeleton height={240} /> : (
          <ResponsiveContainer width="100%" height={240} style={CHART_STYLE}>
            <LineChart data={lineData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid {...GRID_STYLE} />
              <XAxis dataKey="date" {...AXIS_STYLE} interval={4} />
              <YAxis {...AXIS_STYLE} />
              <Tooltip {...TOOLTIP_STYLE} />
              <Legend
                wrapperStyle={{ color: "#9ca3af", fontSize: "12px" }}
              />
              <Line
                type="monotone"
                dataKey="signups"
                name="New users"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="views"
                name="Resources viewed"
                stroke="#8b5cf6"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </ChartCard>

      {/* Two-column: pie + bar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Resources by subject — pie */}
        <ChartCard
          title="Resources by subject"
          subtitle="How your content library is distributed"
        >
          {loading ? <ChartSkeleton height={260} /> : (
            <>
              <ResponsiveContainer width="100%" height={220} style={CHART_STYLE}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    dataKey="value"
                    labelLine={false}
                    label={PieLabel}
                  >
                    {pieData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    {...TOOLTIP_STYLE}
                    formatter={(value, name) => [`${value} resources`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
              {/* Legend below the chart */}
              <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-2">
                {pieData.map((d, i) => (
                  <div key={d.name} className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: COLORS[i % COLORS.length] }} />
                    <span className="text-[11px] text-gray-400">{d.name} ({d.value})</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </ChartCard>

        {/* Resources by type — bar */}
        <ChartCard
          title="Resources by type"
          subtitle="Videos, notes, PDFs and articles"
        >
          {loading ? <ChartSkeleton height={260} /> : (
            <ResponsiveContainer width="100%" height={220} style={CHART_STYLE}>
              <BarChart data={barData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid {...GRID_STYLE} />
                <XAxis dataKey="name" {...AXIS_STYLE} />
                <YAxis {...AXIS_STYLE} />
                <Tooltip
                  {...TOOLTIP_STYLE}
                  formatter={(value, name) => [value, name === "count" ? "Resources" : "Views"]}
                />
                <Legend wrapperStyle={{ color: "#9ca3af", fontSize: "12px" }} />
                <Bar dataKey="count" name="Resources" radius={[6, 6, 0, 0]}>
                  {barData.map((d, i) => (
                    <Cell key={i} fill={d.color} />
                  ))}
                </Bar>
                <Bar dataKey="views" name="Views" fill="#374151" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </ChartCard>
      </div>

      {/* Two-column: subject engagement + top resources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Subject engagement this week */}
        <ChartCard
          title="What students are studying"
          subtitle="Subject engagement — last 7 days"
        >
          {loading ? <ChartSkeleton height={280} /> : (
            data?.subjectEngagement?.length === 0 ? (
              <p className="text-gray-600 text-sm text-center py-10">
                No activity yet this week.
              </p>
            ) : (
              <div className="flex flex-col gap-3 mt-1">
                {(data?.subjectEngagement ?? []).map((d) => {
                  const pct = Math.round((d.views / maxEngagement) * 100);
                  return (
                    <div key={d.subject}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-gray-300 truncate">{d.subject}</span>
                        <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                          <span className="text-[10px] text-gray-500">{formatMinutes(d.timeSpent)}</span>
                          <span className="text-[10px] font-bold text-white">{d.views}</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all duration-700 bg-blue-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
                <p className="text-[10px] text-gray-600 mt-1">
                  Bar = relative views. Number = resources opened.
                </p>
              </div>
            )
          )}
        </ChartCard>

        {/* Top 10 most viewed resources */}
        <ChartCard
          title="Top resources"
          subtitle="Most viewed across the platform"
        >
          {loading ? <ChartSkeleton height={280} /> : (
            data?.topResources?.length === 0 ? (
              <p className="text-gray-600 text-sm text-center py-10">No views yet.</p>
            ) : (
              <div className="flex flex-col divide-y divide-gray-800">
                {(data?.topResources ?? []).slice(0, 8).map((r, i) => (
                  <div key={r._id} className="flex items-center gap-3 py-2.5">
                    <span className="text-xs font-bold text-gray-600 w-5 flex-shrink-0 text-right">
                      {i + 1}
                    </span>
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-[9px] font-bold flex-shrink-0 ${
                      r.type === "youtube" ? "bg-red-900/60 text-red-400"   :
                      r.type === "notes"   ? "bg-purple-900/60 text-purple-400" :
                      r.type === "pdf"     ? "bg-blue-900/60 text-blue-400" :
                                             "bg-green-900/60 text-green-400"
                    }`}>
                      {r.type === "youtube" ? "▶" : r.type === "notes" ? "N" : r.type === "pdf" ? "P" : "A"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-white truncate">{r.title}</p>
                      <p className="text-[10px] text-gray-600">{r.subject}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs font-bold text-white">{r.views}</p>
                      <p className="text-[10px] text-gray-600">views</p>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
        </ChartCard>
      </div>

      {/* Class level distribution */}
      <ChartCard
        title="Student class level distribution"
        subtitle="Which class levels your verified users are in"
      >
        {loading ? <ChartSkeleton height={160} /> : (
          data?.classDistribution?.length === 0 ? (
            <p className="text-gray-600 text-sm text-center py-8">
              No students have set their class level yet.
            </p>
          ) : (
            <>
              <ResponsiveContainer width="100%" height={140} style={CHART_STYLE}>
                <BarChart
                  data={data?.classDistribution ?? []}
                  layout="vertical"
                  margin={{ top: 0, right: 50, left: 20, bottom: 0 }}
                >
                  <CartesianGrid {...GRID_STYLE} horizontal={false} />
                  <XAxis type="number" {...AXIS_STYLE} />
                  <YAxis
                    type="category"
                    dataKey="level"
                    width={40}
                    tick={{ fill: "#9ca3af", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    {...TOOLTIP_STYLE}
                    formatter={(value) => [`${value} students`, "Students"]}
                  />
                  <Bar dataKey="count" name="Students" radius={[0, 6, 6, 0]} label={{ position: "right", fill: "#6b7280", fontSize: 11 }}>
                    {(data?.classDistribution ?? []).map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </>
          )
        )}
      </ChartCard>

    </div>
  );
}