// src/pages/ResourcesPage.jsx
// Fetches resources from the backend with subject, level, type filters.
// Search comes from the top navbar via useOutletContext.

import { useState, useEffect } from "react";
import { useNavigate, useOutletContext, useSearchParams } from "react-router-dom";
import { useResources } from "../hooks/useApi";
import { useBookmarks } from "../hooks/useApi";

const SUBJECTS = [
  "All Subjects", "Mathematics", "English Language", "Biology",
  "Chemistry", "Physics", "Economics", "Government", "Literature",
  "Geography", "Agriculture", "Further Mathematics", "Civic Education", "Commerce",
];

const LEVELS = ["All Levels", "JSS1", "JSS2", "JSS3", "SS1", "SS2", "SS3"];

const TYPES = [
  { value: "All Types", label: "All Types" },
  { value: "youtube",  label: "Video" },
  { value: "pdf",      label: "PDF" },
  { value: "notes",    label: "Notes" },
  { value: "article",  label: "Article" },
];

const TYPE_META = {
  youtube: { label: "Video",   badgeClass: "bg-red-50 text-red-600" },
  pdf:     { label: "PDF",     badgeClass: "bg-blue-50 text-blue-600" },
  notes:   { label: "Notes",   badgeClass: "bg-purple-50 text-purple-600" },
  article: { label: "Article", badgeClass: "bg-green-50 text-green-600" },
};

