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
      className="grid grid-cols-1 md:grid-cols-2 h-[calc(100vh-64px)] md:h-[calc(100vh-120px)] animate-fadeIn"
      aria-label="Featured Collections"
    >
      <CategoryCard
        title="Women"
        imageUrl="/images/categories/women-collection.png"
        subtitle="Discover radiant, healthy skin with our women's skincare collection"
      />

      <CategoryCard
        title="Men"
        imageUrl="/images/categories/men-collection.png"
        subtitle="Premium grooming essentials designed for men's unique skin needs"
      />
    </section>
  );
};
