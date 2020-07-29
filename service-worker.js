importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js"
);

if (workbox) console.log(`Workbox berhasil dimuat`);
else console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute(
  [
    {
      url: "/",
      revision: "3",
    },
    {
      url: "/nav.html",
      revision: "3",
    },
    {
      url: "/index.html",
      revision: "4",
    },
    {
      url: "/article.html",
      revision: "4",
    },
    {
      url: "/manifest.json",
      revision: "3",
    },
    {
      url: "/pages/home.html",
      revision: "3",
    },
    {
      url: "/css/materialize.min.css",
      revision: "3",
    },
    {
      url: "/css/style.css",
      revision: "3",
    },
    {
      url: "/js/materialize.min.js",
      revision: "3",
    },
    {
      url: "/js/nav.js",
      revision: "3",
    },
    {
      url: "/js/api.js",
      revision: "4",
    },
    {
      url: "/js/db.js",
      revision: "3",
    },
    {
      url: "/js/idb.js",
      revision: "3",
    },
    {
      url: "/js/script.js",
      revision: "3",
    },
    {
      url: "/js/article.js",
      revision: "3",
    },
    {
      url: "/js/sw-reg.js",
      revision: "3",
    },
    {
      url: "/icon512x512.png",
      revision: "3",
    },
    {
      url: "/icon192x192.png",
      revision: "3",
    },
    {
      url: "/custom-icon.png",
      revision: "3",
    },
    {
      url: "/not-found.png",
      revision: "3",
    },
    {
      url: "/pages/standings.html",
      revision: "3",
    },
    {
      url: "/pages/saved.html",
      revision: "3",
    },
    {
      url: "https://fonts.googleapis.com/icon?family=Material+Icons",
      revision: "3",
    },
    {
      url: "https://unpkg.com/snarkdown@1.0.2/dist/snarkdown.umd.js",
      revision: "3",
    },
    {
      url: "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.js",
      revision: "2",
    },
  ],
  {
    ignoreUrlParametersMatching: [/.*/],
  }
);

workbox.routing.registerRoute(
  new RegExp("/pages/"),
  workbox.strategies.staleWhileRevalidate({
    cacheName: "pages",
  })
);

workbox.routing.registerRoute(
  new RegExp("https://api.football-data.org/v2/"),
  workbox.strategies.staleWhileRevalidate({
    cacheName: "apifootball",
  })
);

// self.addEventListener("fetch", function (event) {
//   let base_url = "https://api.football-data.org/v2/";

//   if (event.request.url.indexOf(base_url) > -1) {
//     event.respondWith(
//       caches.open('workbox-precache').then(function (cache) {
//         return fetch(event.request).then(function (response) {
//           cache.put(event.request.url, response.clone());
//           return response;
//         })
//       })
//     );
//   } else {
//     event.respondWith(
//       caches.match(event.request, {
//         ignoreSearch: true
//       }).then(function (response) {
//         return response || fetch(event.request);
//       })
//     )
//   }
// });

self.addEventListener("push", function (event) {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = "Push message no payload";
  }
  let options = {
    body: body,
    icon: "img/notification.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };
  event.waitUntil(
    self.registration.showNotification("Push Notification", options)
  );
});
