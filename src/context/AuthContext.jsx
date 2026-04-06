// src/context/AuthContext.jsx
// Wraps Firebase auth state AND the MongoDB user profile in one context.
// Use useAuth() anywhere in the app instead of calling Firebase directly.

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../Firebase";
import { syncUser, getMe } from "../api/UserApi.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [userProfile,  setUserProfile]  = useState(null);
  const [loading,      setLoading]      = useState(true);

  const refreshProfile = useCallback(async () => {
    try {
      const { user } = await getMe();
      setUserProfile(user);
    } catch {
      // User might not be synced yet — that is fine
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      setFirebaseUser(fbUser);

      if (fbUser) {
        try {
          // Sync Firebase user to MongoDB on every login.
          // Backend creates the user if first time and sends welcome email.
          const { user } = await syncUser({
            name: fbUser.displayName,
            email: fbUser.email,
            firebaseUid: fbUser.uid
          });
          setUserProfile(user);
        } catch {
          // Fallback — try just fetching the existing profile
          await refreshProfile().catch(() => null);
        }
      } else {
        setUserProfile(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [refreshProfile]);

  const logout = async () => {
    await signOut(auth);
    setUserProfile(null);
  };

  return (
    <AuthContext.Provider
      value={{
        firebaseUser,
        userProfile,
        loading,
        isAdmin: userProfile?.isAdmin ?? false,
        logout,
        refreshProfile,
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