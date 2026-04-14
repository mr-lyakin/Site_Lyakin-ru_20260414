import { promises as fs } from "fs";
import path from "path";

export type EventMediaItem = {
  url: string;
  type: "image" | "video";
};

export type EventItem = {
  id: string;
  slug: string;
  title: string;
  meta: string;
  excerpt: string;
  contentHtml: string;
  coverImageUrl?: string;
  media: EventMediaItem[];
};

const filePath = path.join(process.cwd(), "data", "events.json");

export async function getEvents(): Promise<EventItem[]> {
  const content = await fs.readFile(filePath, "utf-8");
  return JSON.parse(content) as EventItem[];
}

export async function saveEvents(items: EventItem[]) {
  await fs.writeFile(filePath, JSON.stringify(items, null, 2), "utf-8");
}
