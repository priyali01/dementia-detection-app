import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'How accurate is the AI detection?',
      answer: 'Our AI model has been trained on thousands of speech samples and achieves over 95% accuracy in detecting early cognitive markers. However, this is a screening tool and should not replace professional medical diagnosis.'
    },
    {
      question: 'Is my data secure and private?',
      answer: 'Absolutely. We use end-to-end encryption, are HIPAA and GDPR compliant, and never share your data without explicit consent. All audio files are encrypted and stored securely with enterprise-grade protection.'
    },
    {
      question: 'How long does the assessment take?',
      answer: 'The recording itself takes 2-5 minutes, and the AI analysis is completed in under 5 minutes. You can have complete results in less than 10 minutes total.'
    },
    {
      question: 'Do I need special equipment?',
      answer: 'No special equipment needed! You can use your smartphone, tablet, or computer with a built-in microphone. The platform works on any modern device with internet access.'
    },
    {
      question: 'Can I share results with my doctor?',
      answer: 'Yes! You can download a comprehensive PDF report or share a secure link directly with your healthcare provider. The report includes all analysis details and historical trends.'
    },
    {
      question: 'What if I need help using the platform?',
      answer: 'We offer voice-guided instructions, video tutorials, and 24/7 customer support. The interface is designed to be elderly-friendly with large buttons and simple navigation.'
    },
    {
      question: 'How often should I take assessments?',
      answer: 'We recommend monthly assessments for tracking changes over time. More frequent assessments (weekly) may be beneficial if you have specific concerns or are monitoring treatment progress.'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            Everything you need to know about our platform
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-lg"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 md:px-8 py-5 md:py-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 text-base md:text-lg pr-4">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp size={24} className="text-blue-600 flex-shrink-0" />
                ) : (
                  <ChevronDown size={24} className="text-gray-400 flex-shrink-0" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="px-6 md:px-8 pb-5 md:pb-6">
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;