const CACHE_NAME = 'interstellar-cache-v2';
const CACHE_ASSETS = [
  '/',
  '/index.html',

  /* CSS */
  '/assets/css/global.css',
  '/assets/css/h.css',
  '/assets/css/nav.css',

  /* JS */
  '/assets/js/001.js',
  '/assets/js/003.js',
  '/assets/js/004.js',
  '/assets/js/005.js',
  '/assets/mathematics/bundle.js',
  '/assets/mathematics/config.js',

  /* Manifest */
  '/site.webmanifest',

  /* Icons */
  '/android-chrome-192x192.png',
  '/android-chrome-512x512.png',
  '/apple-touch-icon.png',
  '/favicon-16x16.png',
  '/favicon-32x32.png',
  '/favicon.ico',
  '/favicon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(CACHE_ASSETS))
      .catch(err => console.error('Cache add failed:', err))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request)
      .then(res => res || fetch(event.request))
      .catch(() => caches.match('/index.html'))
  );
});
