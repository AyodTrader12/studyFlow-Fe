// DashboardSubjects.jsx
// Students browse all available subjects, click one to see its classes (levels),
// then click a class to go straight to the filtered resources feed.

import { useState, useMemo } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useResources } from "../../hook/UseResources";

const SUBJECT_META = {
  "Mathematics":         { emoji: "📐", color: "bg-blue-50",    accent: "bg-blue-500",   text: "text-blue-700",   border: "border-blue-200"   },
  "English Language":    { emoji: "📖", color: "bg-green-50",   accent: "bg-green-500",  text: "text-green-700",  border: "border-green-200"  },
  "Biology":             { emoji: "🔬", color: "bg-purple-50",  accent: "bg-purple-500", text: "text-purple-700", border: "border-purple-200" },
  "Chemistry":           { emoji: "⚗️",  color: "bg-orange-50",  accent: "bg-orange-500", text: "text-orange-700", border: "border-orange-200" },
  "Physics":             { emoji: "⚡",  color: "bg-yellow-50",  accent: "bg-yellow-500", text: "text-yellow-700", border: "border-yellow-200" },
  "Economics":           { emoji: "📊", color: "bg-teal-50",    accent: "bg-teal-500",   text: "text-teal-700",   border: "border-teal-200"   },
  "Government":          { emoji: "🏛️",  color: "bg-red-50",     accent: "bg-red-500",    text: "text-red-700",    border: "border-red-200"    },
  "Literature":          { emoji: "📜", color: "bg-pink-50",    accent: "bg-pink-500",   text: "text-pink-700",   border: "border-pink-200"   },
  "Geography":           { emoji: "🌍", color: "bg-cyan-50",    accent: "bg-cyan-500",   text: "text-cyan-700",   border: "border-cyan-200"   },
  "Agriculture":         { emoji: "🌱", color: "bg-lime-50",    accent: "bg-lime-500",   text: "text-lime-700",   border: "border-lime-200"   },
  "Further Mathematics": { emoji: "🧮", color: "bg-indigo-50",  accent: "bg-indigo-500", text: "text-indigo-700", border: "border-indigo-200" },
  "Civic Education":     { emoji: "🤝", color: "bg-amber-50",   accent: "bg-amber-500",  text: "text-amber-700",  border: "border-amber-200"  },
  "Commerce":            { emoji: "💼", color: "bg-violet-50",  accent: "bg-violet-500", text: "text-violet-700", border: "border-violet-200" },
};

const LEVEL_GROUPS = [
  { group: "Junior Secondary", levels: ["JSS1", "JSS2", "JSS3"] },
  { group: "Senior Secondary", levels: ["SS1",  "SS2",  "SS3"]  },
];

const ALL_LEVELS = ["JSS1", "JSS2", "JSS3", "SS1", "SS2", "SS3"];

