// src/services/api/client.js
// The JWT is stored in an httpOnly cookie so we don't need to
// manually attach a token header for same-origin requests.
// credentials: "include" tells the browser to send cookies automatically.

export const BASE_URL = import.meta.env.VITE_RENDER_URL 
console.log('BASE_URL:', BASE_URL); // Debug log
async function request(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  console.log('Fetching:', url, options); // Debug log
  const res = await fetch(url, {
    ...options,
    credentials: "include", // sends the httpOnly cookie automatically
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  console.log('Response status:', res.status); // Debug log
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