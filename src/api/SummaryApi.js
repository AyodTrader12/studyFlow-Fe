// src/services/api/summaryApi.js
// All endpoints for Gemini AI-generated study summaries.
// Summaries are cached in MongoDB — the same resource is never sent to Gemini twice.

import { get, post } from "./client";

/**
 * Fetch a cached summary for a resource.
 * Returns 404 if no summary has been generated yet — that is fine,
 * it just means the student needs to click "Generate Summary".
 * @param {string} resourceId - MongoDB _id
 */
export const getSummary = (resourceId) =>
  get(`/api/summaries/${resourceId}`);

/**
 * Generate a new AI summary via Gemini.
 * If a summary already exists in the cache, the backend returns it immediately
 * without calling Gemini again.
 * @param {string} resourceId - MongoDB _id
 */
export const generateSummary = (resourceId) =>
  post(`/api/summaries/${resourceId}/generate`);