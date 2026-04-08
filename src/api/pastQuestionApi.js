// src/services/api/pastQuestionApi.js
import { get, post, del } from "./Client.js";

/** Get all past questions — optionally filtered by examBody, subject, year */
export const getPastQuestions = (filters = {}) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([k, v]) => {
    if (v !== undefined && v !== "" && v !== "All") params.set(k, String(v));
  });
  const qs = params.toString();
  return get(`/api/past-questions${qs ? `?${qs}` : ""}`);
};

/**
 * Get a summary grouped by exam body → subjects → years.
 * Used to build the Past Questions landing page cards.
 */
export const getPastQuestionsSummary = () =>
  get("/api/past-questions/summary");

/** Get past question counts per subject — used on Subjects page */
export const getPastQuestionSubjectCounts = () =>
  get("/api/past-questions/subject-counts");

/** Get a single past question by ID (includes the fileUrl) */
export const getPastQuestion = (id) =>
  get(`/api/past-questions/${id}`);

/** Admin only — add a past question */
export const createPastQuestion = (data) =>
  post("/api/past-questions", data);

/** Admin only — delete a past question */
export const deletePastQuestion = (id) =>
  del(`/api/past-questions/${id}`);

/** Get resource counts per subject — used on Subjects page */
export const getSubjectCounts = () =>
  get("/api/resources/subject-counts");