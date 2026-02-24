import { MetadataRoute } from 'next';
import { projects } from '@/data/projects';
import { dashboards } from '@/data/dashboards';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://malaak.dev';
const locales = ['en', 'ar'];
const lastModified = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/projects', '/dashboards', '/certificates', '/about', '/contact'];

  const staticEntries = locales.flatMap((locale) =>
    staticRoutes.map((route) => ({
      url: `${BASE_URL}/${locale}${route}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1.0 : 0.8,
    })),
  );

  const projectEntries = locales.flatMap((locale) =>
    projects.map((project) => ({
      url: `${BASE_URL}/${locale}/projects/${project.id}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  );

  const dashboardEntries = locales.flatMap((locale) =>
    dashboards.map((d) => ({
      url: `${BASE_URL}/${locale}/dashboards/${d.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  );

  return [...staticEntries, ...projectEntries, ...dashboardEntries];
}
