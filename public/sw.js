// Service worker voor de PWA.
// Doel: offline werken, maar nieuwe kaarten meteen tonen zodra ze online staan.
//
// Strategie:
// - Navigatie (index.html): eerst netwerk, dan cache. Zo krijg je na een nieuwe
//   build altijd de laatste versie (met nieuwe kaarten) als je online bent.
// - Overige bestanden (bundle, css, iconen, fonts): stale-while-revalidate.
//   Snel uit cache, en op de achtergrond wordt een verse versie opgehaald.

const CACHE = 'csharp-kaarten-v2';

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(['./', './index.html']))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((namen) =>
        Promise.all(namen.filter((n) => n !== CACHE).map((n) => caches.delete(n)))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') {
    return;
  }

  const url = new URL(request.url);

  // Gamebestand: altijd vers van het netwerk (niet uit cache serveren).
  if (/game\d*\.json$/.test(url.pathname)) {
    event.respondWith(fetch(request).catch(() => caches.match(request)));
    return;
  }

  // Navigatie: eerst netwerk, val terug op cache.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const kopie = response.clone();
          caches.open(CACHE).then((cache) => cache.put('./index.html', kopie));
          return response;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Overige bestanden: stale-while-revalidate.
  event.respondWith(
    caches.open(CACHE).then((cache) =>
      cache.match(request).then((cached) => {
        const netwerk = fetch(request)
          .then((response) => {
            if (response && response.status === 200) {
              cache.put(request, response.clone());
            }
            return response;
          })
          .catch(() => cached);
        return cached || netwerk;
      })
    )
  );
});