export default function Subjects() {
  const navigate = useNavigate();
  const { searchQuery } = useOutletContext();
  const { allResources } = useResources();
  const resources = allResources;
  const loading = false;

  const [selectedSubject, setSelectedSubject] = useState(null);
  const [levelFilter, setLevelFilter]         = useState("All");

  // Build a map: subject → { level → count }
  const subjectMap = useMemo(() => {
    const map = {};
    resources.forEach((r) => {
      const subj  = r.subject;
      const level = r.level === "All Levels" || !r.level ? "All" : r.level;
      if (!subj) return;
      if (!map[subj]) map[subj] = { total: 0, byLevel: {} };
      map[subj].total += 1;
      map[subj].byLevel[level] = (map[subj].byLevel[level] || 0) + 1;
    });
    return map;
  }, [resources]);

  // All subjects that have at least 1 resource (or all from meta if loading)
  const availableSubjects = useMemo(() => {
    const fromResources = Object.keys(subjectMap);
    // Also show subjects with 0 resources so the UI isn't empty during loading
    const allSubjects = Object.keys(SUBJECT_META);
    const merged = [...new Set([...fromResources, ...allSubjects])];
    return merged.filter((s) =>
      !searchQuery || s.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [subjectMap, searchQuery]);

  // When a subject is selected, get the level breakdown
  const selectedMeta    = selectedSubject ? SUBJECT_META[selectedSubject] || SUBJECT_META["Mathematics"] : null;
  const selectedCounts  = selectedSubject ? (subjectMap[selectedSubject] || { total: 0, byLevel: {} }) : null;

  const handleLevelClick = (subject, level) => {
    // Navigate to resources page with query params so it pre-filters
    navigate(`/dashboard/resources?subject=${encodeURIComponent(subject)}&level=${encodeURIComponent(level)}`);
  };

  return (
    <div className="flex flex-col gap-7">

      {/* Header */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-[#1a2a5e]">Subjects</h1>
        <p className="text-gray-500 text-sm mt-1">
          Browse all available subjects and select a class to view resources.
        </p>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Subjects",   value: Object.keys(subjectMap).length  || "—" },
          { label: "Total Resources",  value: resources.length                || "—" },
          { label: "Junior Secondary", value: resources.filter(r => ["JSS1","JSS2","JSS3"].includes(r.level)).length || "—" },
          { label: "Senior Secondary", value: resources.filter(r => ["SS1","SS2","SS3"].includes(r.level)).length   || "—" },
        ].map(({ label, value }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
            <p className="text-2xl font-extrabold text-[#1a2a5e]">
              {loading ? <span className="inline-block w-8 h-6 bg-gray-100 rounded animate-pulse" /> : value}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">

        {/* ── Left: Subject Grid ── */}
        <div className="flex-1 min-w-0">
          <h2 className="text-sm font-bold text-[#1a2a5e] mb-4">
            {searchQuery ? `Results for "${searchQuery}"` : "All Subjects"}
            <span className="ml-2 text-xs font-normal text-gray-400">({availableSubjects.length})</span>
          </h2>

          {availableSubjects.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center text-gray-400 text-sm">
              No subjects match your search.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-3 gap-4">
              {availableSubjects.map((subject) => {
                const meta   = SUBJECT_META[subject] || { emoji: "📚", color: "bg-gray-50", accent: "bg-gray-400", text: "text-gray-700", border: "border-gray-200" };
                const counts = subjectMap[subject]   || { total: 0, byLevel: {} };
                const isActive = selectedSubject === subject;

                return (
                  <button
                    key={subject}
                    onClick={() => setSelectedSubject(isActive ? null : subject)}
                    className={`text-left p-4 rounded-2xl border-2 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md
                      ${isActive ? `${meta.color} ${meta.border} shadow-md -translate-y-0.5` : "bg-white border-gray-100 shadow-sm"}`}
                  >
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-xl ${meta.color} flex items-center justify-center text-2xl mb-3`}>
                      {meta.emoji}
                    </div>

                    {/* Subject name */}
                    <p className={`text-sm font-bold leading-snug mb-1 ${isActive ? meta.text : "text-[#1a2a5e]"}`}>
                      {subject}
                    </p>

                    {/* Resource count */}
                    <p className="text-[11px] text-gray-400">
                      {loading
                        ? <span className="inline-block w-10 h-3 bg-gray-100 rounded animate-pulse" />
                        : `${counts.total} resource${counts.total !== 1 ? "s" : ""}`
                      }
                    </p>

                    {/* Level pills (mini) */}
                    {!loading && counts.total > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {ALL_LEVELS.filter((l) => counts.byLevel[l] > 0).map((l) => (
                          <span key={l} className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${meta.color} ${meta.text}`}>
                            {l}
                          </span>
                        ))}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* ── Right: Level Detail Panel ── */}
        {selectedSubject && selectedMeta && (
          <aside className="w-full lg:w-[300px] flex-shrink-0">
            <div className={`${selectedMeta.color} rounded-2xl border-2 ${selectedMeta.border} p-5 sticky top-4`}>

              {/* Subject header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white/60 flex items-center justify-center text-2xl">
                    {selectedMeta.emoji}
                  </div>
                  <div>
                    <p className={`text-base font-bold ${selectedMeta.text}`}>{selectedSubject}</p>
                    <p className="text-xs text-gray-500">{selectedCounts.total} resources total</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedSubject(null)}
                  className="w-7 h-7 rounded-full bg-white/60 flex items-center justify-center text-gray-400 hover:text-gray-600 transition"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M18 6L6 18M6 6l12 12"/>
                  </svg>
                </button>
              </div>

              {/* View all resources button */}
              <button
                onClick={() => handleLevelClick(selectedSubject, "All Levels")}
                className={`w-full mb-4 py-2.5 rounded-xl bg-[#1a2a5e] text-white text-sm font-bold transition hover:bg-[#14234d] active:scale-[0.98]`}
              >
                View All {selectedSubject} Resources
              </button>

              {/* Level groups */}
              {LEVEL_GROUPS.map(({ group, levels }) => {
                const hasAny = levels.some((l) => (selectedCounts.byLevel[l] || 0) > 0);
                return (
                  <div key={group} className="mb-4 last:mb-0">
                    <p className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${selectedMeta.text} opacity-70`}>
                      {group}
                    </p>
                    <div className="flex flex-col gap-1.5">
                      {levels.map((level) => {
                        const count = selectedCounts.byLevel[level] || 0;
                        return (
                          <button
                            key={level}
                            onClick={() => count > 0 && handleLevelClick(selectedSubject, level)}
                            disabled={count === 0}
                            className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition
                              ${count > 0
                                ? `bg-white/70 ${selectedMeta.text} hover:bg-white hover:shadow-sm cursor-pointer active:scale-[0.98]`
                                : "bg-white/30 text-gray-400 cursor-not-allowed"
                              }`}
                          >
                            <span>{level}</span>
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full
                              ${count > 0 ? `${selectedMeta.color} ${selectedMeta.text}` : "bg-gray-100 text-gray-400"}`}>
                              {count} {count === 1 ? "resource" : "resources"}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {/* All levels shortcut */}
              {(selectedCounts.byLevel["All"] || 0) > 0 && (
                <div className="mt-3 pt-3 border-t border-white/40">
                  <button
                    onClick={() => handleLevelClick(selectedSubject, "All")}
                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium bg-white/70 ${selectedMeta.text} hover:bg-white hover:shadow-sm transition active:scale-[0.98]`}
                  >
                    <span>All Classes</span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${selectedMeta.color} ${selectedMeta.text}`}>
                      {selectedCounts.byLevel["All"]} resources
                    </span>
                  </button>
                </div>
              )}

            </div>
          </aside>
        )}

      </div>
    </div>
  );
}