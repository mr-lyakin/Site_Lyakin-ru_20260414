import { promises as fs } from "fs";
import path from "path";

export type ServiceItem = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readTime: string;
  contentHtml: string;
  coverImageUrl?: string;
};

const filePath = path.join(process.cwd(), "data", "services.json");

export async function getServices(): Promise<ServiceItem[]> {
  const content = await fs.readFile(filePath, "utf-8");
  return JSON.parse(content) as ServiceItem[];
}

export async function saveServices(items: ServiceItem[]) {
  await fs.writeFile(filePath, JSON.stringify(items, null, 2), "utf-8");
}
