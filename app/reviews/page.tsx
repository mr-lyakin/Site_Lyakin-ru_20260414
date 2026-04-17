import type { Metadata } from "next";
import { ReviewsCarousel } from "../components/reviews-carousel";
import { ThanksCarousel } from "../components/thanks-carousel";
import { getReviews } from "../lib/reviews-store";
import { SiteShell } from "../components/site-shell";

export const metadata: Metadata = {
  title: "Отзывы",
  description: "Рекомендации клиентов и благодарности за обучение, консалтинг и экспертную поддержку.",
  alternates: { canonical: "/reviews" },
};

export default async function ReviewsPage() {
  const reviews = await getReviews();

  return (
    <SiteShell>
      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-slate-900">Отзывы</h1>
        <ReviewsCarousel reviews={reviews} />

        <div className="mt-14">
          <h2 className="text-3xl font-bold text-slate-900">Благодарности</h2>
          <p className="mt-3 text-slate-600">
            Подборка благодарственных писем, сертификатов и официальных подтверждений экспертной
            деятельности.
          </p>
          <ThanksCarousel />
        </div>
      </section>
    </SiteShell>
  );
}
