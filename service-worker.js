const staticCacheName = "site-static-v7"
const dynamicCache = "site-dynamic-v7"
const assets = [
	"/",
	"https://nicogs.github.io/slayed/index.html",
	"https://nicogs.github.io/slayed/overview.html",
	"https://nicogs.github.io/slayed/scripts/libraries/luxon.min.js",
	"https://nicogs.github.io/slayed/scripts/app.js",
	"https://nicogs.github.io/slayed/scripts/buttons.js",
	"https://nicogs.github.io/slayed/scripts/loadApp.js",
	"https://nicogs.github.io/slayed/scripts/loadOverview.js",
	"https://nicogs.github.io/slayed/scripts/localStorage.js",
	"https://nicogs.github.io/slayed/scripts/overview.js",
	"https://nicogs.github.io/slayed/scripts/project.js",
	"https://nicogs.github.io/slayed/scripts/recording.js",
	"https://nicogs.github.io/slayed/scripts/render.js",
	"https://nicogs.github.io/slayed/scripts/scene.js",
	"https://nicogs.github.io/slayed/scripts/take.js",
	"https://nicogs.github.io/slayed/style.css",
	"https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css",
	"https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js",
	"https://nicogs.github.io/slayed/img/icons/icon-192x192.png"
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

