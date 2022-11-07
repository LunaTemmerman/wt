imagesWhite = [
  'https://lunatemmerman.ikdoeict.be/white/01d.svg',
  'https://lunatemmerman.ikdoeict.be/white/01n.svg',
  'https://lunatemmerman.ikdoeict.be/white/02d.svg',
  'https://lunatemmerman.ikdoeict.be/white/02n.svg',
  'https://lunatemmerman.ikdoeict.be/white/03d.svg',
  'https://lunatemmerman.ikdoeict.be/white/03n.svg',
  'https://lunatemmerman.ikdoeict.be/white/04d.svg',
  'https://lunatemmerman.ikdoeict.be/white/04n.svg',
  'https://lunatemmerman.ikdoeict.be/white/09d.svg',
  'https://lunatemmerman.ikdoeict.be/white/09n.svg',
  'https://lunatemmerman.ikdoeict.be/white/10d.svg',
  'https://lunatemmerman.ikdoeict.be/white/10n.svg',
  'https://lunatemmerman.ikdoeict.be/white/11d.svg',
  'https://lunatemmerman.ikdoeict.be/white/11n.svg',
  'https://lunatemmerman.ikdoeict.be/white/13d.svg',
  'https://lunatemmerman.ikdoeict.be/white/13n.svg',
  'https://lunatemmerman.ikdoeict.be/white/50d.svg',
  'https://lunatemmerman.ikdoeict.be/white/50n.svg',
];
imagesColor = [
  'https://lunatemmerman.ikdoeict.be/color/01d.svg',
  'https://lunatemmerman.ikdoeict.be/color/01n.svg',
  'https://lunatemmerman.ikdoeict.be/color/02d.svg',
  'https://lunatemmerman.ikdoeict.be/color/02n.svg',
  'https://lunatemmerman.ikdoeict.be/color/03d.svg',
  'https://lunatemmerman.ikdoeict.be/color/03n.svg',
  'https://lunatemmerman.ikdoeict.be/color/04d.svg',
  'https://lunatemmerman.ikdoeict.be/color/04n.svg',
  'https://lunatemmerman.ikdoeict.be/color/09d.svg',
  'https://lunatemmerman.ikdoeict.be/color/09n.svg',
  'https://lunatemmerman.ikdoeict.be/color/10d.svg',
  'https://lunatemmerman.ikdoeict.be/color/10n.svg',
  'https://lunatemmerman.ikdoeict.be/color/11d.svg',
  'https://lunatemmerman.ikdoeict.be/color/11n.svg',
  'https://lunatemmerman.ikdoeict.be/color/13d.svg',
  'https://lunatemmerman.ikdoeict.be/color/13n.svg',
  'https://lunatemmerman.ikdoeict.be/color/50d.svg',
  'https://lunatemmerman.ikdoeict.be/color/50n.svg',
];
assets = [
  'https://lunatemmerman.ikdoeict.be/assets/datafetch.c324e057.css',
  'https://lunatemmerman.ikdoeict.be/assets/datafetch.d836bc66.js',
  'https://lunatemmerman.ikdoeict.be/assets/logo.227262ff.svg',
  'https://lunatemmerman.ikdoeict.be/assets/main.d217a3e7.js',
  'https://lunatemmerman.ikdoeict.be/assets/nested.692339c4.js',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open('static')).then(cache => {
    return cache.addAll([
      'https://lunatemmerman.ikdoeict.be/',
      'https://lunatemmerman.ikdoeict.be/src/map/index.html',
      ...imagesColor,
      ...imagesColor,
      ...assets,
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
