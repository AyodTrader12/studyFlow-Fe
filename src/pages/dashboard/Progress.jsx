// src/pages/DashboardProgress.jsx
// Shows detailed study progress: per-subject breakdown, recently viewed resources,
// streak history, and overall stats.

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useProgress } from "../../hook/UseApi";

const SUBJECT_EMOJIS = {
  "Mathematics":         "📐",
  "English Language":    "📖",
  "Biology":             "🔬",
  "Chemistry":           "⚗️",
  "Physics":             "⚡",
  "Economics":           "📊",
  "Government":          "🏛️",
  "Literature":          "📜",
  "Geography":           "🌍",
  "Agriculture":         "🌱",
  "Further Mathematics": "🧮",
  "Civic Education":     "🤝",
  "Commerce":            "💼",
};

const SUBJECT_PALETTE = [
  { bg: "bg-blue-50",   bar: "bg-blue-500",   text: "text-blue-700" },
  { bg: "bg-purple-50", bar: "bg-purple-500",  text: "text-purple-700" },
  { bg: "bg-green-50",  bar: "bg-green-500",   text: "text-green-700" },
  { bg: "bg-orange-50", bar: "bg-orange-500",  text: "text-orange-700" },
  { bg: "bg-teal-50",   bar: "bg-teal-500",    text: "text-teal-700" },
  { bg: "bg-pink-50",   bar: "bg-pink-500",    text: "text-pink-700" },
  { bg: "bg-amber-50",  bar: "bg-amber-500",   text: "text-amber-700" },
  { bg: "bg-red-50",    bar: "bg-red-500",     text: "text-red-700" },
];

const TYPE_LABELS = {
  youtube: "Video",
  pdf:     "PDF",
  notes:   "Notes",
  article: "Article",
};

function formatDate(dateStr) {
  const d = new Date(dateStr);
  const now = new Date();
  const diffMs = now - d;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7)  return `${diffDays} days ago`;
  return d.toLocaleDateString("en-NG", { day: "numeric", month: "short" });
}

function formatMinutes(seconds) {
  if (!seconds || seconds === 0) return null;
  const mins = Math.round(seconds / 60);
  if (mins < 1) return null;
  return `${mins} min`;
}

