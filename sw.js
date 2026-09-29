const CACHE_NAME = 'habia-vez-v6';
const APP_SHELL = [
  './',
  './index.html',
  './styles.css?v=5',
  './app.js?v=3',
  './manifest.webmanifest'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const requestUrl = new URL(event.request.url);
  const isAppShellRequest = event.request.mode === 'navigate' || /\.(css|js)$/.test(requestUrl.pathname);
  if (isAppShellRequest) {
    event.respondWith(
      fetch(event.request).then((response) => {
        if (!response.ok) return response;
        return caches.open(CACHE_NAME).then((cache) =>
          cache.put(event.request, response.clone()).then(() => response)
        );
      }).catch(() => caches.match(event.request).then((cached) => cached || caches.match('./index.html')))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request).then((response) => {
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
        return response;
      }).catch(() => caches.match('./index.html'));
    })
  );
});
