// src/context/AuthContext.jsx
// No Firebase. Auth state is determined by calling GET /api/auth/me.
// If the httpOnly cookie is valid, the backend returns the user profile.
// If not (401), the user is not logged in.

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { getMe, logout as apiLogout } from "../api/UserApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true); // true while checking auth state on load

  // Check auth state on every app load by hitting /api/auth/me
  const checkAuth = useCallback(async () => {
    try {
      const { user: u } = await getMe();
      setUser(u);
    } catch {
      // 401 means not logged in — that's fine
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const refreshUser = async () => {
    try {
      const { user: u } = await getMe();
      setUser(u);
    } catch {
      setUser(null);
    }
  };

  const logout = async () => {
    try { await apiLogout(); } catch { /* ignore */ }
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile: user,
        loading,
        isAdmin:     user?.isAdmin  ?? false,
        isVerified:  user?.isVerified ?? false,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}