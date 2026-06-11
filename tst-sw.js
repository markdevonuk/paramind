/* ============================================================
   PARAMIND — Triage Challenge offline worker
   Scoped to /tst.html ONLY. Caches only this one page so the
   exhibition iPad can run it with no internet connection.
   Uses its own cache namespace ('paramind-tst-*') and never
   touches the main site's service worker or its caches.
   ============================================================ */

const TST_CACHE = 'paramind-tst-v1';
const PAGE = '/tst.html';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(TST_CACHE)
      .then((cache) => cache.add(PAGE))
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k.startsWith('paramind-tst-') && k !== TST_CACHE)
            .map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// Network-first for the page so it stays current when online,
// and falls back to the cached copy when there is no connection.
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(TST_CACHE).then((cache) => cache.put(PAGE, copy));
          return response;
        })
        .catch(() => caches.match(PAGE))
    );
  }
});
