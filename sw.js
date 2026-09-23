/* Cache hors-ligne : l'application fonctionne sans connexion une fois ouverte. */
const CACHE = "grandir-v3";
const FICHIERS = ["./", "index.html", "css/style.css", "js/activities.js", "js/reperes.js", "js/famille-data.js", "js/app.js", "manifest.webmanifest", "icon.svg", "icon-192.png", "icon-512.png", "apple-touch-icon.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FICHIERS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

/* Réseau d'abord (pour recevoir les mises à jour), cache en secours. */
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const copie = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copie));
        return res;
      })
      .catch(() => caches.match(e.request, { ignoreSearch: true }))
  );
});
