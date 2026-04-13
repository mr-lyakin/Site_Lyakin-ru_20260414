import { SiteShell } from "../components/site-shell";

const events = [
  {
    type: "Ближайшее",
    title: "Открытый кубок Санкт-Петербурга по проектному управлению",
    meta: "22 сентября 2026 • Санкт-Петербург",
  },
  {
    type: "Недавнее",
    title: "Лекция для Международного бизнес-клуба ДИАЛОГИ",
    meta: "2025 • Москва",
  },
  {
    type: "Архив",
    title: "Конференция «PM Bridge»",
    meta: "Санкт-Петербург • профессиональное сообщество PM",
  },
  {
    type: "Архив",
    title: "Программа в Московской школе управления SKOLKOVO",
    meta: "Мастер-классы и образовательные треки",
  },
];

export default function CalendarGalleryPage() {
  return (
    <SiteShell>
      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-slate-900">Календарь-Галерея</h1>
        <p className="mt-4 max-w-3xl text-slate-700">
          Раздел для анонсов и отчетов: тренинги, форумы, мастер-классы и профессиональные
          выступления.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {events.map((event) => (
            <article key={event.title} className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
              <p className="text-xs uppercase tracking-wide text-slate-500">{event.type}</p>
              <h2 className="mt-2 text-xl font-semibold text-slate-900">{event.title}</h2>
              <p className="mt-2 text-slate-600">{event.meta}</p>
              <div className="mt-4 h-40 rounded-xl bg-slate-100 p-4 text-sm text-slate-500">
                Здесь можно разместить фото/видео с мероприятия.
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
