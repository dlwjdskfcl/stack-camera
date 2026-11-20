/* 합성 카메라 서비스 워커 — 온라인이면 늘 새 파일을 받고(받은 것은 저장), 인터넷이 없으면 저장해 둔 것으로 엶 */
var CACHE = 'stack-camera-v1';
var FILES = ['./', 'stack.js', 'manifest.webmanifest', 'icon-192.png'];
self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) {
    return Promise.all(FILES.map(function (u) { return c.add(new Request(u, { cache: 'reload' })).catch(function () {}); }));
  }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.filter(function (k) { return k.indexOf('stack-camera-') === 0 && k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  e.respondWith(fetch(req).then(function (res) {
    if (res && res.ok && res.type === 'basic') { var copy = res.clone(); caches.open(CACHE).then(function (c) { c.put(req, copy); }).catch(function () {}); }
    return res;
  }).catch(function () {
    return caches.open(CACHE).then(function (c) { return c.match(req, { ignoreSearch: true }); }).then(function (hit) { return hit || Response.error(); });
  }));
});
