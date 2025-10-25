/**
 * FeaturedSection Component
 *
 * Alternating grid layout showcasing featured products and services.
 * Uses a zigzag pattern (image-content, content-image) for visual interest.
 *
 * Section Content:
 * 1. Row 1: Men's Jeans Collection
 *    - Left: Large product image
 *    - Right: Small image + product info + CTA + navigation arrows
 *
 * 2. Row 2: Gift Certificates
 *    - Left: Product info + CTA
 *    - Right: Product image
 *
 * Layout:
 * - Mobile: Stacked vertical layout
 * - Desktop: 2-column grid with alternating image/content positions
 *
 * Features:
 * - Hover effects on images (subtle zoom)
 * - Interactive navigation controls
 * - Responsive typography
 *
 * @component
 */

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ImagePlaceholder } from '../common/ImagePlaceholder';

export const FeaturedSection = () => {
  return (
    <section className="bg-white py-12 md:py-16 lg:py-20" aria-label="Featured Products">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide mb-8 md:mb-12 lg:mb-16">
          SALE / NEW
        </h2>

        {/* Row 1: Men's Collection (Image Left, Content Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
          {/* Large Product Image */}
          <div className="rounded-2xl overflow-hidden aspect-[4/5] lg:aspect-auto lg:min-h-[500px] group cursor-pointer hover-lift">
            <div className="transition-transform duration-700 ease-out group-hover:scale-105">
              <ImagePlaceholder
                width={720}
                height={900}
                label="WIREFRAME IMAGE"
                className="h-full rounded-2xl"
              />
            </div>
          </div>

          {/* Content Column */}
          <div className="flex flex-col">
            {/* Small Product Image */}
            <div className="rounded-2xl overflow-hidden aspect-[16/9] mb-6 md:mb-8 group cursor-pointer hover-lift">
              <div className="transition-transform duration-700 ease-out group-hover:scale-105">
                <ImagePlaceholder
                  width={720}
                  height={405}
                  label="WIREFRAME IMAGE"
                  className="h-full rounded-2xl"
                />
              </div>
            </div>

            {/* Product Info & CTA */}
            <div className="flex-1 flex flex-col justify-center py-4">
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-light mb-4 md:mb-6 tracking-wide">
                luxe jeans for men
              </h3>
              <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8 leading-relaxed max-w-md">
                Stylish and versatile models that will become the foundation of your image
              </p>

              {/* CTA with Navigation Controls */}
              <div className="flex items-center gap-3">
                <button className="bg-black text-white px-6 md:px-8 py-3 md:py-3.5 rounded-full text-sm md:text-base font-medium hover:bg-gray-800 transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-lg">
                  shop now
                </button>
                <button
                  className="p-3 md:p-3.5 rounded-full border-2 border-gray-300 hover:border-gray-900 transition-all duration-300 hover:scale-110 active:scale-95"
                  aria-label="Previous item"
                >
                  <ChevronLeft size={20} className="text-gray-700" />
                </button>
                <button
                  className="p-3 md:p-3.5 rounded-full border-2 border-gray-900 bg-black hover:bg-gray-800 transition-all duration-300 hover:scale-110 active:scale-95"
                  aria-label="Next item"
                >
                  <ChevronRight size={20} className="text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Gift Certificates (Content Left, Image Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Content Column */}
          <div className="flex flex-col justify-center py-8 md:py-12 order-2 lg:order-1">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-light mb-4 md:mb-6 tracking-wide">
              gift certificates
            </h3>
            <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8 leading-relaxed max-w-lg">
              A convenient gift format. You can purchase a gift certificate on the luxeshop.com online store website and in Luxe brand stores
            </p>
            <div>
              <button className="bg-black text-white px-6 md:px-8 py-3 md:py-3.5 rounded-full text-sm md:text-base font-medium hover:bg-gray-800 transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-lg">
                shop now
              </button>
            </div>
          </div>

          {/* Product Image */}
          <div className="rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-auto lg:min-h-[500px] order-1 lg:order-2 group cursor-pointer hover-lift">
            <div className="transition-transform duration-700 ease-out group-hover:scale-105">
              <ImagePlaceholder
                width={720}
                height={540}
                label="WIREFRAME IMAGE"
                className="h-full rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
