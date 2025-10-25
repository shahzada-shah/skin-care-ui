/**
 * HomePage Component
 *
 * Landing page for the CONTE' e-commerce site.
 *
 * Structure (top to bottom):
 * 1. HeroSection - Main banner with hero image and call-to-action
 * 2. CategoriesSection - Category navigation circles + new arrivals carousel
 * 3. PromotionsSection - Promotional content and special offers
 * 4. FeaturedSection - Featured products showcase
 * 5. InstagramSection - Social media integration and brand content
 *
 * @component
 */

import {
  HeroSection,
  CategoriesSection,
  PromotionsSection,
  FeaturedSection,
  InstagramSection,
} from '../components/home';

export const HomePage = () => {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <PromotionsSection />
      <FeaturedSection />
      <InstagramSection />
    </>
  );
};
