import { Shield, Zap, Users, Clock, Globe, Headphones } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Zap size={28} />,
      title: 'Easy to Use',
      description: 'Simple interface designed for all ages. Large buttons, clear instructions, and voice guidance.',
      color: 'bg-yellow-500'
    },
    {
      icon: <Shield size={28} />,
      title: 'Privacy First',
      description: 'End-to-end encryption, HIPAA compliant. Your data is secure and never shared without consent.',
      color: 'bg-blue-500'
    },
    {
      icon: <Users size={28} />,
      title: 'Accurate AI',
      description: 'Trained on thousands of samples with 95%+ accuracy. Continuously improving with research.',
      color: 'bg-green-500'
    },
    {
      icon: <Clock size={28} />,
      title: 'Fast Results',
      description: 'Get comprehensive analysis in under 5 minutes. No waiting for appointments or lab results.',
      color: 'bg-purple-500'
    },
    {
      icon: <Globe size={28} />,
      title: 'Accessible',
      description: 'Voice control, high contrast mode, screen reader support. Available in 10+ languages.',
      color: 'bg-red-500'
    },
    {
      icon: <Headphones size={28} />,
      title: 'Track Progress',
      description: 'Monitor changes over time with historical data. Share reports with healthcare providers.',
      color: 'bg-indigo-500'
    }
  ];

  return (
    <section id="features" className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Powerful Features
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need for early dementia detection in one platform
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 md:p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-14 h-14 md:w-16 md:h-16 ${feature.color} rounded-xl flex items-center justify-center text-white mb-4 shadow-lg`}>
                {feature.icon}
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;