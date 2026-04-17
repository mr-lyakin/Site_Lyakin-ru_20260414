import type { Metadata } from "next";
import Image from "next/image";
import { SiteShell } from "../components/site-shell";

export const metadata: Metadata = {
  title: "Обо мне",
  description:
    "Биография, опыт и направления экспертной деятельности: системное управление, проекты, обучение руководителей.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <SiteShell>
      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-slate-900">
          Кибернетик, эксперт по системам управления организаций
        </h1>
        <div className="mt-8 grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <div>
            <div className="mx-auto w-3/4 overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-2xl lg:mx-0">
              <Image
                src="/andrey-lyakin-about-v2.png"
                alt="Лякин Андрей Юрьевич"
                width={704}
                height={936}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </div>

          <div className="space-y-5 pt-1 text-slate-700 lg:pt-3">
            <p>
              Сертифицированный руководитель проектов повышенной сложности
              (СРП-2 ПМ СТАНДАРТ), член методического совета и асессор конкурса
              «Проектный Олимп».
            </p>
            <p>
              Более 30 лет профессионального опыта: первые 20 лет в IT, затем
              более 10 лет внедрения проектного управления в органах
              государственной власти и крупных организациях.
            </p>
            <p>
              Руководил проектными офисами в структурах Министерства
              экономического развития РФ и Правительства Москвы. Эксперт по
              системам управления, цифровой трансформации и Agile/гибридным
              практикам.
            </p>
            <p>
              Преподаватель магистратуры и автор программ повышения
              квалификации для РАНХиГС, МГУ, Университета управления
              Правительства Москвы, Сколково и корпоративных университетов.
            </p>
          </div>
        </div>

        <h2 className="mt-14 text-4xl font-bold text-slate-900">
          Преподавательская деятельность
        </h2>
        <div className="mt-8 space-y-6">
          <div className="overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-2xl">
            <Image
              src="/andrey-lyakin-education.png"
              alt="Преподавательская деятельность Андрея Лякина"
              width={1024}
              height={273}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="space-y-5 text-slate-700">
            <p>
              Преподаватель магистратуры «Управление государственными
              программами и проектами» в Университете управления Правительства
              Москвы.
            </p>
            <p>
              Автор и ведущий тренингов и программ повышения квалификации по
              темам «Управление проектами», «Управление сложными проектами»,
              «Управление процессами», «Гибкие инструменты управления –
              Agile/Scrum/Kanban», «Гибридное управление», «Современное
              госуправление и цифровая трансформация» с 2016 года.
            </p>
            <p>
              Для МГУУ, РАНХиГС, Сколково, МГУ, ДВФУ, корпоративных
              университетов Санкт-Петербурга, Краснодарского края, Самарской
              области, Новосибирска и по заказу отдельных федеральных и
              региональных органов власти и коммерческих компаний.
            </p>
            <p>
              Разработка и проведение бизнес-тренингов по трансформационным
              мероприятиям (публичные выступления, проведение переговоров и
              совещаний, запуск проектов, обучение взрослых).
            </p>
          </div>
        </div>

        <h2 className="mt-14 text-4xl font-bold text-slate-900">
          Проведение деловых игр по управлению
        </h2>
        <div className="mt-8 space-y-6">
          <div className="overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-2xl">
            <Image
              src="/edu-games-01.png"
              alt="Проведение деловых игр по управлению"
              width={768}
              height={420}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="space-y-4 text-slate-700">
            <p>
              Основная задумка и, даже сказал бы – Миссия этой деятельности -
              <br />
              Повышение уровня управленческой зрелости в России
              <br />
              как среди коммерческих компаний и предпринимателей,
              <br />
              так и среди общественных и государственных организаций,
              муниципальных, бюджетных и государственных руководителей,
              <br />
              путем проведения деловых игр и соревнований по управленческим
              дисциплинам.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-2xl">
              <Image
                src="/edu-games-02.png"
                alt="Деловые игры по управлению, фото 2"
                width={768}
                height={420}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-2xl">
              <Image
                src="/edu-games-03.png"
                alt="Деловые игры по управлению, фото 3"
                width={1024}
                height={573}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-2xl">
              <Image
                src="/edu-games-04.png"
                alt="Деловые игры по управлению, фото 4"
                width={991}
                height={558}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-2xl">
              <Image
                src="/edu-games-05.png"
                alt="Деловые игры по управлению, фото 5"
                width={1024}
                height={576}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
        <h2 className="mt-14 text-4xl font-bold text-slate-900">
          Выступления, модерация и фасилитация
        </h2>
        <div className="mt-8 space-y-6">
          <div className="overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-2xl">
            <Image
              src="/edu-spik-05.png"
              alt="Выступления, модерация и фасилитация"
              width={1024}
              height={576}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="space-y-5 text-slate-700">
            <p>
              В 2025 году – проведение лекции для Международного бизнес-клуба
              ДИАЛОГИ «Управляя будущим», стратсессии для выпускников
              бизнес-программ Академии управления ДВФУ. В 2024 году -
              проведение лекций и мастер-классов по приглашению деловых
              сообществ – «Возможности» (Московская область), Клуб выпускников
              программы HLM (Корпоративный университет администрации
              Санкт-Петербурга), в 2023 году - «Деловар» (Нижний Новгород). В
              2021 году - Московская школа управления SKOLKOVO, программа
              повышения квалификации кадрового резерва Президента Республики
              Татарстан «Мастерство управления: современные тренды и
              вызовы-2021».
            </p>
            <p>
              Департамент внешнеэкономических и международных связей города
              Москвы «Карьерная школа для молодых соотечественников-2022»,
              проведение мастер-классов «Командообразование» и «Критическое
              мышление и принятие решений».
            </p>
            <p>
              Международная научно-практическая конференция Финансового
              университета при Правительстве РФ «Управленческие науки в
              современном мире» с докладом «Некоторые парадоксы проектного
              управления» на секции «Теория и практика проектного управления» в
              качестве ключевого спикера.
            </p>
            <p>
              МГИМО МИД Международная научно-практическая конференция «Цифровые
              международные отношения 2022», круглый стол «Управление
              Интернетом: межправительственный или мультистейкхолдерный
              подход», с докладом «ИНТЕРНЕТ как объект управления», Москва
              2022.
            </p>
            <p>
              РАНХиГС Институт ЭМИТ, конференция «Практика цифровой
              трансформации» с докладом «Риски будущего», Москва 2022.
            </p>
            <p>
              МИД Международный молодежный форум «Новые реалии – новые
              возможности» - ведущий образовательного трека, с докладом «Тренды
              будущего и вызовы настоящего», Гомель 2021.
            </p>
            <p>
              Аналитический центр при Правительстве РФ, Администрация
              Белгородской области Межрегиональный форум 2020 «Бережливое
              управление 2.0: энергия действий», модератор круглого стола
              «Проектное управление в достижении стратегических целей развития
              региона и муниципалитета», Белгород 2020.
            </p>
            <p>
              1ая Международная научно-практическая конференция «Управление
              проектами: идеи, ценности, решения», организатор – ФГБОУ ВО
              «Санкт-Петербургский государственный архитектурно-строительный
              университет», г. Санкт-Петербург, 2019 г. 4ый форум «Управление
              проектами», организатор компания «AHConferences», г. Москва, 2019
              г. Зимняя школа по проектному управлению, Северо-Западный
              институт управления РАНХиГС, г. Санкт-Петербург, 2019 г.
              Конференция «PM Bridge – 2018», Санкт-Петербург, Санкт-Петербургское
              отделение PMI, 2018 г. ВШЭ «HSEPMCONF’18», г. Москва, 2018 г. 3-й
              Форум управления проектами, г. Москва, 2018 г. Конференция
              «Проектный Олимп – 2018», г. Сочи, 2018 г. «Архитекторы России –
              2018», Московская область, 2018 г. Конференция «PM Bridge – 2017»,
              Санкт-Петербург, Санкт-Петербургское отделение PMI, 2017 г.
              Конференция «Адванта – управление проектами 2016», г. Москва,
              2016 г.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 sm:grid-rows-2">
            <div className="overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-2xl sm:row-span-2">
              <Image
                src="/edu-spik-01.png"
                alt="Выступления и модерация, фото 1"
                width={253}
                height={265}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-2xl">
              <Image
                src="/edu-spik-02.png"
                alt="Выступления и модерация, фото 2"
                width={534}
                height={251}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-2xl">
              <Image
                src="/edu-spik-04.png"
                alt="Выступления и модерация, фото 4"
                width={1024}
                height={576}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-2xl">
            <Image
              src="/edu-spik-03.png"
              alt="Выступления и модерация, фото 3"
              width={1024}
              height={572}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="mt-14 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-lg font-semibold text-slate-900">
            Полное резюме эксперта можно скачать по ссылке
          </p>
          <a
            href="/resume-lyakin-2025.pdf"
            download
            className="mt-4 inline-flex items-center gap-3 rounded-xl bg-slate-900 px-5 py-3 text-white transition hover:bg-slate-700"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/20 text-sm font-bold">
              CV
            </span>
            <span className="text-sm font-semibold">Скачать PDF</span>
          </a>
        </div>
      </section>
    </SiteShell>
  );
}
