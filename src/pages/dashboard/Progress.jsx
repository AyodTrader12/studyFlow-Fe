// src/pages/DashboardProgress.jsx
// Enhanced progress page:
// - 30-day streak calendar grid showing active/inactive days
// - Per-subject progress bars with percentages + last studied
// - Recently viewed timeline with time spent
// - Stats overview

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

const PALETTE = [
  { bar: "bg-blue-500",   bg: "bg-blue-50",   text: "text-blue-700" },
  { bar: "bg-purple-500", bg: "bg-purple-50", text: "text-purple-700" },
  { bar: "bg-green-500",  bg: "bg-green-50",  text: "text-green-700" },
  { bar: "bg-orange-500", bg: "bg-orange-50", text: "text-orange-700" },
  { bar: "bg-teal-500",   bg: "bg-teal-50",   text: "text-teal-700" },
  { bar: "bg-pink-500",   bg: "bg-pink-50",   text: "text-pink-700" },
  { bar: "bg-amber-500",  bg: "bg-amber-50",  text: "text-amber-700" },
  { bar: "bg-red-500",    bg: "bg-red-50",    text: "text-red-700" },
];

const TYPE_LABELS = {
  youtube: "Video",
  pdf:     "PDF",
  notes:   "Notes",
  article: "Article",
};

function formatRelativeDate(dateStr) {
  const d    = new Date(dateStr);
  const diff = Math.floor((Date.now() - d.getTime()) / (1000 * 60 * 60 * 24));
  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";
  if (diff < 7)  return `${diff} days ago`;
  if (diff < 30) return `${Math.floor(diff / 7)} week${Math.floor(diff / 7) !== 1 ? "s" : ""} ago`;
  return d.toLocaleDateString("en-NG", { day: "numeric", month: "short" });
}

function formatMinutes(seconds) {
  if (!seconds || seconds < 30) return null;
  const mins = Math.round(seconds / 60);
  return `${mins}min`;
}

