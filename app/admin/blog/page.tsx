import Link from "next/link";
import { redirect } from "next/navigation";
import { RichTextEditor } from "../../components/rich-text-editor";
import { addBlogPost, deleteBlogPost, logoutAdmin, updateBlogPost } from "../actions";
import { isAdminAuthenticated } from "../../lib/admin-session";
import { getBlogPosts } from "../../lib/blog-store";

export default async function AdminBlogPage() {
  const isAuthed = await isAdminAuthenticated();
  if (!isAuthed) redirect("/admin/login");
  const posts = await getBlogPosts();

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Админка: Блог</h1>
          <div className="mt-2 flex flex-wrap gap-2 text-sm font-medium text-slate-600">
            <Link href="/admin" className="hover:text-slate-900">Главная админки</Link>
            <Link href="/admin/reviews" className="hover:text-slate-900">Отзывы</Link>
            <Link href="/admin/events" className="hover:text-slate-900">Календарь-Галерея</Link>
          </div>
        </div>
        <form action={logoutAdmin}>
          <button type="submit" className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold">Выйти</button>
        </form>
      </div>

      <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-xl font-semibold text-slate-900">Добавить статью</h2>
        <form action={addBlogPost} encType="multipart/form-data" className="mt-4 space-y-3">
          <input name="title" placeholder="Заголовок статьи" className="w-full rounded-lg border px-3 py-2 text-sm" />
          <input name="excerpt" placeholder="Короткое превью" className="w-full rounded-lg border px-3 py-2 text-sm" />
          <div className="grid gap-3 sm:grid-cols-2">
            <input name="publishedAt" placeholder="Дата публикации" className="w-full rounded-lg border px-3 py-2 text-sm" />
            <input name="readTime" placeholder="Время чтения (например 8 мин)" className="w-full rounded-lg border px-3 py-2 text-sm" />
          </div>
          <input name="coverImage" type="file" accept="image/png,image/jpeg,image/webp" className="w-full rounded-lg border px-3 py-2 text-sm" />
          <RichTextEditor name="contentHtml" scope="blog" />
          <button type="submit" className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Добавить</button>
        </form>
      </div>

      <div className="mt-8 space-y-4">
        {posts.map((post) => (
          <article key={post.id} className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <form action={updateBlogPost} encType="multipart/form-data" className="space-y-3">
              <input type="hidden" name="id" value={post.id} />
              <input name="title" defaultValue={post.title} className="w-full rounded-lg border px-3 py-2 text-sm" />
              <input name="excerpt" defaultValue={post.excerpt} className="w-full rounded-lg border px-3 py-2 text-sm" />
              <div className="grid gap-3 sm:grid-cols-2">
                <input name="publishedAt" defaultValue={post.publishedAt} className="w-full rounded-lg border px-3 py-2 text-sm" />
                <input name="readTime" defaultValue={post.readTime} className="w-full rounded-lg border px-3 py-2 text-sm" />
              </div>
              {post.coverImageUrl && <p className="text-xs text-slate-500">Текущая обложка: {post.coverImageUrl}</p>}
              <input name="coverImage" type="file" accept="image/png,image/jpeg,image/webp" className="w-full rounded-lg border px-3 py-2 text-sm" />
              {post.coverImageUrl && (
                <label className="flex items-center gap-2 text-sm text-slate-700">
                  <input type="checkbox" name="removeCover" />
                  Удалить обложку
                </label>
              )}
              <RichTextEditor name="contentHtml" scope="blog" initialHtml={post.contentHtml} />
              <button type="submit" className="rounded-lg bg-slate-900 px-3 py-1.5 text-sm font-semibold text-white">Сохранить</button>
            </form>
            <form action={deleteBlogPost} className="mt-3">
              <input type="hidden" name="id" value={post.id} />
              <button type="submit" className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-sm font-semibold text-red-700">Удалить</button>
            </form>
          </article>
        ))}
      </div>
    </section>
  );
}
