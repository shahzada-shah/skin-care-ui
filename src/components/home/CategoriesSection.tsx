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
    id: 'sweater-striped-green',
    title: "Women's Striped Sweater CE LDK24121",
    price: '149,99',
    isNew: true,
  },
  {
    id: 'top-black-buttons',
    title: "Women's Black Top with Buttons CE LDK24122",
    price: '89,99',
    isNew: true,
  },
  {
    id: 'pants-wide-black',
    title: "Women's Wide Black Pants CE LDK24123",
    price: '199,99',
    isNew: true,
  },
  {
    id: 'sweater-oversized-gray',
    title: "Women's Oversized Gray Sweater CE LDK24124",
    price: '169,99',
    isNew: true,
  },
  {
    id: 'sweater-knit-beige',
    title: "Women's Knit Beige Sweater CE LDK24125",
    price: '139,99',
    isNew: true,
  },
  {
    id: 'cardigan-long-cream',
    title: "Women's Long Cream Cardigan CE LDK24126",
    price: '229,99',
    isNew: true,
  },
  {
    id: 'dress-midi-black',
    title: "Women's Midi Black Dress CE LDK24127",
    price: '179,99',
    isNew: true,
  },
  {
    id: 'blazer-classic-navy',
    title: "Women's Classic Navy Blazer CE LDK24128",
    price: '299,99',
    isNew: true,
  },
  {
    id: 'skirt-pleated-beige',
    title: "Women's Pleated Beige Skirt CE LDK24129",
    price: '119,99',
    isNew: false,
  },
  {
    id: 'shirt-silk-white',
    title: "Women's Silk White Shirt CE LDK24130",
    price: '159,99',
    isNew: false,
  },
  {
    id: 'jeans-straight-blue',
    title: "Women's Straight Blue Jeans CE LDK24131",
    price: '149,99',
    isNew: false,
  },
  {
    id: 'coat-wool-camel',
    title: "Women's Wool Camel Coat CE LDK24132",
    price: '449,99',
    isNew: true,
  },
];

export const CategoriesSection = () => {
  const CATEGORIES = [
    { label: 'CLOTHING', href: '/category/clothing' },
    { label: 'JEANS', href: '/category/jeans' },
    { label: 'LINGERIE', href: '/category/lingerie' },
    { label: 'ACCESSORIES', href: '/category/accessories' },
    { label: 'SLEEPWEAR', href: '/category/sleepwear' },
    { label: 'TIGHTS', href: '/category/tights' },
    { label: 'SWIMWEAR', href: '/category/swimwear' },
  ];

  return (
    <section className="bg-white py-12 md:py-16 lg:py-20 overflow-hidden" aria-label="Categories and New Arrivals">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        {/* Category Navigation Circles */}
        <nav className="mb-16 md:mb-20 lg:mb-24 py-8" aria-label="Product Categories">
          <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            <div className="flex md:grid md:grid-cols-4 lg:grid-cols-7 gap-8 md:gap-10 lg:gap-12 min-w-max md:min-w-0 justify-start md:justify-center pb-4">
              {CATEGORIES.map((category) => (
                <CategoryCircle
                  key={category.label}
                  label={category.label}
                  href={category.href}
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
