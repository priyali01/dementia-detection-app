// src/pages/NewAssessment.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header.jsx";
import Footer from "../components/layout/Footer.jsx";
import Sidebar from "../components/layout/Sidebar.jsx";
import AudioRecorder from "../components/assessment/AudioRecorder.jsx";
import AudioUploader from "../components/assessment/AudioUploader.jsx";
// import ProcessingStatus from "../components/assessment/ProgressIndicator.jsx";
import ProgressIndicator from "../components/assessment/ProgressIndicator.jsx";
import Button from "../components/common/Button.jsx";

const steps = ["Capture speech", "Review & edit", "View results"];

const NewAssessment = () => {
  const navigate = useNavigate();
  const [currentStep] = useState(1);
  const [inputMode, setInputMode] = useState("record"); // "record" | "upload"
  const [selectedFile, setSelectedFile] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleAudioReady = (fileOrBlob) => {
    setSelectedFile(fileOrBlob);
  };

  const handleContinueToProcessing = async () => {
    if (!selectedFile) return;
    setProcessing(true);

    // Simulate upload + analysis then go to processing page
    await new Promise((r) => setTimeout(r, 1500));
    navigate("/assessments/processing");
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-50">
      <Header />

      <div className="flex flex-1">
        <aside className="hidden w-60 border-r border-emerald-900/60 bg-slate-950/80 lg:block">
          <Sidebar />
        </aside>

        <main className="flex-1 px-4 py-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl space-y-6">
            <header>
              <h1 className="text-2xl font-semibold text-emerald-50 md:text-3xl">
                New assessment
              </h1>
              <p className="mt-1 text-sm text-slate-400">
                Record or upload a short speech sample to begin the analysis.
              </p>
            </header>

            <ProgressIndicator currentStep={currentStep} steps={steps} />

            <section className="space-y-4">
              {/* Input mode toggle */}
              <div className="inline-flex rounded-lg border border-emerald-900/60 bg-slate-900 p-1 text-xs md:text-sm">
                <button
                  type="button"
                  onClick={() => setInputMode("record")}
                  className={`px-3 py-1.5 rounded-md ${
                    inputMode === "record"
                      ? "bg-emerald-600 text-white"
                      : "text-slate-300"
                  }`}
                >
                  Record audio
                </button>
                <button
                  type="button"
                  onClick={() => setInputMode("upload")}
                  className={`px-3 py-1.5 rounded-md ${
                    inputMode === "upload"
                      ? "bg-emerald-600 text-white"
                      : "text-slate-300"
                  }`}
                >
                  Upload file
                </button>
              </div>

              {/* Capture section */}
              <div className="rounded-xl border border-emerald-900/60 bg-slate-950/70 p-4 md:p-6">
                {inputMode === "record" ? (
                  <AudioRecorder onAudioReady={handleAudioReady} />
                ) : (
                  <AudioUploader onFileSelect={handleAudioReady} />
                )}
              </div>

              {processing && (
                <div className="mt-4">
                  <ProcessingStatus />
                </div>
              )}

              <div className="mt-4 flex justify-end gap-3">
                <Button
                  variant="secondary"
                  onClick={() => navigate("/dashboard")}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleContinueToProcessing}
                  disabled={!selectedFile || processing}
                  loading={processing}
                >
                  Analyze sample
                </Button>
              </div>
            </section>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default NewAssessment
