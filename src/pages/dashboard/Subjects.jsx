// // DashboardSubjects.jsx
// // Students browse all available subjects, click one to see its classes (levels),
// // then click a class to go straight to the filtered resources feed.

// import { useState, useMemo } from "react";
// import { useNavigate, useOutletContext } from "react-router-dom";
// import { useResources } from "../../hook/UseResources";

// const SUBJECT_META = {
//   "Mathematics":         { emoji: "📐", color: "bg-blue-50",    accent: "bg-blue-500",   text: "text-blue-700",   border: "border-blue-200"   },
//   "English Language":    { emoji: "📖", color: "bg-green-50",   accent: "bg-green-500",  text: "text-green-700",  border: "border-green-200"  },
//   "Biology":             { emoji: "🔬", color: "bg-purple-50",  accent: "bg-purple-500", text: "text-purple-700", border: "border-purple-200" },
//   "Chemistry":           { emoji: "⚗️",  color: "bg-orange-50",  accent: "bg-orange-500", text: "text-orange-700", border: "border-orange-200" },
//   "Physics":             { emoji: "⚡",  color: "bg-yellow-50",  accent: "bg-yellow-500", text: "text-yellow-700", border: "border-yellow-200" },
//   "Economics":           { emoji: "📊", color: "bg-teal-50",    accent: "bg-teal-500",   text: "text-teal-700",   border: "border-teal-200"   },
//   "Government":          { emoji: "🏛️",  color: "bg-red-50",     accent: "bg-red-500",    text: "text-red-700",    border: "border-red-200"    },
//   "Literature":          { emoji: "📜", color: "bg-pink-50",    accent: "bg-pink-500",   text: "text-pink-700",   border: "border-pink-200"   },
//   "Geography":           { emoji: "🌍", color: "bg-cyan-50",    accent: "bg-cyan-500",   text: "text-cyan-700",   border: "border-cyan-200"   },
//   "Agriculture":         { emoji: "🌱", color: "bg-lime-50",    accent: "bg-lime-500",   text: "text-lime-700",   border: "border-lime-200"   },
//   "Further Mathematics": { emoji: "🧮", color: "bg-indigo-50",  accent: "bg-indigo-500", text: "text-indigo-700", border: "border-indigo-200" },
//   "Civic Education":     { emoji: "🤝", color: "bg-amber-50",   accent: "bg-amber-500",  text: "text-amber-700",  border: "border-amber-200"  },
//   "Commerce":            { emoji: "💼", color: "bg-violet-50",  accent: "bg-violet-500", text: "text-violet-700", border: "border-violet-200" },
// };

// const LEVEL_GROUPS = [
//   { group: "Junior Secondary", levels: ["JSS1", "JSS2", "JSS3"] },
//   { group: "Senior Secondary", levels: ["SS1",  "SS2",  "SS3"]  },
// ];

// const ALL_LEVELS = ["JSS1", "JSS2", "JSS3", "SS1", "SS2", "SS3"];

// export default function Subjects() {
//   const navigate = useNavigate();
//   const { searchQuery } = useOutletContext();
//   const { allResources } = useResources();
//   const resources = allResources;
//   const loading = false;

//   const [selectedSubject, setSelectedSubject] = useState(null);
//   const [levelFilter, setLevelFilter]         = useState("All");

//   // Build a map: subject → { level → count }
//   const subjectMap = useMemo(() => {
//     const map = {};
//     resources.forEach((r) => {
//       const subj  = r.subject;
//       const level = r.level === "All Levels" || !r.level ? "All" : r.level;
//       if (!subj) return;
//       if (!map[subj]) map[subj] = { total: 0, byLevel: {} };
//       map[subj].total += 1;
//       map[subj].byLevel[level] = (map[subj].byLevel[level] || 0) + 1;
//     });
//     return map;
//   }, [resources]);

//   // All subjects that have at least 1 resource (or all from meta if loading)
//   const availableSubjects = useMemo(() => {
//     const fromResources = Object.keys(subjectMap);
//     // Also show subjects with 0 resources so the UI isn't empty during loading
//     const allSubjects = Object.keys(SUBJECT_META);
//     const merged = [...new Set([...fromResources, ...allSubjects])];
//     return merged.filter((s) =>
//       !searchQuery || s.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//   }, [subjectMap, searchQuery]);

