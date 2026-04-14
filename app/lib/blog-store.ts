import { promises as fs } from "fs";
import path from "path";

export type BlogPostItem = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readTime: string;
  contentHtml: string;
  coverImageUrl?: string;
};

const filePath = path.join(process.cwd(), "data", "blog-posts.json");

export async function getBlogPosts(): Promise<BlogPostItem[]> {
  const content = await fs.readFile(filePath, "utf-8");
  return JSON.parse(content) as BlogPostItem[];
}

export async function saveBlogPosts(items: BlogPostItem[]) {
  await fs.writeFile(filePath, JSON.stringify(items, null, 2), "utf-8");
}
