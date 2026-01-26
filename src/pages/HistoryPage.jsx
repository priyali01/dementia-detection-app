// src/pages/HistoryPage.jsx
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header.jsx";
import Footer from "../components/layout/Footer.jsx";
import Sidebar from "../components/layout/Sidebar.jsx";
import Card from "../components/common/Card.jsx";
import Button from "../components/common/Button.jsx";

const HistoryPage = () => {
  const navigate = useNavigate();

  // Demo data; later load from API
  const assessments = useMemo(
    () => [
      {
        id: "demo-1",
        date: "2026-01-24T10:30:00Z",
        score: 62,
        risk: "Medium",
        status: "Completed",
      },
      {
        id: "demo-2",
        date: "2026-01-10T15:12:00Z",
        score: 28,
        risk: "Low",
        status: "Completed",
      },
      {
        id: "demo-3",
        date: "2025-12-20T09:05:00Z",
        score: 78,
        risk: "High",
        status: "Completed",
      },
    ],
    []
  );

  const formatDate = (iso) =>
    new Date(iso).toLocaleString("en-IN", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

  const riskColor = (risk) =>
    risk === "High"
      ? "text-rose-400"
      : risk === "Medium"
      ? "text-amber-300"
      : "text-emerald-300";

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
                  Assessment history
                </h1>
                <p className="mt-1 text-sm text-slate-400">
                  Review previous assessments and open detailed results.
                </p>
              </div>
              <Button onClick={() => navigate("/assessments/new")}>
                New assessment
              </Button>
            </header>

            <Card>
              {assessments.length === 0 ? (
                <p className="text-sm text-slate-400">
                  No assessments yet. Start by running a new assessment.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-emerald-900/60 text-xs uppercase tracking-wide text-slate-400">
                        <th className="py-2 pr-4">Date</th>
                        <th className="py-2 pr-4">Score</th>
                        <th className="py-2 pr-4">Risk level</th>
                        <th className="py-2 pr-4">Status</th>
                        <th className="py-2 pr-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {assessments.map((a) => (
                        <tr
                          key={a.id}
                          className="border-b border-emerald-900/40 last:border-0"
                        >
                          <td className="py-2 pr-4 text-slate-100">
                            {formatDate(a.date)}
                          </td>
                          <td className="py-2 pr-4 text-slate-100">
                            {a.score}
                          </td>
                          <td className={`py-2 pr-4 font-medium ${riskColor(a.risk)}`}>
                            {a.risk}
                          </td>
                          <td className="py-2 pr-4 text-slate-300">
                            {a.status}
                          </td>
                          <td className="py-2 pr-0 text-right">
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => navigate(`/results/${a.id}`)}
                            >
                              View
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default HistoryPage;
