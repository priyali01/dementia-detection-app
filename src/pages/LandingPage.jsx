import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Mic, Brain, BarChart3, ShieldCheck, Clock3, Accessibility } from "lucide-react";
import Button from "../components/common/Button";
import Card from "../components/common/Card";

const heroImages = [
  "/assets/images/hero-1.jpg",
  "/assets/images/hero-2.jpg",
  "/assets/images/hero-3.jpg",
];

const faqItems = [
  {
    question: "What is this tool for?",
    answer:
      "It is a research prototype that analyzes speech patterns to support earlier conversations about memory and thinking changes.",
  },
  {
    question: "Does this provide a medical diagnosis?",
    answer:
      "No. Results are screening insights only and must be discussed with a qualified clinician for any medical decision.",
  },
  {
    question: "Who can use this?",
    answer:
      "Adults and caregivers who want to track changes over time or prepare for a clinical visit.",
  },
  {
    question: "How is my audio used?",
    answer:
      "Recordings are processed securely and, in research mode, may be stored in anonymized form for model improvement with your consent.",
  },
  {
    question: "Does it work in all languages?",
    answer:
      "Early versions work best in clear speech; language support depends on the underlying model and may expand over time.",
  },
];

const LandingPage = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [heroIndex, setHeroIndex] = useState(0);

  // Auto‑rotate hero background
  useEffect(() => {
    const id = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 8000);
    return () => clearInterval(id);
  }, []);

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* NAVBAR */}
      <header className="sticky top-0 z-40 border-b border-emerald-900/70 bg-slate-950/95 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-emerald-600">
              <span className="text-lg font-bold text-white">DD</span>
            </span>
            <span className="hidden text-base font-semibold text-emerald-50 sm:block">
              Dementia Detection
            </span>
          </div>

          {/* Desktop menu */}
          <div className="hidden items-center gap-6 text-sm font-medium text-slate-200 md:flex">
            <button
              onClick={() => scrollToId("home")}
              className="hover:text-emerald-300"
            >
              Home
            </button>
            <button
              onClick={() => scrollToId("how-it-works")}
              className="hover:text-emerald-300"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToId("features")}
              className="hover:text-emerald-300"
            >
              About
            </button>
            <button
              onClick={() => scrollToId("contact")}
              className="hover:text-emerald-300"
            >
              Contact
            </button>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link to="/signup">
              <Button size="md">Get Started</Button>
            </Link>
          </div>

          {/* Mobile anchor button (simple, no drawer yet) */}
          <button
            onClick={() => scrollToId("how-it-works")}
            className="inline-flex items-center rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white shadow-md md:hidden"
          >
            Get Started
          </button>
        </nav>
      </header>

      {/* HERO */}
      <section
        id="home"
        className="border-b border-emerald-900/70 bg-slate-950"
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 md:flex-row md:items-center md:py-16">
          {/* Text */}
          <div className="md:w-1/2">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
              EARLY DETECTION MATTERS
            </p>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-emerald-50 md:text-4xl lg:text-5xl">
              Early Dementia Detection
              <span className="block">Made Simple.</span>
            </h1>
            <p className="mt-4 text-sm text-emerald-100 md:text-base">
              AI‑supported speech analysis that can be done at home, helping
              families and clinicians notice changes earlier and track them
              over time.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link to="/signup" className="sm:w-auto">
                <Button size="lg" fullWidth>
                  Start Free Assessment
                </Button>
              </Link>
              <button
                onClick={() => scrollToId("how-it-works")}
                className="rounded-full border border-emerald-400 px-6 py-3 text-sm font-semibold text-emerald-100 transition-transform duration-150 hover:scale-105 hover:bg-emerald-900/60"
              >
                Learn More
              </button>
            </div>

            <p className="mt-4 text-xs text-emerald-200 md:text-sm">
              Research prototype • Not a diagnostic device • Designed for older
              adults and caregivers.
            </p>
          </div>

          {/* Slider / hero visual */}
          <div className="md:w-1/2">
            <div className="relative overflow-hidden rounded-2xl border border-emerald-900/60 bg-slate-900 shadow-xl">
              <div
                className="relative h-56 w-full overflow-hidden md:h-72"
                style={{
                  backgroundImage: `url(${heroImages[heroIndex]})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/80 via-slate-900/20 to-slate-950/70" />
                <div className="relative flex h-full w-full flex-col justify-end px-5 pb-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-emerald-200">
                    From clinic rooms to living rooms
                  </p>
                  <p className="mt-1 text-sm text-slate-100">
                    Imagery of older adults and families talking, representing
                    real‑world conversations this tool is built to support.
                  </p>
                </div>
              </div>

              {/* Slider dots */}
              <div className="flex items-center justify-center gap-2 px-4 py-3">
                {heroImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setHeroIndex(idx)}
                    className={`h-2 w-2 rounded-full transition-colors ${
                      idx === heroIndex
                        ? "bg-emerald-400"
                        : "bg-emerald-900/70 hover:bg-emerald-700"
                    }`}
                    aria-label={`Show slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="border-b border-emerald-900/60 bg-slate-950/90 py-10 md:py-14"
      >
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-2xl font-bold text-emerald-50 md:text-3xl">
            How it works
          </h2>
          <p className="mt-2 text-center text-sm text-slate-300 md:text-base">
            A simple three‑step flow designed around older adults and their
            families.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                icon: Mic,
                title: "Record or upload audio",
                text: "Use your device microphone or upload a short recording of everyday speech.",
              },
              {
                icon: Brain,
                title: "AI analyzes patterns",
                text: "The system looks at pauses, word choice, and other features linked with cognition.",
              },
              {
                icon: BarChart3,
                title: "View instant results",
                text: "See an easy‑to‑read summary that you can download or share with a clinician.",
              },
            ].map((step, idx) => (
              <div key={step.title} className="relative">
                <Card hoverable>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 rounded-lg bg-emerald-700/70 p-2">
                      <step.icon className="h-5 w-5 text-emerald-50" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                        Step {idx + 1}
                      </p>
                      <h3 className="mt-1 text-sm font-semibold text-emerald-50 md:text-base">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-xs text-slate-300 md:text-sm">
                        {step.text}
                      </p>
                    </div>
                  </div>
                </Card>

                {/* simple connector line on desktop */}
                {idx < 2 && (
                  <div className="pointer-events-none absolute inset-y-1/2 right-[-12px] hidden w-6 -translate-y-1/2 items-center justify-center md:flex">
                    <div className="h-0.5 w-full rounded-full bg-emerald-700" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES + TRUST */}
      <section
        id="features"
        className="border-b border-emerald-900/60 bg-slate-950 py-10 md:py-14"
      >
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-10 md:grid-cols-[2fr,1.4fr]">
            {/* Features grid */}
            <div>
              <h2 className="text-2xl font-bold text-emerald-50 md:text-3xl">
                Built for comfort, clarity, and trust.
              </h2>
              <p className="mt-2 text-sm text-slate-300 md:text-base">
                The interface is designed to feel calm and straightforward, so
                older adults and caregivers can focus on conversation—not
                technology.
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {[
                  {
                    icon: Accessibility,
                    title: "Easy to use",
                    text: "Large buttons, clear text, and simple steps for every session.",
                  },
                  {
                    icon: ShieldCheck,
                    title: "Privacy first",
                    text: "Encryption and strict access controls help protect sensitive audio.",
                  },
                  {
                    icon: Brain,
                    title: "Research‑grade AI",
                    text: "Models inspired by clinical research into language and cognition.",
                  },
                  {
                    icon: Clock3,
                    title: "Fast results",
                    text: "Most assessments complete in a couple of minutes.",
                  },
                  {
                    icon: BarChart3,
                    title: "Track over time",
                    text: "View changes across multiple assessments in a single place.",
                  },
                  {
                    icon: ShieldCheck,
                    title: "Accessible design",
                    text: "High contrast layout and keyboard access wherever possible.",
                  },
                ].map((item) => (
                  <Card key={item.title}>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 rounded-md bg-emerald-700/80 p-2">
                        <item.icon className="h-4 w-4 text-emerald-50" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-emerald-50">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-xs text-slate-300 md:text-sm">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Trust + testimonials */}
            <div className="space-y-5">
              <Card title="Trust & compliance">
                <ul className="space-y-2 text-xs text-slate-300 md:text-sm">
                  <li>• Designed to support HIPAA‑aligned workflows.</li>
                  <li>• Built with principles of GDPR data minimization in mind.</li>
                  <li>• Intended for research and pilot use, not stand‑alone diagnosis.</li>
                </ul>
                <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-emerald-200">
                  <span className="rounded-full border border-emerald-500/70 px-3 py-1">
                    Research prototype
                  </span>
                  <span className="rounded-full border border-emerald-500/70 px-3 py-1">
                    Encryption in transit
                  </span>
                  <span className="rounded-full border border-emerald-500/70 px-3 py-1">
                    Consent‑driven data use
                  </span>
                </div>
              </Card>

              <Card title="What people say">
                <p className="text-sm italic text-slate-200">
                  “It gave us a gentle way to talk about memory changes with our
                  doctor.”
                </p>
                <p className="mt-2 text-xs text-slate-400">
                  — Family caregiver (pilot participant)
                </p>

                <p className="mt-4 text-xs text-slate-300 md:text-sm">
                  Trusted in research settings by{" "}
                  <span className="font-semibold text-emerald-200">
                    10,000+ assessments
                  </span>{" "}
                  and counting.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="border-b border-emerald-900/60 bg-slate-950/95 py-10 md:py-14"
      >
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-center text-2xl font-bold text-emerald-50 md:text-3xl">
            Frequently asked questions
          </h2>
          <p className="mt-2 text-center text-sm text-slate-300 md:text-base">
            Clear answers to common questions from families, older adults, and
            clinicians.
          </p>

          <div className="mt-6 space-y-3">
            {faqItems.map((item, idx) => {
              const open = activeFaq === idx;
              return (
                <button
                  key={item.question}
                  onClick={() => setActiveFaq(open ? null : idx)}
                  className="w-full rounded-xl border border-emerald-900/60 bg-slate-900 px-4 py-3 text-left transition-colors hover:bg-slate-900/80 md:px-5 md:py-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-emerald-50 md:text-base">
                      {item.question}
                    </span>
                    <span className="text-emerald-300">
                      {open ? "−" : "+"}
                    </span>
                  </div>
                  {open && (
                    <p className="mt-2 text-xs text-slate-300 md:text-sm">
                      {item.answer}
                    </p>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* CONTACT / FOOTER ANCHOR (real footer component is already at app level) */}
      <section
        id="contact"
        className="bg-slate-950 pb-10 pt-8 text-center text-xs text-slate-400 md:text-sm"
      >
        <p>
          For collaboration or research questions, email{" "}
          <span className="text-emerald-200">support@dementiadetection.example</span>
        </p>
      </section>
    </div>
  );
};

export default LandingPage;
