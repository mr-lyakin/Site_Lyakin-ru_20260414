import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteShell } from "../components/site-shell";
import { getEvents } from "../lib/events-store";

export const metadata: Metadata = {
  title: "Календарь-Галерея",
  description:
    "Анонсы и отчёты о мероприятиях: тренинги, форумы, мастер-классы и выступления.",
  alternates: { canonical: "/calendar-gallery" },
};

export default async function CalendarGalleryPage() {
  const events = await getEvents();
  return (
    <SiteShell>
      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-slate-900">Календарь-Галерея</h1>
        <p className="mt-4 max-w-3xl text-slate-700">
          Раздел для анонсов и отчетов: тренинги, форумы, мастер-классы и профессиональные
          выступления.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {events.map((event, index) => (
            <article key={event.title} className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
              <p className="text-xs uppercase tracking-wide text-slate-500">{index === 0 ? "Ближайшее" : "Событие"}</p>
              <h2 className="mt-2 text-xl font-semibold text-slate-900">{event.title}</h2>
              <p className="mt-2 text-slate-600">{event.meta}</p>
              <p className="mt-3 text-sm text-slate-700">{event.excerpt}</p>
              {event.coverImageUrl && (
                <div className="mt-4 overflow-hidden rounded-xl">
                  <Image src={event.coverImageUrl} alt={event.title} width={1200} height={630} className="h-44 w-full object-cover" />
                </div>
              )}
              <Link href={`/calendar-gallery/${event.slug}`} className="mt-4 inline-flex text-sm font-semibold text-slate-800">
                Открыть мероприятие →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
