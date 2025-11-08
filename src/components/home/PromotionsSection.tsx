/**
 * PromotionsSection Component
 *
 * Displays LUXE skincare bundle promotions in a scrollable carousel.
 * Features bundle cards with images, titles, descriptions, and CTAs.
 *
 * Layout:
 * - Horizontal scroll carousel with smooth scrolling
 * - Navigation arrows for easy browsing
 *
 * Card Types:
 * 1. Standard: Image + Title + CTA button + Wishlist heart
 * 2. Special (card 2): Title + Description + CTA (text-only, gray background)
 *
 * Features:
 * - Scroll-based carousel navigation
 * - Wishlist/favorite functionality
 * - Hover effects on cards (shadow elevation)
 * - Responsive button animations
 *
 * @component
 */

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { useCarousel } from '../../utils/useCarousel';
import { storage } from '../../utils/storage';

export const PromotionsSection = () => {
  const { scrollContainerRef, showLeftArrow, showRightArrow, scroll, checkScroll } = useCarousel();
  const [wishlistedBundles, setWishlistedBundles] = useState<Set<number>>(new Set());

  const promotions = [
    {
      id: 1,
      imageUrl: '/images/products/luxe-hydration-bundle.png',
      title: 'hydration bundle',
      description: 'Complete moisture therapy for all skin types',
      price: '189.99',
      originalPrice: '$249.99',
      ctaText: 'shop bundle',
    },
    {
      id: 2,
      title: 'radiant skin essentials',
      description: 'Curated bundles for glowing, healthy skin at special prices',
      ctaText: 'explore bundles',
    },
    {
      id: 3,
      imageUrl: '/images/products/luxe-clarifying-bundle.png',
      title: 'clarifying bundle',
      description: 'Purifying skincare for clear, balanced complexion',
      price: '169.99',
      originalPrice: '$219.99',
      ctaText: 'shop bundle',
    },
    {
      id: 4,
      imageUrl: '/images/products/luxe-anti-aging-bundle.png',
      title: 'anti-aging bundle',
      description: 'Powerful ingredients for youthful, firm skin',
      price: '209.99',
      originalPrice: '$279.99',
      ctaText: 'shop bundle',
    },
    {
      id: 5,
      imageUrl: '/images/products/luxe-botanical-bundle.png',
      title: 'botanical bundle',
      description: 'Natural plant-based skincare for gentle nourishment',
      price: '159.99',
      originalPrice: '$199.99',
      ctaText: 'shop bundle',
    },
    {
      id: 6,
      imageUrl: '/images/products/luxe-glow-bundle.png',
      title: 'glow bundle',
      description: 'Luminous complexion essentials for radiant skin',
      price: '179.99',
      originalPrice: '$229.99',
      ctaText: 'shop bundle',
    },
  ];

  useEffect(() => {
    const updateWishlist = () => {
      const wishlist = storage.getWishlist();
      const wishlistedIds = new Set(wishlist.map(item => parseInt(item.id.replace('bundle-', ''))));
      setWishlistedBundles(wishlistedIds);
    };

    updateWishlist();
    window.addEventListener('wishlist-updated', updateWishlist);
    return () => window.removeEventListener('wishlist-updated', updateWishlist);
  }, []);

  const toggleWishlist = (e: React.MouseEvent, promo: typeof promotions[0]) => {
    e.stopPropagation();
    const bundleId = `bundle-${promo.id}`;
    const isWishlisted = wishlistedBundles.has(promo.id);

    if (isWishlisted) {
      storage.removeFromWishlist(bundleId, undefined);
    } else {
      storage.addToWishlist({
        id: bundleId,
        name: promo.title,
        price: promo.price || '0',
        imageUrl: promo.imageUrl || '',
        size: undefined,
      });
    }
  };

  return (
    <section className="bg-gray-50 py-12 md:py-16 lg:py-20" aria-label="Current Promotions">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        {/* Section Header with View All Link */}
        <div className="flex items-center justify-between mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide">
            promotion bundles
          </h2>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="text-sm md:text-base font-medium underline hover:no-underline transition-all duration-300 hover:text-gray-600 hover:translate-x-1 inline-block cursor-pointer"
          >
            view all
          </a>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Left Navigation Arrow */}
          {showLeftArrow && (
            <button
              onClick={() => scroll('left')}
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg items-center justify-center hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95"
              aria-label="Previous promotions"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {/* Right Navigation Arrow */}
          {showRightArrow && (
            <button
              onClick={() => scroll('right')}
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg items-center justify-center hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95"
              aria-label="Next promotions"
            >
              <ChevronRight size={24} />
            </button>
          )}

          {/* Promotions Carousel */}
          <div
            ref={scrollContainerRef}
            onScroll={checkScroll}
            className="overflow-x-auto scrollbar-hide scroll-smooth"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            <div className="grid grid-flow-col auto-cols-[280px] md:auto-cols-[320px] lg:auto-cols-[360px] gap-4 md:gap-6 pb-4">
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
                    <div className="aspect-[3/4] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 relative">
                      {promo.imageUrl ? (
                        <>
                          <img
                            src={promo.imageUrl}
                            alt={promo.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          {/* Wishlist Button */}
                          <button
                            onClick={(e) => toggleWishlist(e, promo)}
                            className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 z-10 hover:scale-110 active:scale-95"
                            aria-label={wishlistedBundles.has(promo.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                          >
                            <Heart
                              size={18}
                              className={`transition-all duration-300 ${
                                wishlistedBundles.has(promo.id)
                                  ? 'fill-red-500 text-red-500'
                                  : 'text-gray-600 hover:text-red-500'
                              }`}
                              strokeWidth={2}
                            />
                          </button>
                        </>
                      ) : null}
                    </div>
                    <div className="p-6 md:p-8 flex flex-col flex-1">
                      <h3 className="text-base md:text-lg font-normal mb-2 leading-snug">
                        {promo.title}
                      </h3>
                      {promo.description && (
                        <p className="text-xs md:text-sm text-gray-600 mb-3 leading-relaxed">
                          {promo.description}
                        </p>
                      )}
                      {promo.price && (
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-lg md:text-xl font-semibold">${promo.price}</span>
                          {promo.originalPrice && (
                            <span className="text-sm text-gray-400 line-through">{promo.originalPrice}</span>
                          )}
                        </div>
                      )}
                      <button className="w-full py-3 px-6 border-2 border-black rounded-full text-sm font-medium hover:bg-black hover:text-white transition-all duration-300 hover:scale-105 active:scale-95 mt-auto">
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
      </div>
    </section>
  );
};
