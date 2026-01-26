import { Mic, FileText, BarChart3 } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <Mic size={32} />,
      title: 'Record or Upload Audio',
      description: 'Simply record your voice or upload an existing audio file. Our system accepts multiple formats.',
      color: 'bg-blue-500'
    },
    {
      icon: <FileText size={32} />,
      title: 'AI Analyzes Speech Patterns',
      description: 'Our advanced AI examines speech patterns, language use, and cognitive markers automatically.',
      color: 'bg-purple-500'
    },
    {
      icon: <BarChart3 size={32} />,
      title: 'Receive Instant Results',
      description: 'Get detailed analysis with actionable insights and recommendations within minutes.',
      color: 'bg-green-500'
    }
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Get started in three simple steps. No technical knowledge required.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector Line - Desktop Only */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-20 left-1/2 w-full h-1 bg-gray-200">
                  <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2">
                    <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                  </div>
                </div>
              )}
              
              <div className="relative bg-white rounded-xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">{index + 1}</span>
                </div>
                
                {/* Icon */}
                <div className={`w-16 h-16 md:w-20 md:h-20 ${step.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg`}>
                  {step.icon}
                </div>
                
                {/* Content */}
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;