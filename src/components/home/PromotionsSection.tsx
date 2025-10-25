/**
 * PromotionsSection Component
 *
 * Displays current promotions and special offers in a grid layout.
 * Features promotional cards with images, titles, descriptions, and CTAs.
 *
 * Layout:
 * - Mobile: 1 column
 * - Tablet: 2 columns
 * - Desktop: 4 columns
 *
 * Card Types:
 * 1. Standard: Image + Title + CTA button
 * 2. Special (card 2): Title + Description + CTA (text-only, gray background)
 *
 * Features:
 * - Navigation arrows for carousel functionality (visual only currently)
 * - Hover effects on cards (shadow elevation)
 * - Responsive button animations
 * - Multi-language support
 *
 * @component
 */

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ImagePlaceholder } from '../common/ImagePlaceholder';


export const PromotionsSection = () => {
  

  const promotions = [
    {
      id: 1,
      image: '🦋',
      title: "kids' tights collection",
      ctaText: 'go to models',
      imagePosition: 'left' as const,
    },
    {
      id: 2,
      image: '👙',
      title: 'update your wardrobe',
      description: 'Bright and comfortable models for an active summer',
      ctaText: 'go to models',
      imagePosition: 'right' as const,
    },
    {
      id: 3,
      image: '👗',
      title: 'corset collection',
      ctaText: 'go to models',
      imagePosition: 'left' as const,
    },
    {
      id: 4,
      image: '🩱',
      title: 'savage collection',
      ctaText: 'go to models',
      imagePosition: 'left' as const,
    },
  ];

  return (
    <section className="bg-gray-50 py-12 md:py-16 lg:py-20" aria-label="Current Promotions">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        {/* Section Header with View All Link */}
        <div className="flex items-center justify-between mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide">
            promotions
          </h2>
          <a
            href="#"
            className="text-sm md:text-base font-medium underline hover:no-underline transition-all"
          >
            view all
          </a>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 z-10 w-10 h-10 md:w-12 md:h-12 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg"
            aria-label="Previous promotion"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 z-10 w-10 h-10 md:w-12 md:h-12 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg"
            aria-label="Next promotion"
          >
            <ChevronRight size={24} />
          </button>

          {/* Promotions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {promotions.map((promo, index) => (
              <div
                key={promo.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group cursor-pointer"
              >
                {/* Special Text-Only Card (Index 1) */}
                {index === 1 ? (
                  <div className="flex flex-col h-full">
                    <div className="p-6 md:p-8 flex-1 flex flex-col justify-center bg-gray-50">
                      <h3 className="text-xl md:text-2xl font-light mb-3 leading-tight">
                        {promo.title}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                        {promo.description}
                      </p>
                    </div>
                    <div className="p-6 md:p-8 pt-0 bg-gray-50">
                      <button className="w-full py-3 px-6 border-2 border-black rounded-full text-sm font-medium hover:bg-black hover:text-white transition-all duration-300 hover:scale-105 active:scale-95">
                        {promo.ctaText}
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Standard Image Card */
                  <div className="flex flex-col h-full">
                    <div className="aspect-[3/4] overflow-hidden">
                      <ImagePlaceholder
                        width={600}
                        height={800}
                        label="PRODUCT IMAGE"
                        className="h-full group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-6 md:p-8 flex flex-col flex-1">
                      <h3 className="text-base md:text-lg font-normal mb-4 md:mb-6 leading-snug flex-1">
                        {promo.title}
                      </h3>
                      <button className="w-full py-3 px-6 border-2 border-black rounded-full text-sm font-medium hover:bg-black hover:text-white transition-all duration-300 hover:scale-105 active:scale-95">
                        {promo.ctaText}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
