import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid } from "recharts";
import { motion } from "framer-motion";
import { Brain, HeartPulse, Activity, FileText, TrendingUp, Calendar } from "lucide-react";

const cognitiveTrendData = [
  { month: "Jan", score: 78 },
  { month: "Feb", score: 75 },
  { month: "Mar", score: 72 },
  { month: "Apr", score: 70 },
  { month: "May", score: 68 },
  { month: "Jun", score: 65 },
];

const assessmentData = [
  { name: "Memory", value: 65 },
  { name: "Attention", value: 72 },
  { name: "Language", value: 60 },
  { name: "Executive", value: 58 },
];

// Animation variants for staggered entrance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const StatCard = ({ icon: Icon, title, value, subtitle, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ y: -4, transition: { duration: 0.2 } }}
  >
    <Card className="rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 ease-out border-2 border-emerald-100 bg-gradient-to-br from-white to-emerald-50/30 cursor-pointer group">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold text-emerald-900 transition-colors duration-200 group-hover:text-emerald-700">{title}</CardTitle>
          <motion.div
            className="p-3 bg-emerald-100 rounded-2xl transition-colors duration-300 group-hover:bg-emerald-200"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.2 }}
          >
            <Icon className="w-7 h-7 text-emerald-600" />
          </motion.div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-4xl font-bold text-emerald-800 mb-2 transition-transform duration-200 group-hover:scale-105">{value}</p>
        <p className="text-xs text-emerald-600 font-medium">{subtitle}</p>
      </CardContent>
    </Card>
  </motion.div>
);

export default function PatientDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50/50 p-4 md:p-6">
      {/* Header with smooth slide-in */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mb-6"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-emerald-900 mb-1">
          Health Dashboard
        </h1>
        <p className="text-base text-emerald-700">Welcome back! Here's your health overview</p>
      </motion.div>

      {/* Top Summary Cards with staggered animation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          icon={Brain}
          title="Cognitive Score"
          value="65"
          subtitle="Moderate decline"
          delay={0.1}
        />
        <StatCard
          icon={HeartPulse}
          title="Heart Rate"
          value="74 bpm"
          subtitle="Normal range"
          delay={0.2}
        />
        <StatCard
          icon={Activity}
          title="Daily Activity"
          value="3.2 hrs"
          subtitle="Below recommended"
          delay={0.3}
        />
        <StatCard
          icon={FileText}
          title="Reports"
          value="12"
          subtitle="Last updated: 2d ago"
          delay={0.4}
        />
      </div>

      {/* Charts Section with slide-in from sides */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6"
      >
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
        >
          <Card className="rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-out border-2 border-emerald-100 overflow-hidden cursor-pointer">
            <CardHeader className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white pb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                <CardTitle className="text-lg font-bold">Cognitive Trend</CardTitle>
              </div>
              <p className="text-emerald-100 text-sm mt-1">6-month progress overview</p>
            </CardHeader>
            <CardContent className="pt-4 pb-4">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={cognitiveTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 12, fill: '#047857' }}
                      stroke="#10b981"
                    />
                    <YAxis
                      tick={{ fontSize: 14, fill: '#047857' }}
                      stroke="#10b981"
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#ecfdf5',
                        border: '2px solid #10b981',
                        borderRadius: '12px',
                        fontSize: '14px',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#059669"
                      strokeWidth={3}
                      dot={{ fill: '#047857', r: 5 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          variants={itemVariants}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
        >
          <Card className="rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-out border-2 border-emerald-100 overflow-hidden cursor-pointer">
            <CardHeader className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white pb-3">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                <CardTitle className="text-lg font-bold">Assessment Breakdown</CardTitle>
              </div>
              <p className="text-emerald-100 text-sm mt-1">Performance by category</p>
            </CardHeader>
            <CardContent className="pt-4 pb-4">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={assessmentData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 12, fill: '#047857' }}
                      stroke="#10b981"
                    />
                    <YAxis
                      tick={{ fontSize: 14, fill: '#047857' }}
                      stroke="#10b981"
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#ecfdf5',
                        border: '2px solid #10b981',
                        borderRadius: '12px',
                        fontSize: '14px',
                      }}
                    />
                    <Bar
                      dataKey="value"
                      fill="#10b981"
                      radius={[8, 8, 0, 0]}
                      animationDuration={1000}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Action Section with fade-in */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <Card className="rounded-2xl shadow-lg border-2 border-emerald-200 bg-gradient-to-r from-emerald-50 to-white">
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-emerald-100 rounded-xl">
                  <Calendar className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-emerald-900 mb-1">Next Steps</h2>
                  <p className="text-sm text-emerald-700">
                    Review your trends and schedule your next assessment
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    variant="outline"
                    className="text-sm px-4 py-2 rounded-xl border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 font-semibold transition-all duration-200 ease-out w-full"
                  >
                    View Full Report
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    className="text-sm px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold shadow-lg transition-all duration-200 ease-out hover:shadow-xl w-full"
                  >
                    Schedule Assessment
                  </Button>
                </motion.div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}