// ResourcesPage.jsx
// Main resources page — subject filters, topic drill-down, type filter, search, grid & viewer modal
// Drop this into your existing dashboard layout (it renders in the middle content slot)

import React from "react";
import { useResources } from "../../hook/UseResources";
import ResourceCard from "./PastQuestions";
import ResourceViewer from "./ResourceView";

const TYPE_FILTERS = [
  { id: null,      label: "All",      icon: "◈" },
  { id: "video",   label: "Videos",   icon: "▶" },
  { id: "article", label: "Articles", icon: "📝" },
  { id: "pdf",     label: "PDFs",     icon: "📄" },
];

export default function ResourcesPage() {
  const {
    subjects,
    filteredResources,
    activeTopics,
    activeSubject,
    activeTopic,
    activeType,
    searchQuery,
    selectedResource,
    setActiveSubject,
    setActiveTopic,
    setActiveType,
    setSearchQuery,
    setSelectedResource,
    clearFilters,
  } = useResources();

  const activeSubjectData = subjects.find((s) => s.id === activeSubject);
  const hasActiveFilters = activeSubject || activeTopic || activeType || searchQuery;

  return (
    <div className="rp-root">
      {/* ── Page Header ── */}
      <header className="rp-header">
        <div className="rp-header-left">
          <h1 className="rp-title">Resources</h1>
          <p className="rp-subtitle">
            {filteredResources.length} resource{filteredResources.length !== 1 ? "s" : ""} available
            {hasActiveFilters ? " — filtered" : ""}
          </p>
        </div>

        {/* Search Bar */}
        <div className="rp-search-wrap">
          <span className="rp-search-icon">🔍</span>
          <input
            className="rp-search"
            type="text"
            placeholder="Search by subject, topic, or keyword…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="rp-search-clear" onClick={() => setSearchQuery("")}>✕</button>
          )}
        </div>
      </header>

      {/* ── Subject Filter Pills ── */}
      <section className="rp-subjects" aria-label="Subject filters">
        <button
          className={`rp-subject-pill ${!activeSubject ? "rp-subject-pill--active" : ""}`}
          onClick={() => setActiveSubject(null)}
        >
          🔮 All Subjects
        </button>
        {subjects.map((subject) => (
          <button
            key={subject.id}
            className={`rp-subject-pill ${activeSubject === subject.id ? "rp-subject-pill--active" : ""}`}
            style={
              activeSubject === subject.id
                ? { background: subject.color, color: "#fff", borderColor: subject.color }
                : {}
            }
            onClick={() => setActiveSubject(subject.id)}
          >
            {subject.icon} {subject.name}
          </button>
        ))}
      </section>

      {/* ── Topic Sub-Filter (shown when a subject is active) ── */}
      {activeTopics.length > 0 && (
        <section className="rp-topics" aria-label="Topic filters">
          <span className="rp-topics-label">Topic:</span>
          <button
            className={`rp-topic-chip ${!activeTopic ? "rp-topic-chip--active" : ""}`}
            onClick={() => setActiveTopic(null)}
          >
            All
          </button>
          {activeTopics.map((topic) => (
            <button
              key={topic.id}
              className={`rp-topic-chip ${activeTopic === topic.id ? "rp-topic-chip--active" : ""}`}
              style={
                activeTopic === topic.id && activeSubjectData
                  ? { background: activeSubjectData.color, color: "#fff", borderColor: activeSubjectData.color }
                  : {}
              }
              onClick={() => setActiveTopic(topic.id)}
            >
              {topic.name}
            </button>
          ))}
        </section>
      )}

      {/* ── Type Filter + Clear ── */}
      <div className="rp-toolbar">
        <div className="rp-type-filters" role="group" aria-label="Resource type filters">
          {TYPE_FILTERS.map((t) => (
            <button
              key={String(t.id)}
              className={`rp-type-btn ${activeType === t.id ? "rp-type-btn--active" : ""}`}
              onClick={() => setActiveType(t.id)}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {hasActiveFilters && (
          <button className="rp-clear-btn" onClick={clearFilters}>
            ✕ Clear filters
          </button>
        )}
      </div>

      {/* ── Resource Grid ── */}
      {filteredResources.length > 0 ? (
        <div className="rp-grid">
          {filteredResources.map((resource, i) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              onClick={setSelectedResource}
              index={i}
            />
          ))}
        </div>
      ) : (
        <div className="rp-empty">
          <span className="rp-empty-icon">🔭</span>
          <h3>No resources found</h3>
          <p>Try adjusting your search or filters.</p>
          <button className="rp-clear-btn" onClick={clearFilters}>
            Clear all filters
          </button>
        </div>
      )}

      {/* ── Resource Viewer Modal ── */}
      {selectedResource && (
        <ResourceViewer
          resource={selectedResource}
          onClose={() => setSelectedResource(null)}
        />
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap');

        .rp-root {
          font-family: 'DM Sans', sans-serif;
          color: #0f1e3d;
          padding: 1.75rem 2rem;
          min-height: 100%;
          background: #f7f9ff;
        }

        /* Header */
        .rp-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1.5rem;
          flex-wrap: wrap;
          margin-bottom: 1.5rem;
        }
        .rp-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 2rem;
          font-weight: 900;
          color: #0f1e3d;
          margin: 0 0 0.2rem;
          letter-spacing: -0.02em;
        }
        .rp-subtitle {
          font-size: 0.85rem;
          color: #6b7a99;
          margin: 0;
        }

        /* Search */
        .rp-search-wrap {
          position: relative;
          flex: 1;
          min-width: 260px;
          max-width: 420px;
        }
        .rp-search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 0.9rem;
          pointer-events: none;
        }
        .rp-search {
          width: 100%;
          padding: 0.65rem 2.5rem 0.65rem 2.75rem;
          border: 1.5px solid #d8e0f0;
          border-radius: 50px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem;
          color: #0f1e3d;
          background: #fff;
          outline: none;
          box-sizing: border-box;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .rp-search::placeholder { color: #a0aac0; }
        .rp-search:focus {
          border-color: #1a3a6b;
          box-shadow: 0 0 0 3px rgba(26,58,107,0.1);
        }
        .rp-search-clear {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          font-size: 0.8rem;
          color: #6b7a99;
          cursor: pointer;
          padding: 2px 4px;
        }
        .rp-search-clear:hover { color: #0f1e3d; }

        /* Subject Pills */
        .rp-subjects {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }
        .rp-subject-pill {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          font-weight: 600;
          padding: 0.45rem 1rem;
          border-radius: 50px;
          border: 1.5px solid #d8e0f0;
          background: #fff;
          color: #1a2a4a;
          cursor: pointer;
          transition: all 0.18s ease;
          white-space: nowrap;
        }
        .rp-subject-pill:hover {
          border-color: #1a3a6b;
          color: #1a3a6b;
          background: rgba(26,58,107,0.05);
        }
        .rp-subject-pill--active {
          background: #1a3a6b;
          color: #fff;
          border-color: #1a3a6b;
        }

        /* Topic Chips */
        .rp-topics {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.4rem;
          margin-bottom: 1rem;
          padding: 0.75rem 1rem;
          background: #fff;
          border: 1.5px solid #e8edf8;
          border-radius: 12px;
        }
        .rp-topics-label {
          font-size: 0.78rem;
          font-weight: 700;
          color: #6b7a99;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-right: 0.25rem;
        }
        .rp-topic-chip {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem;
          font-weight: 500;
          padding: 0.3rem 0.85rem;
          border-radius: 50px;
          border: 1.5px solid #d8e0f0;
          background: #f7f9ff;
          color: #1a2a4a;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .rp-topic-chip:hover {
          border-color: #1a3a6b;
          background: rgba(26,58,107,0.06);
        }
        .rp-topic-chip--active {
          background: #1a3a6b;
          color: #fff;
          border-color: #1a3a6b;
        }

        /* Toolbar */
        .rp-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }
        .rp-type-filters {
          display: flex;
          gap: 0.4rem;
          flex-wrap: wrap;
        }
        .rp-type-btn {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          font-weight: 500;
          padding: 0.35rem 0.9rem;
          border-radius: 8px;
          border: 1.5px solid #d8e0f0;
          background: #fff;
          color: #4a5a78;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .rp-type-btn:hover {
          border-color: #1a3a6b;
          color: #1a3a6b;
        }
        .rp-type-btn--active {
          background: rgba(26,58,107,0.08);
          border-color: #1a3a6b;
          color: #1a3a6b;
          font-weight: 700;
        }
        .rp-clear-btn {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          font-weight: 600;
          padding: 0.35rem 1rem;
          border-radius: 8px;
          border: 1.5px solid #e0e5f2;
          background: #fff;
          color: #6b7a99;
          cursor: pointer;
          transition: all 0.15s;
        }
        .rp-clear-btn:hover {
          background: #fdf2f2;
          border-color: #e63946;
          color: #e63946;
        }

        /* Grid */
        .rp-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.25rem;
        }

        /* Empty State */
        .rp-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          padding: 4rem 2rem;
          text-align: center;
        }
        .rp-empty-icon { font-size: 3rem; }
        .rp-empty h3 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.3rem;
          font-weight: 700;
          color: #0f1e3d;
          margin: 0;
        }
        .rp-empty p {
          color: #6b7a99;
          font-size: 0.9rem;
          margin: 0;
        }

        /* Responsive */
        @media (max-width: 640px) {
          .rp-root { padding: 1rem; }
          .rp-header { flex-direction: column; }
          .rp-search-wrap { max-width: 100%; }
          .rp-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}