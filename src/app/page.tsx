"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/sections/navbar";
import HeroSection from "@/components/sections/hero-section";
import AboutSection from "@/components/sections/about-section";
import ProductsSection from "@/components/sections/products-section";
import WhyChooseUsSection from "@/components/sections/why-choose-section";
import TestimonialsSection from "@/components/sections/testimonials-section";
import ContactSection from "@/components/sections/contact-section";
import Footer from "@/components/sections/footer";
import WhatsAppButton from "@/components/sections/whatsapp-button";
import AdminPanel from "@/components/admin/admin-panel";
import { Toaster } from "@/components/ui/toaster";
import JsonLd from "@/components/json-ld";
import { SITE_CONFIG } from "@/lib/constants";

export default function Home() {
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    // Check URL for admin key
    const params = new URLSearchParams(window.location.search);
    if (params.get('key') === SITE_CONFIG.adminKey) {
      setShowAdmin(true);
    }
  }, []);

  return (
    <main className="min-h-screen flex flex-col">
      <JsonLd />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProductsSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
      <Toaster />
      {showAdmin && <AdminPanel onClose={() => setShowAdmin(false)} />}
    </main>
  );
}
