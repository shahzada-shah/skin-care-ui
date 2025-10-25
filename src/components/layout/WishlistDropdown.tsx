/**
 * WishlistDropdown Component
 *
 * Dropdown menu displaying user's wishlist items from localStorage.
 * Features remove item functionality, add all to cart, and dynamic updates.
 * Opens on hover from the header heart icon.
 *
 * @component
 * @example
 * <WishlistDropdown isOpen={true} />
 */

import { useState, useEffect } from 'react';
import { X, ShoppingCart, Image as ImageIcon } from 'lucide-react';
import { storage } from '../../utils/storage';
import { WishlistItem } from '../../types';

interface WishlistDropdownProps {
  isOpen: boolean;
}

export const WishlistDropdown = ({ isOpen }: WishlistDropdownProps) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  useEffect(() => {
    setWishlistItems(storage.getWishlist());

    const handleUpdate = () => {
      setWishlistItems(storage.getWishlist());
    };

    window.addEventListener('wishlist-updated', handleUpdate);
    return () => window.removeEventListener('wishlist-updated', handleUpdate);
  }, []);

  const handleRemove = (id: string) => {
    storage.removeFromWishlist(id);
  };

  const handleAddAllToCart = () => {
    wishlistItems.forEach((item) => {
      storage.addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        imageUrl: item.imageUrl,
      });
    });
    storage.clearWishlist();
  };

  return (
    <div
      className={`absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl w-80 transition-all duration-300 overflow-hidden ${
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
      }`}
    >
      <div className="py-3">
        <div className="px-4 pb-3 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900">Wishlist</h3>
          <p className="text-xs text-gray-500 mt-1">
            {wishlistItems.length === 0
              ? 'No items'
              : `${wishlistItems.length} ${wishlistItems.length === 1 ? 'item' : 'items'}`}
          </p>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="px-4 py-8 text-center">
            <p className="text-sm text-gray-500">Your wishlist is empty</p>
          </div>
        ) : (
          <>
            <div className="max-h-96 overflow-y-auto">
              {wishlistItems.map((item, index) => (
                <div
                  key={item.id}
                  className="flex gap-3 px-4 py-3 hover:bg-gray-50 transition-colors duration-200 animate-fadeIn"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded flex items-center justify-center flex-shrink-0">
                    <ImageIcon size={20} className="text-gray-300" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">{item.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">${item.price}</p>
                  </div>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors duration-200 hover:scale-110 active:scale-95"
                    aria-label="Remove from wishlist"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="px-4 pt-3 border-t border-gray-100">
              <button
                onClick={handleAddAllToCart}
                className="w-full bg-black text-white py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg active:scale-[0.98]"
              >
                <ShoppingCart size={16} />
                Add All to Cart
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
