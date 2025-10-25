/**
 * CatalogDropdown Component
 *
 * Displays a full-width dropdown menu with categorized product navigation.
 * Features staggered fade-in animations and organized category columns.
 *
 * @component
 * @example
 * <CatalogDropdown isOpen={catalogOpen} />
 *
 * @param {DropdownProps} props - Component props
 * @param {boolean} props.isOpen - Controls dropdown visibility
 */

import { Link } from 'react-router-dom';
import { DROPDOWN_ANIMATION, CONTAINER_MAX_WIDTH } from '../../constants';
import type { DropdownProps } from '../../types';

export const CatalogDropdown = ({ isOpen }: DropdownProps) => {
  const CATALOG_CATEGORIES = [
    {
      title: "WOMEN'S CLOTHING",
      items: ['Dresses', 'Blouses', 'Pants', 'Skirts', 'Outerwear'],
    },
    {
      title: "MEN'S CLOTHING",
      items: ['Shirts', 'Pants', 'Sweaters', 'Outerwear', 'Accessories'],
    },
    {
      title: 'COLLECTIONS',
      items: ['New Arrivals', 'Bestsellers', 'Sale', 'Premium', 'Casual'],
    },
  ];

  return (
    <div
      className={`absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg transition-all duration-300 ease-out overflow-hidden z-50 ${
        isOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'
      }`}
      role="menu"
      aria-hidden={!isOpen}
    >
      <div className="mx-auto px-6 py-8" style={{ maxWidth: CONTAINER_MAX_WIDTH }}>
        <div className="grid grid-cols-3 gap-24">
          {CATALOG_CATEGORIES.map((category, index) => (
            <div
              key={category.title}
              style={{
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? 'translateY(0)' : 'translateY(-10px)',
                transition: `opacity ${DROPDOWN_ANIMATION.TRANSITION_DURATION}ms ease-out ${index * DROPDOWN_ANIMATION.STAGGER_DELAY}ms, transform ${DROPDOWN_ANIMATION.TRANSITION_DURATION}ms ease-out ${index * DROPDOWN_ANIMATION.STAGGER_DELAY}ms`,
              }}
            >
              <h3 className="text-xs font-bold uppercase tracking-wider mb-4 text-black">
                {category.title}
              </h3>
              <ul className="space-y-2.5" role="group" aria-label={category.title}>
                {category.items.map((item) => (
                  <li key={item}>
                    <Link
                      to={`/catalog/${item.toLowerCase()}`}
                      className="text-sm text-gray-600 hover:text-black transition-colors duration-200 block"
                      role="menuitem"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
