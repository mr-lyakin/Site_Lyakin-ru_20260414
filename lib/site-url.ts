/**
 * Канонический адрес сайта для метаданных, sitemap и Open Graph.
 * В продакшене задай NEXT_PUBLIC_SITE_URL (например https://lyakin.ru).
 */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw) return raw.replace(/\/$/, "");
  return "https://lyakin.ru";
}

export function getMetadataBase(): URL {
  return new URL("/", getSiteUrl());
}

/** Абсолютный URL для картинок OG (относительные пути считаются от домена сайта). */
export function toAbsoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  const base = getSiteUrl();
  const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${base}${path}`;
}
