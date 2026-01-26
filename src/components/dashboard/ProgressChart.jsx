// src/components/dashboard/ProgressChart.jsx
import PropTypes from "prop-types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const ProgressChart = ({ data }) => {
  // Fallback demo data if none is passed
  const chartData =
    data && data.length
      ? data
      : [
          { date: "Week 1", score: 42 },
          { date: "Week 2", score: 55 },
          { date: "Week 3", score: 63 },
          { date: "Week 4", score: 72 },
        ];

  return (
    <div className="bg-white rounded-xl shadow-md p-4 md:p-6 h-72 md:h-80">
      <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
        Cognitive score trend
      </h2>
      <p className="text-xs md:text-sm text-gray-500 mb-4">
        Track how assessment scores change over time.
      </p>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            tickMargin={8}
            stroke="#6B7280"
          />
          <YAxis
            tick={{ fontSize: 12 }}
            tickMargin={8}
            stroke="#6B7280"
            domain={[0, 100]}
          />
          <Tooltip
            contentStyle={{ fontSize: 12 }}
            formatter={(value) => [`${value}`, "Score"]}
          />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#2563EB"
            strokeWidth={2.5}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

ProgressChart.propTypes = {
  // [{ date: '2026-01-01', score: 68 }, ...]
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired,
    })
  ),
};

export default ProgressChart;
