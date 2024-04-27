const CACHE = "static_v1";
self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.keys()
        .then(cacheNames => {
            if(!cacheNames.includes(CACHE))
            return caches.open(CACHE).then(cache => cache.addAll(["./", "./index.html", "./icon.svg", "./manifest.json"]));
        })
    );
});
self.addEventListener("fetch", (e) => {
    e.respondWith((async () => {
        const request = e.request.url.split("?").shift();
        const cache = await caches.open(CACHE)
        const response = await cache.match(request);
        if(response) return response;
        try {return fetch(request)}
        catch (e) {return null}
    })());
});