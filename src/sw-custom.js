if ("function" === typeof importScripts) {
    importScripts(
        "https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js"
    );

    // Global workbox
    if (workbox) {
        console.log("Workbox loaded");
        workbox.setConfig({ debug: false });

        // `generateSW` provides option to force
        // update an exiting service worker. Since we're
        // using `injectManifest` to build SW, manually overriding
        // the skipWaiting();
        self.addEventListener("install", (event) => {
            self.skipWaiting();
        });

        const bgSyncPlugin = new workbox.backgroundSync.Plugin('PostQueue', {
            maxRetentionTime: 24 * 60 // Retry for max of 24 hours
        });

        // Manual injection point for manifest files.
        // all assets under build/ and 5MB sizes are precached.
        workbox.precaching.precacheAndRoute([]);

        // Font caching
        workbox.routing.registerRoute(
            new RegExp("https://fonts.(?:.googlepis|gstatic).com/(.*)"),
            workbox.strategies.cacheFirst({
                cacheName: "googleapis",
                plugins: [
                    new workbox.expiration.Plugin({
                        maxEntries: 30,
                    }),
                ],
            })
        );

        // Route will catch all failed POST requests to route.
        // Will add to bgSyncPlugin queue and will resend when network reconnect
        // TODO: Change to know routes once we know the routes needed to catch
        workbox.routing.registerRoute(
            "http://127.0.0.1:4000/*",
            new workbox.strategies.NetworkOnly({
                plugins: [bgSyncPlugin]
            }),
            'POST'
        );

        // Image caching
        workbox.routing.registerRoute(
            /\.(?:png|gif|jpg|jpeg|svg)$/,
            workbox.strategies.cacheFirst({
                cacheName: "images",
                plugins: [
                    new workbox.expiration.Plugin({
                        maxEntries: 60,
                        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
                    }),
                ],
            })
        );

        // JS, CSS caching
        workbox.routing.registerRoute(
            /\.(?:js|css)$/,
            workbox.strategies.staleWhileRevalidate({
                cacheName: "static-resources",
                plugins: [
                    new workbox.expiration.Plugin({
                        maxEntries: 60,
                        maxAgeSeconds: 20 * 24 * 60 * 60, // 20 Days
                    }),
                ],
            })
        );
    } else {
        console.log("Workbox couldn't be loaded. No offline support");
    }
}