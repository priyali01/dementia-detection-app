import PropTypes from 'prop-types';
import { Check } from 'lucide-react';

const ProgressIndicator = ({ currentStep, steps }) => {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6 md:py-8">
      {/* Mobile: Vertical */}
      <div className="md:hidden space-y-4">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          
          return (
            <div key={index} className="flex items-center gap-4">
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
                ${isCompleted ? 'bg-green-600' : isCurrent ? 'bg-blue-600' : 'bg-gray-200'}
                transition-all duration-300
              `}>
                {isCompleted ? (
                  <Check size={20} className="text-white" />
                ) : (
                  <span className={`font-bold ${isCurrent ? 'text-white' : 'text-gray-600'}`}>
                    {stepNumber}
                  </span>
                )}
              </div>
              <div className="flex-1">
                <p className={`font-semibold ${isCurrent ? 'text-blue-600' : 'text-gray-600'}`}>
                  {step}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Desktop: Horizontal */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isCurrent = stepNumber === currentStep;
            const isLast = index === steps.length - 1;
            
            return (
              <div key={index} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center
                    ${isCompleted ? 'bg-green-600' : isCurrent ? 'bg-blue-600' : 'bg-gray-200'}
                    transition-all duration-300
                  `}>
                    {isCompleted ? (
                      <Check size={24} className="text-white" />
                    ) : (
                      <span className={`text-lg font-bold ${isCurrent ? 'text-white' : 'text-gray-600'}`}>
                        {stepNumber}
                      </span>
                    )}
                  </div>
                  <p className={`
                    mt-2 text-sm font-semibold text-center
                    ${isCurrent ? 'text-blue-600' : 'text-gray-600'}
                  `}>
                    {step}
                  </p>
                </div>
                
                {!isLast && (
                  <div className={`
                    h-1 flex-1 mx-4 rounded
                    ${isCompleted ? 'bg-green-600' : 'bg-gray-200'}
                    transition-all duration-300
                  `} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

ProgressIndicator.propTypes = {
  currentStep: PropTypes.number.isRequired,
  steps: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default ProgressIndicator;