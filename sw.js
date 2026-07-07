const CACHE_NAME = "piden-cache-v1";

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  // Allow normal network requests (important for pull-to-refresh)
  event.respondWith(
    fetch(event.request).catch(() =>
      caches.match(event.request)
    )
  );
});