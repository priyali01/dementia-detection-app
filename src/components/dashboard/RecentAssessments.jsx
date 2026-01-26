import PropTypes from "prop-types";
import { Clock, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const RecentAssessments = ({ assessments = [] }) => {
  const getStatusBadge = (status) => {
    const configs = {
      completed: {
        bg: "bg-green-100",
        text: "text-green-800",
        label: "Completed",
      },
      processing: {
        bg: "bg-blue-100",
        text: "text-blue-800",
        label: "Processing",
      },
      failed: {
        bg: "bg-red-100",
        text: "text-red-800",
        label: "Failed",
      },
    };
    return configs[status] || configs.completed;
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 md:p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">
          Recent Assessments
        </h2>

        <Link
          to="/history"
          className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
        >
          View All
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="space-y-3">
        {assessments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No assessments yet</p>
            <Link
              to="/assessment/new"
              className="text-blue-600 hover:underline mt-2 inline-block"
            >
              Take your first assessment
            </Link>
          </div>
        ) : (
          assessments.map((assessment) => {
            const statusBadge = getStatusBadge(assessment.status);

            return (
              <Link
                key={assessment.id}
                to={`/results/${assessment.id}`}
                className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-900">
                    {assessment.type}
                  </span>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${statusBadge.bg} ${statusBadge.text}`}
                  >
                    {statusBadge.label}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>
                      {new Date(assessment.date).toLocaleDateString()}
                    </span>
                  </div>

                  {assessment.score !== undefined && assessment.score !== null && (
                    <span
                      className={`text-xl font-bold ${getScoreColor(
                        assessment.score
                      )}`}
                    >
                      {assessment.score}%
                    </span>
                  )}
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

RecentAssessments.propTypes = {
  assessments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      score: PropTypes.number,
    })
  ),
};

export default RecentAssessments;
