// src/pages/TranscriptReview.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header.jsx";
import Footer from "../components/layout/Footer.jsx";
import Sidebar from "../components/layout/Sidebar.jsx";
import TranscriptEditor from "../components/assessment/TranscriptEditor.jsx";
import Button from "../components/common/Button.jsx";

const TranscriptReview = () => {
  const navigate = useNavigate();
  const [audioUrl] = useState(null); // later: get from context or location.state
  const [transcript, setTranscript] = useState(
    "This is a placeholder transcript. Paste or edit your text here."
  );

  const handleSaveAndContinue = () => {
    // TODO: store transcript in AssessmentContext, then:
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
                Review transcript
              </h1>
              <p className="mt-1 text-sm text-slate-400">
                Listen back and correct the transcript before running the
                assessment.
              </p>
            </header>

            <section className="grid gap-6 lg:grid-cols-5">
              {/* Audio player */}
              <div className="lg:col-span-2 space-y-3">
                <div className="rounded-xl border border-emerald-900/60 bg-slate-950/70 p-4">
                  <p className="mb-2 text-sm font-medium text-emerald-50">
                    Audio preview
                  </p>
                  {audioUrl ? (
                    <audio
                      src={audioUrl}
                      controls
                      className="w-full"
                      style={{ height: "48px" }}
                    />
                  ) : (
                    <p className="text-xs text-slate-400">
                      Audio will appear here after recording or upload.
                    </p>
                  )}
                </div>

                <div className="rounded-xl border border-emerald-900/60 bg-slate-950/70 p-4 text-xs text-slate-400 md:text-sm">
                  <p className="font-medium text-emerald-50 mb-1">
                    Tips for better results
                  </p>
                  <ul className="list-disc space-y-1 pl-4">
                    <li>Fix obvious transcription errors or missing words.</li>
                    <li>Keep filler words like “um” only if they are important.</li>
                    <li>Do not add information that was not spoken.</li>
                  </ul>
                </div>
              </div>

              {/* Transcript editor */}
              <div className="lg:col-span-3">
                <TranscriptEditor
                  value={transcript}
                  onChange={setTranscript}
                />
              </div>
            </section>

            <div className="mt-4 flex justify-end gap-3">
              <Button
                variant="secondary"
                onClick={() => navigate("/assessments/new")}
              >
                Back
              </Button>
              <Button onClick={handleSaveAndContinue}>
                Continue to analysis
              </Button>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default TranscriptReview;
