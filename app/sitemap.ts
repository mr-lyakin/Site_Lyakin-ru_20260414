import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/app/lib/blog-store";
import { getEvents } from "@/app/lib/events-store";
import { getSiteUrl } from "@/lib/site-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();

  const staticPaths = [
    "",
    "/about",
    "/services",
    "/reviews",
    "/blog",
    "/calendar-gallery",
    "/contacts",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

  const posts = await getBlogPosts();
  const blogEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const events = await getEvents();
  const eventEntries: MetadataRoute.Sitemap = events.map((e) => ({
    url: `${base}/calendar-gallery/${e.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...blogEntries, ...eventEntries];
}
