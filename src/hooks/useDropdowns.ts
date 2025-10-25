/**
 * useDropdowns Hook
 *
 * Custom hook for managing multiple dropdown menus with exclusive open state.
 * Ensures only one dropdown is open at a time and provides methods to control each.
 *
 * @returns {Object} Dropdown state and control functions
 * @returns {boolean} catalogOpen - Catalog dropdown open state
 * @returns {boolean} profileOpen - Profile dropdown open state
 * @returns {boolean} wishlistOpen - Wishlist dropdown open state
 * @returns {boolean} cartOpen - Cart dropdown open state
 * @returns {Function} openCatalog - Opens catalog and closes others
 * @returns {Function} openProfile - Opens profile and closes others
 * @returns {Function} openWishlist - Opens wishlist and closes others
 * @returns {Function} openCart - Opens cart and closes others
 * @returns {Function} closeAll - Closes all dropdowns
 *
 * @example
 * const { catalogOpen, openCatalog, closeAll } = useDropdowns();
 */

import { useState } from 'react';

export const useDropdowns = () => {
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const closeAll = () => {
    setCatalogOpen(false);
    setProfileOpen(false);
    setWishlistOpen(false);
    setCartOpen(false);
  };

  const openCatalog = () => {
    closeAll();
    setCatalogOpen(true);
  };

  const openProfile = () => {
    closeAll();
    setProfileOpen(true);
  };

  const openWishlist = () => {
    closeAll();
    setWishlistOpen(true);
  };

  const openCart = () => {
    closeAll();
    setCartOpen(true);
  };

  return {
    catalogOpen,
    profileOpen,
    wishlistOpen,
    cartOpen,
    openCatalog,
    openProfile,
    openWishlist,
    openCart,
    closeAll,
  };
};