// ── Resource card ─────────────────────────────────────────────────────────────
function ResourceCard({ resource, onClick, isBookmarked, onToggleBookmark }) {
  const meta = TYPE_META[resource.type] || TYPE_META.article;

  const handleBookmark = (e) => {
    e.stopPropagation(); // don't open the resource when clicking bookmark
    onToggleBookmark(resource._id);
  };

  return (
    <div
      onClick={() => onClick(resource._id)}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer overflow-hidden group"
    >
      {/* Thumbnail */}
      <div className="relative h-36 bg-gradient-to-br from-[#1a2a5e] to-[#3b6fd4] flex items-center justify-center overflow-hidden">
        {resource.thumbnail ? (
          <img
            src={resource.thumbnail}
            alt={resource.title}
            className="w-full h-full object-cover"
          />
        ) : resource.type === "youtube" ? (
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
          </div>
        ) : resource.type === "pdf" ? (
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
          </svg>
        ) : resource.type === "notes" ? (
          <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round">
            <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
          </svg>
        ) : (
          <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round">
            <path d="M4 6h16M4 12h16M4 18h10"/>
          </svg>
        )}

        {/* Type badge */}
        <div className="absolute top-2 left-2">
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${meta.badgeClass}`}>
            {meta.label}
          </span>
        </div>

        {/* Level badge */}
        {resource.level && (
          <div className="absolute top-2 right-2">
            <span className="text-[10px] font-semibold bg-white/20 text-white px-2 py-0.5 rounded-full">
              {resource.level}
            </span>
          </div>
        )}

        {/* Bookmark button */}
        <button
          onClick={handleBookmark}
          className="absolute bottom-2 right-2 w-7 h-7 rounded-lg bg-white/20 hover:bg-white/40 transition flex items-center justify-center"
          title={isBookmarked ? "Remove bookmark" : "Bookmark"}
        >
          <svg
            width="13" height="13" viewBox="0 0 24 24"
            fill={isBookmarked ? "white" : "none"}
            stroke="white" strokeWidth="2" strokeLinecap="round"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/>
          </svg>
        </button>
      </div>

      {/* Card body */}
      <div className="p-4">
        <p className="text-sm font-semibold text-[#1a2a5e] leading-snug mb-1 line-clamp-2">
          {resource.title}
        </p>
        {resource.topic && (
          <p className="text-[11px] text-gray-400 mb-2 line-clamp-1">{resource.topic}</p>
        )}
        <div className="flex items-center justify-between mt-2">
          <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium">
            {resource.subject}
          </span>
          {resource.duration && (
            <span className="text-[10px] text-gray-400">{resource.duration}</span>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function ResourcesPage() {
  const { searchQuery } = useOutletContext();
  const navigate        = useNavigate();
  const [searchParams]  = useSearchParams();

  const [subject, setSubject] = useState("All Subjects");
  const [level,   setLevel]   = useState("All Levels");
  const [type,    setType]    = useState("All Types");

  // Pre-fill filters when arriving from the Subjects page
  useEffect(() => {
    const s = searchParams.get("subject");
    const l = searchParams.get("level");
    if (s) setSubject(s);
    if (l && l !== "All") setLevel(l);
  }, [searchParams]);

  const { resources, pagination, loading, error, refetch } = useResources({
    subject: subject !== "All Subjects" ? subject : undefined,
    level:   level   !== "All Levels"   ? level   : undefined,
    type:    type     !== "All Types"    ? type    : undefined,
    search:  searchQuery || undefined,
  });

  const { isBookmarked, toggle } = useBookmarks();

  const selectClass =
    "px-3 py-2 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 outline-none focus:border-[#1a2a5e]/40 transition cursor-pointer";

  const hasFilters =
    subject !== "All Subjects" || level !== "All Levels" || type !== "All Types";

  const clearFilters = () => {
    setSubject("All Subjects");
    setLevel("All Levels");
    setType("All Types");
  };

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-[#1a2a5e]">Resources</h1>
        <p className="text-gray-500 text-sm mt-1">
          {loading
            ? "Loading resources..."
            : `${pagination?.total ?? resources.length} resource${(pagination?.total ?? resources.length) !== 1 ? "s" : ""}${searchQuery ? ` for "${searchQuery}"` : ""}`
          }
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <select value={subject} onChange={(e) => setSubject(e.target.value)} className={selectClass}>
          {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
        </select>

        <select value={level} onChange={(e) => setLevel(e.target.value)} className={selectClass}>
          {LEVELS.map((l) => <option key={l}>{l}</option>)}
        </select>

        <select value={type} onChange={(e) => setType(e.target.value)} className={selectClass}>
          {TYPES.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>

        {hasFilters && (
          <button
            onClick={clearFilters}
            className="px-3 py-2 rounded-xl border border-red-200 bg-red-50 text-red-600 text-sm font-medium hover:bg-red-100 transition"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Loading */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
              <div className="h-36 bg-gray-100" />
              <div className="p-4 flex flex-col gap-2">
                <div className="h-4 bg-gray-100 rounded w-3/4" />
                <div className="h-3 bg-gray-100 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </div>
          <p className="text-sm font-semibold text-gray-700">Failed to load resources</p>
          <p className="text-xs text-gray-400">{error}</p>
          <button
            onClick={refetch}
            className="px-5 py-2 rounded-xl bg-[#1a2a5e] text-white text-sm font-bold hover:bg-[#14234d] transition"
          >
            Try again
          </button>
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && resources.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b6fd4" strokeWidth="1.8" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
          </div>
          <p className="text-sm font-semibold text-[#1a2a5e]">No resources found</p>
          <p className="text-xs text-gray-400">
            {hasFilters ? "Try adjusting your filters" : "No resources have been added yet"}
          </p>
          {hasFilters && (
            <button onClick={clearFilters} className="text-xs text-[#3b6fd4] font-semibold hover:underline">
              Clear all filters
            </button>
          )}
        </div>
      )}

      {/* Resource grid */}
      {!loading && !error && resources.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {resources.map((resource) => (
            <ResourceCard
              key={resource._id}
              resource={resource}
              onClick={(id) => navigate(`/dashboard/resources/${id}`)}
              isBookmarked={isBookmarked(resource._id)}
              onToggleBookmark={toggle}
            />
          ))}
        </div>
      )}

      {/* Load more */}
      {pagination?.hasMore && !loading && (
        <div className="text-center pt-2">
          <button
            onClick={() => refetch()}
            className="px-6 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 font-medium hover:bg-gray-50 transition"
          >
            Load more resources
          </button>
        </div>
      )}
    </div>
  );
}