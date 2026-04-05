// src/services/api/userApi.js
// All endpoints related to the authenticated user's profile.

import { get, post, patch } from "./Client.js";

/**
 * Called right after Firebase sign-up or login.
 * Creates the user in MongoDB on first call and sends the welcome email.
 * @param {Object} data - optional { classLevel, subjects }
 */
export const syncUser = (data) =>
  post("/api/auth/sync", data);

/**
 * Called after Firebase confirms the email is verified.
 * Backend flips isVerified = true and sends confirmation email.
 */
export const confirmEmailVerified = () =>
  post("/api/auth/verify-email");

/** Returns the current user's full MongoDB profile. */
export const getMe = () =>
  get("/api/auth/me");

/**
 * Update display name, class level, subjects or email preferences.
 * @param {Object} data - fields to update
 */
export const updateProfile = (data) =>
  patch("/api/auth/profile", data);