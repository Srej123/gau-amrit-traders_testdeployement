"use client";

import { SITE_CONFIG } from "@/lib/constants";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=Hi, I'm interested in Gau Amrit Traders products`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg whatsapp-pulse hover:bg-green-600 transition-colors"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-7 w-7 fill-white" />
    </a>
  );
}
