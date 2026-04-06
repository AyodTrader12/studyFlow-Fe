// src/pages/DashboardBookmarks.jsx
// Shows all of the student's bookmarked resources.
// Search, filter by type, remove bookmarks, click to view.

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBookmarks } from "../../hook/UseApi";

const TYPE_META = {
  youtube: { label: "Video",   color: "bg-red-50 text-red-600",     dot: "bg-red-400" },
  pdf:     { label: "PDF",     color: "bg-blue-50 text-blue-600",   dot: "bg-blue-400" },
  notes:   { label: "Notes",   color: "bg-purple-50 text-purple-600", dot: "bg-purple-400" },
  article: { label: "Article", color: "bg-green-50 text-green-600", dot: "bg-green-400" },
};

const SUBJECT_COLORS = [
  "from-[#1a2a5e] to-[#3b6fd4]",
  "from-purple-600 to-purple-400",
  "from-teal-600 to-teal-400",
  "from-orange-500 to-orange-400",
  "from-green-600 to-green-400",
];

function BookmarkCard({ resource, onRemove, onClick }) {
  const meta = TYPE_META[resource.type] || TYPE_META.article;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group">
      {/* Thumbnail */}
      <div
        className={`h-28 bg-gradient-to-br ${SUBJECT_COLORS[resource.subject?.length % SUBJECT_COLORS.length] || SUBJECT_COLORS[0]} flex items-center justify-center relative cursor-pointer`}
        onClick={onClick}
      >
        {resource.thumbnail ? (
          <img src={resource.thumbnail} alt={resource.title} className="w-full h-full object-cover" />
        ) : resource.type === "youtube" ? (
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
          </div>
        ) : resource.type === "notes" ? (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round">
            <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
          </svg>
        ) : (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
          </svg>
        )}

        {/* Type badge */}
        <div className="absolute top-2 left-2">
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${meta.color}`}>
            {meta.label}
          </span>
        </div>

        {/* Remove bookmark */}
        <button
          onClick={(e) => { e.stopPropagation(); onRemove(resource._id); }}
          className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-black/30 hover:bg-red-500 transition flex items-center justify-center"
          title="Remove bookmark"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
      </div>

      {/* Body */}
      <div className="p-3 cursor-pointer" onClick={onClick}>
        <p className="text-sm font-semibold text-[#1a2a5e] line-clamp-2 leading-snug mb-1">
          {resource.title}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">
            {resource.subject}
          </span>
          {resource.level && (
            <span className="text-[10px] text-gray-400">{resource.level}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function DashboardBookmarks() {
  const navigate = useNavigate();
  const { bookmarks, loading, error, toggle } = useBookmarks();

  const [search,     setSearch]     = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const filtered = bookmarks.filter((r) => {
    const matchSearch = !search ||
      r.title?.toLowerCase().includes(search.toLowerCase()) ||
      r.subject?.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "all" || r.type === typeFilter;
    return matchSearch && matchType;
  });

  // Group by subject for the grouped view
  const grouped = filtered.reduce((acc, r) => {
    const key = r.subject || "Other";
    if (!acc[key]) acc[key] = [];
    acc[key].push(r);
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-[#1a2a5e]">Bookmarks</h1>
          <p className="text-gray-500 text-sm mt-1">
            {loading ? "Loading..." : `${bookmarks.length} saved resource${bookmarks.length !== 1 ? "s" : ""}`}
          </p>
        </div>
        {bookmarks.length > 0 && (
          <button
            onClick={() => navigate("/dashboard/resources")}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
            Find more
          </button>
        )}
      </div>

      {/* Filters */}
      {!loading && bookmarks.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {/* Search */}
          <div className="relative flex-1 min-w-48">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search bookmarks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-[#1a2a5e]/40 transition"
            />
          </div>

          {/* Type filter pills */}
          <div className="flex gap-2">
            {[
              { value: "all",     label: "All" },
              { value: "youtube", label: "Video" },
              { value: "notes",   label: "Notes" },
              { value: "pdf",     label: "PDF" },
              { value: "article", label: "Article" },
            ].map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setTypeFilter(value)}
                className={`px-3 py-2 rounded-xl text-xs font-medium border transition ${
                  typeFilter === value
                    ? "bg-[#1a2a5e] border-[#1a2a5e] text-white"
                    : "bg-white border-gray-200 text-gray-600 hover:border-[#1a2a5e]/40"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
              <div className="h-28 bg-gray-100" />
              <div className="p-3 flex flex-col gap-2">
                <div className="h-3 bg-gray-100 rounded w-3/4" />
                <div className="h-2.5 bg-gray-100 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="text-center py-12 text-red-500 text-sm">{error}</div>
      )}

      {/* Empty — no bookmarks at all */}
      {!loading && !error && bookmarks.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
          <div className="w-20 h-20 rounded-3xl bg-blue-50 flex items-center justify-center">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#3b6fd4" strokeWidth="1.5" strokeLinecap="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/>
            </svg>
          </div>
          <div>
            <p className="text-base font-bold text-[#1a2a5e] mb-1">No bookmarks yet</p>
            <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
              When you find a resource you want to revisit, tap the bookmark icon to save it here.
            </p>
          </div>
          <button
            onClick={() => navigate("/dashboard/resources")}
            className="px-6 py-3 rounded-xl bg-[#1a2a5e] text-white text-sm font-bold hover:bg-[#14234d] transition"
          >
            Browse Resources
          </button>
        </div>
      )}

      {/* Empty — no results after filtering */}
      {!loading && !error && bookmarks.length > 0 && filtered.length === 0 && (
        <div className="text-center py-10">
          <p className="text-sm text-gray-400">No bookmarks match your search.</p>
          <button
            onClick={() => { setSearch(""); setTypeFilter("all"); }}
            className="mt-2 text-xs text-[#3b6fd4] font-semibold hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Grouped bookmarks */}
      {!loading && !error && filtered.length > 0 && (
        <div className="flex flex-col gap-7">
          {Object.entries(grouped).map(([subject, items]) => (
            <div key={subject}>
              <div className="flex items-center gap-2 mb-3">
                <h2 className="text-sm font-bold text-[#1a2a5e]">{subject}</h2>
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                  {items.length}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((resource) => (
                  <BookmarkCard
                    key={resource._id}
                    resource={resource}
                    onRemove={toggle}
                    onClick={() => navigate(`/dashboard/resources/${resource._id}`)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}