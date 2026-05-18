const CACHE_VERSION = "20260518pwaGithubPages1";
const CACHE_NAME = `trading-library-manager-${CACHE_VERSION}`;

const APP_SHELL = [
  "./",
  `./index.html?v=${CACHE_VERSION}`,
  `./style.css?v=${CACHE_VERSION}`,
  `./app.js?v=${CACHE_VERSION}`,
  `./manifest.json?v=${CACHE_VERSION}`,
  `./service-worker.js?v=${CACHE_VERSION}`,
  `./jszip.min.js?v=${CACHE_VERSION}`,
  "./reset-cache.html",
  "./icons/icon-180.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

const APP_SHELL_FILES = new Set([
  "",
  "index.html",
  "style.css",
  "app.js",
  "manifest.json",
  "service-worker.js",
  "jszip.min.js",
  "reset-cache.html",
  "icon-180.png",
  "icon-192.png",
  "icon-512.png"
]);

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((key) => key.startsWith("trading-library-manager-") && key !== CACHE_NAME).map((key) => caches.delete(key))
    ))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const requestUrl = new URL(event.request.url);
  if (requestUrl.origin !== self.location.origin) return;

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request, { cache: "no-store" })
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(`./index.html?v=${CACHE_VERSION}`, copy));
          return response;
        })
        .catch(() => caches.match(`./index.html?v=${CACHE_VERSION}`).then((cached) => cached || caches.match("./index.html")))
    );
    return;
  }

  const fileName = requestUrl.pathname.split("/").pop() || "index.html";
  const isAppShell = APP_SHELL_FILES.has(fileName);
  event.respondWith(
    fetch(event.request, { cache: isAppShell ? "no-store" : "default" })
      .then(async (response) => {
        const cache = await caches.open(CACHE_NAME);
        await cache.put(event.request, response.clone());
        return response;
      })
      .catch(() => caches.match(event.request).then((cached) => cached || caches.match(`./index.html?v=${CACHE_VERSION}`) || caches.match("./index.html")))
  );
});
