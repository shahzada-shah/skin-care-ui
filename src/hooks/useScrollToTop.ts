/**
 * useScrollToTop Hook
 *
 * Custom hook that automatically scrolls to the top of the page on route changes.
 * Uses smooth scrolling behavior for better user experience.
 *
 * @example
 * // In your layout or main component
 * useScrollToTop();
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [pathname]);
};
