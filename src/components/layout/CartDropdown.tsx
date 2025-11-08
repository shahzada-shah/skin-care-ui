/**
 * CartDropdown Component
 *
 * Dropdown menu displaying user's cart items from localStorage.
 * Features quantity adjustment, remove item, total calculation, and checkout button.
 * Opens on hover from the header cart icon.
 *
 * @component
 * @example
 * <CartDropdown isOpen={true} />
 */

import { useState, useEffect } from 'react';
import { X, ShoppingBag, Image as ImageIcon, Minus, Plus } from 'lucide-react';
import { storage } from '../../utils/storage';
import { CartItem } from '../../types';

interface CartDropdownProps {
  isOpen: boolean;
}

export const CartDropdown = ({ isOpen }: CartDropdownProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setCartItems(storage.getCart());

    const handleUpdate = () => {
      setCartItems(storage.getCart());
    };

    window.addEventListener('cart-updated', handleUpdate);
    return () => window.removeEventListener('cart-updated', handleUpdate);
  }, []);

  const handleRemove = (id: string, size?: string) => {
    storage.removeFromCart(id, size);
  };

  const handleUpdateQuantity = (id: string, delta: number, size?: string) => {
    const item = cartItems.find((i) => i.id === id && i.size === size);
    if (item) {
      storage.updateCartQuantity(id, item.quantity + delta, size);
    }
  };

  const total = storage.getCartTotal();

  return (
    <div
      className={`absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl w-96 transition-all duration-300 overflow-hidden ${
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
      }`}
    >
      <div className="py-3">
        <div className="px-4 pb-3 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900">Cart</h3>
          <p className="text-xs text-gray-500 mt-1">
            {cartItems.length === 0
              ? 'No items'
              : `${cartItems.length} ${cartItems.length === 1 ? 'item' : 'items'}`}
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className="px-4 py-8 text-center">
            <p className="text-sm text-gray-500">Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="max-h-96 overflow-y-auto">
              {cartItems.map((item, index) => (
                <div
                  key={`${item.id}-${item.size || 'default'}`}
                  className="flex gap-3 px-4 py-3 hover:bg-gray-50 transition-colors duration-200 animate-fadeIn"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {item.imageUrl && item.imageUrl.trim() !== '' ? (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImageIcon size={24} className="text-gray-300" strokeWidth={1.5} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">{item.name}</h4>
                    {item.size && (
                      <p className="text-xs text-gray-500 mt-0.5">{item.size}</p>
                    )}
                    <p className="text-sm text-gray-600 mt-1">${item.price}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => handleUpdateQuantity(item.id, -1, item.size)}
                        className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100 hover:border-gray-400 transition-all duration-200 text-sm active:scale-95"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-sm font-medium min-w-[20px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleUpdateQuantity(item.id, 1, item.size)}
                        className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100 hover:border-gray-400 transition-all duration-200 text-sm active:scale-95"
                        aria-label="Increase quantity"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemove(item.id, item.size)}
                    className="text-gray-400 hover:text-red-500 transition-colors duration-200 self-start hover:scale-110 active:scale-95"
                    aria-label="Remove from cart"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="px-4 pt-3 border-t border-gray-100">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-gray-600">Total:</span>
                <span className="text-lg font-semibold text-gray-900">${total}</span>
              </div>
              <button className="w-full bg-black text-white py-3 rounded-lg text-sm font-medium hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2 mb-2 hover:shadow-lg active:scale-[0.98]">
                <ShoppingBag size={16} />
                Checkout
              </button>
              <a
                href="/cart"
                className="block text-center text-sm text-gray-600 hover:text-black transition-colors duration-200 py-2 hover:underline"
              >
                Go to Cart
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
