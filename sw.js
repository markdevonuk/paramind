/* ============================================
   PARAMIND - Service Worker for PWA
   ============================================
   This file enables offline functionality and caching
*/

const CACHE_NAME = 'paramind-v32';

// Files to cache for offline use
// Add your main pages and essential assets here
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/landing.html',
  '/login.html',
  '/register.html',
  '/chat.html',
  '/scenarios.html',
  '/differentials.html',
  '/atmist.html',
  '/ecg.html',
  '/cpd.html',
  '/contact.html',
  '/css/styles.css',
  '/css/menu-v2.css',
  '/js/app.js',
  '/js/menu-v2.js',
  '/images/icons/icon-192x192.png',
  '/images/icons/icon-512x512.png',
  '/manifest.json'
];

// Install event - cache essential files
self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[ServiceWorker] Caching app shell');
        // Use addAll but don't fail if some resources aren't available
        return cache.addAll(ASSETS_TO_CACHE).catch((error) => {
          console.log('[ServiceWorker] Some assets failed to cache:', error);
          // Still continue - we'll cache what we can
        });
      })
      .then(() => {
        // Immediately activate the new service worker
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activating...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Delete old versions of our cache
          if (cacheName !== CACHE_NAME && cacheName.startsWith('paramind-')) {
            console.log('[ServiceWorker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Take control of all pages immediately
      return self.clients.claim();
    })
  );
});

// Fetch event - serve from cache, fall back to network
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Skip caching for:
  // - API calls (Firebase functions)
  // - Firebase authentication
  // - Stripe
  // - External CDNs (Bootstrap, fonts, etc.)
  const skipCache = 
    url.hostname.includes('cloudfunctions.net') ||
    url.hostname.includes('firebaseapp.com') ||
    url.hostname.includes('googleapis.com') ||
    url.hostname.includes('stripe.com') ||
    url.hostname.includes('cdn.jsdelivr.net') ||
    url.hostname.includes('fonts.googleapis.com') ||
    url.hostname.includes('fonts.gstatic.com') ||
    event.request.method !== 'GET';
  
  if (skipCache) {
    // For API calls, always go to network
    return;
  }
  
  event.respondWith(
    (() => {
      // For HTML pages, always bypass the HTTP cache so updates come through immediately
      const isHtml = event.request.headers.get('accept')?.includes('text/html') ||
                     event.request.url.endsWith('.html') ||
                     event.request.mode === 'navigate';
      const fetchRequest = isHtml
        ? new Request(event.request, { cache: 'no-cache' })
        : event.request;

      return fetch(fetchRequest)
      .then((networkResponse) => {
        // Network succeeded — cache the fresh response and return it
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        // Network failed — fall back to cache
        return caches.match(event.request)
          .then((cachedResponse) => {
            if (cachedResponse) {
              console.log('[ServiceWorker] Network failed, serving from cache:', event.request.url);
              return cachedResponse;
            }
            // Not in cache either — return offline page for navigation
            if (event.request.mode === 'navigate') {
              return caches.match('/offline.html');
            }
            return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
          });
      })
    })()
  );
});

// Handle messages from the main app
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
