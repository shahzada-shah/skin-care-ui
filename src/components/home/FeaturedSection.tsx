/**
 * FeaturedSection Component
 *
 * Showcases featured LUXE skincare products with model and product images.
 * Features a slider to navigate between different product showcases.
 *
 * Layout:
 * - Left: Model image showcasing product in use
 * - Right: Product image + product info + CTA + navigation arrows + wishlist
 *
 * Features:
 * - Slider functionality with navigation controls
 * - Wishlist/favorite functionality
 * - Hover effects on images (subtle zoom)
 * - Responsive typography and layout
 *
 * @component
 */

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { storage } from '../../utils/storage';

export const FeaturedSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wishlistedProducts, setWishlistedProducts] = useState<Set<string>>(new Set());

  const featuredProducts = [
    {
      id: 'featured-cleanser',
      modelImage: '/images/products/luxe-hydrating-cleanser-model-ony.png',
      productImage: '/images/products/luxe-hydrating-cleanser-product-only.png',
      title: 'LUXE Hydrating Cleanser',
      description: 'Gentle foaming formula that deeply cleanses while maintaining skin\'s natural moisture barrier',
      price: '45.99',
    },
    {
      id: 'featured-serum',
      modelImage: '/images/products/luxe-revive-serum-model-only.png',
      productImage: '/images/products/luxe-revive-serum-product-only.png',
      title: 'LUXE Revive Serum',
      description: 'Powerful concentrated formula that rejuvenates and restores radiance for youthful-looking skin',
      price: '95.99',
    },
  ];

  useEffect(() => {
    const updateWishlist = () => {
      const wishlist = storage.getWishlist();
      const wishlistedIds = new Set(wishlist.map(item => item.id));
      setWishlistedProducts(wishlistedIds);
    };

    updateWishlist();
    window.addEventListener('wishlist-updated', updateWishlist);
    return () => window.removeEventListener('wishlist-updated', updateWishlist);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredProducts.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);
  };

  const toggleWishlist = (e: React.MouseEvent, product: typeof featuredProducts[0]) => {
    e.stopPropagation();
    const isWishlisted = wishlistedProducts.has(product.id);

    if (isWishlisted) {
      storage.removeFromWishlist(product.id, undefined);
    } else {
      storage.addToWishlist({
        id: product.id,
        name: product.title,
        price: product.price,
        imageUrl: product.productImage,
        size: undefined,
      });
    }
  };

  const currentProduct = featuredProducts[currentIndex];

  return (
    <section className="bg-white py-12 md:py-16 lg:py-20" aria-label="Featured Products">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide mb-8 md:mb-12 lg:mb-16">
          SALE / NEW
        </h2>

        {/* Product Showcase (Model Left, Product + Content Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
          {/* Model Image - Left */}
          <div className="rounded-2xl overflow-hidden aspect-[4/5] lg:aspect-auto lg:min-h-[500px] group cursor-pointer hover-lift">
            <div className="transition-transform duration-700 ease-out group-hover:scale-105">
              <img
                src={currentProduct.modelImage}
                alt={`${currentProduct.title} model`}
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </div>

          {/* Content Column - Right */}
          <div className="flex flex-col">
            {/* Product Image */}
            <div className="rounded-2xl overflow-hidden aspect-[16/9] mb-6 md:mb-8 group cursor-pointer hover-lift relative">
              <div className="transition-transform duration-700 ease-out group-hover:scale-105">
                <img
                  src={currentProduct.productImage}
                  alt={currentProduct.title}
                  className="w-full h-full object-cover object-top rounded-2xl"
                />
              </div>
              {/* Wishlist Button */}
              <button
                onClick={(e) => toggleWishlist(e, currentProduct)}
                className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 z-10 hover:scale-110 active:scale-95"
                aria-label={wishlistedProducts.has(currentProduct.id) ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart
                  size={20}
                  className={`transition-all duration-300 ${
                    wishlistedProducts.has(currentProduct.id)
                      ? 'fill-red-500 text-red-500'
                      : 'text-gray-600 hover:text-red-500'
                  }`}
                  strokeWidth={2}
                />
              </button>
            </div>

            {/* Product Info & CTA */}
            <div className="flex-1 flex flex-col justify-center py-4">
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-light mb-4 md:mb-6 tracking-wide">
                {currentProduct.title}
              </h3>
              <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8 leading-relaxed max-w-md">
                {currentProduct.description}
              </p>

              {/* CTA with Navigation Controls */}
              <div className="flex items-center gap-3">
                <button className="bg-black text-white px-6 md:px-8 py-3 md:py-3.5 rounded-full text-sm md:text-base font-medium hover:bg-gray-800 transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-lg">
                  shop now
                </button>
                <button
                  onClick={prevSlide}
                  className="p-3 md:p-3.5 rounded-full border-2 border-gray-300 hover:border-gray-900 transition-all duration-300 hover:scale-110 active:scale-95"
                  aria-label="Previous product"
                >
                  <ChevronLeft size={20} className="text-gray-700" />
                </button>
                <button
                  onClick={nextSlide}
                  className="p-3 md:p-3.5 rounded-full border-2 border-gray-900 bg-black hover:bg-gray-800 transition-all duration-300 hover:scale-110 active:scale-95"
                  aria-label="Next product"
                >
                  <ChevronRight size={20} className="text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Gift Certificates (Content Left, Placeholder Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Content Column */}
          <div className="flex flex-col justify-center py-8 md:py-12 order-2 lg:order-1">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-light mb-4 md:mb-6 tracking-wide">
              gift certificates
            </h3>
            <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8 leading-relaxed max-w-lg">
              Give the gift of luxurious skincare. Purchase gift certificates for LUXE products available online and in our brand stores
            </p>
            <div>
              <button className="bg-black text-white px-6 md:px-8 py-3 md:py-3.5 rounded-full text-sm md:text-base font-medium hover:bg-gray-800 transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-lg">
                shop now
              </button>
            </div>
          </div>

          {/* Gift Card Image */}
          <div className="rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-auto lg:min-h-[500px] order-1 lg:order-2 group cursor-pointer hover-lift">
            <div className="transition-transform duration-700 ease-out group-hover:scale-105">
              <img
                src="/images/products/luxe-giftcard.png"
                alt="LUXE Gift Certificate"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
