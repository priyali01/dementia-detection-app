// src/pages/ProcessingPage.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header.jsx";
import Footer from "../components/layout/Footer.jsx";
import Sidebar from "../components/layout/Sidebar.jsx";
import ProcessingStatus from "../components/assessment/ProgressIndicator.jsx";
import Button from "../components/common/Button.jsx";

const ProcessingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate backend analysis, then go to results
    const timer = setTimeout(() => {
      navigate("/results/demo-id");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-50">
      <Header />

      <div className="flex flex-1">
        <aside className="hidden w-60 border-r border-emerald-900/60 bg-slate-950/80 lg:block">
          <Sidebar />
        </aside>

        <main className="flex-1 px-4 py-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl space-y-6">
            <header>
              <h1 className="text-2xl font-semibold text-emerald-50 md:text-3xl">
                Analyzing assessment
              </h1>
              <p className="mt-1 text-sm text-slate-400">
                We&apos;re processing the audio and transcript to estimate
                cognitive risk.
              </p>
            </header>

            <ProcessingStatus />

            <div className="mt-4 flex justify-end">
              <Button
                variant="secondary"
                onClick={() => navigate("/dashboard")}
              >
                Go to dashboard
              </Button>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default ProcessingPage;
