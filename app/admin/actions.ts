"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getReviews, saveReviews } from "../lib/reviews-store";
import { getBlogPosts, saveBlogPosts } from "../lib/blog-store";
import { getEvents, saveEvents } from "../lib/events-store";
import { getServices, saveServices } from "../lib/services-store";
import { savePublicUpload } from "../lib/uploads";
import {
  clearAdminSession,
  isAdminAuthenticated,
  isSessionConfigValid,
  setAdminSession,
} from "../lib/admin-session";

async function saveOptionalPhoto(file: File | null): Promise<string | undefined> {
  if (!file) return undefined;
  return savePublicUpload(file, {
    folder: "reviews",
    allowedTypes: ["image/jpeg", "image/png", "image/webp"],
  });
}

async function saveOptionalImageInFolder(file: File | null, folder: string): Promise<string | undefined> {
  if (!file) return undefined;
  return savePublicUpload(file, {
    folder,
    allowedTypes: ["image/jpeg", "image/png", "image/webp"],
  });
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-zа-я0-9\s-]/gi, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function loginAdmin(formData: FormData) {
  const login = String(formData.get("login") ?? "");
  const password = String(formData.get("password") ?? "");

  const expectedLogin = process.env.ADMIN_LOGIN;
  const expectedPassword = process.env.ADMIN_PASSWORD;

  if (!expectedLogin || !expectedPassword) {
    redirect("/admin/login?error=config");
  }

  if (!isSessionConfigValid()) {
    redirect("/admin/login?error=session");
  }

  if (login !== expectedLogin || password !== expectedPassword) {
    redirect("/admin/login?error=invalid");
  }

  await setAdminSession();

  redirect("/admin");
}

export async function logoutAdmin() {
  await clearAdminSession();
  redirect("/admin/login");
}

export async function addReview(formData: FormData) {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");

  const program = String(formData.get("program") ?? "").trim();
  const text = String(formData.get("text") ?? "").trim();
  const author = String(formData.get("author") ?? "").trim();
  const photoFile = formData.get("photo");

  if (!program || !text || !author) return;
  const photoUrl = await saveOptionalPhoto(photoFile instanceof File ? photoFile : null);

  const reviews = await getReviews();
  reviews.unshift({
    id: crypto.randomUUID(),
    program,
    text,
    author,
    ...(photoUrl ? { photoUrl } : {}),
  });
  await saveReviews(reviews);
  revalidatePath("/reviews");
  revalidatePath("/admin");
  revalidatePath("/admin/reviews");
}

export async function deleteReview(formData: FormData) {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const id = String(formData.get("id") ?? "");
  const reviews = await getReviews();
  const next = reviews.filter((item) => item.id !== id);
  await saveReviews(next);
  revalidatePath("/reviews");
  revalidatePath("/admin");
  revalidatePath("/admin/reviews");
}

export async function updateReview(formData: FormData) {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");

  const id = String(formData.get("id") ?? "");
  const program = String(formData.get("program") ?? "").trim();
  const text = String(formData.get("text") ?? "").trim();
  const author = String(formData.get("author") ?? "").trim();
  const photoFile = formData.get("photo");
  const removePhoto = String(formData.get("removePhoto") ?? "") === "on";
  if (!id || !program || !text || !author) return;

  const photoUrl = await saveOptionalPhoto(photoFile instanceof File ? photoFile : null);
  const reviews = await getReviews();
  const next = reviews.map((item) =>
    item.id === id
      ? {
          ...item,
          program,
          text,
          author,
          ...(removePhoto
            ? { photoUrl: undefined }
            : photoUrl
              ? { photoUrl }
              : { photoUrl: item.photoUrl }),
        }
      : item
  );
  await saveReviews(next);
  revalidatePath("/reviews");
  revalidatePath("/admin");
  revalidatePath("/admin/reviews");
}

