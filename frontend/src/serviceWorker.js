self.addEventListener('install', () => {
    console.log('service worker installed');
});

self.addEventListener('activated', () => {
    console.log('service worker activated');
});
