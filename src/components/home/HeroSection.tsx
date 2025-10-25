/**
 * HeroSection Component
 *
 * Main hero banner displayed at the top of the homepage.
 * Features a split layout showcasing women's and men's collections.
 *
 * Layout:
 * - Desktop: Two equal columns side by side
 * - Mobile: Stacked full-width cards
 *
 * Visual Features:
 * - Smooth fade-in animation on load
 * - Responsive height based on viewport
 * - Subtle border separator between sections
 *
 * @component
 */

import { CategoryCard } from './CategoryCard';

export const HeroSection = () => {
  return (
    <section
      className="grid grid-cols-1 md:grid-cols-2 h-auto md:h-[calc(100vh-180px)] min-h-[600px] md:min-h-[700px] animate-fadeIn"
      aria-label="Featured Collections"
    >
      <CategoryCard
        title="Women"
        imageUrl="/women-collection.jpg"
        subtitle="NEW WOMEN'S CLOTHING COLLECTIONS FROM LUXE"
      />

      <div className="md:border-l border-gray-200">
        <CategoryCard
          title="Men"
          imageUrl="/men-collection.jpg"
          subtitle="NEW MEN'S CLOTHING COLLECTIONS FROM LUXE"
        />
      </div>
    </section>
  );
};
