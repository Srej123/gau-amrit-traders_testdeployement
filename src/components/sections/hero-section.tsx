"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Phone, ShoppingBag, ChevronDown } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-saffron-900 via-saffron-800 to-saffron-700 animate-gradient" />
      <div className="absolute inset-0 bg-pattern-om opacity-30" />

      {/* Decorative circles */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-saffron-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cow-green/10 rounded-full blur-3xl" />

      {/* Content */}
      <div className={`relative z-10 text-center px-4 max-w-5xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Om symbol */}
        <div className="text-6xl md:text-8xl mb-6 opacity-80">🙏</div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
          {SITE_CONFIG.name}
        </h1>

        <div className="w-24 h-1 bg-saffron-300 mx-auto mb-6 rounded-full" />

        <p className="text-xl md:text-3xl text-saffron-100 mb-3 font-light">
          {SITE_CONFIG.tagline}
        </p>

        <p className="text-base md:text-lg text-saffron-200/80 mb-10 max-w-2xl mx-auto">
          Premium A2 Cow Ghee, Fresh A2 Milk, Panchagavya Products & Pooja Items — Sourced directly from our Gaushala with love and tradition.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="xl"
            className="bg-white text-saffron-800 hover:bg-saffron-50 font-semibold shadow-lg min-w-[200px]"
            onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <ShoppingBag className="mr-2 h-5 w-5" />
            View Products
          </Button>
          <Button
            size="xl"
            variant="outline"
            className="border-white/40 text-white hover:bg-white/10 min-w-[200px]"
            onClick={() => window.open(`https://wa.me/${SITE_CONFIG.whatsapp}`, '_blank')}
          >
            <Phone className="mr-2 h-5 w-5" />
            Order on WhatsApp
          </Button>
        </div>

        {/* Trust badges */}
        <div className="mt-12 flex flex-wrap justify-center gap-6 text-saffron-200/70 text-sm">
          <span className="flex items-center gap-2">🥛 Bilona Method</span>
          <span className="flex items-center gap-2">🔬 Lab Tested</span>
          <span className="flex items-center gap-2">🐄 Farm Fresh</span>
          <span className="flex items-center gap-2">🌿 100% Natural</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white/90 transition-colors animate-bounce"
      >
        <ChevronDown className="h-8 w-8" />
      </button>
    </section>
  );
}
