/**
 * TypeScript Type Definitions
 *
 * Central location for all shared TypeScript interfaces and types.
 * Add new interfaces here to maintain consistency across the application.
 */

/**
 * Category Interface
 *
 * Represents a product category (e.g., women's or men's clothing).
 *
 * @property {string} id - Unique identifier for the category
 * @property {string} title - Display name of the category
 * @property {string} imageUrl - URL to the category image
 * @property {'women' | 'men'} type - Category type (women or men)
 *
 * @example
 * const category: Category = {
 *   id: '1',
 *   title: 'женское',
 *   imageUrl: '/images/women.jpg',
 *   type: 'women'
 * };
 */
export interface Category {
  id: string;
  title: string;
  imageUrl: string;
  type: 'women' | 'men';
}

/**
 * MenuItem Interface
 *
 * Represents a navigation menu item in the header.
 *
 * @property {string} label - Display text for the menu item
 * @property {string} href - URL or path the menu item links to
 *
 * @example
 * const menuItem: MenuItem = {
 *   label: 'КАТАЛОГ',
 *   href: '/catalog'
 * };
 */
export interface MenuItem {
  label: string;
  href: string;
}

/**
 * Product Interface
 *
 * Represents a product in the e-commerce system.
 * Used for displaying products in search results, catalog, cart, etc.
 *
 * @property {string} id - Unique product identifier
 * @property {string} name - Product name
 * @property {string} description - Product description (optional)
 * @property {string} price - Product price (formatted as string, e.g., "89.00")
 * @property {string} category - Category name
 * @property {string} imageUrl - Primary product image URL
 * @property {number} stock - Available quantity in stock
 * @property {boolean} isNew - Whether product is marked as new
 *
 * @example
 * const product: Product = {
 *   id: '123',
 *   name: 'Классическая рубашка',
 *   description: 'Белая хлопковая рубашка',
 *   price: '89.00',
 *   category: 'Рубашки',
 *   imageUrl: '/products/shirt.jpg',
 *   stock: 15,
 *   isNew: true
 * };
 */
export interface Product {
  id: string;
  name: string;
  nameEn?: string;
  description?: string;
  descriptionEn?: string;
  price: string;
  priceNumeric: number;
  category: string;
  imageUrl: string;
  stock: number;
  isNew?: boolean;
  color?: string;
  sizes?: string[];
}

/**
 * CartItem Interface
 *
 * Represents an item in the shopping cart.
 * Extends Product with quantity information.
 *
 * @property {string} id - Product ID
 * @property {string} name - Product name
 * @property {string} price - Unit price
 * @property {number} quantity - Quantity in cart
 * @property {string} imageUrl - Product image URL
 *
 * @example
 * const cartItem: CartItem = {
 *   id: '123',
 *   name: 'Классическая рубашка',
 *   price: '89.00',
 *   quantity: 2,
 *   imageUrl: '/products/shirt.jpg'
 * };
 */
export interface CartItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
  imageUrl: string;
}

/**
 * WishlistItem Interface
 *
 * Represents an item in the user's wishlist.
 *
 * @property {string} id - Product ID
 * @property {string} name - Product name
 * @property {string} price - Product price
 * @property {string} imageUrl - Product image URL
 *
 * @example
 * const wishlistItem: WishlistItem = {
 *   id: '123',
 *   name: 'Классическая рубашка',
 *   price: '89.00',
 *   imageUrl: '/products/shirt.jpg'
 * };
 */
export interface WishlistItem {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
}

/**
 * User Interface
 *
 * Represents a user in the system.
 *
 * @property {string} id - Unique user identifier
 * @property {string} email - User email address
 * @property {string} name - User full name (optional)
 * @property {string} avatar - User avatar URL (optional)
 * @property {Date} createdAt - Account creation date
 *
 * @example
 * const user: User = {
 *   id: 'user-123',
 *   email: 'user@example.com',
 *   name: 'Иван Иванов',
 *   createdAt: new Date()
 * };
 */
export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  createdAt: Date;
}

/**
 * DropdownProps Interface
 *
 * Common props for dropdown components (Catalog, Profile, Wishlist, Cart).
 *
 * @property {boolean} isOpen - Controls dropdown visibility
 *
 * @example
 * const dropdownProps: DropdownProps = {
 *   isOpen: true
 * };
 */
export interface DropdownProps {
  isOpen: boolean;
}

/**
 * ModalProps Interface
 *
 * Common props for modal components.
 *
 * @property {boolean} isOpen - Controls modal visibility
 * @property {() => void} onClose - Callback function to close the modal
 *
 * @example
 * const modalProps: ModalProps = {
 *   isOpen: true,
 *   onClose: () => setOpen(false)
 * };
 */
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * PagePlaceholderProps Interface
 *
 * Props for page placeholder component.
 *
 * @property {string} title - Page title to display
 * @property {string} description - Optional page description
 *
 * @example
 * const placeholderProps: PagePlaceholderProps = {
 *   title: 'НОВИНКИ',
 *   description: 'Новые поступления скоро будут доступны'
 * };
 */
export interface PagePlaceholderProps {
  title: string;
  description?: string;
}
