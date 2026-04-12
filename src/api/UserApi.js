// src/services/api/userApi.js
import { get, post, patch } from "./client";

// ── Auth ──────────────────────────────────────────────────────────────────────

/** Create a new account. Backend sends OTP email. */
export const signUp = (data) =>
  post("/api/auth/signup", data);
// data: { displayName, email, password }
// returns: { message, email }

/** Verify 6-digit OTP code after sign up. */
export const verifyOtp = (data) =>
  post("/api/auth/verify-otp", data);
// data: { email, otp }
// returns: { message }

/** Resend a fresh OTP code. */
export const resendOtp = (data) =>
  post("/api/auth/resend-otp", data);
// data: { email, purpose: "verify" | "reset" }

/** Log in with email + password. Backend sets httpOnly cookie. */
export const login = (data) =>
  post("/api/auth/login", data);
// data: { email, password }
// returns: { message, user }

/** Log out — clears the JWT cookie on the backend. */
export const logout = () =>
  post("/api/auth/logout");

/** Request a password reset OTP. */
export const forgotPassword = (data) =>
  post("/api/auth/forgot-password", data);
// data: { email }

/** Verify reset OTP and set a new password. */
export const resetPassword = (data) =>
  post("/api/auth/reset-password", data);
// data: { email, otp, newPassword }

/** Change password while logged in (from Settings page). */
export const changePassword = (data) =>
  post("/api/auth/change-password", data);
// data: { currentPassword, newPassword }

// ── Profile ───────────────────────────────────────────────────────────────────

/** Get the current logged-in user's profile. */
export const getMe = () =>
  get("/api/auth/me");

/** Update profile fields. */
export const updateProfile = (data) =>
  patch("/api/auth/profile", data);
// data: { displayName?, classLevel?, subjects?, emailPreferences? }