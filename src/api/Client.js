 // src/services/api/client.js
// The single place that knows the backend URL and attaches the auth token.
// Every other api file imports { get, post, patch, del } from here.

import { auth } from "../Firebase.js"; "; // your existing firebase.js"

export const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:2244";

async function getToken() {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");
  return user.getIdToken();
}

async function request(path, options = {}) {
  const token = await getToken();

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.message ?? `Request failed: ${res.status}`);
  return data;
}

export const get   = (path)        => request(path);
export const post  = (path, body)  => request(path, { method: "POST",   body: JSON.stringify(body ?? {}) });
export const patch = (path, body)  => request(path, { method: "PATCH",  body: JSON.stringify(body ?? {}) });
export const del   = (path)        => request(path, { method: "DELETE" });