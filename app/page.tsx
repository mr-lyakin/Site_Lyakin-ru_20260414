import Image from "next/image";
import Link from "next/link";
import { SiteShell } from "./components/site-shell";
import { blogPosts } from "./lib/content";

const sections = [
  {
    title: "Обо мне",
    description:
      "Биография, опыт, квалификации и ключевые направления экспертной деятельности.",
    href: "/about",
  },
  {
    title: "Обучение и консалтинг",
    description:
      "Индивидуальная работа, корпоративные программы, стратегические сессии и мастер-классы.",
    href: "/services",
  },
  {
    title: "Отзывы",
    description:
      "Рекомендации и впечатления от клиентов, образовательных программ и проектных команд.",
    href: "/reviews",
  },
  {
    title: "Блог",
    description:
      "Превью статей и лонгридов. Каждый материал открывается на отдельной странице.",
    href: "/blog",
  },
  {
    title: "Календарь-Галерея",
    description:
      "Анонсы и отчеты мероприятий, конференций, мастер-классов и профессиональных встреч.",
    href: "/calendar-gallery",
  },
  {
    title: "Контакты",
    description:
      "Форма связи, email, Telegram и вся информация для сотрудничества и консультаций.",
    href: "/contacts",
  },
];

const latestEvents = [
  {
    title: "Открытый кубок Санкт-Петербурга по проектному управлению",
    meta: "22 сентября 2026 • Санкт-Петербург",
    excerpt:
      "Деловые игры и практические форматы для руководителей и участников проектной деятельности.",
  },
  {
    title: "Лекция для Международного бизнес-клуба ДИАЛОГИ",
    meta: "2025 • Москва",
    excerpt:
      "Выступление на тему «Управляя будущим» и обсуждение современных подходов к управлению.",
  },
  {
    title: "Стратегическая сессия для выпускников ДВФУ",
    meta: "2025 • Владивосток",
    excerpt:
      "Работа с управленческими сценариями, приоритетами и практиками принятия решений в условиях изменений.",
  },
];

export default function Home() {
  return (
    <SiteShell>
      <section className="bg-gradient-to-b from-slate-900 to-blue-950 text-white">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:py-20">
          <div className="space-y-5">
            <p className="inline-flex w-fit rounded-full bg-white/10 px-4 py-1 text-sm">
              Эксперт по управлению
            </p>
            <h1 className="max-w-4xl text-3xl font-bold leading-tight sm:text-4xl">
              В старинной притче у трех рабочих, таскающих камни, спросили:
              &quot;Чем вы занимаетесь?&quot;
            </h1>
            <div className="max-w-3xl space-y-3 text-base leading-relaxed text-slate-200">
              <p>
                И один ответил — &quot;Пытаюсь выжить, таская тяжеленные камни с
                утра до ночи&quot;.
              </p>
              <p>
                Второй сказал — &quot;Зарабатываю на пропитание своей
                семье&quot;.
              </p>
              <p>
                Третий улыбнулся и сказал — &quot;Я строю храм&quot;.
              </p>
              <p>
                Исходя из этой логики, на поставленный вопрос, отвечу, что
                занимаюсь <strong>ВОСПИТАНИЕМ ЭЛИТ, СЛУЖА РОССИИ</strong>,
                зарабатывая при этом на консалтинге, модерации и обучении, в
                то же самое время &quot;таская тяжеленные камни&quot; философских
                понятий, переводя теорию в практику осмысления нового мира,
                неустанно граня не огранённые грани, надеюсь, будущих
                бриллиантов русской элиты.
              </p>
            </div>
          </div>

          <div className="mx-auto w-full max-w-sm lg:mx-0 lg:justify-self-end">
            <div className="overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-2xl">
              <Image
                src="/andrey-lyakin.png"
                alt="Андрей Юрьевич Лякин"
                width={704}
                height={936}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold">Разделы сайта</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {sections.map((section) => (
            <article key={section.href} className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
              <h3 className="text-xl font-semibold text-slate-900">
                <Link href={section.href} className="transition hover:text-slate-700">
                  {section.title}
                </Link>
              </h3>
              <p className="mt-3 text-slate-600">
                <Link href={section.href} className="transition hover:text-slate-800">
                  {section.description}
                </Link>
              </p>
              <p className="mt-4 text-sm font-semibold text-slate-700">
                <Link href={section.href} className="transition hover:text-slate-900">
                  Перейти в раздел →
                </Link>
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-3xl font-bold">Календарь-Галерея: последние события</h2>
            <Link
              href="/calendar-gallery"
              className="text-sm font-semibold text-slate-700 hover:text-slate-900"
            >
              Все события →
            </Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {latestEvents.map((event) => (
              <article key={event.title} className="rounded-2xl border border-slate-200 p-5">
                <p className="text-xs uppercase tracking-wide text-slate-500">{event.meta}</p>
                <h3 className="mt-2 text-lg font-semibold text-slate-900">{event.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{event.excerpt}</p>
                <Link
                  href="/calendar-gallery"
                  className="mt-4 inline-flex text-sm font-semibold text-slate-800"
                >
                  Открыть календарь →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-3xl font-bold">Свежие материалы блога</h2>
            <Link href="/blog" className="text-sm font-semibold text-slate-700 hover:text-slate-900">
              Все статьи →
            </Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {blogPosts.slice(0, 3).map((post) => (
              <article key={post.slug} className="rounded-2xl border border-slate-200 p-5">
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  {post.publishedAt} • {post.readTime}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-slate-900">{post.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="mt-4 inline-flex text-sm font-semibold text-slate-800">
                  Читать статью →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
