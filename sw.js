const CACHE_NAME = 'rgen-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/About.html',
  '/Events.html',
  '/stories.html',
  '/asset/style.css',
  '/script.js'
];

// Install Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch cached files when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});