/**
 * LocalStorage Utilities
 *
 * Handles localStorage operations for wishlist and cart functionality.
 * Provides type-safe methods for storing and retrieving data with proper error handling.
 *
 * @module storage
 */

import { WishlistItem, CartItem } from '../types';

const WISHLIST_KEY = 'luxe_wishlist';
const CART_KEY = 'luxe_cart';

export const storage = {
  getWishlist(): WishlistItem[] {
    try {
      const data = localStorage.getItem(WISHLIST_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading wishlist:', error);
      return [];
    }
  },

  setWishlist(items: WishlistItem[]): void {
    try {
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
      window.dispatchEvent(new Event('wishlist-updated'));
    } catch (error) {
      console.error('Error saving wishlist:', error);
    }
  },

  addToWishlist(item: WishlistItem): void {
    const wishlist = this.getWishlist();
    const exists = wishlist.find((i) => i.id === item.id && i.size === item.size);
    if (!exists) {
      wishlist.push(item);
      this.setWishlist(wishlist);
    }
  },

  removeFromWishlist(itemId: string, size?: string): void {
    const wishlist = this.getWishlist();
    const filtered = wishlist.filter((i) => !(i.id === itemId && i.size === size));
    this.setWishlist(filtered);
  },

  isInWishlist(itemId: string, size?: string): boolean {
    const wishlist = this.getWishlist();
    return wishlist.some((i) => i.id === itemId && i.size === size);
  },

  getCart(): CartItem[] {
    try {
      const data = localStorage.getItem(CART_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading cart:', error);
      return [];
    }
  },

  setCart(items: CartItem[]): void {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(items));
      window.dispatchEvent(new Event('cart-updated'));
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  },

  addToCart(item: Omit<CartItem, 'quantity'>, quantity: number = 1): void {
    const cart = this.getCart();
    const existingItem = cart.find((i) => i.id === item.id && i.size === item.size);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ ...item, quantity });
    }

    this.setCart(cart);
  },

  removeFromCart(itemId: string, size?: string): void {
    const cart = this.getCart();
    const filtered = cart.filter((i) => !(i.id === itemId && i.size === size));
    this.setCart(filtered);
  },

  updateCartQuantity(itemId: string, quantity: number, size?: string): void {
    const cart = this.getCart();
    const item = cart.find((i) => i.id === itemId && i.size === size);

    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(itemId, size);
      } else {
        item.quantity = quantity;
        this.setCart(cart);
      }
    }
  },

  getCartTotal(): string {
    const cart = this.getCart();
    const total = cart.reduce((sum, item) => {
      const price = parseFloat(item.price.replace(',', '.'));
      return sum + price * item.quantity;
    }, 0);
    return total.toFixed(2).replace('.', ',');
  },

  clearCart(): void {
    this.setCart([]);
  },

  clearWishlist(): void {
    this.setWishlist([]);
  },
};
