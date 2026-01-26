// src/pages/HistoryPage.jsx
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
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
      ? "text-red-600"
      : risk === "Medium"
      ? "text-amber-600"
      : "text-emerald-600";

  return (
    <div className="min-h-screen bg-white text-gray-900 px-4 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <header className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold md:text-3xl">
              Assessment history
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Review previous assessments and open detailed results.
            </p>
          </div>

          <Button onClick={() => navigate("/assessments/new")}>
            New assessment
          </Button>
        </header>

        <Card>
          {assessments.length === 0 ? (
            <p className="text-sm text-gray-500">
              No assessments yet. Start by running a new assessment.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-xs uppercase tracking-wide text-gray-500">
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
                      className="border-b border-gray-100 last:border-0"
                    >
                      <td className="py-2 pr-4 text-gray-900">
                        {formatDate(a.date)}
                      </td>
                      <td className="py-2 pr-4 text-gray-900">{a.score}</td>
                      <td className={`py-2 pr-4 font-medium ${riskColor(a.risk)}`}>
                        {a.risk}
                      </td>
                      <td className="py-2 pr-4 text-gray-600">{a.status}</td>
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
    </div>
  );
};

export default HistoryPage;
