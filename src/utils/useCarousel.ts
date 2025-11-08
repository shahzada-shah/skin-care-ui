/**
 * useCarousel Hook
 * 
 * Reusable hook for implementing scroll-based carousel functionality.
 * Manages scroll state, arrow visibility, and smooth scrolling.
 * 
 * @returns {Object} Carousel state and control functions
 * @property {RefObject} scrollContainerRef - Ref to attach to scrollable container
 * @property {boolean} showLeftArrow - Whether to show left navigation arrow
 * @property {boolean} showRightArrow - Whether to show right navigation arrow
 * @property {Function} scroll - Function to scroll left or right
 * @property {Function} checkScroll - Function to update arrow visibility
 * 
 * @example
 * const { scrollContainerRef, showLeftArrow, showRightArrow, scroll, checkScroll } = useCarousel();
 * 
 * <div ref={scrollContainerRef} onScroll={checkScroll}>
 *   // carousel content
 * </div>
 * <button onClick={() => scroll('left')}>Previous</button>
 * <button onClick={() => scroll('right')}>Next</button>
 */

import { useState, useRef, RefObject } from 'react';

interface UseCarouselReturn {
  scrollContainerRef: RefObject<HTMLDivElement>;
  showLeftArrow: boolean;
  showRightArrow: boolean;
  scroll: (direction: 'left' | 'right') => void;
  checkScroll: () => void;
}

export const useCarousel = (): UseCarouselReturn => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setShowLeftArrow(container.scrollLeft > 0);
    setShowRightArrow(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10
    );
  };

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.8;
    const newScrollPosition =
      direction === 'left'
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: newScrollPosition,
      behavior: 'smooth',
    });

    setTimeout(checkScroll, 300);
  };

  return {
    scrollContainerRef,
    showLeftArrow,
    showRightArrow,
    scroll,
    checkScroll,
  };
};

