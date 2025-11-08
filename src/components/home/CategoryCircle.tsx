/**
 * CategoryCircle Component
 *
 * Circular navigation button for skincare categories.
 * Features a clean circle design with optional image or icon fallback.
 *
 * Hover Effects:
 * - Circle: Border darkens, shadow appears, slight scale increase
 * - Image: Scales up smoothly
 * - Label: Text color darkens
 *
 * Responsive Sizing:
 * - Mobile: 112px (w-28 h-28)
 * - Tablet: 144px (w-36 h-36)
 * - Desktop: 160px (w-40 h-40)
 *
 * @component
 * @example
 * <CategoryCircle label="FACE CARE" href="/category/face-care" imageUrl="/images/icons/face-care.png" />
 */

import { ShoppingBag } from 'lucide-react';

interface CategoryCircleProps {
  label: string;
  href: string;
  imageUrl?: string;
}

export const CategoryCircle = ({ label, href, imageUrl }: CategoryCircleProps) => {
  return (
    <a
      href={href}
      className="flex flex-col items-center gap-3 group cursor-pointer flex-shrink-0"
      aria-label={`Browse ${label} category`}
    >
      {/* Circle Container */}
      <div className="w-28 h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-full border-2 border-gray-200 bg-white flex items-center justify-center transition-all duration-500 ease-out group-hover:border-gray-400 group-hover:shadow-xl group-hover:scale-105 active:scale-95 overflow-hidden p-1 md:p-1.5">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={label}
            className="w-full h-full object-cover rounded-full transition-transform duration-500 group-hover:scale-105 scale-110"
          />
        ) : (
          <ShoppingBag
            size={32}
            className="text-gray-300 transition-all duration-500 group-hover:text-gray-500 group-hover:scale-110 md:w-10 md:h-10"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        )}
      </div>

      {/* Category Label */}
      <span className="text-xs md:text-sm font-medium uppercase tracking-wide transition-colors duration-300 group-hover:text-gray-600 text-center">
        {label}
      </span>
    </a>
  );
};
