// src/services/api/bookmarkApi.js
// All endpoints for saving and removing bookmarked resources.

import { get, post, del } from "./Client.js";
/** Get all resources the current user has bookmarked. */
export const getBookmarks = () =>
  get("/api/bookmarks");

/**
 * Bookmark a resource.
 * @param {string} resourceId - MongoDB _id of the resource
 */
export const addBookmark = (resourceId) =>
  post(`/api/bookmarks/${resourceId}`);

/**
 * Remove a bookmark.
 * @param {string} resourceId - MongoDB _id of the resource
 */
export const removeBookmark = (resourceId) =>
  del(`/api/bookmarks/${resourceId}`);