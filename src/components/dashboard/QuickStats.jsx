import PropTypes from 'prop-types';
import { TrendingUp, TrendingDown } from 'lucide-react';

const QuickStats = ({ stats }) => {
  const getChangeIcon = (change) => {
    if (change > 0) return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (change < 0) return <TrendingDown className="w-4 h-4 text-red-600" />;
    return null;
  };

  const getChangeColor = (change) => {
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-white rounded-xl p-4 md:p-6 shadow-md hover:shadow-lg transition-all border border-gray-100"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                <Icon className={`w-6 h-6 text-${stat.iconColor}-600`} />
              </div>
              {stat.change !== undefined && (
                <div className="flex items-center gap-1">
                  {getChangeIcon(stat.change)}
                  <span className={`text-sm font-semibold ${getChangeColor(stat.change)}`}>
                    {stat.change > 0 ? '+' : ''}{stat.change}%
                  </span>
                </div>
              )}
            </div>
            <p className="text-gray-600 text-sm font-medium mb-1">{stat.label}</p>
            <p className="text-2xl md:text-3xl font-bold text-gray-900">{stat.value}</p>
            {stat.subtitle && (
              <p className="text-xs md:text-sm text-gray-500 mt-2">{stat.subtitle}</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

QuickStats.propTypes = {
  stats: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    icon: PropTypes.elementType.isRequired,
    bgColor: PropTypes.string,
    iconColor: PropTypes.string,
    change: PropTypes.number,
    subtitle: PropTypes.string
  })).isRequired
};

export default QuickStats;