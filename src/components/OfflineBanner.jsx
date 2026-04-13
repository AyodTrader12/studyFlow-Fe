// src/components/OfflineBanner.jsx
// Shows a non-intrusive banner at the top when the student loses internet.
// Disappears 3 seconds after reconnecting.

import { useState, useEffect } from "react";

export default function OfflineBanner() {
  const [isOffline,        setIsOffline]        = useState(!navigator.onLine);
  const [justReconnected,  setJustReconnected]  = useState(false);

  useEffect(() => {
    const goOffline = () => {
      setIsOffline(true);
      setJustReconnected(false);
    };

    const goOnline = () => {
      setIsOffline(false);
      setJustReconnected(true);
      setTimeout(() => setJustReconnected(false), 3000);
    };

    window.addEventListener("offline", goOffline);
    window.addEventListener("online",  goOnline);

    return () => {
      window.removeEventListener("offline", goOffline);
      window.removeEventListener("online",  goOnline);
    };
  }, []);

  if (!isOffline && !justReconnected) return null;

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-[9999] flex items-center justify-center gap-2
                  py-2 px-4 text-xs font-semibold transition-all duration-300 shadow-sm ${
        isOffline
          ? "bg-amber-500 text-white"
          : "bg-green-500 text-white"
      }`}
    >
      {isOffline ? (
        <>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="1" y1="1" x2="23" y2="23"/>
            <path d="M16.72 11.06A10.94 10.94 0 0119 12.55"/>
            <path d="M5 12.55a10.94 10.94 0 015.17-2.39"/>
            <path d="M10.71 5.05A16 16 0 0122.56 9"/>
            <path d="M1.42 9a15.91 15.91 0 014.7-2.88"/>
            <path d="M8.53 16.11a6 6 0 016.95 0"/>
            <line x1="12" y1="20" x2="12.01" y2="20"/>
          </svg>
          You are offline — viewing cached content
        </>
      ) : (
        <>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
          Back online!
        </>
      )}
    </div>
  );
}