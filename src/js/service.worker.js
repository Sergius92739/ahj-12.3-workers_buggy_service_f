/* eslint-disable no-console */
const cacheName = 'ahj-12.3-buggy_service';


self.addEventListener('install', (evt) => {
  evt.waitUntil((async () => {
    await self.skipWaiting();
  })());
  console.log('service worker is installed');
});

self.addEventListener('activate', (evt) => {
  evt.waitUntil((async () => {
    await self.clients.claim();
  })());
  console.log('service worker is activated');
});

self.addEventListener('fetch', (evt) => {
  const requestURL = new URL(evt.request.url);

  if (!requestURL.pathname.startsWith('/news')) {
    return;
  }

  evt.respondWith((async () => {
    const cache = await caches.open(cacheName);
    const clients = await self.clients.matchAll();
    const client = clients.find((item) => item.id === evt.clientId);

    try {
      const response = await fetch(evt.request);

      if (response.statusText === 'OK') {
        evt.waitUntil(cache.put(evt.request, response.clone()));
        console.log(`Данные загружены из сервера. Статус ответа: ${response.status}.`)
        return response;
      }

      const cachedResponse = await cache.match(evt.request);
      if (cachedResponse) {
        console.log(`Данные загружены из кэша. Статус ответа: ${response.status}`)
        return cachedResponse;
      }
    } catch (err) {
      return (() => client.postMessage('error'))();
    }

    return (() => client.postMessage('error'))();
  })());
});
