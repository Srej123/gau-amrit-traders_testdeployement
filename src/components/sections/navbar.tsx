"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Phone, Menu, X } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#products", label: "Products" },
  { href: "#why-us", label: "Why Us" },
  { href: "#testimonials", label: "Reviews" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled
        ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-saffron-100'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <span className="text-2xl">🐄</span>
            <span className={`font-bold text-lg md:text-xl transition-colors ${
              isScrolled ? 'text-saffron-800' : 'text-white'
            }`}>
              {SITE_CONFIG.name}
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isScrolled
                    ? 'text-gray-600 hover:text-saffron-600 hover:bg-saffron-50'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </a>
            ))}
            <Button
              size="sm"
              className="ml-2 bg-saffron-500 hover:bg-saffron-600 text-white"
              onClick={() => window.open(`https://wa.me/${SITE_CONFIG.whatsapp}`, '_blank')}
            >
              <Phone className="mr-1 h-4 w-4" />
              Order Now
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className={`h-6 w-6 ${isScrolled ? 'text-gray-900' : 'text-white'}`} />
            ) : (
              <Menu className={`h-6 w-6 ${isScrolled ? 'text-gray-900' : 'text-white'}`} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-saffron-100 shadow-lg">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="block px-4 py-3 text-gray-700 hover:bg-saffron-50 hover:text-saffron-700 rounded-lg font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Button
              className="w-full mt-2 bg-saffron-500 hover:bg-saffron-600 text-white"
              onClick={() => {
                window.open(`https://wa.me/${SITE_CONFIG.whatsapp}`, '_blank');
                setIsMobileMenuOpen(false);
              }}
            >
              <Phone className="mr-2 h-4 w-4" />
              Order on WhatsApp
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
