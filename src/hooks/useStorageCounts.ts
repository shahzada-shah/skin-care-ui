/**
 * useStorageCounts Hook
 *
 * Custom hook for tracking wishlist and cart item counts with real-time updates.
 * Listens to storage events and automatically updates counts when items are added/removed.
 *
 * @returns {Object} Item counts
 * @returns {number} wishlistCount - Number of unique items in wishlist
 * @returns {number} cartCount - Total quantity of all items in cart
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
      // Sum up all quantities in cart items
      const cart = storage.getCart();
      const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(totalQuantity);
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
