// src/pages/ResultsPage.jsx
import { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/layout/Header.jsx";
import Footer from "../components/layout/Footer.jsx";
import Sidebar from "../components/layout/Sidebar.jsx";
import ResultsDisplay from "../components/assessment/ResultsDisplay.jsx";
import Button from "../components/common/Button.jsx";

const ResultsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // For now, generate demo results; later fetch by id
  const results = useMemo(
    () => ({
      id,
      date: new Date().toISOString(),
      score: 62,
      confidence: 87,
      explanation:
        "This screening suggests a moderate risk of cognitive change. This is not a diagnosis. Use it to guide conversations with a clinician and consider repeat assessments over time.",
      breakdown: [
        { category: "Memory & recall", score: 58 },
        { category: "Language & fluency", score: 66 },
        { category: "Speech patterns", score: 71 },
        { category: "Processing speed", score: 54 },
      ],
      findings: [
        {
          type: "warning",
          text: "Slightly increased pauses and hesitations compared to typical speech.",
        },
        {
          type: "info",
          text: "Word-finding difficulty appears in a few segments but remains mostly fluent.",
        },
        {
          type: "positive",
          text: "Overall narrative structure and orientation remain preserved.",
        },
      ],
      recommendations: [
        "Discuss these results with a healthcare professional familiar with cognitive assessment.",
        "Repeat this assessment in 4–6 weeks to monitor changes over time.",
        "Maintain regular cognitive, social, and physical activity as advised by your clinician.",
      ],
    }),
    [id]
  );

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-50">
      <Header />

      <div className="flex flex-1">
        <aside className="hidden w-60 border-r border-emerald-900/60 bg-slate-950/80 lg:block">
          <Sidebar />
        </aside>

        <main className="flex-1 px-4 py-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl space-y-6">
            <header className="flex items-center justify-between gap-3">
              <div>
                <h1 className="text-2xl font-semibold text-emerald-50 md:text-3xl">
                  Assessment results
                </h1>
                <p className="mt-1 text-sm text-slate-400">
                  Result ID: {id || "demo"}
                </p>
              </div>
              <Button
                variant="secondary"
                onClick={() => navigate("/history")}
              >
                View history
              </Button>
            </header>

            <ResultsDisplay results={results} />
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default ResultsPage;
