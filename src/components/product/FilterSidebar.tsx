/**
 * FilterSidebar Component
 *
 * Sidebar with collapsible filter sections for product filtering.
 * Includes categories, price range, color, and size filters.
 *
 * @component
 * @example
 * <FilterSidebar
 *   filters={filters}
 *   onToggleCategory={toggleCategory}
 *   onToggleColor={toggleColor}
 *   onToggleSize={toggleSize}
 *   onPriceChange={updateFilter}
 *   onClearFilters={clearFilters}
 * />
 */

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { FilterState } from '../hooks/useProductFilters';

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const FilterSection = ({ title, children, defaultOpen = true }: FilterSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-200 py-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left"
      >
        <span className="text-sm font-medium uppercase tracking-wide">{title}</span>
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && <div className="mt-4">{children}</div>}
    </div>
  );
};

interface FilterSidebarProps {
  filters: FilterState;
  onToggleCategory: (category: string) => void;
  onToggleColor: (color: string) => void;
  onToggleSize: (size: string) => void;
  onPriceChange: (key: 'priceMin' | 'priceMax', value: number) => void;
  onClearFilters: () => void;
}

export const FilterSidebar = ({
  filters,
  onToggleCategory,
  onToggleColor,
  onToggleSize,
  onPriceChange,
  onClearFilters,
}: FilterSidebarProps) => {
  const categories = ['Clothing', 'Jeans', 'Leggings', 'Lingerie', 'Tights', 'Socks'];

  const colors = [
    { name: 'White', value: 'White', hex: '#FFFFFF' },
    { name: 'Black', value: 'Black', hex: '#000000' },
    { name: 'Brown', value: 'Brown', hex: '#8B7355' },
    { name: 'Beige', value: 'Beige', hex: '#E8DCC4' },
    { name: 'Pink', value: 'Pink', hex: '#FFB6C1' },
    { name: 'Gray', value: 'Gray', hex: '#9CA3AF' },
    { name: 'Blue', value: 'Blue', hex: '#60A5FA' },
    { name: 'Green', value: 'Green', hex: '#34D399' },
    { name: 'Red', value: 'Red', hex: '#EF4444' },
    { name: 'Orange', value: 'Orange', hex: '#FB923C' },
  ];

  const sizes = ['32', '34', '36', '38', '40', '42', '44', '46', '48'];

  return (
    <aside className="w-full lg:w-64 flex-shrink-0">
      <div className="sticky top-24">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-medium uppercase tracking-wide">FILTER</h2>
          <button
            onClick={onClearFilters}
            className="text-xs text-gray-500 hover:text-black transition-colors"
          >
            Clear
          </button>
        </div>

        {/* Categories */}
        <FilterSection title="CATEGORIES">
          <div className="space-y-2.5">
            {categories.map((category) => (
              <label key={category} className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category)}
                  onChange={() => onToggleCategory(category)}
                  className="w-4 h-4 border-gray-300 rounded text-black focus:ring-black"
                />
                <span className="ml-3 text-sm text-gray-700 group-hover:text-black transition-colors">
                  {category}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Price Range */}
        <FilterSection title="PRICE">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <input
                type="number"
                value={filters.priceMin || ''}
                onChange={(e) => onPriceChange('priceMin', Number(e.target.value))}
                placeholder="0"
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-black"
              />
              <span className="text-gray-400">—</span>
              <input
                type="number"
                value={filters.priceMax || ''}
                onChange={(e) => onPriceChange('priceMax', Number(e.target.value))}
                placeholder="500"
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-black"
              />
            </div>
            <div className="text-xs text-gray-500 text-center">
              ${filters.priceMin} — ${filters.priceMax}
            </div>
          </div>
        </FilterSection>

        {/* Color */}
        <FilterSection title="COLOR">
          <div className="grid grid-cols-2 gap-3">
            {colors.map((color) => (
              <label key={color.value} className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.colors.includes(color.value)}
                  onChange={() => onToggleColor(color.value)}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 rounded-full border-2 flex-shrink-0 transition-all ${
                    filters.colors.includes(color.value)
                      ? 'border-black ring-2 ring-black ring-offset-2'
                      : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color.hex }}
                />
                <span className="ml-2 text-sm text-gray-700 group-hover:text-black transition-colors">
                  {color.name}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Size */}
        <FilterSection title="SIZE">
          <div className="grid grid-cols-5 gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => onToggleSize(size)}
                className={`px-3 py-2 border text-sm transition-all duration-200 ${
                  filters.sizes.includes(size)
                    ? 'border-black bg-black text-white'
                    : 'border-gray-300 hover:border-black hover:bg-black hover:text-white'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </FilterSection>
      </div>
    </aside>
  );
};
