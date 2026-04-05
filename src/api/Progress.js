// src/services/api/progressApi.js
// All endpoints for tracking study progress and streaks.

import { get, post } from "./Client.js";

/** Get the full list of resources this user has viewed. */
export const getProgress = () =>
  get("/api/progress");

/** Get per-subject progress totals — used on the Progress dashboard page. */
export const getProgressStats = () =>
  get("/api/progress/stats");

/**
 * Mark a resource as viewed.
 * Also updates the study streak and triggers milestone emails on the backend.
 * @param {string} resourceId - MongoDB _id of the resource
 * @param {number} timeSpent  - seconds spent on this resource (optional)
 */
export const markResourceViewed = (resourceId, timeSpent = 0) =>
  post(`/api/progress/${resourceId}`, { timeSpent });