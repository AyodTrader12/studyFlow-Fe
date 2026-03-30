// ResourceViewer.jsx
// Handles embedded playback of YouTube videos, PDFs, and article notes
// All content stays WITHIN the app — no redirects to external platforms

import React, { useState } from "react";

const typeConfig = {
  video: { label: "Video", icon: "▶", badge: "#e63946" },
  pdf: { label: "PDF", icon: "📄", badge: "#2a6496" },
  article: { label: "Article", icon: "📝", badge: "#2d7a4f" },
};

const difficultyConfig = {
  Beginner: { color: "#2d7a4f", bg: "rgba(45,122,79,0.12)" },
  Intermediate: { color: "#d97706", bg: "rgba(217,119,6,0.12)" },
  Advanced: { color: "#dc2626", bg: "rgba(220,38,38,0.12)" },
};

export default function ResourceViewer({ resource, onClose }) {
  const [articleLoaded, setArticleLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);

  if (!resource) return null;

  const typeCfg = typeConfig[resource.type] || typeConfig.article;
  const diffCfg = difficultyConfig[resource.difficulty] || difficultyConfig.Beginner;

  const renderContent = () => {
    switch (resource.type) {
      case "video":
        return (
          <div className="resource-embed-wrapper">
            <iframe
              className="resource-embed resource-embed--video"
              src={`https://www.youtube-nocookie.com/embed/${resource.embedId}?autoplay=1&rel=0&modestbranding=1`}
              title={resource.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        );

      case "pdf":
        return (
          <div className="resource-embed-wrapper">
            <iframe
              className="resource-embed resource-embed--pdf"
              src={`${resource.url}#toolbar=1&navpanes=1`}
              title={resource.title}
              frameBorder="0"
              onLoad={() => setArticleLoaded(true)}
              onError={() => setIframeError(true)}
            />
            {iframeError && (
              <div className="resource-fallback">
                <span>⚠️</span>
                <p>This PDF cannot be embedded directly.</p>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noreferrer"
                  className="resource-fallback-link"
                >
                  Open PDF in new tab →
                </a>
              </div>
            )}
          </div>
        );

      case "article":
        return (
          <div className="resource-embed-wrapper">
            {!iframeError ? (
              <iframe
                className="resource-embed resource-embed--article"
                src={resource.url}
                title={resource.title}
                frameBorder="0"
                sandbox="allow-scripts allow-same-origin allow-popups"
                onLoad={() => setArticleLoaded(true)}
                onError={() => setIframeError(true)}
              />
            ) : (
              <div className="resource-fallback">
                <span>🔗</span>
                <p>This article is best viewed directly on its source site.</p>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noreferrer"
                  className="resource-fallback-link"
                >
                  Open Article →
                </a>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="resource-viewer-overlay" onClick={onClose}>
      <div
        className="resource-viewer"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="resource-viewer-header">
          <div className="resource-viewer-meta">
            <span
              className="resource-type-badge"
              style={{ background: typeCfg.badge }}
            >
              {typeCfg.icon} {typeCfg.label}
            </span>
            <span
              className="resource-difficulty-badge"
              style={{ color: diffCfg.color, background: diffCfg.bg }}
            >
              {resource.difficulty}
            </span>
            {resource.subjectName && (
              <span className="resource-subject-tag">
                {resource.subjectIcon} {resource.subjectName} · {resource.topicName}
              </span>
            )}
          </div>
          <button className="resource-viewer-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <h2 className="resource-viewer-title">{resource.title}</h2>
        <p className="resource-viewer-desc">{resource.description}</p>

        {/* Embed Area */}
        {renderContent()}

        {/* Footer tags */}
        {resource.tags && (
          <div className="resource-viewer-tags">
            {resource.tags.map((tag) => (
              <span key={tag} className="resource-tag">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .resource-viewer-overlay {
          position: fixed;
          inset: 0;
          background: rgba(5, 15, 40, 0.82);
          backdrop-filter: blur(6px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          animation: fadeIn 0.2s ease;
        }
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }

        .resource-viewer {
          background: #ffffff;
          border-radius: 16px;
          width: 100%;
          max-width: 900px;
          max-height: 92vh;
          overflow-y: auto;
          padding: 1.75rem;
          box-shadow: 0 32px 80px rgba(5,15,40,0.5);
          animation: slideUp 0.25s cubic-bezier(0.34,1.56,0.64,1);
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px) scale(0.97) }
          to   { opacity: 1; transform: translateY(0) scale(1) }
        }

        .resource-viewer-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 0.75rem;
          gap: 1rem;
        }
        .resource-viewer-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          align-items: center;
        }
        .resource-type-badge {
          font-size: 0.72rem;
          font-weight: 700;
          color: #fff;
          padding: 3px 10px;
          border-radius: 20px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .resource-difficulty-badge {
          font-size: 0.72rem;
          font-weight: 600;
          padding: 3px 10px;
          border-radius: 20px;
          letter-spacing: 0.03em;
        }
        .resource-subject-tag {
          font-size: 0.76rem;
          color: #6b7a99;
          font-weight: 500;
        }
        .resource-viewer-close {
          background: #f0f3fa;
          border: none;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          font-size: 0.85rem;
          cursor: pointer;
          color: #1a2a4a;
          flex-shrink: 0;
          transition: background 0.15s, transform 0.15s;
        }
        .resource-viewer-close:hover {
          background: #e0e5f2;
          transform: scale(1.1);
        }
        .resource-viewer-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.4rem;
          font-weight: 700;
          color: #0f1e3d;
          margin: 0 0 0.5rem;
          line-height: 1.35;
        }
        .resource-viewer-desc {
          font-size: 0.9rem;
          color: #4a5a78;
          margin: 0 0 1.25rem;
          line-height: 1.6;
        }
        .resource-embed-wrapper {
          width: 100%;
          border-radius: 12px;
          overflow: hidden;
          background: #0f1e3d;
          margin-bottom: 1.25rem;
          position: relative;
        }
        .resource-embed {
          width: 100%;
          display: block;
          border: none;
        }
        .resource-embed--video {
          aspect-ratio: 16/9;
        }
        .resource-embed--pdf,
        .resource-embed--article {
          height: 520px;
        }
        .resource-fallback {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          padding: 3rem 2rem;
          background: #f5f7ff;
          text-align: center;
        }
        .resource-fallback span { font-size: 2.5rem; }
        .resource-fallback p { color: #4a5a78; font-size: 0.95rem; margin: 0; }
        .resource-fallback-link {
          color: #1a3a6b;
          font-weight: 600;
          font-size: 0.95rem;
          text-decoration: none;
          border-bottom: 2px solid #1a3a6b;
          padding-bottom: 2px;
        }
        .resource-fallback-link:hover { opacity: 0.75; }
        .resource-viewer-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }
        .resource-tag {
          font-size: 0.74rem;
          color: #4a5a78;
          background: #f0f3fa;
          padding: 3px 10px;
          border-radius: 20px;
        }
      `}</style>
    </div>
  );
}