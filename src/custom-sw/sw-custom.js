if ("function" === typeof importScripts) {
    importScripts(
        "https://storage.googleapis.com/workbox-cdn/releases/6.1.1/workbox-sw.js"
    );

    importScripts('sw-env.js');

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

        const bgSyncPlugin = new workbox.backgroundSync.BackgroundSyncPlugin('PostQueue', {
            maxRetentionTime: 24 * 60 // Retry for max of 24 hours
        });

        // Manual injection point for manifest files.
        // all assets under build/ and 5MB sizes are precached.
        workbox.precaching.precacheAndRoute([]);

        // React is an SPA, so all routes we define are cached and mapped into index.html
        const handler = workbox.precaching.createHandlerBoundToURL('/index.html');
        const navigationRoute = new workbox.routing.NavigationRoute(handler);
        workbox.routing.registerRoute(navigationRoute);

        // Font caching
        workbox.routing.registerRoute(
            new RegExp("https://fonts.(?:.googlepis|gstatic).com/(.*)"),
            new workbox.strategies.CacheFirst({
                cacheName: "googleapis",
                plugins: [
                    new workbox.expiration.ExpirationPlugin({
                        maxEntries: 30,
                    }),
                ],
            })
        );

        // Route will catch all failed POST requests that satisfies regex.
        // Will add to bgSyncPlugin queue and will resend when network reconnect
        // TODO: Change to know routes once we know the routes needed to catch
        workbox.routing.registerRoute(
            new RegExp(`${process.env.REACT_APP_AIRTABLE_ENDPOINT_URL}/(.+)`),
            new workbox.strategies.NetworkOnly({
                plugins: [bgSyncPlugin]
            }),
            'POST'
        );

        // Image caching
        workbox.routing.registerRoute(
            /\.(?:png|gif|jpg|jpeg|svg)$/,
            new workbox.strategies.CacheFirst({
                cacheName: "images",
                plugins: [
                    new workbox.expiration.ExpirationPlugin({
                        maxEntries: 60,
                        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
                    }),
                ],
            })
        );

        // JS, CSS caching
        workbox.routing.registerRoute(
            /\.(?:js|css)$/,
            new workbox.strategies.StaleWhileRevalidate({
                cacheName: "static-resources",
                plugins: [
                    new workbox.expiration.ExpirationPlugin({
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