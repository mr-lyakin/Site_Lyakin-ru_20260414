import { SiteShell } from "../components/site-shell";

export default function ContactsPage() {
  return (
    <SiteShell>
      <section className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">Контакты</h1>
          <p className="mt-4 max-w-md text-slate-700">
            Напиши, если хочешь обсудить консалтинг, обучение команды или участие в мероприятии.
          </p>
          <div className="mt-6 space-y-2 text-slate-700">
            <p>Email: a@lyakin.ru</p>
            <p>Telegram: @lyakin</p>
            <p>Город: Москва</p>
          </div>
        </div>

        <form className="space-y-3 rounded-2xl bg-white p-6 ring-1 ring-slate-200">
          <input
            type="text"
            placeholder="Твоё имя"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
          />
          <textarea
            placeholder="Коротко опиши задачу"
            rows={5}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
          />
          <button
            type="button"
            className="w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Отправить запрос
          </button>
        </form>
      </section>
    </SiteShell>
  );
}
