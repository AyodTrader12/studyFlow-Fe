// src/services/api/client.js
// The JWT is stored in an httpOnly cookie so we don't need to
// manually attach a token header for same-origin requests.
// credentials: "include" tells the browser to send cookies automatically.

export const BASE_URL = import.meta.env.VITE_RENDER_URL 
async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    credentials: "include", // sends the httpOnly cookie automatically
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    const err     = new Error(data?.message ?? `Request failed: ${res.status}`);
    err.status    = res.status;
    err.data      = data;
    throw err;
  }

  return data;
}

export const get   = (path)       => request(path);
export const post  = (path, body) => request(path, { method: "POST",   body: JSON.stringify(body ?? {}) });
export const patch = (path, body) => request(path, { method: "PATCH",  body: JSON.stringify(body ?? {}) });
export const del   = (path)       => request(path, { method: "DELETE" });