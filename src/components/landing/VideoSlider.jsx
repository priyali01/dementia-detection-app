// src/components/landing/VideoSlider.jsx
import { useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    title: "Early dementia screening, from home.",
    caption: "Short guided speech tests to flag early cognitive decline."
  },
  {
    id: 2,
    title: "Support families, not just patients.",
    caption: "Track changes over time and share reports with clinicians."
  },
  {
    id: 3,
    title: "AI-assisted, clinician-friendly insights.",
    caption: "Summaries designed to augment—not replace—medical judgment."
  }
];

const AUTO_PLAY_INTERVAL = 8000; // ms

export default function VideoSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setCurrent((prev) => (prev + 1) % slides.length),
      AUTO_PLAY_INTERVAL
    );
    return () => clearInterval(id);
  }, []);

  const goTo = (index) => setCurrent(index);
  const active = slides[current];

  return (
    <section
      className="
        relative w-full h-[80vh] md:h-screen overflow-hidden
        bg-gradient-to-r from-emerald-900 via-emerald-700 to-emerald-500
      "
    >
      {/* optional darker overlay */}
      <div className="absolute inset-0 bg-emerald-900/40" />

      {/* Text content */}
      <div className="absolute inset-0 flex items-center px-4 md:px-12 lg:px-20">
        <div className="max-w-xl text-white space-y-3 md:space-y-4">
          <p className="uppercase tracking-[0.2em] text-xs md:text-sm text-emerald-200">
            Dementia speech screening
          </p>
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold leading-tight">
            {active.title}
          </h1>
          <p className="text-sm md:text-base text-emerald-50/90">
            {active.caption}
          </p>
          <div className="flex gap-3 pt-2">
            <button className="px-4 py-2 md:px-5 md:py-2.5 rounded-full bg-emerald-400 hover:bg-emerald-300 text-sm md:text-base font-medium transition">
              Start a sample assessment
            </button>
            <button className="px-4 py-2 md:px-5 md:py-2.5 rounded-full border border-emerald-100/60 text-sm md:text-base text-emerald-50 hover:bg-emerald-50/10 transition">
              Watch how it works
            </button>
          </div>
        </div>
      </div>

      {/* Dots only (no arrows) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => goTo(index)}
            className={`w-2.5 h-2.5 rounded-full transition ${
              index === current ? "bg-emerald-300" : "bg-emerald-100/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
