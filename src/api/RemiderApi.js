// src/services/api/reminderApi.js
// All endpoints for creating and managing study reminders.
// The backend cron job reads these and sends reminder emails at the right time.

import { get, post, del } from "./client";

/** Get all reminders for the current user, sorted by date + time. */
export const getReminders = () =>
  get("/api/reminders");

/**
 * Create a new reminder.
 * The backend cron will send an email when date + time is reached.
 * @param {Object} data - { text: string, date: "YYYY-MM-DD", time?: "HH:MM" }
 */
export const createReminder = (data) =>
  post("/api/reminders", data);

/**
 * Delete a reminder.
 * @param {string} id - MongoDB _id of the reminder
 */
export const deleteReminder = (id) =>
  del(`/api/reminders/${id}`);