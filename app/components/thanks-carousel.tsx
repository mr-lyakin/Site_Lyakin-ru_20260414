"use client";

import { useState } from "react";

const gratitudeImages = [
  "/thanks/thanks-01.png",
  "/thanks/thanks-02.png",
  "/thanks/thanks-03.png",
  "/thanks/thanks-05.png",
  "/thanks/thanks-06.png",
  "/thanks/thanks-08.png",
  "/thanks/thanks-09.png",
  "/thanks/thanks-10.png",
  "/thanks/thanks-11.png",
  "/thanks/thanks-12.png",
  "/thanks/thanks-13.png",
  "/thanks/thanks-14.png",
  "/thanks/thanks-15.png",
  "/thanks/thanks-16.png",
  "/thanks/thanks-17.png",
];

export function ThanksCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const lastIndex = gratitudeImages.length - 1;

  const goPrev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));
  const goNext = () => setCurrentIndex((prev) => Math.min(prev + 1, lastIndex));

  return (
    <>
      <div className="mt-6 overflow-hidden rounded-2xl">
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {gratitudeImages.map((imageSrc, idx) => (
            <div key={imageSrc} className="w-full shrink-0">
              <figure className="rounded-2xl bg-white p-3 ring-1 ring-slate-200 sm:p-4">
                <img
                  src={imageSrc}
                  alt={`Благодарность ${idx + 1}`}
                  className="mx-auto max-h-[75vh] w-auto rounded-lg object-contain"
                />
              </figure>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={goPrev}
          disabled={currentIndex === 0}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          ← Назад
        </button>

        <div className="flex items-center gap-2" aria-label="Индикатор благодарностей">
          {gratitudeImages.map((_, idx) => (
            <button
              key={`thanks-dot-${idx}`}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`h-2.5 w-2.5 rounded-full transition ${
                idx === currentIndex ? "bg-slate-900" : "bg-slate-300 hover:bg-slate-400"
              }`}
              aria-label={`Перейти к благодарности ${idx + 1}`}
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
