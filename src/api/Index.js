// src/services/api/index.js
// Barrel file — re-exports everything from every API module.
//
// Usage in components:
//   import { getResources, addBookmark, syncUser } from "../services/api";
//
// You never need to import from individual files — always import from here.

export * from "./UserApi";
export * from "./ResourceApi";
export * from "./BookMarkApi";
export * from "./ProgressApi";
export * from "./ReminderApi";
export * from "./SummaryApi.js";

export { BASE_URL } from "./Client.js";