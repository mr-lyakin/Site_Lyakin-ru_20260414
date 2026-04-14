import Link from "next/link";
import { redirect } from "next/navigation";
import { addReview, deleteReview, logoutAdmin, updateReview } from "../actions";
import { getReviews } from "../../lib/reviews-store";
import { isAdminAuthenticated } from "../../lib/admin-session";

export default async function AdminReviewsPage() {
  const isAuthed = await isAdminAuthenticated();
  if (!isAuthed) redirect("/admin/login");
  const reviews = await getReviews();

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Админка: Отзывы</h1>
          <div className="mt-2 flex flex-wrap gap-2 text-sm font-medium text-slate-600">
            <Link href="/admin" className="hover:text-slate-900">
              Главная админки
            </Link>
            <Link href="/admin/blog" className="hover:text-slate-900">
              Блог
            </Link>
            <Link href="/admin/events" className="hover:text-slate-900">
              Календарь-Галерея
            </Link>
          </div>
        </div>
        <form action={logoutAdmin}>
          <button type="submit" className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold">
            Выйти
          </button>
        </form>
      </div>

      <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-xl font-semibold text-slate-900">Добавить отзыв</h2>
        <form action={addReview} encType="multipart/form-data" className="mt-4 space-y-3">
          <input name="program" placeholder="Название программы или тренинга" className="w-full rounded-lg border px-3 py-2 text-sm" />
          <textarea name="text" rows={4} placeholder="Текст отзыва" className="w-full rounded-lg border px-3 py-2 text-sm" />
          <input name="author" placeholder="Автор отзыва" className="w-full rounded-lg border px-3 py-2 text-sm" />
          <input name="photo" type="file" accept="image/png,image/jpeg,image/webp" className="w-full rounded-lg border px-3 py-2 text-sm" />
          <button type="submit" className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
            Добавить
          </button>
        </form>
      </div>

      <div className="mt-8 space-y-4">
        {reviews.map((review) => (
          <article key={review.id} className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <form action={updateReview} encType="multipart/form-data" className="space-y-3">
              <input type="hidden" name="id" value={review.id} />
              <input name="program" defaultValue={review.program} className="w-full rounded-lg border px-3 py-2 text-sm" />
              <textarea name="text" defaultValue={review.text} rows={3} className="w-full rounded-lg border px-3 py-2 text-sm" />
              <input name="author" defaultValue={review.author} className="w-full rounded-lg border px-3 py-2 text-sm" />
              <input name="photo" type="file" accept="image/png,image/jpeg,image/webp" className="w-full rounded-lg border px-3 py-2 text-sm" />
              {review.photoUrl && (
                <label className="flex items-center gap-2 text-sm text-slate-700">
                  <input type="checkbox" name="removePhoto" />
                  Удалить текущее фото
                </label>
              )}
              <button type="submit" className="rounded-lg bg-slate-900 px-3 py-1.5 text-sm font-semibold text-white">
                Сохранить
              </button>
            </form>
            <form action={deleteReview} className="mt-3">
              <input type="hidden" name="id" value={review.id} />
              <button type="submit" className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-sm font-semibold text-red-700">
                Удалить
              </button>
            </form>
          </article>
        ))}
      </div>
    </section>
  );
}
