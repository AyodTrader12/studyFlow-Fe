// src/services/api/userApi.js
import { get, post, patch } from "../api/Client.js";

/** Called right after Firebase sign-up or login. Syncs user to MongoDB. */
export const syncUser = (data) =>
  post("/api/auth/sync", data);

/**
 * Called after Firebase confirms the email is verified.
 * Backend sets isVerified=true and sends verified confirmation email.
 */
export const confirmEmailVerified = () =>
  post("/api/auth/verify-email");

/**
 * Called after the student successfully changes their password.
 * Backend sends a "your password was changed" security email via Resend.
 */
export const notifyPasswordChanged = () =>
  post("/api/auth/password-changed");

/** Returns the current user's full MongoDB profile. */
export const getMe = () =>
  get("/api/auth/me");

/** Update display name, class level, subjects or email preferences. */
export const updateProfile = (data) =>
  patch("/api/auth/profile", data);