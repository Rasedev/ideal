// components/Testimonials/TestimonialsSection.jsx
import React, { useState, useEffect } from 'react';

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('/api/testimonials');
      const data = await response.json();
      setTestimonials(data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      setTestimonials([
        {
          id: 1,
          content: "These are many variations of passages of seven from an article, but the majority have suffered",
          author: "AIMADEL GORT",
          position: "Client"
        }
      ]);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Clients Say.
          </h2>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="text-center">
              <p className="text-xl md:text-2xl leading-relaxed mb-6 italic">
                "{testimonial.content}"
              </p>
              <div className="font-semibold">
                <div className="text-lg">{testimonial.author}</div>
                <div className="text-blue-200">{testimonial.position}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;