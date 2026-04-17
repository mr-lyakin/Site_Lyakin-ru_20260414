import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "../../components/site-shell";
import { getEvents } from "../../lib/events-store";
import { getSiteUrl, toAbsoluteUrl } from "@/lib/site-url";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const events = await getEvents();
  const event = events.find((item) => item.slug === slug);
  if (!event) {
    return {};
  }
  const pageUrl = `${getSiteUrl()}/calendar-gallery/${event.slug}`;
  const description = event.excerpt?.trim() || event.meta;
  const ogImages = event.coverImageUrl
    ? [{ url: toAbsoluteUrl(event.coverImageUrl), alt: event.title }]
    : undefined;

  return {
    title: event.title,
    description,
    alternates: { canonical: `/calendar-gallery/${event.slug}` },
    openGraph: {
      title: event.title,
      description,
      url: pageUrl,
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: event.title,
      description,
      images: ogImages?.map((i) => i.url),
    },
  };
}

export default async function EventPage({ params }: Props) {
  const { slug } = await params;
  const events = await getEvents();
  const event = events.find((item) => item.slug === slug);
  if (!event) notFound();

  return (
    <SiteShell>
      <section className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-3 text-sm text-slate-600">
          <Link href="/" className="hover:text-slate-900">Главная</Link> →{" "}
          <Link href="/calendar-gallery" className="hover:text-slate-900">Календарь-Галерея</Link> →{" "}
          <span className="text-slate-800">{event.title}</span>
        </div>
        <h1 className="text-4xl font-bold text-slate-900">{event.title}</h1>
        <p className="mt-3 text-slate-600">{event.meta}</p>
        {event.coverImageUrl && (
          <div className="mt-6 overflow-hidden rounded-2xl">
            <Image src={event.coverImageUrl} alt={event.title} width={1500} height={800} className="h-auto w-full object-cover" />
          </div>
        )}
        <div className="prose prose-slate mt-8 max-w-none" dangerouslySetInnerHTML={{ __html: event.contentHtml }} />

        {event.media.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-slate-900">Галерея</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {event.media.map((item) =>
                item.type === "video" ? (
                  <video key={item.url} src={item.url} controls className="w-full rounded-xl bg-black" />
                ) : (
                  <Image key={item.url} src={item.url} alt={event.title} width={900} height={600} className="h-64 w-full rounded-xl object-cover" />
                )
              )}
            </div>
          </div>
        )}
      </section>
    </SiteShell>
  );
}
