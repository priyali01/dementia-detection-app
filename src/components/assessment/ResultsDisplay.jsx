import PropTypes from 'prop-types';
import { Download, Share2, Calendar } from 'lucide-react';
import Button from '../common/Button';
import Card from '../common/Card';

const ResultsDisplay = ({ results }) => {
  const getRiskColor = (score) => {
    if (score < 30) return 'text-green-600';
    if (score < 70) return 'text-yellow-600';
    return 'text-red-600';
  };
  
  const getRiskBgColor = (score) => {
    if (score < 30) return 'bg-green-100';
    if (score < 70) return 'bg-yellow-100';
    return 'bg-red-100';
  };
  
  const getRiskLevel = (score) => {
    if (score < 30) return 'Low Risk';
    if (score < 70) return 'Medium Risk';
    return 'High Risk';
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Risk Gauge */}
      <Card>
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Assessment Results
          </h2>
          <p className="text-sm md:text-base text-gray-600">
            {new Date(results.date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
        
        {/* Score Gauge */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-full max-w-md h-40 md:h-48">
            <svg viewBox="0 0 200 100" className="w-full">
              {/* Background Arc */}
              <path
                d="M 10 100 A 90 90 0 0 1 190 100"
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="20"
                strokeLinecap="round"
              />
              {/* Score Arc */}
              <path
                d="M 10 100 A 90 90 0 0 1 190 100"
                fill="none"
                stroke={results.score < 30 ? '#22C55E' : results.score < 70 ? '#F59E0B' : '#EF4444'}
                strokeWidth="20"
                strokeLinecap="round"
                strokeDasharray={`${(results.score / 100) * 283} 283`}
                style={{ transition: 'stroke-dasharray 1s ease-in-out' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className={`text-5xl md:text-6xl font-bold ${getRiskColor(results.score)}`}>
                {results.score}
              </div>
              <div className="text-sm md:text-base text-gray-600">out of 100</div>
            </div>
          </div>
          
          <div className={`
            inline-flex items-center gap-2 px-6 py-3 rounded-full text-lg md:text-xl font-bold mt-4
            ${getRiskBgColor(results.score)} ${getRiskColor(results.score)}
          `}>
            {results.score < 30 && '🟢'}
            {results.score >= 30 && results.score < 70 && '🟡'}
            {results.score >= 70 && '🔴'}
            <span>{getRiskLevel(results.score)}</span>
          </div>
          
          <p className="text-xs md:text-sm text-gray-600 mt-2">
            Confidence: {results.confidence}%
          </p>
        </div>
        
        {/* Explanation */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 md:p-6">
          <h3 className="font-bold text-blue-900 mb-2 text-base md:text-lg">
            What This Means:
          </h3>
          <p className="text-sm md:text-base text-blue-800 leading-relaxed">
            {results.explanation}
          </p>
        </div>
      </Card>
      
      {/* Detailed Breakdown */}
      <Card title="Detailed Breakdown">
        <div className="space-y-4">
          {results.breakdown.map((item, index) => (
            <div key={index}>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-sm md:text-base text-gray-700">
                  {item.category}
                </span>
                <span className="font-bold text-sm md:text-base text-gray-900">
                  {item.score}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-3 rounded-full transition-all duration-1000 ${
                    item.score < 50 ? 'bg-red-500' : item.score < 75 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${item.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
      
      {/* Key Findings */}
      <Card title="Key Findings">
        <div className="space-y-3">
          {results.findings.map((finding, index) => (
            <div key={index} className="flex items-start gap-3 text-sm md:text-base">
              <span className="flex-shrink-0 mt-1">
                {finding.type === 'positive' && '✓'}
                {finding.type === 'warning' && '⚠️'}
                {finding.type === 'info' && 'ℹ️'}
              </span>
              <p className="text-gray-700">{finding.text}</p>
            </div>
          ))}
        </div>
      </Card>
      
      {/* Recommendations */}
      <Card title="Recommendations">
        <ul className="space-y-3">
          {results.recommendations.map((rec, index) => (
            <li key={index} className="flex items-start gap-3 text-sm md:text-base">
              <span className="text-blue-600 flex-shrink-0 mt-1">•</span>
              <p className="text-gray-700">{rec}</p>
            </li>
          ))}
        </ul>
      </Card>
      
      {/* Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
        <Button
          variant="primary"
          size="lg"
          icon={<Download size={20} />}
          fullWidth
        >
          Download PDF
        </Button>
        <Button
          variant="outline"
          size="lg"
          icon={<Share2 size={20} />}
          fullWidth
        >
          Share with Doctor
        </Button>
        <Button
          variant="secondary"
          size="lg"
          icon={<Calendar size={20} />}
          fullWidth
        >
          Schedule Appointment
        </Button>
      </div>
    </div>
  );
};

ResultsDisplay.propTypes = {
  results: PropTypes.shape({
    date: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    confidence: PropTypes.number.isRequired,
    explanation: PropTypes.string.isRequired,
    breakdown: PropTypes.arrayOf(PropTypes.shape({
      category: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired
    })).isRequired,
    findings: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.oneOf(['positive', 'warning', 'info']).isRequired,
      text: PropTypes.string.isRequired
    })).isRequired,
    recommendations: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired
};

export default ResultsDisplay;