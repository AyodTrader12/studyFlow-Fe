// ResourceCard.jsx
// Displays a single resource as a card — video thumbnail, type badge, difficulty, etc.

import React from "react";

const typeConfig = {
  video: { label: "Video", icon: "▶", color: "#e63946", bg: "rgba(230,57,70,0.1)" },
  pdf:   { label: "PDF",   icon: "📄", color: "#2a6496", bg: "rgba(42,100,150,0.1)" },
  article: { label: "Article", icon: "📝", color: "#2d7a4f", bg: "rgba(45,122,79,0.1)" },
};

const difficultyDot = {
  Beginner:     "#2d7a4f",
  Intermediate: "#d97706",
  Advanced:     "#dc2626",
};

export default function pastQuestions({ resource, onClick, index = 0 }) {
  const typeCfg = typeConfig[resource.type] || typeConfig.article;

  return (
    <article
      className="resource-card"
      style={{ animationDelay: `${index * 0.05}s` }}
      onClick={() => onClick(resource)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick(resource)}
      aria-label={`Open ${resource.title}`}
    >
      {/* Thumbnail / Preview */}
      <div className="resource-card-thumb">
        {resource.thumbnail ? (
          <>
            <img
              src={resource.thumbnail}
              alt={resource.title}
              loading="lazy"
            />
            <div className="resource-card-play">
              <span>▶</span>
            </div>
          </>
        ) : (
          <div
            className="resource-card-thumb-placeholder"
            style={{ background: `linear-gradient(135deg, ${resource.subjectColor || "#1a3a6b"}22, ${resource.subjectColor || "#1a3a6b"}44)` }}
          >
            <span className="resource-card-thumb-icon">{resource.subjectIcon}</span>
            <span className="resource-card-thumb-type">{typeCfg.icon}</span>
          </div>
        )}
        <span
          className="resource-card-type-badge"
          style={{ color: typeCfg.color, background: typeCfg.bg }}
        >
          {typeCfg.icon} {typeCfg.label}
        </span>
      </div>

      {/* Content */}
      <div className="resource-card-body">
        <div className="resource-card-meta">
          <span className="resource-card-subject">
            {resource.subjectIcon} {resource.subjectName}
          </span>
          <span className="resource-card-topic">{resource.topicName}</span>
        </div>

        <h3 className="resource-card-title">{resource.title}</h3>
        <p className="resource-card-desc">{resource.description}</p>

        <div className="resource-card-footer">
          <span
            className="resource-card-difficulty"
            style={{ color: difficultyDot[resource.difficulty] || "#6b7a99" }}
          >
            <span
              className="resource-card-dot"
              style={{ background: difficultyDot[resource.difficulty] || "#6b7a99" }}
            />
            {resource.difficulty}
          </span>

          {resource.duration && (
            <span className="resource-card-duration">⏱ {resource.duration}</span>
          )}
          {resource.readTime && (
            <span className="resource-card-duration">⏱ {resource.readTime}</span>
          )}
        </div>
      </div>

      <style>{`
        .resource-card {
          background: #ffffff;
          border: 1.5px solid #e8edf8;
          border-radius: 14px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.2s cubic-bezier(0.34,1.56,0.64,1),
                      box-shadow 0.2s ease,
                      border-color 0.2s ease;
          animation: cardIn 0.35s ease both;
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(16px) }
          to   { opacity: 1; transform: translateY(0) }
        }
        .resource-card:hover {
          transform: translateY(-4px) scale(1.01);
          box-shadow: 0 12px 36px rgba(26,58,107,0.14);
          border-color: #1a3a6b;
        }

        /* Thumbnail */
        .resource-card-thumb {
          position: relative;
          width: 100%;
          aspect-ratio: 16/9;
          background: #0f1e3d;
          overflow: hidden;
        }
        .resource-card-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        .resource-card:hover .resource-card-thumb img {
          transform: scale(1.04);
        }
        .resource-card-play {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(5,15,40,0.35);
          opacity: 0;
          transition: opacity 0.2s;
        }
        .resource-card:hover .resource-card-play {
          opacity: 1;
        }
        .resource-card-play span {
          font-size: 2rem;
          color: #fff;
          background: rgba(26,58,107,0.85);
          width: 52px;
          height: 52px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-left: 4px;
        }
        .resource-card-thumb-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          flex-direction: column;
        }
        .resource-card-thumb-icon { font-size: 2.8rem; }
        .resource-card-thumb-type { font-size: 1.2rem; opacity: 0.7; }
        .resource-card-type-badge {
          position: absolute;
          bottom: 8px;
          left: 8px;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 3px 9px;
          border-radius: 20px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          backdrop-filter: blur(8px);
        }

        /* Body */
        .resource-card-body {
          padding: 1rem;
        }
        .resource-card-meta {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          margin-bottom: 0.5rem;
          flex-wrap: wrap;
        }
        .resource-card-subject {
          font-size: 0.72rem;
          font-weight: 600;
          color: #1a3a6b;
          background: rgba(26,58,107,0.08);
          padding: 2px 8px;
          border-radius: 20px;
        }
        .resource-card-topic {
          font-size: 0.7rem;
          color: #6b7a99;
        }
        .resource-card-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1rem;
          font-weight: 700;
          color: #0f1e3d;
          margin: 0 0 0.4rem;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .resource-card-desc {
          font-size: 0.82rem;
          color: #4a5a78;
          margin: 0 0 0.85rem;
          line-height: 1.55;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .resource-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
        }
        .resource-card-difficulty {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 0.75rem;
          font-weight: 600;
        }
        .resource-card-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .resource-card-duration {
          font-size: 0.74rem;
          color: #6b7a99;
        }
      `}</style>
    </article>
  );
}