/**
 * ProductCard Component
 *
 * Displays a product with image placeholder, NEW badge, wishlist button, price, and delivery info.
 * Features hover animations, add to cart functionality, and dynamic wishlist state from localStorage.
 * Used in product carousels and grid layouts.
 *
 * @component
 * @example
 * <ProductCard
 *   id="1"
 *   title="Women's Sweater CE LDK24121"
 *   price="149.99"
 *   isNew={true}
 * />
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Truck, ShoppingCart } from 'lucide-react';
import { storage } from '../../utils/storage';
import { ImagePlaceholder } from '../common/ImagePlaceholder';


interface ProductCardProps {
  id: string;
  name?: string;
  nameEn?: string;
  title?: string;
  price: string;
  isNew?: boolean;
  currency?: string;
  imageUrl?: string;
}

export const ProductCard = ({
  id,
  name,
  nameEn,
  title,
  price,
  isNew = false,
  currency = 'BYN',
  imageUrl
}: ProductCardProps) => {
  const displayTitle = nameEn || name || title || '';
  const displayCurrency = '$';
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // Default size for quick add from listing page
  const defaultSize = '50ml';

  useEffect(() => {
    // For listing pages, check if any size is wishlisted
    setIsWishlisted(storage.isInWishlist(id, defaultSize));

    const handleWishlistUpdate = () => {
      setIsWishlisted(storage.isInWishlist(id, defaultSize));
    };

    window.addEventListener('wishlist-updated', handleWishlistUpdate);
    return () => window.removeEventListener('wishlist-updated', handleWishlistUpdate);
  }, [id, defaultSize]);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isWishlisted) {
      storage.removeFromWishlist(id, defaultSize);
    } else {
      storage.addToWishlist({
        id,
        name: displayTitle,
        price,
        imageUrl: imageUrl || '',
        size: defaultSize,
      });
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsAdding(true);
    storage.addToCart({
      id,
      name: displayTitle,
      price,
      imageUrl: imageUrl || '',
      size: defaultSize,
    });

    setTimeout(() => setIsAdding(false), 600);
  };

  return (
    <Link to={`/product/${id}`} className="group cursor-pointer block">
      <div className="relative aspect-[3/4] bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden mb-4 transition-all duration-500 hover:shadow-xl">
        {/* NEW Badge */}
        {isNew && (
          <div className="absolute top-3 left-3 bg-black text-white text-xs font-semibold px-3 py-1 uppercase z-10">
            NEW
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={toggleWishlist}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 z-10 hover:scale-110 active:scale-95"
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            size={18}
            className={`transition-all duration-300 ${
              isWishlisted
                ? 'fill-red-500 text-red-500'
                : 'text-gray-600 hover:text-red-500'
            }`}
          />
        </button>

        {/* Product Image */}
        <div className="transition-transform duration-700 ease-out group-hover:scale-105 h-full">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={displayTitle}
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <ImagePlaceholder width={600} height={800} label="PRODUCT IMAGE" className="h-full rounded-lg" />
          )}
        </div>

        {/* Add to Cart Button - Appears on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out transform translate-y-4 group-hover:translate-y-0">
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="w-full bg-black text-white py-3 rounded-lg text-sm font-medium uppercase tracking-wide flex items-center justify-center gap-2 hover:bg-gray-800 transition-all duration-300 hover:shadow-lg disabled:opacity-50 active:scale-[0.98]"
          >
            <ShoppingCart size={18} />
            {isAdding ? 'Added!' : 'Add to Cart'}
          </button>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        {/* Price */}
        <div className="text-lg md:text-xl font-semibold">
          {displayCurrency}{price}
        </div>

        {/* Title */}
        <h3 className="text-xs md:text-sm text-gray-700 line-clamp-2 group-hover:text-black transition-colors duration-300">
          {displayTitle}
        </h3>

        {/* Delivery Info */}
        <div className="flex items-center gap-2 text-xs text-gray-600 pt-1">
          <Truck size={14} className="flex-shrink-0" />
          <span>Free shipping over $75</span>
        </div>
      </div>
    </Link>
  );
};
