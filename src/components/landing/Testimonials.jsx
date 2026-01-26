import { Star } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Neurologist',
      image: '👩‍⚕️',
      rating: 5,
      text: 'This platform has revolutionized how we conduct early cognitive assessments. The AI analysis is remarkably accurate and saves us valuable time.'
    },
    {
      name: 'Michael Chen',
      role: 'Family Caregiver',
      image: '👨',
      rating: 5,
      text: 'Easy to use and gave us peace of mind. We caught early signs that we might have missed otherwise. Highly recommend for anyone concerned about cognitive health.'
    },
    {
      name: 'Linda Martinez',
      role: 'Patient (62 years old)',
      image: '👵',
      rating: 5,
      text: 'I was nervous about technology, but this was so simple! The voice guidance helped me through every step. Results were clear and easy to understand.'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            What People Say
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Trusted by thousands of families and healthcare professionals
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 md:p-8 shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white flex items-center justify-center text-3xl md:text-4xl shadow-md">
                  {testimonial.image}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-base md:text-lg">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <p className="text-gray-700 leading-relaxed italic">
                "{testimonial.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;