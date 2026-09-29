const CACHE_NAME = "visita-papa-rc-v1";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",

  "./assets/headerpapa.png",
  "./assets/logoregnumchristi.png",
  "./assets/instagram2.png",
  "./assets/whatsapp2.png",
  "./assets/sobre.png",

  "./assets/icon-192.png",
  "./assets/icon-512.png",
  "./assets/apple-touch-icon.png"
];


// INSTALACIÓN
self.addEventListener("install", event => {

  event.waitUntil(

    caches
      .open(CACHE_NAME)
      .then(cache => {

        return cache.addAll(FILES_TO_CACHE);

      })

  );

  self.skipWaiting();

});


// ACTIVACIÓN
self.addEventListener("activate", event => {

  event.waitUntil(

    caches
      .keys()
      .then(cacheNames => {

        return Promise.all(

          cacheNames.map(cacheName => {

            if(cacheName !== CACHE_NAME){

              return caches.delete(cacheName);

            }

          })

        );

      })

  );

  self.clients.claim();

});


// PETICIONES
self.addEventListener("fetch", event => {

  if(event.request.method !== "GET"){
    return;
  }

  event.respondWith(

    fetch(event.request)

      .then(response => {

        const responseClone = response.clone();

        caches
          .open(CACHE_NAME)
          .then(cache => {

            cache.put(
              event.request,
              responseClone
            );

          });

        return response;

      })

      .catch(() => {

        return caches.match(event.request);

      })

  );

});