// ── 30-day calendar grid ──────────────────────────────────────────────────────
function StreakCalendar({ streak, lastStudied }) {
  const DAYS = 35; // 5 weeks
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Build array of last DAYS days
  const days = Array.from({ length: DAYS }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (DAYS - 1 - i));
    return d;
  });

  // Mark active days based on streak count (approximation — working backwards from lastStudied)
  const lastDate = lastStudied ? new Date(lastStudied) : null;
  if (lastDate) lastDate.setHours(0, 0, 0, 0);

  const activeDates = new Set();
  if (lastDate) {
    for (let i = 0; i < streak; i++) {
      const d = new Date(lastDate);
      d.setDate(lastDate.getDate() - i);
      activeDates.add(d.toDateString());
    }
  }

  const WEEK_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthLabel = today.toLocaleDateString("en-NG", { month: "long", year: "numeric" });

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-semibold text-blue-200">Last 5 weeks</p>
        <p className="text-[10px] text-blue-300">{monthLabel}</p>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {WEEK_LABELS.map((d) => (
          <div key={d} className="text-[9px] text-blue-400 text-center font-medium">{d[0]}</div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Offset for first day of week */}
        {Array.from({ length: days[0].getDay() }, (_, i) => (
          <div key={`pad-${i}`} />
        ))}
        {days.map((d, i) => {
          const isActive  = activeDates.has(d.toDateString());
          const isToday   = d.toDateString() === today.toDateString();
          const isFuture  = d > today;

          return (
            <div
              key={i}
              title={d.toLocaleDateString("en-NG", { weekday: "short", month: "short", day: "numeric" })}
              className={`aspect-square rounded-md flex items-center justify-center text-[9px] font-bold transition-all ${
                isFuture  ? "bg-white/5 text-blue-900/30" :
                isActive  ? "bg-orange-400 text-white shadow-sm scale-105" :
                isToday   ? "bg-white/20 text-blue-200 ring-1 ring-blue-300" :
                            "bg-white/10 text-blue-400"
              }`}
            >
              {isActive ? "✓" : isFuture ? "" : d.getDate()}
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-4 mt-3">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-orange-400" />
          <span className="text-[10px] text-blue-300">Studied</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-white/10" />
          <span className="text-[10px] text-blue-300">Not studied</span>
        </div>
      </div>
    </div>
  );
}

export default function DashboardProgress() {
  const navigate = useNavigate();
  const { userProfile } = useAuth();
  const { progress, stats, loading } = useProgress();

  const streak        = userProfile?.streak?.current      ?? 0;
  const longestStreak = userProfile?.streak?.longest      ?? 0;
  const lastStudied   = userProfile?.streak?.lastStudied  ?? null;
  const totalViewed   = userProfile?.totalResourcesViewed ?? 0;

  const maxCount = stats[0]?.count || 1;

  const totalTimeSeconds = progress.reduce((sum, p) => sum + (p.timeSpent || 0), 0);
  const totalMinutes     = Math.round(totalTimeSeconds / 60);

  return (
    <div className="flex flex-col gap-7">

      {/* Header */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-[#1a2a5e]">My Progress</h1>
        <p className="text-gray-500 text-sm mt-1">
          Everything you have studied, all in one place.
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: "Current streak",
            value: streak > 0 ? `${streak} 🔥` : "0",
            sub:   streak > 0 ? `${7 - Math.min(streak, 7)} more to next week` : "Study today to start",
            bg:    "bg-orange-50",
          },
          {
            label: "Best streak",
            value: longestStreak,
            sub:   "days consecutive",
            bg:    "bg-blue-50",
          },
          {
            label: "Total resources",
            value: totalViewed,
            sub:   "resources viewed",
            bg:    "bg-purple-50",
          },
          {
            label: "Time studied",
            value: totalMinutes > 60 ? `${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m` : `${totalMinutes}m`,
            sub:   "total study time",
            bg:    "bg-green-50",
          },
        ].map(({ label, value, sub, bg }) => (
          <div key={label} className={`${bg} rounded-2xl p-4`}>
            <p className="text-2xl md:text-3xl font-extrabold text-[#1a2a5e]">{value}</p>
            <p className="text-xs font-semibold text-gray-600 mt-0.5">{label}</p>
            <p className="text-[10px] text-gray-400 mt-0.5">{sub}</p>
          </div>
        ))}
      </div>

      {/* Streak calendar */}
      <div className="bg-[#1a2a5e] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-white text-sm font-bold">Study Streak Calendar</p>
            <p className="text-blue-200 text-xs mt-0.5">
              {streak > 0
                ? `${streak} consecutive day${streak !== 1 ? "s" : ""} — keep it going!`
                : "Study a resource today to start your streak"}
            </p>
          </div>
          <div className="text-right">
            <p className="text-orange-300 text-3xl font-extrabold leading-none">{streak}</p>
            <p className="text-blue-300 text-[10px] mt-0.5">day streak</p>
          </div>
        </div>

        <StreakCalendar streak={streak} lastStudied={lastStudied} />

        {streak === 0 && (
          <button
            onClick={() => navigate("/dashboard/resources")}
            className="mt-4 w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition"
          >
            Browse resources to start your streak →
          </button>
        )}
      </div>

      {/* Subject progress bars */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm font-bold text-[#1a2a5e]">Progress by Subject</h2>
          <span className="text-xs text-gray-400">{stats.length} subject{stats.length !== 1 ? "s" : ""} studied</span>
        </div>

        {loading ? (
          <div className="flex flex-col gap-5">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse flex items-start gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex-shrink-0" />
                <div className="flex-1 pt-1">
                  <div className="h-3 bg-gray-100 rounded w-1/3 mb-3" />
                  <div className="h-2 bg-gray-100 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : stats.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-sm font-semibold text-[#1a2a5e] mb-1">No progress yet</p>
            <p className="text-xs text-gray-400 mb-4">Start viewing resources and your progress appears here.</p>
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
              const p      = PALETTE[i % PALETTE.length];
              const emoji  = SUBJECT_EMOJIS[stat._id] || "📚";
              const pct    = Math.round((stat.count / maxCount) * 100);
              const last   = stat.lastViewed ? formatRelativeDate(stat.lastViewed) : null;

              return (
                <div
                  key={stat._id}
                  className="cursor-pointer group"
                  onClick={() =>
                    navigate(`/dashboard/resources?subject=${encodeURIComponent(stat._id)}`)
                  }
                >
                  <div className="flex items-center gap-3 mb-2">
                    {/* Emoji */}
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 ${p.bg}`}>
                      {emoji}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className={`text-sm font-semibold group-hover:underline truncate ${p.text}`}>
                          {stat._id}
                        </p>
                        <span className="text-xs font-bold text-gray-500 flex-shrink-0 ml-2">
                          {stat.count} resource{stat.count !== 1 ? "s" : ""}
                        </span>
                      </div>

                      {/* Progress bar */}
                      <div className="relative w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div
                          className={`${p.bar} h-2 rounded-full transition-all duration-1000`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>

                      {last && (
                        <p className="text-[10px] text-gray-400 mt-1">Last studied: {last}</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Recently viewed timeline */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
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
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[18px] top-2 bottom-2 w-0.5 bg-gray-100" />

            <div className="flex flex-col gap-0.5">
              {progress.slice(0, 15).map((entry, i) => {
                const resource = entry.resourceId;
                if (!resource?._id) return null;
                const typeLabel = TYPE_LABELS[resource.type] || resource.type;
                const timeSpent = formatMinutes(entry.timeSpent);
                const relDate   = formatRelativeDate(entry.completedAt);

                return (
                  <div
                    key={entry._id || i}
                    onClick={() => navigate(`/dashboard/resources/${resource._id}`)}
                    className="flex items-start gap-3 pl-1 py-2.5 cursor-pointer hover:bg-gray-50 rounded-xl transition group"
                  >
                    {/* Timeline dot */}
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#1a2a5e] to-[#3b6fd4] flex items-center justify-center flex-shrink-0 z-10">
                      {resource.type === "youtube" ? (
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="white">
                          <polygon points="5 3 19 12 5 21 5 3"/>
                        </svg>
                      ) : (
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                        </svg>
                      )}
                    </div>

                    <div className="flex-1 min-w-0 pt-0.5">
                      <p className="text-sm font-medium text-gray-800 truncate group-hover:text-[#1a2a5e] transition">
                        {resource.title}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] text-gray-400">{resource.subject}</span>
                        <span className="text-[10px] text-gray-300">·</span>
                        <span className="text-[10px] text-gray-400">{typeLabel}</span>
                        {timeSpent && (
                          <>
                            <span className="text-[10px] text-gray-300">·</span>
                            <span className="text-[10px] text-gray-400">{timeSpent}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <span className="text-[10px] text-gray-400 flex-shrink-0 pt-0.5">{relDate}</span>
                  </div>
                );
              })}

              {progress.length > 15 && (
                <p className="text-xs text-center text-gray-400 pt-3 pl-11">
                  +{progress.length - 15} more resources viewed
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}