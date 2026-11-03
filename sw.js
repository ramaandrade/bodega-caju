// =====================================================================
// BODEGA CAJU — SERVICE WORKER CACHE BUSTER & PURGER (v2.0)
// Força a remoção de caches antigos em navegadores mobile e garante que
// todas as requisições busquem sempre a versão mais recente na rede.
// =====================================================================

self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map((key) => caches.delete(key)));
    }).then(() => {
      return self.registration.unregister();
    }).then(() => {
      return self.clients.claim();
    }).then(() => {
      return self.clients.matchAll({ type: 'window' });
    }).then((clients) => {
      for (const client of clients) {
        if (client.url && 'navigate' in client) {
          client.navigate(client.url);
        }
      }
    })
  );
});

self.addEventListener('fetch', (e) => {
  // Sempre busca da rede para nunca servir HTML ou assets antigos
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
