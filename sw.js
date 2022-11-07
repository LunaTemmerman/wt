imagesWhite = [
  './public/white/01d.svg',
  './public/white/01n.svg',
  './public/white/02d.svg',
  './public/white/02n.svg',
  './public/white/03d.svg',
  './public/white/03n.svg',
  './public/white/04d.svg',
  './public/white/04n.svg',
  './public/white/09d.svg',
  './public/white/09n.svg',
  './public/white/10d.svg',
  './public/white/10n.svg',
  './public/white/11d.svg',
  './public/white/11n.svg',
  './public/white/13d.svg',
  './public/white/13n.svg',
  './public/white/50d.svg',
  './public/white/50n.svg',
];
imagesColor = [
  './public/color/01d.svg',
  './public/color/01n.svg',
  './public/color/02d.svg',
  './public/color/02n.svg',
  './public/color/03d.svg',
  './public/color/03n.svg',
  './public/color/04d.svg',
  './public/color/04n.svg',
  './public/color/09d.svg',
  './public/color/09n.svg',
  './public/color/10d.svg',
  './public/color/10n.svg',
  './public/color/11d.svg',
  './public/color/11n.svg',
  './public/color/13d.svg',
  './public/color/13n.svg',
  './public/color/50d.svg',
  './public/color/50n.svg',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open('static')).then(cache => {
    return cache.addAll([
      './index.html',
      './src/map/index.html',
      './src/style.css',
      ...imagesColor,
      ...imagesColor,
    ]);
  });
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
