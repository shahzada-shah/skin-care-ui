/**
 * CategoryCard Component
 *
 * Interactive card for displaying collection categories with images and CTAs.
 * Used in the hero section to showcase women's and men's collections.
 *
 * Features:
 * - Hover animations (subtle scale, opacity changes)
 * - Gradient overlay for text readability
 * - Responsive text sizing
 * - Interactive button with hover effects
 *
 * @component
 * @example
 * <CategoryCard
 *   title="женское"
 *   imageUrl="/women-collection.jpg"
 *   subtitle="НОВЫЕ КОЛЛЕКЦИИ ЖЕНСКОЙ ОДЕЖДЫ ОТ CONTE"
 * />
 */

import { ImagePlaceholder } from '../common/ImagePlaceholder';

interface CategoryCardProps {
  title: string;
  imageUrl: string;
  subtitle: string;
}

export const CategoryCard = ({ title, subtitle }: CategoryCardProps) => {
  return (
    <div className="relative h-[500px] md:h-full overflow-hidden group cursor-pointer bg-white">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0">
        <ImagePlaceholder
          width={720}
          height={980}
          label="WIREFRAME IMAGE"
          className="h-full w-full"
        />
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white/90 to-transparent pointer-events-none" />
      </div>

      {/* Content Overlay */}
      <div className="relative h-full flex flex-col justify-between p-6 md:p-8">
        {/* Title - Subtle lift on hover */}
        <div className="transition-all duration-500 group-hover:transform group-hover:-translate-y-1">
          <h2 className="text-3xl md:text-4xl font-light uppercase tracking-wide transition-all duration-500 group-hover:text-4xl md:group-hover:text-5xl">
            {title}
          </h2>
        </div>

        {/* Subtitle and CTA Button */}
        <div className="transition-all duration-500 group-hover:transform group-hover:translate-y-1">
          <p className="text-xs md:text-sm mb-3 md:mb-4 max-w-[240px] md:max-w-[280px] leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity duration-300">
            {subtitle}
          </p>
          <button className="bg-black text-white px-6 md:px-8 py-2.5 md:py-3 rounded-full text-xs md:text-sm font-medium uppercase tracking-wide hover:bg-gray-900 transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-lg">
            catalog
          </button>
        </div>
      </div>

      {/* Subtle dark overlay on hover */}
      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
};
