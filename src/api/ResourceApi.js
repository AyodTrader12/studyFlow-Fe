// src/services/api/resourceApi.js
// All endpoints for browsing and managing study resources.

import { get, post, patch, del } from "./client";

/**
 * List resources with optional filters.
 * @param {Object} filters - { subject, level, type, search, page, limit }
 */
export const getResources = (filters = {}) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([k, v]) => {
    if (v !== undefined && v !== "") params.set(k, String(v));
  });
  const qs = params.toString();
  return get(`/api/resources${qs ? `?${qs}` : ""}`);
};

/**
 * Fetch a single resource by ID.
 * Also increments the view count on the backend.
 * @param {string} id - MongoDB _id
 */
export const getResource = (id) =>
  get(`/api/resources/${id}`);

/**
 * Admin only — add a new resource.
 * Backend auto-fetches YouTube metadata if type is "youtube".
 * @param {Object} data - resource fields
 */
export const createResource = (data) =>
  post("/api/resources", data);

/**
 * Admin only — update a resource.
 * @param {string} id
 * @param {Object} data - fields to update
 */
export const updateResource = (id, data) =>
  patch(`/api/resources/${id}`, data);

/**
 * Admin only — permanently delete a resource.
 * @param {string} id
 */
export const deleteResource = (id) =>
  del(`/api/resources/${id}`);