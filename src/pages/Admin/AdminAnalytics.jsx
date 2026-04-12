// src/pages/admin/AdminAnalytics.jsx
// Basic analytics: most viewed resources, top subjects, user activity.
// Extend this with charts using recharts or Chart.js as the app grows.

import { useState, useEffect } from "react";
import { get } from "../../api/client";

export default function AdminAnalytics() {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    get("/api/admin/analytics").then(setData).catch(console.error).finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      <h1 className="text-xl font-bold text-white">Analytics</h1>
      {loading ? (
        <div className="flex justify-center py-20">
          <svg className="animate-spin h-8 w-8 text-blue-400" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
          </svg>
        </div>
      ) : (
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-8 text-center">
          <p className="text-gray-500 text-sm">
            Analytics coming soon. The backend /api/admin/analytics endpoint 
            will return most-viewed resources, top subjects, and user activity data.
          </p>
        </div>
      )}
    </div>
  );
}