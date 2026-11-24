// Fit Snack - service worker
// Estrategia: intenta la red primero (así siempre ves la versión nueva)
// y si no hay internet, usa lo que guardó antes.
const CACHE = "fitsnack-v1";
const BASE = ["./", "index.html", "styles.css", "app.js", "manifest.json"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(BASE)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((claves) => Promise.all(claves.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  if (new URL(e.request.url).origin !== location.origin) return;

  e.respondWith(
    fetch(e.request)
      .then((respuesta) => {
        if (respuesta.ok) {
          const copia = respuesta.clone();
          caches.open(CACHE).then((c) => c.put(e.request, copia));
        }
        return respuesta;
      })
      .catch(() => caches.match(e.request).then((r) => r || caches.match("index.html")))
  );
});