//   // When a subject is selected, get the level breakdown
//   const selectedMeta    = selectedSubject ? SUBJECT_META[selectedSubject] || SUBJECT_META["Mathematics"] : null;
//   const selectedCounts  = selectedSubject ? (subjectMap[selectedSubject] || { total: 0, byLevel: {} }) : null;

//   const handleLevelClick = (subject, level) => {
//     // Navigate to resources page with query params so it pre-filters
//     navigate(`/dashboard/resources?subject=${encodeURIComponent(subject)}&level=${encodeURIComponent(level)}`);
//   };

//   return (
//     <div className="flex flex-col gap-7">

//       {/* Header */}
//       <div>
//         <h1 className="text-xl md:text-2xl font-bold text-[#1a2a5e]">Subjects</h1>
//         <p className="text-gray-500 text-sm mt-1">
//           Browse all available subjects and select a class to view resources.
//         </p>
//       </div>

//       {/* Stats strip */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         {[
//           { label: "Total Subjects",   value: Object.keys(subjectMap).length  || "—" },
//           { label: "Total Resources",  value: resources.length                || "—" },
//           { label: "Junior Secondary", value: resources.filter(r => ["JSS1","JSS2","JSS3"].includes(r.level)).length || "—" },
//           { label: "Senior Secondary", value: resources.filter(r => ["SS1","SS2","SS3"].includes(r.level)).length   || "—" },
//         ].map(({ label, value }) => (
//           <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
//             <p className="text-2xl font-extrabold text-[#1a2a5e]">
//               {loading ? <span className="inline-block w-8 h-6 bg-gray-100 rounded animate-pulse" /> : value}
//             </p>
//             <p className="text-xs text-gray-400 mt-0.5">{label}</p>
//           </div>
//         ))}
//       </div>

//       <div className="flex flex-col lg:flex-row gap-6">

//         {/* ── Left: Subject Grid ── */}
//         <div className="flex-1 min-w-0">
//           <h2 className="text-sm font-bold text-[#1a2a5e] mb-4">
//             {searchQuery ? `Results for "${searchQuery}"` : "All Subjects"}
//             <span className="ml-2 text-xs font-normal text-gray-400">({availableSubjects.length})</span>
//           </h2>

//           {availableSubjects.length === 0 ? (
//             <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center text-gray-400 text-sm">
//               No subjects match your search.
//             </div>
//           ) : (
//             <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-3 gap-4">
//               {availableSubjects.map((subject) => {
//                 const meta   = SUBJECT_META[subject] || { emoji: "📚", color: "bg-gray-50", accent: "bg-gray-400", text: "text-gray-700", border: "border-gray-200" };
//                 const counts = subjectMap[subject]   || { total: 0, byLevel: {} };
//                 const isActive = selectedSubject === subject;

//                 return (
//                   <button
//                     key={subject}
//                     onClick={() => setSelectedSubject(isActive ? null : subject)}
//                     className={`text-left p-4 rounded-2xl border-2 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md
//                       ${isActive ? `${meta.color} ${meta.border} shadow-md -translate-y-0.5` : "bg-white border-gray-100 shadow-sm"}`}
//                   >
//                     {/* Icon */}
//                     <div className={`w-12 h-12 rounded-xl ${meta.color} flex items-center justify-center text-2xl mb-3`}>
//                       {meta.emoji}
//                     </div>

//                     {/* Subject name */}
//                     <p className={`text-sm font-bold leading-snug mb-1 ${isActive ? meta.text : "text-[#1a2a5e]"}`}>
//                       {subject}
//                     </p>

//                     {/* Resource count */}
//                     <p className="text-[11px] text-gray-400">
//                       {loading
//                         ? <span className="inline-block w-10 h-3 bg-gray-100 rounded animate-pulse" />
//                         : `${counts.total} resource${counts.total !== 1 ? "s" : ""}`
//                       }
//                     </p>

