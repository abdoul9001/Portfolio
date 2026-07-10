/* =========================================================
   PORTFOLIO — Abdoul-raouf Sonhouin
   Service Worker (cache-first pour les assets statiques)
   ========================================================= */
const CACHE = "portfolio-v1";
const ASSETS = [
  "/Portfolio/",
  "/Portfolio/index.html",
  "/Portfolio/css/style.css",
  "/Portfolio/js/script.js",
  "/Portfolio/images/favicon.svg",
  "/Portfolio/images/og-cover.svg",
  "/Portfolio/manifest.json"
];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (cache) {
      return cache.addAll(ASSETS).catch(function () {});
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", function (e) {
  e.respondWith(
    caches.match(e.request).then(function (cached) {
      return cached || fetch(e.request).then(function (res) {
        return caches.open(CACHE).then(function (cache) {
          cache.put(e.request, res.clone());
          return res;
        });
      }).catch(function () {
        return caches.match("/Portfolio/index.html");
      });
    })
  );
});