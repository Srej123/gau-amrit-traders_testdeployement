"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CATEGORY_MAP, CATEGORY_SLUGS } from "@/lib/constants";
import { ShoppingBag, Play } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: string;
  originalPrice: string;
  category: string;
  images: string;
  videoUrl: string;
  features: string;
  specs: string;
  warranty: string;
  active: boolean;
}

function ProductCard({ product }: { product: Product }) {
  const images: string[] = JSON.parse(product.images || '[]');
  const features: string[] = JSON.parse(product.features || '[]');
  const [currentImage, setCurrentImage] = useState(0);

  const getImageUrl = (img: string) => {
    if (!img) return '';
    if (img.startsWith('http')) return img;
    return img;
  };

  const displayImage = images.length > 0 ? getImageUrl(images[currentImage]) : '';

  return (
    <Card className="product-card overflow-hidden border-saffron-100 group">
      {/* Image section */}
      <div className="relative aspect-square bg-saffron-50 overflow-hidden">
        {displayImage ? (
          <img
            src={displayImage}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl">
            {product.category === 'ghee' ? '🥛' :
             product.category === 'milk' ? '🥛' :
             product.category === 'dairy' ? '🧀' :
             product.category === 'pooja-items' ? '🪔' :
             '🐄'}
          </div>
        )}

        {/* Image navigation */}
        {images.length > 1 && (
          <div className="absolute inset-x-0 bottom-2 flex justify-center gap-1">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImage(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentImage ? 'bg-white w-6' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-saffron-500 text-white text-xs font-medium px-3 py-1 rounded-full">
            {CATEGORY_MAP[product.category] || product.category}
          </span>
        </div>

        {/* Video badge */}
        {product.videoUrl && (
          <a
            href={product.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
          >
            <Play className="h-3 w-3 fill-white" />
          </a>
        )}

        {/* Discount badge */}
        {product.originalPrice && (
          <div className="absolute bottom-3 left-3">
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              {Math.round((1 - parseFloat(product.price.replace(/[^0-9.]/g, '')) / parseFloat(product.originalPrice.replace(/[^0-9.]/g, ''))) * 100)}% OFF
            </span>
          </div>
        )}
      </div>

      {/* Content section */}
      <CardContent className="p-4">
        <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-1">{product.name}</h3>

        <p className="text-gray-500 text-sm mb-3 line-clamp-2">{product.description}</p>

        {/* Features */}
        {features.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {features.slice(0, 3).map((f, i) => (
              <span key={i} className="text-xs bg-saffron-50 text-saffron-700 px-2 py-0.5 rounded-full">
                {f}
              </span>
            ))}
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl font-bold text-saffron-700">₹{product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <Button
            className="flex-1 bg-saffron-500 hover:bg-saffron-600 text-white"
            size="sm"
            onClick={() => window.open(`https://wa.me/${SITE_CONFIG.whatsapp}?text=Hi, I'm interested in ${product.name} (₹${product.price})`, '_blank')}
          >
            <ShoppingBag className="mr-1 h-4 w-4" />
            Order Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ProductsSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading products:', err);
        setLoading(false);
      });
  }, []);

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <section id="products" className="py-20 bg-saffron-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="text-saffron-600 font-semibold text-sm uppercase tracking-wider">Our Products</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
            Pure Cow Products Collection
          </h2>
          <div className="w-16 h-1 bg-saffron-500 rounded-full mx-auto mb-4" />
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our range of authentic A2 cow products, pooja items, and natural remedies — all made with love and tradition.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === 'all'
                ? 'bg-saffron-500 text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-saffron-50 border border-saffron-100'
            }`}
          >
            All Products
          </button>
          {CATEGORY_SLUGS.map(slug => (
            <button
              key={slug}
              onClick={() => setActiveCategory(slug)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === slug
                  ? 'bg-saffron-500 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-saffron-50 border border-saffron-100'
              }`}
            >
              {CATEGORY_MAP[slug]}
            </button>
          ))}
        </div>

        {/* Products grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="animate-pulse">
                <div className="bg-saffron-100 rounded-lg aspect-square" />
                <div className="mt-4 space-y-2">
                  <div className="h-4 bg-saffron-100 rounded w-3/4" />
                  <div className="h-4 bg-saffron-100 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-6xl mb-4">📦</p>
            <p className="text-lg">No products found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
