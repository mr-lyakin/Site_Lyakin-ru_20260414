import Link from "next/link";
import { redirect } from "next/navigation";
import { RichTextEditor } from "../../components/rich-text-editor";
import { addEvent, deleteEvent, logoutAdmin, updateEvent } from "../actions";
import { isAdminAuthenticated } from "../../lib/admin-session";
import { getEvents } from "../../lib/events-store";

export default async function AdminEventsPage() {
  const isAuthed = await isAdminAuthenticated();
  if (!isAuthed) redirect("/admin/login");
  const events = await getEvents();

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Админка: Календарь-Галерея</h1>
          <div className="mt-2 flex flex-wrap gap-2 text-sm font-medium text-slate-600">
            <Link href="/admin" className="hover:text-slate-900">Главная админки</Link>
            <Link href="/admin/reviews" className="hover:text-slate-900">Отзывы</Link>
            <Link href="/admin/blog" className="hover:text-slate-900">Блог</Link>
          </div>
        </div>
        <form action={logoutAdmin}>
          <button type="submit" className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold">Выйти</button>
        </form>
      </div>

      <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-xl font-semibold text-slate-900">Добавить мероприятие</h2>
        <form action={addEvent} encType="multipart/form-data" className="mt-4 space-y-3">
          <input name="title" placeholder="Название мероприятия" className="w-full rounded-lg border px-3 py-2 text-sm" />
          <input name="meta" placeholder="Дата/город" className="w-full rounded-lg border px-3 py-2 text-sm" />
          <textarea name="excerpt" rows={3} placeholder="Краткий текст для карточки" className="w-full rounded-lg border px-3 py-2 text-sm" />
          <RichTextEditor name="contentHtml" scope="events" />
          <input name="mediaFiles" multiple type="file" accept="image/png,image/jpeg,image/webp,video/mp4,video/webm" className="w-full rounded-lg border px-3 py-2 text-sm" />
          <p className="text-xs text-slate-500">Если не указать обложку вручную, будет выбрано первое загруженное фото.</p>
          <input name="coverUrl" placeholder="URL обложки (опционально)" className="w-full rounded-lg border px-3 py-2 text-sm" />
          <button type="submit" className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Добавить</button>
        </form>
      </div>

      <div className="mt-8 space-y-4">
        {events.map((event) => (
          <article key={event.id} className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <form action={updateEvent} encType="multipart/form-data" className="space-y-3">
              <input type="hidden" name="id" value={event.id} />
              <input name="title" defaultValue={event.title} className="w-full rounded-lg border px-3 py-2 text-sm" />
              <input name="meta" defaultValue={event.meta} className="w-full rounded-lg border px-3 py-2 text-sm" />
              <textarea name="excerpt" rows={3} defaultValue={event.excerpt} className="w-full rounded-lg border px-3 py-2 text-sm" />
              <RichTextEditor name="contentHtml" scope="events" initialHtml={event.contentHtml} />
              <input name="mediaFiles" multiple type="file" accept="image/png,image/jpeg,image/webp,video/mp4,video/webm" className="w-full rounded-lg border px-3 py-2 text-sm" />
              <select name="coverUrl" defaultValue={event.coverImageUrl ?? ""} className="w-full rounded-lg border px-3 py-2 text-sm">
                <option value="">Оставить как есть</option>
                {event.media.filter((m) => m.type === "image").map((m) => (
                  <option key={m.url} value={m.url}>{m.url}</option>
                ))}
              </select>
              <button type="submit" className="rounded-lg bg-slate-900 px-3 py-1.5 text-sm font-semibold text-white">Сохранить</button>
            </form>
            <form action={deleteEvent} className="mt-3">
              <input type="hidden" name="id" value={event.id} />
              <button type="submit" className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-sm font-semibold text-red-700">Удалить</button>
            </form>
          </article>
        ))}
      </div>
    </section>
  );
}
