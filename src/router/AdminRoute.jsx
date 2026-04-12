// src/components/AdminRoute.jsx
// Protects /admin/* routes.
// Must be logged in AND isAdmin === true.
// Non-admins are redirected to /dashboard, not /login.

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4">
        <svg className="animate-spin h-10 w-10 text-[#1a2a5e]" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
        </svg>
        <p className="text-sm text-gray-400">Loading...</p>
      </div>
    );
  }

  // Not logged in → login page
  if (!user) return <Navigate to="/login" replace />;

  // Logged in but not admin → student dashboard
  if (!user.isAdmin) return <Navigate to="/dashboard" replace />;

  return children;
}