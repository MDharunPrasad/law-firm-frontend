const CACHE_NAME = 'ali-bin-fahad-law-v1.0.0';
const STATIC_CACHE = 'static-resources-v1';
const DYNAMIC_CACHE = 'dynamic-resources-v1';

// Static resources to cache
const STATIC_RESOURCES = [
  '/',
  '/styles/globals.css',
  '/App.tsx',
  'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap'
];

// Cache strategies
const CACHE_STRATEGIES = {
  images: 'cache-first',
  api: 'network-first',
  static: 'cache-first'
};

// Install service worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        return cache.addAll(STATIC_RESOURCES);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate service worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch strategy
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle images with cache-first strategy and timeout
  if (request.destination === 'image') {
    event.respondWith(
      caches.match(request)
        .then(response => {
          if (response) {
            return response;
          }
          
          // Add timeout for external image requests
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 6000); // 6 second timeout
          
          return fetch(request, { signal: controller.signal })
            .then(fetchResponse => {
              clearTimeout(timeoutId);
              
              // Only cache successful responses from trusted domains
              if (fetchResponse.ok && (
                request.url.includes(self.location.origin) ||
                request.url.includes('fonts.googleapis.com') ||
                request.url.includes('fonts.gstatic.com')
              )) {
                const responseClone = fetchResponse.clone();
                caches.open(DYNAMIC_CACHE)
                  .then(cache => {
                    cache.put(request, responseClone);
                  });
              }
              
              return fetchResponse;
            })
            .catch(error => {
              clearTimeout(timeoutId);
              console.warn('Image fetch failed:', request.url, error.message);
              
              // Return empty response for failed images
              return new Response('', { 
                status: 200, 
                statusText: 'OK',
                headers: {
                  'Content-Type': 'image/svg+xml'
                }
              });
            });
        })
    );
    return;
  }

  // Handle static resources with cache-first strategy
  if (url.pathname.match(/\.(css|js|woff|woff2|ttf|eot)$/)) {
    event.respondWith(
      caches.match(request)
        .then(response => {
          return response || fetch(request)
            .then(fetchResponse => {
              const responseClone = fetchResponse.clone();
              caches.open(STATIC_CACHE)
                .then(cache => {
                  cache.put(request, responseClone);
                });
              return fetchResponse;
            });
        })
    );
    return;
  }

  // Handle other requests with network-first strategy
  event.respondWith(
    fetch(request)
      .then(response => {
        // Only cache successful responses
        if (response.status === 200) {
          const responseClone = response.clone();
          caches.open(DYNAMIC_CACHE)
            .then(cache => {
              cache.put(request, responseClone);
            });
        }
        return response;
      })
      .catch(() => {
        return caches.match(request)
          .then(response => {
            return response || new Response('Offline content not available', {
              status: 503,
              statusText: 'Service Unavailable'
            });
          });
      })
  );
});

// Background sync for form submissions
self.addEventListener('sync', event => {
  if (event.tag === 'contact-form') {
    event.waitUntil(syncContactForm());
  }
});

async function syncContactForm() {
  try {
    // Handle offline form submissions when back online
    const forms = await getStoredForms();
    for (const form of forms) {
      await submitForm(form);
      await removeStoredForm(form.id);
    }
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

// Utility functions for offline form handling
async function getStoredForms() {
  // Implementation would depend on IndexedDB storage
  return [];
}

async function submitForm(formData) {
  // Implementation for form submission
  return fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

async function removeStoredForm(formId) {
  // Implementation to remove form from IndexedDB
  return true;
}