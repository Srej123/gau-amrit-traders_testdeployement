"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  review: string;
  image: string;
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/testimonials')
      .then(res => res.json())
      .then(data => {
        setTestimonials(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const next = useCallback(() => {
    setCurrent(prev => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    setCurrent(prev => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, testimonials.length]);

  if (loading) {
    return (
      <section className="py-20 bg-saffron-50/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse bg-white rounded-2xl p-10 max-w-3xl mx-auto">
            <div className="h-6 bg-saffron-100 rounded w-1/3 mx-auto mb-4" />
            <div className="h-4 bg-saffron-100 rounded w-2/3 mx-auto" />
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) return null;

  const t = testimonials[current];

  return (
    <section id="testimonials" className="py-20 bg-saffron-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <span className="text-saffron-600 font-semibold text-sm uppercase tracking-wider">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
            What Our Customers Say
          </h2>
          <div className="w-16 h-1 bg-saffron-500 rounded-full mx-auto" />
        </div>

        {/* Carousel */}
        <div className="max-w-3xl mx-auto relative">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-saffron-100 text-center">
            {/* Quote icon */}
            <Quote className="h-10 w-10 text-saffron-300 mx-auto mb-6" />

            {/* Stars */}
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < t.rating ? 'text-saffron-400 fill-saffron-400' : 'text-gray-200'}`}
                />
              ))}
            </div>

            {/* Review */}
            <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-8 italic">
              &ldquo;{t.review}&rdquo;
            </p>

            {/* Customer info */}
            <div className="flex items-center justify-center gap-3">
              {t.image ? (
                <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-saffron-100 flex items-center justify-center text-saffron-600 font-bold text-lg">
                  {t.name.charAt(0)}
                </div>
              )}
              <div className="text-left">
                <p className="font-semibold text-gray-900">{t.name}</p>
                <p className="text-sm text-gray-500">{t.location}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          {testimonials.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white rounded-full p-2 shadow-lg border border-saffron-100 hover:bg-saffron-50 transition-colors"
              >
                <ChevronLeft className="h-5 w-5 text-saffron-600" />
              </button>
              <button
                onClick={next}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white rounded-full p-2 shadow-lg border border-saffron-100 hover:bg-saffron-50 transition-colors"
              >
                <ChevronRight className="h-5 w-5 text-saffron-600" />
              </button>

              {/* Dots */}
              <div className="flex justify-center gap-2 mt-6">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrent(idx)}
                    className={`h-2 rounded-full transition-all ${
                      idx === current ? 'bg-saffron-500 w-8' : 'bg-saffron-200 w-2'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
