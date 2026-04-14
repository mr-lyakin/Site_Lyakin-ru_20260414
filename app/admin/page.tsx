import Link from "next/link";
import { redirect } from "next/navigation";
import { logoutAdmin } from "./actions";
import { isAdminAuthenticated } from "../lib/admin-session";

export default async function AdminPage() {
  const isAuthed = await isAdminAuthenticated();
  if (!isAuthed) redirect("/admin/login");

  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-10">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-3xl font-bold text-slate-900">Админ-панель</h1>
        <form action={logoutAdmin}>
          <button type="submit" className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold">
            Выйти
          </button>
        </form>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Link href="/admin/reviews" className="rounded-2xl bg-white p-5 ring-1 ring-slate-200 transition hover:ring-slate-400">
          <h2 className="text-lg font-semibold text-slate-900">Отзывы</h2>
          <p className="mt-2 text-sm text-slate-600">Добавление, редактирование, удаление отзывов и фото авторов.</p>
        </Link>
        <Link href="/admin/blog" className="rounded-2xl bg-white p-5 ring-1 ring-slate-200 transition hover:ring-slate-400">
          <h2 className="text-lg font-semibold text-slate-900">Блог</h2>
          <p className="mt-2 text-sm text-slate-600">WYSIWYG-редактор для статей и публикаций с картинками.</p>
        </Link>
        <Link href="/admin/events" className="rounded-2xl bg-white p-5 ring-1 ring-slate-200 transition hover:ring-slate-400">
          <h2 className="text-lg font-semibold text-slate-900">Календарь-Галерея</h2>
          <p className="mt-2 text-sm text-slate-600">Мероприятия, rich text, много фото и видео, выбор обложки.</p>
        </Link>
      </div>
    </section>
  );
}
