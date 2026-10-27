// ═══════════════════════════════════════════════════════════════════
// REMAL LAUNDRY OS — SERVICE WORKER (MINIMAL & SAFE)
// ═══════════════════════════════════════════════════════════════════
// ✅ Cache vidé à chaque nouvelle version
// ✅ Exclut Supabase
// ✅ Exclut les fichiers de code (js/html/css) du cache
// ✅ Seules les images/assets sont mises en cache
// ═══════════════════════════════════════════════════════════════════

const CACHE_NAME = 'remal-clean-v3';

self.addEventListener('install', (e) => {
    console.log('🛠️ [SW] Install — v3');
    self.skipWaiting();
});

self.addEventListener('activate', (e) => {
    console.log('🛠️ [SW] Activate — cleaning old caches');
    e.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(k => k !== CACHE_NAME).map(k => {
                    console.log('🗑️ [SW] Deleting old cache:', k);
                    return caches.delete(k);
                })
            );
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', (e) => {
    const url = e.request.url;

    // ❌ Ne pas toucher : Supabase
    if (url.includes('supabase.co')) return;

    // ❌ Ne pas toucher : APIs externes (Google Fonts, Tailwind CDN, jsdelivr, etc.)
    if (!url.startsWith(self.location.origin)) return;

    // ❌ Ne JAMAIS mettre en cache le code (HTML, JS, CSS, JSON)
    // → Pour éviter de servir d'anciennes clés Supabase ou d'anciens scripts
    if (
        url.endsWith('.js') ||
        url.endsWith('.html') ||
        url.endsWith('.css') ||
        url.endsWith('.json') ||
        url.endsWith('.webmanifest')
    ) {
        return;
    }

    // ✅ Mettre en cache UNIQUEMENT les images et assets statiques
    if (
        url.endsWith('.png') ||
        url.endsWith('.jpg') ||
        url.endsWith('.jpeg') ||
        url.endsWith('.gif') ||
        url.endsWith('.svg') ||
        url.endsWith('.webp') ||
        url.endsWith('.ico') ||
        url.endsWith('.woff') ||
        url.endsWith('.woff2')
    ) {
        e.respondWith(
            caches.open(CACHE_NAME).then(cache => {
                return cache.match(e.request).then(cached => {
                    if (cached) return cached;
                    return fetch(e.request).then(response => {
                        if (response.ok) {
                            cache.put(e.request, response.clone());
                        }
                        return response;
                    });
                });
            })
        );
        return;
    }

    // Tout le reste : comportement normal (pas de cache)
});