//                     {/* Level pills (mini) */}
//                     {!loading && counts.total > 0 && (
//                       <div className="flex flex-wrap gap-1 mt-2">
//                         {ALL_LEVELS.filter((l) => counts.byLevel[l] > 0).map((l) => (
//                           <span key={l} className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${meta.color} ${meta.text}`}>
//                             {l}
//                           </span>
//                         ))}
//                       </div>
//                     )}
//                   </button>
//                 );
//               })}
//             </div>
//           )}
//         </div>

//         {/* ── Right: Level Detail Panel ── */}
//         {selectedSubject && selectedMeta && (
//           <aside className="w-full lg:w-[300px] flex-shrink-0">
//             <div className={`${selectedMeta.color} rounded-2xl border-2 ${selectedMeta.border} p-5 sticky top-4`}>

//               {/* Subject header */}
//               <div className="flex items-center justify-between mb-4">
//                 <div className="flex items-center gap-3">
//                   <div className="w-12 h-12 rounded-xl bg-white/60 flex items-center justify-center text-2xl">
//                     {selectedMeta.emoji}
//                   </div>
//                   <div>
//                     <p className={`text-base font-bold ${selectedMeta.text}`}>{selectedSubject}</p>
//                     <p className="text-xs text-gray-500">{selectedCounts.total} resources total</p>
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => setSelectedSubject(null)}
//                   className="w-7 h-7 rounded-full bg-white/60 flex items-center justify-center text-gray-400 hover:text-gray-600 transition"
//                 >
//                   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
//                     <path d="M18 6L6 18M6 6l12 12"/>
//                   </svg>
//                 </button>
//               </div>

//               {/* View all resources button */}
//               <button
//                 onClick={() => handleLevelClick(selectedSubject, "All Levels")}
//                 className={`w-full mb-4 py-2.5 rounded-xl bg-[#1a2a5e] text-white text-sm font-bold transition hover:bg-[#14234d] active:scale-[0.98]`}
//               >
//                 View All {selectedSubject} Resources
//               </button>

//               {/* Level groups */}
//               {LEVEL_GROUPS.map(({ group, levels }) => {
//                 const hasAny = levels.some((l) => (selectedCounts.byLevel[l] || 0) > 0);
//                 return (
//                   <div key={group} className="mb-4 last:mb-0">
//                     <p className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${selectedMeta.text} opacity-70`}>
//                       {group}
//                     </p>
//                     <div className="flex flex-col gap-1.5">
//                       {levels.map((level) => {
//                         const count = selectedCounts.byLevel[level] || 0;
//                         return (
//                           <button
//                             key={level}
//                             onClick={() => count > 0 && handleLevelClick(selectedSubject, level)}
//                             disabled={count === 0}
//                             className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition
//                               ${count > 0
//                                 ? `bg-white/70 ${selectedMeta.text} hover:bg-white hover:shadow-sm cursor-pointer active:scale-[0.98]`
//                                 : "bg-white/30 text-gray-400 cursor-not-allowed"
//                               }`}
//                           >
//                             <span>{level}</span>
//                             <span className={`text-xs font-bold px-2 py-0.5 rounded-full
//                               ${count > 0 ? `${selectedMeta.color} ${selectedMeta.text}` : "bg-gray-100 text-gray-400"}`}>
//                               {count} {count === 1 ? "resource" : "resources"}
//                             </span>
//                           </button>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 );
//               })}

//               {/* All levels shortcut */}
//               {(selectedCounts.byLevel["All"] || 0) > 0 && (
//                 <div className="mt-3 pt-3 border-t border-white/40">
//                   <button
//                     onClick={() => handleLevelClick(selectedSubject, "All")}
//                     className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium bg-white/70 ${selectedMeta.text} hover:bg-white hover:shadow-sm transition active:scale-[0.98]`}
//                   >
//                     <span>All Classes</span>
//                     <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${selectedMeta.color} ${selectedMeta.text}`}>
//                       {selectedCounts.byLevel["All"]} resources
//                     </span>
//                   </button>
//                 </div>
//               )}

//             </div>
//           </aside>
//         )}

//       </div>
//     </div>
//   );
// }

// src/pages/DashboardSubjects.jsx
// Shows a grid of all subjects with resource counts.
// Click a subject → expands to show class levels with counts.
// Click a level → navigates to Resources page pre-filtered.

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getResources } from "../../api/ResourceApi";

