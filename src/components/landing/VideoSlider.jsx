// src/components/landing/VideoSlider.jsx
import { useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    src: "/assets/videos/clinic.mp4",
    title: "Early dementia screening, from home.",
    caption: "Short guided speech tests to flag early cognitive decline."
  },
  {
    id: 2,
    src: "/assets/videos/family.mp4",
    title: "Support families, not just patients.",
    caption: "Track changes over time and share reports with clinicians."
  },
  {
    id: 3,
    src: "/assets/videos/doctor.mp4",
    title: "AI-assisted, clinician-friendly insights.",
    caption: "Summaries designed to augment—not replace—medical judgment."
  }
];

const AUTO_PLAY_INTERVAL = 8000; // ms

export default function VideoSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, AUTO_PLAY_INTERVAL);
    return () => clearInterval(id);
  }, []);

  const goTo = (index) => setCurrent(index);
  const next = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prev = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  const active = slides[current];

  return (
    <section className="relative w-full h-[80vh] md:h-screen bg-black overflow-hidden">

      {/* Video */}
      <video
        key={active.id}
        className="w-full h-full object-cover"
        src={active.src}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

      {/* Text content */}
      <div className="absolute inset-0 flex items-center px-4 md:px-12 lg:px-20">
        <div className="max-w-xl text-white space-y-3 md:space-y-4">
          <p className="uppercase tracking-[0.2em] text-xs md:text-sm text-emerald-300/80">
            Dementia speech screening
          </p>
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold leading-tight">
            {active.title}
          </h1>
          <p className="text-sm md:text-base text-gray-100/90">
            {active.caption}
          </p>
          <div className="flex gap-3 pt-2">
            <button className="px-4 py-2 md:px-5 md:py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-sm md:text-base font-medium transition">
              Start a sample assessment
            </button>
            <button className="px-4 py-2 md:px-5 md:py-2.5 rounded-full border border-white/40 text-sm md:text-base text-white/90 hover:bg-white/10 transition">
              Watch how it works
            </button>
          </div>
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition"
      >
        ‹
      </button>
      <button
        onClick={next}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition"
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => goTo(index)}
            className={`w-2.5 h-2.5 rounded-full transition ${
              index === current ? "bg-emerald-400" : "bg-white/40"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
