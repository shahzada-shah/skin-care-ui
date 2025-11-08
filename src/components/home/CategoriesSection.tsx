/**
 * CategoriesSection Component
 *
 * Section combining category navigation and new product showcase.
 *
 * Structure:
 * 1. Category Circles - Horizontally scrollable on mobile, grid on desktop
 * 2. Product Carousel - New arrivals displayed in a carousel
 *
 * Layout:
 * - Mobile: Horizontal scroll for categories, single-column carousel
 * - Desktop: Grid layout for categories (7 columns), multi-column carousel
 *
 * Data:
 * - CATEGORIES: Navigation items for main product categories
 * - PRODUCTS: Mock products displayed in the carousel
 *
 * @component
 */

import { CategoryCircle } from './CategoryCircle';
import { ProductCarousel } from '../product/ProductCarousel';

const PRODUCTS = [
  {
    id: 'hydrating-serum',
    title: 'LUXE Hydrating Serum with Hyaluronic Acid',
    price: '89.99',
    isNew: true,
    imageUrl: '/images/products/luxe-hydrating-mist.png',
  },
  {
    id: 'vitamin-c-brightening',
    title: 'LUXE Vitamin C Brightening Complex',
    price: '79.99',
    isNew: true,
    imageUrl: '/images/products/luxe-clarifying-drops.png',
  },
  {
    id: 'night-repair-cream',
    title: 'LUXE Night Repair Moisturizer',
    price: '129.99',
    isNew: true,
    imageUrl: '/images/products/luxe-renewal-cream.png',
  },
  {
    id: 'gentle-cleanser',
    title: 'LUXE Gentle Foaming Cleanser',
    price: '45.99',
    isNew: true,
    imageUrl: '/images/products/luxe-purity-cleanser.png',
  },
  {
    id: 'radiance-essence',
    title: 'LUXE Radiance Boosting Essence',
    price: '95.99',
    isNew: true,
    imageUrl: '/images/products/luxe-radiance-essence.png',
  },
  {
    id: 'barrier-serum',
    title: 'LUXE Barrier Repair Serum',
    price: '109.99',
    isNew: true,
    imageUrl: '/images/products/luxe-barrier-serum.png',
  },
];

export const CategoriesSection = () => {
  const CATEGORIES = [
    { label: 'FACE CARE', href: '/category/face-care', icon: '/images/categories/icons/face-care.png' },
    { label: 'BODY CARE', href: '/category/body-care', icon: '/images/categories/icons/body-care.png' },
    { label: 'SERUMS', href: '/category/serums', icon: '/images/categories/icons/serums.png' },
    { label: 'MOISTURIZER', href: '/category/moisturizer', icon: '/images/categories/icons/moisturizer.png' },
    { label: 'CLEANSER', href: '/category/cleanser', icon: '/images/categories/icons/cleanser.png' },
    { label: 'FACIAL MASK', href: '/category/facial-mask', icon: '/images/categories/icons/facial-mask.png' },
    { label: 'SUN CARE', href: '/category/sun-care', icon: '/images/categories/icons/sun-care.png' },
  ];

  return (
    <section className="bg-white py-12 md:py-16 lg:py-20" aria-label="Categories and New Arrivals">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        {/* Category Navigation Circles */}
        <nav className="mb-16 md:mb-20 lg:mb-24 py-12 md:py-16" aria-label="Product Categories">
          <div className="overflow-x-auto scrollbar-hide px-8 md:px-4">
            <div className="flex md:grid md:grid-cols-4 lg:grid-cols-7 gap-8 md:gap-10 lg:gap-12 min-w-max md:min-w-0 justify-start md:justify-center pb-6 pt-2">
              {CATEGORIES.map((category) => (
                <CategoryCircle
                  key={category.label}
                  label={category.label}
                  href={category.href}
                  imageUrl={category.icon}
                />
              ))}
            </div>
          </div>
        </nav>

        {/* New Arrivals Product Carousel */}
        <ProductCarousel
          title="NEW ARRIVALS"
          viewAllLink="/new-arrivals"
          products={PRODUCTS}
        />
      </div>
    </section>
  );
};
