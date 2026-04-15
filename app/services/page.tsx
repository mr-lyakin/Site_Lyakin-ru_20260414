import Image from "next/image";
import { SiteShell } from "../components/site-shell";
import { getServices } from "../lib/services-store";

export default async function ServicesPage() {
  const services = await getServices();
  return (
    <SiteShell>
      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-slate-900">Обучение и консалтинг</h1>
        <p className="mt-4 max-w-3xl text-slate-700">
          Форматы работы подбираются под задачу: от точечного консалтинга до комплексных программ
          развития управленческой системы.
        </p>
        <div className="mt-8 space-y-4">
          {services.map((service, index) => (
            <article key={service.id} className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
              {service.coverImageUrl && (
                <div className="mb-4 overflow-hidden rounded-xl">
                  <Image
                    src={service.coverImageUrl}
                    alt={service.title}
                    width={1200}
                    height={630}
                    className={`h-48 w-full object-cover ${index === 0 ? "object-top" : "object-center"}`}
                  />
                </div>
              )}
              <p className="text-xs uppercase tracking-wide text-slate-500">
                {service.publishedAt} • {service.readTime}
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">{service.title}</h2>
              <p className="mt-3 text-slate-600">{service.excerpt}</p>
              <div
                className="prose prose-slate mt-4 max-w-none text-sm"
                dangerouslySetInnerHTML={{ __html: service.contentHtml }}
              />
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
