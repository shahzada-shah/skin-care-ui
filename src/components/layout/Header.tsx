/**
 * Header Component
 *
 * Main navigation header with hover-activated dropdowns, language switcher, and search.
 * Features a sticky position that stays at the top during scroll.
 * Responsive: Simplified mobile layout, full desktop experience on larger screens.
 *
 * @component
 *
 * @features
 * - Sticky navigation with smooth transitions
 * - Language switcher with EN/RU toggle
 * - Hover-activated dropdown menus (catalog, profile, wishlist, cart)
 * - Click-outside detection to close dropdowns
 * - Real-time cart and wishlist counts
 * - Responsive design with mobile-optimized layout
 * - Search modal integration
 */

import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, Heart, ShoppingCart, ChevronDown, Menu } from 'lucide-react';
import { ICON_SIZES } from '../../constants';
import { useDropdowns, useStorageCounts, useClickOutside } from '../../hooks';
import { CatalogDropdown } from './CatalogDropdown';
import { ProfileDropdown } from './ProfileDropdown';
import { WishlistDropdown } from './WishlistDropdown';
import { CartDropdown } from './CartDropdown';
import { SearchModal } from './SearchModal';

export const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  const {
    catalogOpen,
    profileOpen,
    wishlistOpen,
    cartOpen,
    openCatalog,
    openProfile,
    openWishlist,
    openCart,
    closeAll,
  } = useDropdowns();

  const { wishlistCount, cartCount } = useStorageCounts();

  const catalogRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const wishlistRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);

  useClickOutside([catalogRef], () => catalogOpen && closeAll());
  useClickOutside([profileRef], () => profileOpen && closeAll());
  useClickOutside([wishlistRef], () => wishlistOpen && closeAll());
  useClickOutside([cartRef], () => cartOpen && closeAll());

  const mainNavigation = [
    { label: 'CATALOG', href: '/catalog' },
    { label: 'NEW', href: '/new' },
    { label: 'SALES', href: '/sales' },
  ];

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-4">
          {/* Mobile Layout (< 768px) */}
          <div className="md:hidden flex items-center justify-between">
            <button
              className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-300"
              aria-label="Open menu"
            >
              <Menu size={ICON_SIZES.MEDIUM} />
            </button>

            <button onClick={() => navigate('/')} className="focus:outline-none">
              <h1 className="text-2xl font-light tracking-wide">LUXE</h1>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-300"
                aria-label="Open search"
              >
                <Search size={ICON_SIZES.MEDIUM} />
              </button>
              <button
                className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-300 relative"
                aria-label="Shopping cart"
              >
                <ShoppingCart size={ICON_SIZES.MEDIUM} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Desktop Layout (>= 768px) */}
          <div className="hidden md:flex items-center justify-between gap-4 lg:gap-8">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-300 hover:scale-110 active:scale-95"
              aria-label="Open search"
            >
              <Search size={ICON_SIZES.MEDIUM} />
            </button>

            <nav className="hidden lg:flex items-center gap-8 xl:gap-12">
              {mainNavigation.map((item) => {
                const isCatalog = item.label === 'CATALOG';
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => isCatalog && openCatalog()}
                  >
                    <Link
                      to={item.href}
                      className="text-sm font-medium hover:text-gray-600 transition-colors duration-200 flex items-center gap-1 relative group whitespace-nowrap uppercase"
                    >
                      {item.label}
                      {isCatalog && (
                        <ChevronDown
                          size={ICON_SIZES.SMALL}
                          className={`transition-transform duration-200 ${
                            catalogOpen ? 'rotate-180' : ''
                          }`}
                        />
                      )}
                      {catalogOpen && isCatalog && (
                        <span className="absolute -bottom-1.5 left-0 w-full h-0.5 bg-black" />
                      )}
                      {!catalogOpen && (
                        <span className="absolute -bottom-1.5 left-0 w-full h-0.5 bg-black transition-all duration-200 scale-x-0 group-hover:scale-x-100" />
                      )}
                    </Link>
                  </div>
                );
              })}
            </nav>

            <div className="flex-1 flex justify-center">
              <Link to="/">
                <h1 className="text-3xl lg:text-4xl font-light tracking-wider hover:tracking-widest transition-all duration-300 cursor-pointer">
                  LUXE
                </h1>
              </Link>
            </div>

            <Link
              to="/contacts"
              className="hidden xl:block text-sm font-medium hover:text-gray-600 transition-colors duration-200 relative group whitespace-nowrap uppercase"
            >
              CONTACTS
              <span className="absolute -bottom-1.5 left-0 w-full h-0.5 bg-black transition-all duration-200 scale-x-0 group-hover:scale-x-100" />
            </Link>

            <div
              ref={profileRef}
              className="hidden lg:flex items-center gap-1 relative"
              onMouseEnter={() => openProfile()}
            >
              <button
                className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-300 hover:scale-110 active:scale-95 group"
                aria-label="User profile"
              >
                <User
                  size={ICON_SIZES.MEDIUM}
                  className={`transition-transform duration-300 ${
                    profileOpen ? 'rotate-12' : 'group-hover:rotate-12'
                  }`}
                />
              </button>
              <ProfileDropdown isOpen={profileOpen} />
            </div>

            <div
              ref={wishlistRef}
              className="flex items-center gap-1 relative"
              onMouseEnter={() => openWishlist()}
            >
              <button
                className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-300 hover:scale-110 active:scale-95 group"
                aria-label="Wishlist"
              >
                <Heart
                  size={ICON_SIZES.MEDIUM}
                  className={`transition-all duration-300 ${
                    wishlistOpen ? 'fill-red-500 text-red-500' : 'group-hover:fill-red-500 group-hover:text-red-500'
                  }`}
                />
              </button>
              <span className="hidden md:block text-xs text-gray-400 transition-colors duration-300 hover:text-gray-600">
                {wishlistCount}
              </span>
              <WishlistDropdown isOpen={wishlistOpen} />
            </div>

            <div
              ref={cartRef}
              className="flex items-center gap-1 relative"
              onMouseEnter={() => openCart()}
            >
              <button
                className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-300 hover:scale-110 active:scale-95 group"
                aria-label="Shopping cart"
              >
                <ShoppingCart
                  size={ICON_SIZES.MEDIUM}
                  className={`transition-transform duration-300 ${
                    cartOpen ? 'scale-110' : 'group-hover:scale-110'
                  }`}
                />
              </button>
              <span className="hidden md:block text-xs text-gray-400 transition-colors duration-300 hover:text-gray-600">
                {cartCount}
              </span>
              <CartDropdown isOpen={cartOpen} />
            </div>
          </div>
        </div>
      </div>

      {/* Catalog Dropdown - Full Width Below Header */}
      <div ref={catalogRef} className="relative">
        <CatalogDropdown isOpen={catalogOpen} />
      </div>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
};
