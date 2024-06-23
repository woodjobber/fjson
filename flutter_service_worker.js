'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"version.json": "43eb3ef1a5d1f985ecd09b2ce30dfcaf",
"index.html": "b2a44bf1b2a04fb8235754735dc09db1",
"/": "b2a44bf1b2a04fb8235754735dc09db1",
"main.dart.js": "cf8907c77b168c5a2f775a0cddcdae29",
"flutter.js": "c71a09214cb6f5f8996a531350400a9a",
"icons/favicon-16x16.png": "4a571da03c7a7d6ebbdb2665bbfcde99",
"icons/favicon.ico": "31f4cb5e591777358def3321c65feee0",
"icons/apple-icon.png": "7d67b84cc9d4a73dfd3fe9fa8df4dae4",
"icons/apple-icon-144x144.png": "7d67b84cc9d4a73dfd3fe9fa8df4dae4",
"icons/android-icon-192x192.png": "a277996d65fbd051b29279cdd9724cc6",
"icons/apple-icon-precomposed.png": "47b7444c608cee7a322bd5c9fac731ce",
"icons/apple-icon-114x114.png": "8f25dd5a6d166d884edc546e4650ccd3",
"icons/ms-icon-310x310.png": "aba9717fb87322406393a0ce1663884c",
"icons/ms-icon-144x144.png": "7d67b84cc9d4a73dfd3fe9fa8df4dae4",
"icons/apple-icon-57x57.png": "e13e240a3c79c3268adbf803ee25ee7a",
"icons/apple-icon-152x152.png": "56b495ea2449742b1125811f45b71dc8",
"icons/ms-icon-150x150.png": "0b93e29ede8beeeb06c3f9231b0fdf2b",
"icons/android-icon-72x72.png": "1a047b2f05beed55edddb09f615b1abe",
"icons/android-icon-96x96.png": "c8c22935294623982a34397bd8ddec9c",
"icons/android-icon-36x36.png": "35cd48fd51654d3dbbdc3f05c9df05d7",
"icons/apple-icon-180x180.png": "c1af2ae2f39361b8ae20a7be2e971b47",
"icons/favicon-96x96.png": "c8c22935294623982a34397bd8ddec9c",
"icons/manifest.json": "a3c57fe94a3a0862a6ed016072ee42f6",
"icons/android-icon-48x48.png": "bfa245850985af588ec917bc6b1fba74",
"icons/apple-icon-76x76.png": "541d2f8cd0821b5bbadac765367f7cf4",
"icons/apple-icon-60x60.png": "dc92f47ac4a8c616bd1867da0279feb9",
"icons/android-icon-144x144.png": "7d67b84cc9d4a73dfd3fe9fa8df4dae4",
"icons/apple-icon-72x72.png": "1a047b2f05beed55edddb09f615b1abe",
"icons/apple-icon-120x120.png": "e67c77819c298a2882f93415a2bb8d5d",
"icons/favicon-32x32.png": "17e21ca2bf067a52f693de044c2b131f",
"icons/ms-icon-70x70.png": "e226b1fbbaa32db8b85284d9604f939b",
"manifest.json": "370fcc6fc88ab256ae0e4c2171b2e26a",
"assets/AssetManifest.json": "626528e68b694103eaa8ee26484dcd90",
"assets/NOTICES": "45390bb096192df08261d61b3c4e88a0",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/AssetManifest.bin.json": "8f2f5c0938007adbf6eff41d020e4d55",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "b93248a553f9e8bc17f1065929d5934b",
"assets/packages/json_shrink_widget/assets/icon_minus.png": "c0b4ce4e90691cb91e1ff198e90efb51",
"assets/packages/json_shrink_widget/assets/icon_add.png": "cb93ea3438b7b16a686f8d9f672cb7a2",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "eb1e8333a303f0b20e0ad578a9e85241",
"assets/fonts/MaterialIcons-Regular.otf": "e7069dfd19b331be16bed984668fe080",
"canvaskit/skwasm.js": "445e9e400085faead4493be2224d95aa",
"canvaskit/skwasm.js.symbols": "741d50ffba71f89345996b0aa8426af8",
"canvaskit/canvaskit.js.symbols": "38cba9233b92472a36ff011dc21c2c9f",
"canvaskit/skwasm.wasm": "e42815763c5d05bba43f9d0337fa7d84",
"canvaskit/chromium/canvaskit.js.symbols": "4525682ef039faeb11f24f37436dca06",
"canvaskit/chromium/canvaskit.js": "43787ac5098c648979c27c13c6f804c3",
"canvaskit/chromium/canvaskit.wasm": "f5934e694f12929ed56a671617acd254",
"canvaskit/canvaskit.js": "c86fbd9e7b17accae76e5ad116583dc4",
"canvaskit/canvaskit.wasm": "3d2a2d663e8c5111ac61a46367f751ac",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
