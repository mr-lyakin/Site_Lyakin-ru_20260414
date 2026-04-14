"use client";

import { useState } from "react";
import type { ReviewItem } from "../lib/reviews-store";

export function ReviewsCarousel({ reviews }: { reviews: ReviewItem[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const lastIndex = Math.max(reviews.length - 1, 0);

  const goPrev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));
  const goNext = () => setCurrentIndex((prev) => Math.min(prev + 1, lastIndex));

  if (reviews.length === 0) {
    return (
      <div className="mt-8 rounded-2xl bg-white p-6 ring-1 ring-slate-200">
        <p className="text-slate-600">Пока нет отзывов. Добавь первый отзыв в админ-панели.</p>
      </div>
    );
  }

  return (
    <>
      <div className="mt-8 overflow-hidden rounded-2xl">
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {reviews.map((review) => (
            <div key={review.id} className="w-full shrink-0">
              <blockquote className="rounded-2xl bg-white p-6 ring-1 ring-slate-200 sm:p-8">
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  {review.program}
                </p>
                <p className="text-lg leading-relaxed text-slate-700">&quot;{review.text}&quot;</p>
                <footer className="mt-5 flex items-center gap-3 text-sm text-slate-500">
                  {review.photoUrl && (
                    <img
                      src={review.photoUrl}
                      alt={review.author}
                      className="h-10 w-10 rounded-full object-cover ring-1 ring-slate-200"
                    />
                  )}
                  <span>{review.author}</span>
                </footer>
              </blockquote>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={goPrev}
          disabled={currentIndex === 0}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          ← Назад
        </button>

        <div className="flex items-center gap-2" aria-label="Индикатор слайдов">
          {reviews.map((_, idx) => (
            <button
              key={`dot-${idx}`}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`h-2.5 w-2.5 rounded-full transition ${
                idx === currentIndex ? "bg-slate-900" : "bg-slate-300 hover:bg-slate-400"
              }`}
              aria-label={`Перейти к отзыву ${idx + 1}`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={goNext}
          disabled={currentIndex === lastIndex}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Далее →
        </button>
      </div>
    </>
  );
}
