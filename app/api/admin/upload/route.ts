import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken } from "../../../lib/admin-session";
import { savePublicUpload } from "../../../lib/uploads";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const scope = String(formData.get("scope") ?? "blog");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "File not provided" }, { status: 400 });
  }

  const folder = scope === "events" ? "events" : "blog";
  const url = await savePublicUpload(file, {
    folder,
    allowedTypes: ["image/png", "image/jpeg", "image/webp"],
  });
  if (!url) return NextResponse.json({ error: "Unsupported file" }, { status: 400 });
  return NextResponse.json({ url });
}
