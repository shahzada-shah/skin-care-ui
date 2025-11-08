/**
 * ProductCarousel Component
 *
 * Horizontal scrollable carousel for displaying products.
 * Features navigation arrows, smooth scrolling, and responsive grid.
 * Used for showcasing new arrivals and featured products.
 *
 * @component
 * @example
 * <ProductCarousel
 *   title="NEW ARRIVALS"
 *   viewAllLink="/new-arrivals"
 *   products={products}
 * />
 */

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { useCarousel } from '../../utils/useCarousel';

interface Product {
  id: string;
  title: string;
  price: string;
  isNew?: boolean;
}

interface ProductCarouselProps {
  title: string;
  viewAllLink: string;
  products: Product[];
}

export const ProductCarousel = ({
  title,
  viewAllLink,
  products,
}: ProductCarouselProps) => {
  const { scrollContainerRef, showLeftArrow, showRightArrow, scroll, checkScroll } = useCarousel();

  return (
    <div className="relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 md:mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light uppercase tracking-wide">
          {title}
        </h2>
        <a
          href={viewAllLink}
          className="text-xs md:text-sm font-medium uppercase tracking-wide border-b-2 border-black hover:border-gray-600 transition-colors duration-300 pb-1"
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
            aria-label="Previous products"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {/* Right Navigation Arrow */}
        {showRightArrow && (
          <button
            onClick={() => scroll('right')}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg items-center justify-center hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95"
            aria-label="Next products"
          >
            <ChevronRight size={24} />
          </button>
        )}

        {/* Products Grid */}
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
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                isNew={product.isNew}
                imageUrl={product.imageUrl}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
