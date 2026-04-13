import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // 1. Import Tailwind
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // 2. Add Tailwind plugin
    VitePWA({
      // autoUpdate: silently updates the service worker in the background.
      // The student never sees a disruptive "update available" popup.
      registerType: "autoUpdate",
 
      // Static assets to cache immediately on first install
      includeAssets: [
        "favicon.ico",
        "apple-touch-icon.png",
        "icons/icon-192.png",
        "icons/icon-512.png",
      ],
 
      // Web app manifest — controls how the app looks when installed
      manifest: {
        name:             "StudyFlow",
        short_name:       "StudyFlow",
        description:      "Find the Right Study Resources Faster",
        theme_color:      "#1a2a5e",
        background_color: "#f0f3fa",
        display:          "standalone",
        orientation:      "portrait-primary",
        start_url:        "/dashboard",
        scope:            "/",
        icons: [
          {
            src:   "/icons/icon-192.png",
            sizes: "192x192",
            type:  "image/png",
          },
          {
            src:   "/icons/icon-512.png",
            sizes: "512x512",
            type:  "image/png",
          },
          {
            src:     "/icons/icon-512.png",
            sizes:   "512x512",
            type:    "image/png",
            purpose: "maskable", // for Android adaptive icons
          },
        ],
      },
 
      workbox: {
        // Cache the app shell (HTML, JS, CSS bundles)
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff,woff2}"],
 
        // ── Runtime caching strategies ──────────────────────────────────────
        runtimeCaching: [
 
          // 1. Resources list — NetworkFirst
          // Try network first, fall back to cache if offline.
          // Cache lasts 7 days so students can read resources offline.
          {
            urlPattern: ({ url }) =>
              url.pathname.startsWith("/api/resources"),
            handler: "NetworkFirst",
            options: {
              cacheName:            "api-resources",
              networkTimeoutSeconds: 5,
              expiration: {
                maxEntries:    100,
                maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
 
          // 2. AI Summaries — CacheFirst
          // Gemini summaries never change once generated.
          // Cache for 30 days — no point calling the network again.
          {
            urlPattern: ({ url }) =>
              url.pathname.startsWith("/api/summaries"),
            handler: "CacheFirst",
            options: {
              cacheName: "api-summaries",
              expiration: {
                maxEntries:    300,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
 
          // 3. Past questions — CacheFirst
          // PDFs don't change. Cache indefinitely.
          {
            urlPattern: ({ url }) =>
              url.pathname.startsWith("/api/past-questions"),
            handler: "CacheFirst",
            options: {
              cacheName: "api-past-questions",
              expiration: {
                maxEntries:    200,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
 
          // 4. Bookmarks + Progress — NetworkFirst
          // Personal data changes often. Try network but fall back to cache.
          {
            urlPattern: ({ url }) =>
              url.pathname.startsWith("/api/bookmarks") ||
              url.pathname.startsWith("/api/progress"),
            handler: "NetworkFirst",
            options: {
              cacheName:            "api-user-data",
              networkTimeoutSeconds: 4,
              expiration: {
                maxEntries:    50,
                maxAgeSeconds: 60 * 60 * 24, // 1 day
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
 
          // 5. Auth endpoints — NetworkOnly
          // Never cache login/signup — always needs fresh token verification.
          {
            urlPattern: ({ url }) =>
              url.pathname.startsWith("/api/auth"),
            handler: "NetworkOnly",
          },
 
          // 6. YouTube thumbnails — StaleWhileRevalidate
          // Show the cached thumbnail immediately, update in the background.
          {
            urlPattern: /^https:\/\/i\.ytimg\.com/,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "youtube-thumbnails",
              expiration: {
                maxEntries:    150,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
 
          // 7. Google Fonts — CacheFirst
          // Fonts never change. Cache forever.
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com/,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-stylesheets",
              expiration: { maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com/,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-webfonts",
              expiration: {
                maxEntries:    30,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
 
        // SPA fallback — serve index.html for all unmatched navigation requests
        navigateFallback: "/index.html",
 
        // Don't intercept these with the service worker
        navigateFallbackDenylist: [
          /^\/api/,
          /youtube\.com/,
          /docs\.google\.com/,
        ],
      },
 
      // Disable PWA in dev — avoids confusing caching behaviour during development
      devOptions: {
        enabled: false,
      },
    }),
  ],
 
  server: {
    port: 5173,
  },
});
 