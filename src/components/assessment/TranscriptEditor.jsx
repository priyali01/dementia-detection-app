import PropTypes from 'prop-types';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const QuickStats = ({ stats }) => {
  const getTrendIcon = (trend) => {
    if (trend > 0) return <TrendingUp size={20} className="text-green-600" />;
    if (trend < 0) return <TrendingDown size={20} className="text-red-600" />;
    return <Minus size={20} className="text-gray-600" />;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-lg md:rounded-xl shadow-md p-4 md:p-6 hover:shadow-lg transition-shadow duration-300"
        >
          <div className="flex items-start justify-between mb-3">
            <div className={`
              w-12 h-12 md:w-14 md:h-14 rounded-lg flex items-center justify-center
              ${stat.bgColor}
            `}>
              <span className="text-2xl">{stat.icon}</span>
            </div>
            {stat.trend !== undefined && (
              <div className="flex items-center gap-1">
                {getTrendIcon(stat.trend)}
                <span className={`
                  text-xs md:text-sm font-semibold
                  ${stat.trend > 0 ? 'text-green-600' : stat.trend < 0 ? 'text-red-600' : 'text-gray-600'}
                `}>
                  {stat.trend > 0 && '+'}
                  {stat.trend}%
                </span>
              </div>
            )}
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
            {stat.value}
          </h3>
          <p className="text-sm md:text-base text-gray-600">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
};

QuickStats.propTypes = {
  stats: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    label: PropTypes.string.isRequired,
    bgColor: PropTypes.string.isRequired,
    trend: PropTypes.number
  })).isRequired
};

export default QuickStats;