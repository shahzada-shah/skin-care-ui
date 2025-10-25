/**
 * Catalog Configuration
 *
 * Contains all catalog-related data including category hierarchies,
 * navigation items, and product classifications.
 *
 * @module constants/catalog
 */

/**
 * Catalog category with subcategories
 */
export interface CatalogCategory {
  title: string;
  items: string[];
}

/**
 * Main catalog categories configuration
 * Used in the catalog dropdown menu
 */
export const CATALOG_CATEGORIES: CatalogCategory[] = [
  {
    title: 'WOMEN\'S CLOTHING',
    items: ['Dresses', 'Blouses', 'Pants', 'Skirts', 'Outerwear'],
  },
  {
    title: 'MEN\'S CLOTHING',
    items: ['Shirts', 'Pants', 'Sweaters', 'Outerwear', 'Accessories'],
  },
  {
    title: 'COLLECTIONS',
    items: ['New Arrivals', 'Bestsellers', 'Sale', 'Premium', 'Casual'],
  },
];

/**
 * Product category types
 */
export const CATEGORY_TYPES = {
  WOMEN: 'women',
  MEN: 'men',
  COLLECTIONS: 'collections',
} as const;

/**
 * Category filter options
 */
export const CATEGORY_FILTERS = [
  { label: 'All Categories', value: 'all' },
  { label: 'Women\'s', value: CATEGORY_TYPES.WOMEN },
  { label: 'Men\'s', value: CATEGORY_TYPES.MEN },
  { label: 'Collections', value: CATEGORY_TYPES.COLLECTIONS },
] as const;
