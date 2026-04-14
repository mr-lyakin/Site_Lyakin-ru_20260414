import { loginAdmin } from "../actions";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const error = params.error;

  return (
    <section className="mx-auto flex min-h-screen w-full max-w-md items-center px-4 py-12">
      <div className="w-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h1 className="text-2xl font-bold text-slate-900">Вход в админ-панель</h1>
        <p className="mt-2 text-sm text-slate-600">
          Введи логин и пароль, чтобы редактировать отзывы, блог и мероприятия.
        </p>
        {error === "invalid" && (
          <p className="mt-3 text-sm font-medium text-red-600">
            Неверный логин или пароль.
          </p>
        )}
        {error === "config" && (
          <p className="mt-3 text-sm font-medium text-red-600">
            Не заданы ADMIN_LOGIN и ADMIN_PASSWORD в `.env.local`.
          </p>
        )}
        {error === "session" && (
          <p className="mt-3 text-sm font-medium text-red-600">
            Не задан ADMIN_SESSION_SECRET (минимум 24 символа) в `.env.local`.
          </p>
        )}
        <form action={loginAdmin} className="mt-5 space-y-3">
          <input
            name="login"
            type="text"
            placeholder="Логин"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900"
          />
          <input
            name="password"
            type="password"
            placeholder="Пароль"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900"
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Войти
          </button>
        </form>
      </div>
    </section>
  );
}
