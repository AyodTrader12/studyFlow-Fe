// src/components/ProtectedRoute.jsx
// Guards dashboard routes. Uses AuthContext (no Firebase).
// Shows a spinner while auth state is loading on first render.

import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4">
        <svg className="animate-spin h-10 w-10 text-[#1a2a5e]" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
        </svg>
        <p className="text-sm text-gray-400 font-medium">Loading StudyFlow...</p>
      </div>
    );
  }

  if (!user) {
    // Redirect to login and remember where they were trying to go
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return children;
}