"use client";

import { WHY_CHOOSE_US } from "@/lib/constants";

export default function WhyChooseUsSection() {
  return (
    <section id="why-us" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <span className="text-saffron-600 font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
            Why Gau Amrit Traders?
          </h2>
          <div className="w-16 h-1 bg-saffron-500 rounded-full mx-auto mb-4" />
          <p className="text-gray-600 max-w-2xl mx-auto">
            We are committed to delivering the purest and most authentic cow products, rooted in Vedic traditions and backed by modern quality standards.
          </p>
        </div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {WHY_CHOOSE_US.map((benefit, index) => (
            <div
              key={index}
              className="text-center p-8 rounded-2xl bg-gradient-to-br from-saffron-50 to-white border border-saffron-100 hover:shadow-lg hover:border-saffron-200 transition-all duration-300 group"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
              <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center bg-gradient-to-r from-saffron-500 to-saffron-600 rounded-2xl p-10 text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-3">Experience the Purity Today</h3>
          <p className="text-saffron-100 mb-6 max-w-xl mx-auto">
            Order now and taste the difference that traditional Bilona method and pure A2 milk makes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/919876543210?text=Hi, I want to order Gau Amrit products`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-white text-saffron-700 font-semibold px-8 py-3 rounded-lg hover:bg-saffron-50 transition-colors shadow-md"
            >
              💬 Order on WhatsApp
            </a>
            <a
              href="tel:+919876543210"
              className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/10 transition-colors"
            >
              📞 Call Us Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
