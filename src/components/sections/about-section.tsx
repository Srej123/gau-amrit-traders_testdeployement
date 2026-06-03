"use client";

import { SITE_CONFIG } from "@/lib/constants";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image side */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-saffron-100 to-saffron-50 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="text-8xl mb-4">🐄</div>
                <h3 className="text-2xl font-bold text-saffron-800">Our Gaushala</h3>
                <p className="text-saffron-600 mt-2">Where tradition meets purity</p>
              </div>
            </div>
            {/* Decorative badge */}
            <div className="absolute -bottom-4 -right-4 bg-cow-green text-white px-6 py-3 rounded-xl shadow-lg">
              <p className="font-bold text-lg">Est. 2020</p>
              <p className="text-sm opacity-90">Trusted & Pure</p>
            </div>
          </div>

          {/* Content side */}
          <div>
            <span className="text-saffron-600 font-semibold text-sm uppercase tracking-wider">About Us</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-6">
              Nurturing Tradition, Delivering Purity
            </h2>
            <div className="w-16 h-1 bg-saffron-500 rounded-full mb-6" />

            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              <strong className="text-gray-800">{SITE_CONFIG.name}</strong> is dedicated to providing the purest cow products sourced directly from our own Gaushala. We believe in the ancient Vedic tradition where every product from the cow is sacred and beneficial.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              Our A2 Ghee is made using the traditional Bilona method — milk is turned into curd, then hand-churned to extract butter, which is then slowly heated to produce golden, aromatic ghee. No shortcuts, no chemicals, no compromise on quality.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-saffron-50 p-4 rounded-xl">
                <p className="text-3xl font-bold text-saffron-700">500+</p>
                <p className="text-saffron-600 text-sm">Happy Families</p>
              </div>
              <div className="bg-green-50 p-4 rounded-xl">
                <p className="text-3xl font-bold text-cow-green">100%</p>
                <p className="text-green-600 text-sm">Pure & Natural</p>
              </div>
              <div className="bg-amber-50 p-4 rounded-xl">
                <p className="text-3xl font-bold text-amber-700">A2</p>
                <p className="text-amber-600 text-sm">Desi Cow Products</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-xl">
                <p className="text-3xl font-bold text-orange-700">Vedic</p>
                <p className="text-orange-600 text-sm">Bilona Method</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
