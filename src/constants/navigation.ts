/**
 * Navigation Configuration
 *
 * Contains navigation menu items, top bar elements, and other
 * site-wide navigation related constants.
 *
 * @module constants/navigation
 */

import { MenuItem } from '../types';

/**
 * Main navigation menu items displayed in the header
 */
export const MAIN_NAVIGATION: MenuItem[] = [
  { label: 'NEW ARRIVALS', href: '/new' },
  { label: 'CATALOG', href: '/catalog' },
  { label: 'SALES', href: '/sales' },
];

/**
 * Top bar promotional items displayed above the main header
 */
export const TOP_BAR_ITEMS = [
  { icon: 'award', text: 'GIFT CERTIFICATES' },
  { icon: 'mail', text: 'INFO@CONTESHOP.BY' },
  { icon: 'truck', text: 'SHIPPING & PAYMENT' },
];
