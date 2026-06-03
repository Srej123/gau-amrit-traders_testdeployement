"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock, Star, Navigation, ExternalLink, MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

interface Store {
  id: string;
  name: string;
  phone: string;
  address: string;
  googleMapUrl: string;
  googleReviewUrl: string;
  hours: string;
  isVerified: boolean;
}

export default function ContactSection() {
  const [stores, setStores] = useState<Store[]>([]);
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/stores').then(r => r.json()),
      fetch('/api/settings').then(r => r.json()),
    ])
      .then(([storesData, settingsData]) => {
        setStores(storesData);
        setSettings(settingsData);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const phone = settings.phone || SITE_CONFIG.phone;
  const whatsapp = settings.whatsapp || SITE_CONFIG.whatsapp;
  const email = settings.email || SITE_CONFIG.email;
  const address = settings.address || SITE_CONFIG.address;

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <span className="text-saffron-600 font-semibold text-sm uppercase tracking-wider">Contact Us</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
            Get In Touch
          </h2>
          <div className="w-16 h-1 bg-saffron-500 rounded-full mx-auto mb-4" />
          <p className="text-gray-600 max-w-2xl mx-auto">
            Visit our store, call us, or message us on WhatsApp for orders and inquiries.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Contact info */}
          <div className="space-y-6">
            {/* Phone */}
            <Card className="border-saffron-100">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="w-12 h-12 bg-saffron-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="h-6 w-6 text-saffron-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Call Us</h3>
                  <a href={`tel:${phone}`} className="text-saffron-600 hover:text-saffron-700 text-lg font-medium">
                    {phone}
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* WhatsApp */}
            <Card className="border-green-100 bg-green-50/50">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">WhatsApp</h3>
                  <a
                    href={`https://wa.me/${whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:text-green-700 text-lg font-medium"
                  >
                    Chat on WhatsApp
                  </a>
                  <p className="text-gray-500 text-sm mt-1">Quick response • Easy ordering</p>
                </div>
              </CardContent>
            </Card>

            {/* Address */}
            <Card className="border-saffron-100">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="w-12 h-12 bg-saffron-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-saffron-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Visit Us</h3>
                  <p className="text-gray-600">{address}</p>
                </div>
              </CardContent>
            </Card>

            {/* Email */}
            <Card className="border-saffron-100">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="w-12 h-12 bg-saffron-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <ExternalLink className="h-6 w-6 text-saffron-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                  <a href={`mailto:${email}`} className="text-saffron-600 hover:text-saffron-700">
                    {email}
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stores / Map area */}
          <div className="space-y-4">
            {loading ? (
              <div className="animate-pulse space-y-4">
                {[1, 2].map(i => (
                  <div key={i} className="h-32 bg-saffron-100 rounded-xl" />
                ))}
              </div>
            ) : stores.length > 0 ? (
              stores.map(store => (
                <Card key={store.id} className="border-saffron-100 overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">{store.name}</h3>
                        {store.isVerified && (
                          <span className="inline-flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full mt-1">
                            <Star className="h-3 w-3 fill-green-600" /> Verified
                          </span>
                        )}
                      </div>
                      {store.googleMapUrl && (
                        <a
                          href={store.googleMapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-saffron-600 hover:text-saffron-700"
                        >
                          <Navigation className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{store.address}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Phone className="h-3.5 w-3.5" /> {store.phone}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" /> {store.hours}
                      </span>
                    </div>
                    {store.googleReviewUrl && (
                      <a
                        href={store.googleReviewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-saffron-600 hover:text-saffron-700 mt-2"
                      >
                        <Star className="h-4 w-4" /> Leave a Google Review
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="border-saffron-100">
                <CardContent className="p-8 text-center text-gray-500">
                  <MapPin className="h-12 w-12 mx-auto mb-3 text-saffron-300" />
                  <p>Store information coming soon!</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
