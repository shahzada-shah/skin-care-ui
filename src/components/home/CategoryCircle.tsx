/**
 * CategoryCircle Component
 *
 * Circular navigation button for product categories.
 * Features a clean circle design with icon and label.
 *
 * Hover Effects:
 * - Circle: Border darkens, shadow appears, slight scale increase
 * - Icon: Color darkens and scales up
 * - Label: Text color darkens
 *
 * Responsive Sizing:
 * - Mobile: 112px (w-28 h-28)
 * - Tablet: 144px (w-36 h-36)
 * - Desktop: 160px (w-40 h-40)
 *
 * @component
 * @example
 * <CategoryCircle label="ОДЕЖДА" href="/category/clothing" />
 */

import { ShoppingBag } from 'lucide-react';

interface CategoryCircleProps {
  label: string;
  href: string;
}

export const CategoryCircle = ({ label, href }: CategoryCircleProps) => {
  return (
    <a
      href={href}
      className="flex flex-col items-center gap-3 group cursor-pointer"
      aria-label={`Browse ${label} category`}
    >
      {/* Circle Container */}
      <div className="w-28 h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-full border-2 border-gray-200 bg-gray-50 flex items-center justify-center transition-all duration-500 ease-out group-hover:border-gray-400 group-hover:shadow-xl group-hover:scale-110 active:scale-95">
        <div className="text-center">
          <ShoppingBag
            size={32}
            className="mx-auto text-gray-300 transition-all duration-500 group-hover:text-gray-500 group-hover:scale-110 md:w-10 md:h-10"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <p className="text-[10px] text-gray-400 mt-2 uppercase tracking-wide">
            Icon
          </p>
        </div>
      </div>

      {/* Category Label */}
      <span className="text-xs md:text-sm font-medium uppercase tracking-wide transition-colors duration-300 group-hover:text-gray-600">
        {label}
      </span>
    </a>
  );
};
