import { promises as fs } from "fs";
import path from "path";

export async function savePublicUpload(
  file: File,
  opts: { folder: string; allowedTypes: string[] }
): Promise<string | undefined> {
  if (!file || file.size === 0) return undefined;
  if (!opts.allowedTypes.includes(file.type)) return undefined;

  const extByType: Record<string, string> = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/webp": "webp",
    "video/mp4": "mp4",
    "video/webm": "webm",
  };
  const ext = extByType[file.type];
  if (!ext) return undefined;

  const uploadsDir = path.join(process.cwd(), "public", "uploads", opts.folder);
  await fs.mkdir(uploadsDir, { recursive: true });

  const filename = `${crypto.randomUUID()}.${ext}`;
  const targetPath = path.join(uploadsDir, filename);
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(targetPath, buffer);
  return `/uploads/${opts.folder}/${filename}`;
}