const SUBJECTS = [
  { name: "Mathematics",         emoji: "📐", color: "blue" },
  { name: "English Language",    emoji: "📖", color: "green" },
  { name: "Biology",             emoji: "🔬", color: "teal" },
  { name: "Chemistry",           emoji: "⚗️", color: "purple" },
  { name: "Physics",             emoji: "⚡", color: "yellow" },
  { name: "Economics",           emoji: "📊", color: "orange" },
  { name: "Government",          emoji: "🏛️", color: "red" },
  { name: "Literature",          emoji: "📜", color: "pink" },
  { name: "Geography",           emoji: "🌍", color: "green" },
  { name: "Agriculture",         emoji: "🌱", color: "teal" },
  { name: "Further Mathematics", emoji: "🧮", color: "blue" },
  { name: "Civic Education",     emoji: "🤝", color: "orange" },
  { name: "Commerce",            emoji: "💼", color: "purple" },
];

const JSS_LEVELS = ["JSS1", "JSS2", "JSS3"];
const SS_LEVELS  = ["SS1", "SS2", "SS3"];

const COLOR_MAP = {
  blue:   { bg: "bg-blue-50",   border: "border-blue-200",   text: "text-blue-700",   dot: "bg-blue-500",   pill: "bg-blue-100 text-blue-700",   hover: "hover:bg-blue-50" },
  green:  { bg: "bg-green-50",  border: "border-green-200",  text: "text-green-700",  dot: "bg-green-500",  pill: "bg-green-100 text-green-700",  hover: "hover:bg-green-50" },
  teal:   { bg: "bg-teal-50",   border: "border-teal-200",   text: "text-teal-700",   dot: "bg-teal-500",   pill: "bg-teal-100 text-teal-700",    hover: "hover:bg-teal-50" },
  purple: { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-700", dot: "bg-purple-500", pill: "bg-purple-100 text-purple-700", hover: "hover:bg-purple-50" },
  yellow: { bg: "bg-yellow-50", border: "border-yellow-200", text: "text-yellow-700", dot: "bg-yellow-500", pill: "bg-yellow-100 text-yellow-700", hover: "hover:bg-yellow-50" },
  orange: { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-700", dot: "bg-orange-500", pill: "bg-orange-100 text-orange-700", hover: "hover:bg-orange-50" },
  red:    { bg: "bg-red-50",    border: "border-red-200",    text: "text-red-700",    dot: "bg-red-500",    pill: "bg-red-100 text-red-700",      hover: "hover:bg-red-50" },
  pink:   { bg: "bg-pink-50",   border: "border-pink-200",   text: "text-pink-700",   dot: "bg-pink-500",   pill: "bg-pink-100 text-pink-700",    hover: "hover:bg-pink-50" },
};

function LevelRow({ level, count, onClick, colorClass }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-between w-full px-3 py-2.5 rounded-xl transition group ${colorClass.hover}`}
    >
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full flex-shrink-0 ${colorClass.dot}`} />
        <span className="text-sm font-medium text-gray-700">{level}</span>
      </div>
      <div className="flex items-center gap-2">
        {count > 0 ? (
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${colorClass.pill}`}>
            {count} resource{count !== 1 ? "s" : ""}
          </span>
        ) : (
          <span className="text-[10px] text-gray-300">No resources yet</span>
        )}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round"
          className="group-hover:stroke-[#1a2a5e] transition">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </div>
    </button>
  );
}

function SubjectCard({ subject, totalCount, levelCounts, isOpen, onToggle, onLevelClick }) {
  const c = COLOR_MAP[subject.color] || COLOR_MAP.blue;
  return (
    <div className={`rounded-2xl border transition-all duration-200 overflow-hidden bg-white ${
      isOpen ? `${c.border} shadow-md` : "border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200"
    }`}>
      <button onClick={onToggle} className="w-full flex items-center gap-4 p-4 text-left">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 transition ${isOpen ? c.bg : "bg-gray-50"}`}>
          {subject.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-bold transition ${isOpen ? c.text : "text-[#1a2a5e]"}`}>{subject.name}</p>
          <p className="text-[11px] text-gray-400 mt-0.5">
            {totalCount > 0 ? `${totalCount} resource${totalCount !== 1 ? "s" : ""} available` : "No resources yet"}
          </p>
        </div>
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors flex-shrink-0 ${isOpen ? c.bg : "bg-gray-50"}`}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke={isOpen ? "currentColor" : "#9ca3af"} strokeWidth="2.5" strokeLinecap="round"
            className={`transition-transform duration-200 ${isOpen ? `rotate-180 ${c.text}` : ""}`}>
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="px-4 pb-4 flex flex-col gap-1 border-t border-gray-50 pt-3">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Select Class Level</p>
            <button
              onClick={() => setOpenSubject(null)}
              className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition"
              title="Close"
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-3 mb-1">Junior Secondary</p>
          {JSS_LEVELS.map((level) => (
            <LevelRow key={level} level={level} count={levelCounts[level] || 0}
              onClick={() => onLevelClick(subject.name, level)} colorClass={c} />
          ))}
          <div className="border-t border-gray-100 my-2" />
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-3 mb-1">Senior Secondary</p>
          {SS_LEVELS.map((level) => (
            <LevelRow key={level} level={level} count={levelCounts[level] || 0}
              onClick={() => onLevelClick(subject.name, level)} colorClass={c} />
          ))}
          <button onClick={() => onLevelClick(subject.name, "All Levels")}
            className={`mt-2 w-full py-2.5 rounded-xl text-sm font-bold transition ${c.bg} ${c.text} hover:opacity-90`}>
            View all {subject.name} resources →
          </button>
        </div>
      )}
    </div>
  );
}