export async function addBlogPost(formData: FormData) {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const title = String(formData.get("title") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const publishedAt = String(formData.get("publishedAt") ?? "").trim();
  const readTime = String(formData.get("readTime") ?? "").trim();
  const contentHtml = String(formData.get("contentHtml") ?? "").trim();
  const coverFile = formData.get("coverImage");
  if (!title || !excerpt || !publishedAt || !readTime || !contentHtml) return;

  const coverImageUrl = await savePublicUpload(coverFile instanceof File ? coverFile : new File([], ""), {
    folder: "blog",
    allowedTypes: ["image/jpeg", "image/png", "image/webp"],
  });

  const items = await getBlogPosts();
  const baseSlug = slugify(title) || crypto.randomUUID();
  const slug = items.some((item) => item.slug === baseSlug) ? `${baseSlug}-${Date.now()}` : baseSlug;
  items.unshift({
    id: crypto.randomUUID(),
    slug,
    title,
    excerpt,
    publishedAt,
    readTime,
    contentHtml,
    ...(coverImageUrl ? { coverImageUrl } : {}),
  });
  await saveBlogPosts(items);
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/");
  revalidatePath("/admin/blog");
}

export async function updateBlogPost(formData: FormData) {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const id = String(formData.get("id") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const publishedAt = String(formData.get("publishedAt") ?? "").trim();
  const readTime = String(formData.get("readTime") ?? "").trim();
  const contentHtml = String(formData.get("contentHtml") ?? "").trim();
  const removeCover = String(formData.get("removeCover") ?? "") === "on";
  const coverFile = formData.get("coverImage");
  if (!id || !title || !excerpt || !publishedAt || !readTime || !contentHtml) return;

  const newCover = await saveOptionalImageInFolder(coverFile instanceof File ? coverFile : null, "blog");
  const items = await getBlogPosts();
  const current = items.find((item) => item.id === id);
  if (!current) return;

  const next = items.map((item) =>
    item.id === id
      ? {
          ...item,
          title,
          excerpt,
          publishedAt,
          readTime,
          contentHtml,
          coverImageUrl: removeCover ? undefined : newCover ?? item.coverImageUrl,
        }
      : item
  );
  await saveBlogPosts(next);
  revalidatePath("/blog");
  revalidatePath(`/blog/${current.slug}`);
  revalidatePath("/");
  revalidatePath("/admin/blog");
}

export async function deleteBlogPost(formData: FormData) {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const id = String(formData.get("id") ?? "");
  const items = await getBlogPosts();
  const next = items.filter((item) => item.id !== id);
  await saveBlogPosts(next);
  revalidatePath("/blog");
  revalidatePath("/");
  revalidatePath("/admin/blog");
}

export async function addEvent(formData: FormData) {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const title = String(formData.get("title") ?? "").trim();
  const meta = String(formData.get("meta") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const contentHtml = String(formData.get("contentHtml") ?? "").trim();
  const coverFile = formData.get("coverImage");
  if (!title || !meta || !excerpt || !contentHtml) return;

  const uploadedFiles = formData.getAll("mediaFiles").filter((value): value is File => value instanceof File);
  const media: { url: string; type: "image" | "video" }[] = [];
  for (const file of uploadedFiles) {
    const url = await savePublicUpload(file, {
      folder: "events",
      allowedTypes: ["image/jpeg", "image/png", "image/webp", "video/mp4", "video/webm"],
    });
    if (!url) continue;
    media.push({
      url,
      type: file.type.startsWith("video/") ? "video" : "image",
    });
  }
  const coverImageUrl = await saveOptionalImageInFolder(coverFile instanceof File ? coverFile : null, "events");

  const items = await getEvents();
  const baseSlug = slugify(title) || crypto.randomUUID();
  const slug = items.some((item) => item.slug === baseSlug) ? `${baseSlug}-${Date.now()}` : baseSlug;
  items.unshift({
    id: crypto.randomUUID(),
    slug,
    title,
    meta,
    excerpt,
    contentHtml,
    ...(coverImageUrl ? { coverImageUrl } : {}),
    media,
  });
  await saveEvents(items);
  revalidatePath("/calendar-gallery");
  revalidatePath(`/calendar-gallery/${slug}`);
  revalidatePath("/");
  revalidatePath("/admin/events");
}

export async function updateEvent(formData: FormData) {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const id = String(formData.get("id") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const meta = String(formData.get("meta") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const contentHtml = String(formData.get("contentHtml") ?? "").trim();
  const removeCover = String(formData.get("removeCover") ?? "") === "on";
  const coverFile = formData.get("coverImage");
  if (!id || !title || !meta || !excerpt || !contentHtml) return;

  const items = await getEvents();
  const current = items.find((item) => item.id === id);
  if (!current) return;

  const uploadedFiles = formData.getAll("mediaFiles").filter((value): value is File => value instanceof File);
  const appendedMedia: { url: string; type: "image" | "video" }[] = [];
  for (const file of uploadedFiles) {
    const url = await savePublicUpload(file, {
      folder: "events",
      allowedTypes: ["image/jpeg", "image/png", "image/webp", "video/mp4", "video/webm"],
    });
    if (!url) continue;
    appendedMedia.push({
      url,
      type: file.type.startsWith("video/") ? "video" : "image",
    });
  }
  const newCover = await saveOptionalImageInFolder(coverFile instanceof File ? coverFile : null, "events");

  const next = items.map((item) =>
    item.id === id
      ? {
          ...item,
          title,
          meta,
          excerpt,
          contentHtml,
          media: [...item.media, ...appendedMedia],
          coverImageUrl: removeCover ? undefined : newCover ?? item.coverImageUrl,
        }
      : item
  );
  await saveEvents(next);
  revalidatePath("/calendar-gallery");
  revalidatePath(`/calendar-gallery/${current.slug}`);
  revalidatePath("/");
  revalidatePath("/admin/events");
}

export async function deleteEvent(formData: FormData) {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const id = String(formData.get("id") ?? "");
  const items = await getEvents();
  const next = items.filter((item) => item.id !== id);
  await saveEvents(next);
  revalidatePath("/calendar-gallery");
  revalidatePath("/");
  revalidatePath("/admin/events");
}

export async function addService(formData: FormData) {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const title = String(formData.get("title") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const publishedAt = String(formData.get("publishedAt") ?? "").trim();
  const readTime = String(formData.get("readTime") ?? "").trim();
  const contentHtml = String(formData.get("contentHtml") ?? "").trim();
  const coverFile = formData.get("coverImage");
  if (!title || !excerpt || !publishedAt || !readTime || !contentHtml) return;

  const coverImageUrl = await saveOptionalImageInFolder(coverFile instanceof File ? coverFile : null, "services");
  const items = await getServices();
  const baseSlug = slugify(title) || crypto.randomUUID();
  const slug = items.some((item) => item.slug === baseSlug) ? `${baseSlug}-${Date.now()}` : baseSlug;
  items.unshift({
    id: crypto.randomUUID(),
    slug,
    title,
    excerpt,
    publishedAt,
    readTime,
    contentHtml,
    ...(coverImageUrl ? { coverImageUrl } : {}),
  });
  await saveServices(items);
  revalidatePath("/services");
  revalidatePath("/admin/services");
}

export async function updateService(formData: FormData) {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const id = String(formData.get("id") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const publishedAt = String(formData.get("publishedAt") ?? "").trim();
  const readTime = String(formData.get("readTime") ?? "").trim();
  const contentHtml = String(formData.get("contentHtml") ?? "").trim();
  const removeCover = String(formData.get("removeCover") ?? "") === "on";
  const coverFile = formData.get("coverImage");
  if (!id || !title || !excerpt || !publishedAt || !readTime || !contentHtml) return;

  const newCover = await saveOptionalImageInFolder(coverFile instanceof File ? coverFile : null, "services");
  const items = await getServices();
  const next = items.map((item) =>
    item.id === id
      ? {
          ...item,
          title,
          excerpt,
          publishedAt,
          readTime,
          contentHtml,
          coverImageUrl: removeCover ? undefined : newCover ?? item.coverImageUrl,
        }
      : item
  );
  await saveServices(next);
  revalidatePath("/services");
  revalidatePath("/admin/services");
}

export async function deleteService(formData: FormData) {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const id = String(formData.get("id") ?? "");
  const items = await getServices();
  const next = items.filter((item) => item.id !== id);
  await saveServices(next);
  revalidatePath("/services");
  revalidatePath("/admin/services");
}
