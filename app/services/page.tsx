import { SiteShell } from "../components/site-shell";

const services = [
  {
    title: "Управленческий консалтинг",
    description:
      "Постановка современного управления: цифровая трансформация, проектные и процессные офисы, продуктовый подход и запуск изменений.",
  },
  {
    title: "Авторские программы обучения",
    description:
      "Курсы и тренинги по темам управления проектами, сложными проектами, процессами, гибридными подходами и Agile/Scrum/Kanban.",
  },
  {
    title: "Стратегические сессии и фасилитация",
    description:
      "Модерация круглых столов, стратегические сессии, проектные треки для органов власти и коммерческих компаний.",
  },
];

export default function ServicesPage() {
  return (
    <SiteShell>
      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-slate-900">Обучение и консалтинг</h1>
        <p className="mt-4 max-w-3xl text-slate-700">
          Форматы работы подбираются под задачу: от точечного консалтинга до комплексных программ
          развития управленческой системы.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {services.map((service) => (
            <article key={service.title} className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
              <h2 className="text-xl font-semibold text-slate-900">{service.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{service.description}</p>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