export default function Subjects() {
  const navigate = useNavigate();
  const [openSubject, setOpenSubject] = useState(null);
  const [subjectData, setSubjectData] = useState({});
  const [loading,     setLoading]     = useState(true);
  const [searchTerm,  setSearchTerm]  = useState("");

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        setLoading(true);
        const data = await getResources({ limit: 1000 });
        const resources = data.resources || [];
        const map = {};
        for (const r of resources) {
          if (!map[r.subject]) map[r.subject] = { total: 0, levels: {} };
          map[r.subject].total += 1;
          const lvl = r.level || "Other";
          map[r.subject].levels[lvl] = (map[r.subject].levels[lvl] || 0) + 1;
        }
        setSubjectData(map);
      } catch (err) {
        console.error("Failed to fetch subject counts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCounts();
  }, []);

  const handleLevelClick = (subject, level) => {
    const params = new URLSearchParams({ subject });
    if (level !== "All Levels") params.set("level", level);
    navigate(`/dashboard/resources?${params.toString()}`);
  };

  const filtered = SUBJECTS.filter((s) =>
    !searchTerm || s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalResources = Object.values(subjectData).reduce((sum, d) => sum + d.total, 0);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-[#1a2a5e]">Subjects</h1>
        <p className="text-gray-500 text-sm mt-1">
          {loading ? "Loading subjects..." : `${totalResources} resources across ${Object.keys(subjectData).length} subjects`}
        </p>
      </div>

      <div className="relative max-w-sm">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
        </span>
        <input type="text" placeholder="Search subjects..." value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-[#1a2a5e]/40 transition" />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 animate-pulse">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-100 rounded-2xl flex-shrink-0" />
                <div className="flex-1"><div className="h-4 bg-gray-100 rounded w-2/3 mb-2" /><div className="h-3 bg-gray-100 rounded w-1/2" /></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((subject) => {
            const data = subjectData[subject.name] || { total: 0, levels: {} };
            return (
              <SubjectCard key={subject.name} subject={subject} totalCount={data.total}
                levelCounts={data.levels} isOpen={openSubject === subject.name}
                onToggle={() => setOpenSubject(subject.name)}
                onLevelClick={handleLevelClick} />
            );
          })}
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-sm text-gray-400">No subjects match "{searchTerm}"</p>
          <button onClick={() => setSearchTerm("")} className="mt-2 text-xs text-[#3b6fd4] font-semibold hover:underline">Clear search</button>
        </div>
      )}
    </div>
  );
}