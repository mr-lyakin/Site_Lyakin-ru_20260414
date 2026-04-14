import { promises as fs } from "fs";
import path from "path";

export type ReviewItem = {
  id: string;
  program: string;
  text: string;
  author: string;
  photoUrl?: string;
};

const reviewsFilePath = path.join(process.cwd(), "data", "reviews.json");

export async function getReviews(): Promise<ReviewItem[]> {
  const file = await fs.readFile(reviewsFilePath, "utf-8");
  const parsed = JSON.parse(file) as ReviewItem[];
  return parsed;
}

export async function saveReviews(reviews: ReviewItem[]): Promise<void> {
  await fs.writeFile(reviewsFilePath, JSON.stringify(reviews, null, 2), "utf-8");
}
