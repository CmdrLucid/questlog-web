"use strict";
const FACH = "questlog-dev-09002dfce6";
const DATEIEN = ["./","app.js","backend.js","fonts/OFL.txt","fonts/eb-garamond-latin-400-italic.woff2","fonts/eb-garamond-latin-400-normal.woff2","fonts/eb-garamond-latin-600-italic.woff2","fonts/eb-garamond-latin-600-normal.woff2","fonts/eb-garamond-latin-700-normal.woff2","fonts/eb-garamond-latin-ext-400-italic.woff2","fonts/eb-garamond-latin-ext-400-normal.woff2","fonts/eb-garamond-latin-ext-600-italic.woff2","fonts/eb-garamond-latin-ext-600-normal.woff2","fonts/eb-garamond-latin-ext-700-normal.woff2","fonts/im-fell-english-latin-400-italic.woff2","fonts/im-fell-english-latin-400-normal.woff2","fonts/schriften.css","icons/icon-180.png","icons/icon-192.png","icons/icon-512.png","index.html","js/bon-leser.js","js/katze.js","js/rezept-leser.js","js/taverne.js","lizenzen.js","manifest.webmanifest","pwa.js"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(FACH).then(c => c.addAll(DATEIEN.map(d => new Request(d, { cache: "reload" })))).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(k => Promise.all(k.filter(n => n !== FACH).map(n => caches.delete(n)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const r = e.request;
  if (r.method !== "GET" || new URL(r.url).origin !== location.origin) return;
  e.respondWith(caches.open(FACH).then(c =>
    c.match(r, { ignoreSearch: true }).then(t => t || (r.mode === "navigate" ? c.match("./") : null)).then(t => t || fetch(r))
  ));
});
