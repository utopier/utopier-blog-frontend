const CACHE_NAME = 'static-cache-v1';

// CODELAB: Add list of files to cache here.
const FILES_TO_CACHE = ['/offline.html'];

// offline page cache
self.addEventListener('install', (evt) => {
	console.log('[ServiceWorker] Install');
	evt.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			console.log('[ServiceWorker] Pre-caching offline page');
			return cache.addAll(FILES_TO_CACHE);
		})
	);
	self.skipWaiting();
});

// 오래된 offline page 정리
self.addEventListener('activate', (evt) => {
	console.log('[ServiceWorker] Activate');
	evt.waitUntil(
		caches.keys().then((keyList) => {
			return Promise.all(
				keyList.map((key) => {
					if (key !== CACHE_NAME) {
						console.log('[ServiceWorker] Removing old cache', key);
						return caches.delete(key);
					}
				})
			);
		})
	);
	self.clients.claim();
});

// 실패한 네트워크 요청 처리
self.addEventListener('fetch', (evt) => {
	console.log('[ServiceWorker] Fetch', evt.request.url);
	if (evt.request.mode !== 'navigate') {
		// Not a page navigation, bail.
		return;
	}
	evt.respondWith(
		fetch(evt.request).catch(() => {
			return caches.open(CACHE_NAME).then((cache) => {
				return cache.match('offline.html');
			});
		})
	);
});

// Notification
// 이벤트 듣기
// notificationclose 이벤트
self.addEventListener('notificationclose', function(e) {
	var notification = e.notification;
	var primaryKey = notification.data.primaryKey;

	console.log('Closed notification: ' + primaryKey);
  });
// notificationclick 이벤트
self.addEventListener('notificationclick', function(e) {
	var notification = e.notification;
	var primaryKey = notification.data.primaryKey;
	var action = e.action;
	if (action === 'close') {
	  notification.close();
	} else {
	  clients.openWindow('http://www.example.com');
	  notification.close();
	}
  });