// src/pages/Dashboard.jsx
import Header from "../components/layout/Header.jsx";
import Footer from "../components/layout/Footer.jsx";
import Sidebar from "../components/layout/Sidebar.jsx";
import QuickStats from "../components/dashboard/QuickStats.jsx";
import ProgressChart from "../components/dashboard/ProgressChart.jsx";
import RecentAssessments from "../components/dashboard/RecentAssessments.jsx";
import { useAuth } from "../hooks/useAuth";

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      icon: "🧠",
      value: 12,
      label: "Total assessments",
      bgColor: "bg-emerald-100",
      trend: 8,
    },
    {
      icon: "📅",
      value: 3,
      label: "This week",
      bgColor: "bg-blue-100",
      trend: 5,
    },
    {
      icon: "⚠️",
      value: 1,
      label: "High‑risk flagged",
      bgColor: "bg-rose-100",
      trend: 0,
    },
  ];

  const trendData = [
    { date: "Week 1", score: 42 },
    { date: "Week 2", score: 55 },
    { date: "Week 3", score: 63 },
    { date: "Week 4", score: 72 },
  ];

  const recentAssessments = [
    {
      id: "1",
      patient: "Demo Patient",
      date: "2026-01-20",
      score: 65,
      risk: "Medium",
      status: "Completed",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-50">
      <Header />

      <div className="flex flex-1">
        <aside className="hidden w-60 border-r border-emerald-900/60 bg-slate-950/80 lg:block">
          <Sidebar />
        </aside>

        <main className="flex-1 px-4 py-4 sm:px-6 lg:px-8">
          <section className="mb-6">
            <h1 className="text-2xl font-semibold text-emerald-50 md:text-3xl">
              Welcome back, {user?.firstName || "User"}
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Review recent assessments and track changes over time.
            </p>
          </section>

          <section className="space-y-6">
            <QuickStats stats={stats} />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <ProgressChart data={trendData} />
              </div>
              <div className="lg:col-span-1">
                <RecentAssessments items={recentAssessments} />
              </div>
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
