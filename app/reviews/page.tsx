import { SiteShell } from "../components/site-shell";

const reviews = [
  {
    text: "Команда получила рабочую систему проектного управления: роли, ритмы и инструменты. Стало заметно проще запускать и доводить инициативы до результата.",
    author: "Руководитель проектного офиса, региональный орган власти",
  },
  {
    text: "Сильная практическая подача и глубокая экспертиза. После программы сотрудники начали применять инструменты Agile и риск-менеджмента в реальных проектах.",
    author: "Корпоративный университет, образовательная программа",
  },
  {
    text: "На стратегической сессии команда наконец договорилась о приоритетах и критериях успеха. Это сэкономило месяцы согласований.",
    author: "Директор по развитию, коммерческая компания",
  },
];

export default function ReviewsPage() {
  return (
    <SiteShell>
      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-slate-900">Отзывы</h1>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {reviews.map((review) => (
            <blockquote key={review.author} className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
              <p className="text-slate-700">&quot;{review.text}&quot;</p>
              <footer className="mt-4 text-sm text-slate-500">{review.author}</footer>
            </blockquote>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
