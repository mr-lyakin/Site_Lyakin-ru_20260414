import Image from "next/image";
import { SiteShell } from "../components/site-shell";

export default function AboutPage() {
  return (
    <SiteShell>
      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-slate-900">Лякин Андрей Юрьевич</h1>
        <div className="mt-8 grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <div>
            <div className="overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-2xl">
              <Image
                src="/andrey-lyakin-about-v2.png"
                alt="Лякин Андрей Юрьевич"
                width={704}
                height={936}
                className="h-full w-full object-cover"
                priority
              />
            </div>
            <p className="mt-4 text-base font-bold leading-relaxed text-slate-900">
              Кибернетик, эксперт по системам управления организаций
            </p>
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
      </section>
    </SiteShell>
  );
}
