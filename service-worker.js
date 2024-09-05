const staticCacheName = "site-static-v6"
const dynamicCache = "site-dynamic-v6"
const assets = [
	"/",
	"./index.html",
	"./overview.html",
	"./scripts/libraries/luxon.min.js",
	"./scripts/app.js",
	"./scripts/buttons.js",
	"./scripts/loadApp.js",
	"./scripts/loadOverview.js",
	"./scripts/localStorage.js",
	"./scripts/overview.js",
	"./scripts/project.js",
	"./scripts/recording.js",
	"./scripts/render.js",
	"./scripts/scene.js",
	"./scripts/take.js",
	"./style.css",
	"https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css",
	"https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js",
	"./img/icons/icon-192x192.png"
]

// Install service worker
self.addEventListener("install", event => { 
	console.log("✅ service worker has been installed ")
	event.waitUntil(
		caches.open(staticCacheName).then(cache => {
			console.log("⚙️ Cashing shell assets ...")
			cache.addAll(assets)
		})
	)
})

// Activate service worker
self.addEventListener("activate", event => { 
	console.log("✅ service worker has been activated ")
	event.waitUntil(
		caches.keys().then(keys => {
			return Promise.all(keys
				.filter(key => key !== staticCacheName)
				.map(key => caches.delete(key))
			)
		})
	)
})

// Fetch event
self.addEventListener("fetch", event => { 
	// console.log("✅ service worker has been activated ")

	event.respondWith(
		caches.match(event.request).then(cacheResponse => {
			return cacheResponse || fetch(event.request).then(fetchResponse => {
				return caches.open(dynamicCache).then(cache => {
					cache.put(event.request.url, fetchResponse.clone())
					return fetchResponse
				})
			})
		})
	)
})

