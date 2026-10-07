import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.portaleabitareinsieme.it';
  const routes = [
    '',
    '/configuratore',
    '/simulatore',
    '/servizi',
    '/personale',
    '/immobili',
    '/abbonamenti',
  ];
  const now = new Date();
  return routes.map((route, index) => ({
    url: base + route,
    lastModified: now,
    changeFrequency: index === 0 ? 'weekly' : 'monthly',
    priority: index === 0 ? 1 : route === '/configuratore' || route === '/simulatore' ? 0.9 : 0.8,
  }));
}
