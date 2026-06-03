"use client";

import { SITE_CONFIG } from "@/lib/constants";
import { Phone, Mail, MapPin, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🐄</span>
              <h3 className="text-xl font-bold text-white">{SITE_CONFIG.name}</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              {SITE_CONFIG.tagline}. We bring you the purest A2 cow products sourced directly from our Gaushala with traditional Bilona method.
            </p>
            <div className="flex gap-3">
              {SITE_CONFIG.social.facebook && (
                <a href={SITE_CONFIG.social.facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-saffron-600 transition-colors text-sm">FB</a>
              )}
              {SITE_CONFIG.social.instagram && (
                <a href={SITE_CONFIG.social.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-saffron-600 transition-colors text-sm">IG</a>
              )}
              {SITE_CONFIG.social.youtube && (
                <a href={SITE_CONFIG.social.youtube} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-saffron-600 transition-colors text-sm">YT</a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#about" className="hover:text-saffron-400 transition-colors">About Us</a></li>
              <li><a href="#products" className="hover:text-saffron-400 transition-colors">Products</a></li>
              <li><a href="#why-us" className="hover:text-saffron-400 transition-colors">Why Choose Us</a></li>
              <li><a href="#testimonials" className="hover:text-saffron-400 transition-colors">Testimonials</a></li>
              <li><a href="#contact" className="hover:text-saffron-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-semibold mb-4">Products</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#products" className="hover:text-saffron-400 transition-colors">A2 Bilona Ghee</a></li>
              <li><a href="#products" className="hover:text-saffron-400 transition-colors">A2 Fresh Milk</a></li>
              <li><a href="#products" className="hover:text-saffron-400 transition-colors">A2 Paneer</a></li>
              <li><a href="#products" className="hover:text-saffron-400 transition-colors">Panchagavya Soap</a></li>
              <li><a href="#products" className="hover:text-saffron-400 transition-colors">Gomutra Ark</a></li>
              <li><a href="#products" className="hover:text-saffron-400 transition-colors">Havan Samagri</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-saffron-400 flex-shrink-0" />
                <span>{SITE_CONFIG.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-saffron-400 flex-shrink-0" />
                <a href={`tel:${SITE_CONFIG.phone}`} className="hover:text-saffron-400 transition-colors">{SITE_CONFIG.phone}</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-saffron-400 flex-shrink-0" />
                <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-saffron-400 transition-colors">{SITE_CONFIG.email}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="text-sm text-gray-500 hover:text-saffron-400 flex items-center gap-1 transition-colors"
          >
            <ArrowUp className="h-4 w-4" /> Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
