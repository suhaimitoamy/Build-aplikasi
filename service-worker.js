const CACHE_NAME = 'trading-library-v20260610-fix2';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './jszip.min.js',
  './manifest.json',
  './icons/icon-180.png',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching all assets');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Hanya proses metode GET, abaikan yang lain
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // 1. Mengembalikan aset dari cache jika ada
      if (cachedResponse) {
        return cachedResponse;
      }
      
      // 2. Jika tidak ada di cache, coba ambil dari jaringan
      return fetch(event.request).then((networkResponse) => {
        // Validasi response (hanya simpan jika status 200 OK)
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }

        // 3. Simpan ke cache secara dinamis jika URL berasal dari origin yang sama
        if (event.request.url.startsWith(self.location.origin)) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }

        return networkResponse;
      }).catch(() => {
        // Jika jaringan mati dan tidak ada di cache, bisa dikembalikan ke halaman offline.
        // Di sini karena ini single page app, mungkin tidak perlu di-handle khusus
        // karena index.html sudah di-cache saat install.
      });
    })
  );
});