export default function DashboardProgress() {
  const navigate = useNavigate();
  const { userProfile } = useAuth();
  const { progress, stats, loading } = useProgress();

  const streak         = userProfile?.streak?.current  ?? 0;
  const longestStreak  = userProfile?.streak?.longest  ?? 0;
  const totalViewed    = userProfile?.totalResourcesViewed ?? 0;

  const maxCount = stats[0]?.count || 1;

  return (
    <div className="flex flex-col gap-7">

      {/* Header */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-[#1a2a5e]">My Progress</h1>
        <p className="text-gray-500 text-sm mt-1">
          Track everything you have studied across all subjects.
        </p>
      </div>

      {/* ── Overview stats ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Current Streak",    value: `${streak} 🔥`,   sub: "days in a row" },
          { label: "Longest Streak",    value: `${longestStreak}`, sub: "personal best" },
          { label: "Total Viewed",      value: totalViewed,        sub: "resources" },
          { label: "Subjects Studied",  value: stats.length,       sub: "different subjects" },
        ].map(({ label, value, sub }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
            <p className="text-2xl font-extrabold text-[#1a2a5e]">{value}</p>
            <p className="text-xs font-semibold text-gray-600 mt-0.5">{label}</p>
            <p className="text-[10px] text-gray-400 mt-0.5">{sub}</p>
          </div>
        ))}
      </div>

      {/* ── Streak calendar strip ── */}
      <div className="bg-[#1a2a5e] rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-white text-sm font-bold">Study Streak</p>
            <p className="text-blue-200 text-xs mt-0.5">
              {streak > 0 ? `${streak} consecutive days` : "No active streak — study today to start!"}
            </p>
          </div>
          <div className="text-right">
            <p className="text-orange-300 text-2xl font-extrabold">{streak}🔥</p>
            <p className="text-blue-300 text-[10px]">Best: {longestStreak}</p>
          </div>
        </div>

        {/* 7-day strip */}
        <div className="flex gap-1.5 mb-2">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => {
            const active = i < Math.min(streak, 7);
            return (
              <div key={day} className="flex-1 flex flex-col items-center gap-1">
                <div className={`w-full aspect-square rounded-lg flex items-center justify-center transition-all ${
                  active ? "bg-orange-400 shadow-sm" : "bg-white/10"
                }`}>
                  {active
                    ? <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>
                    : <span className="text-blue-300 text-[9px] font-medium">{day[0]}</span>
                  }
                </div>
                <span className="text-[8px] text-blue-300">{day}</span>
              </div>
            );
          })}
        </div>

        {streak === 0 && (
          <button
            onClick={() => navigate("/dashboard/resources")}
            className="mt-2 w-full py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition"
          >
            Study a resource to start your streak →
          </button>
        )}
      </div>

      {/* ── Per-subject breakdown ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h2 className="text-sm font-bold text-[#1a2a5e] mb-5">Progress by Subject</h2>

        {loading ? (
          <div className="flex flex-col gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex-shrink-0" />
                <div className="flex-1 flex flex-col gap-2">
                  <div className="h-3 bg-gray-100 rounded w-1/3" />
                  <div className="h-2.5 bg-gray-100 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : stats.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-sm font-semibold text-[#1a2a5e] mb-1">No progress recorded yet</p>
            <p className="text-xs text-gray-400 mb-3">Start viewing resources and your progress will appear here.</p>
            <button
              onClick={() => navigate("/dashboard/resources")}
              className="px-5 py-2 rounded-xl bg-[#1a2a5e] text-white text-xs font-bold hover:bg-[#14234d] transition"
            >
              Browse Resources
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {stats.map((stat, i) => {
              const palette  = SUBJECT_PALETTE[i % SUBJECT_PALETTE.length];
              const emoji    = SUBJECT_EMOJIS[stat._id] || "📚";
              const pct      = Math.round((stat.count / maxCount) * 100);
              const lastDate = stat.lastViewed ? formatDate(stat.lastViewed) : null;

              return (
                <div
                  key={stat._id}
                  onClick={() => navigate(`/dashboard/resources?subject=${encodeURIComponent(stat._id)}`)}
                  className="cursor-pointer group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 ${palette.bg}`}>
                      {emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-[#1a2a5e] group-hover:underline truncate">
                          {stat._id}
                        </p>
                        <span className={`text-xs font-bold flex-shrink-0 ml-2 ${palette.text}`}>
                          {stat.count} resource{stat.count !== 1 ? "s" : ""}
                        </span>
                      </div>
                      {lastDate && (
                        <p className="text-[10px] text-gray-400 mt-0.5">Last studied: {lastDate}</p>
                      )}
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="ml-13 pl-[52px]">
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className={`${palette.bar} h-2 rounded-full transition-all duration-700`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <p className="text-[9px] text-gray-400 mt-0.5 text-right">{pct}% of your most studied subject</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Recently viewed ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h2 className="text-sm font-bold text-[#1a2a5e] mb-4">Recently Viewed</h2>

        {loading ? (
          <div className="flex flex-col gap-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-14 bg-gray-50 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : progress.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-8">
            Resources you view will appear here.
          </p>
        ) : (
          <div className="flex flex-col divide-y divide-gray-50">
            {progress.slice(0, 10).map((entry, i) => {
              const resource = entry.resourceId;
              if (!resource || !resource._id) return null;
              const typeLabel = TYPE_LABELS[resource.type] || resource.type;
              const timeSpent = formatMinutes(entry.timeSpent);

              return (
                <div
                  key={entry._id || i}
                  onClick={() => navigate(`/dashboard/resources/${resource._id}`)}
                  className="flex items-center gap-3 py-3 cursor-pointer hover:bg-gray-50 -mx-1 px-1 rounded-xl transition"
                >
                  {/* Icon */}
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1a2a5e] to-[#3b6fd4] flex items-center justify-center flex-shrink-0">
                    {resource.type === "youtube" ? (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                        <polygon points="5 3 19 12 5 21 5 3"/>
                      </svg>
                    ) : (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                      </svg>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{resource.title}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[10px] text-gray-400">{resource.subject}</span>
                      <span className="text-[10px] text-gray-300">·</span>
                      <span className="text-[10px] text-gray-400">{typeLabel}</span>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <p className="text-[10px] text-gray-400">{formatDate(entry.completedAt)}</p>
                    {timeSpent && (
                      <p className="text-[9px] text-gray-300 mt-0.5">{timeSpent}</p>
                    )}
                  </div>
                </div>
              );
            })}

            {progress.length > 10 && (
              <p className="text-xs text-center text-gray-400 pt-3">
                +{progress.length - 10} more resources viewed
              </p>
            )}
          </div>
        )}
      </div>

    </div>
  );
}