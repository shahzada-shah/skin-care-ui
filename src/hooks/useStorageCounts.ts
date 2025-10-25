/**
 * useStorageCounts Hook
 *
 * Custom hook for tracking wishlist and cart item counts with real-time updates.
 * Listens to storage events and automatically updates counts when items are added/removed.
 *
 * @returns {Object} Item counts
 * @returns {number} wishlistCount - Number of items in wishlist
 * @returns {number} cartCount - Number of items in cart
 *
 * @example
 * const { wishlistCount, cartCount } = useStorageCounts();
 */

import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';

export const useStorageCounts = () => {
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCounts = () => {
      setWishlistCount(storage.getWishlist().length);
      setCartCount(storage.getCart().length);
    };

    updateCounts();

    window.addEventListener('wishlist-updated', updateCounts);
    window.addEventListener('cart-updated', updateCounts);

    return () => {
      window.removeEventListener('wishlist-updated', updateCounts);
      window.removeEventListener('cart-updated', updateCounts);
    };
  }, []);

  return { wishlistCount, cartCount };
};
