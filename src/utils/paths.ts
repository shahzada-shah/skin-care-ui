/**
 * Path Utilities
 *
 * Helper functions for handling asset paths with BASE_URL support.
 * Ensures images work correctly in both development and production (GitHub Pages).
 */

/**
 * Get the full path for an image asset
 * @param path - Relative path to the image (e.g., '/images/products/item.png')
 * @returns Full path with BASE_URL prefix
 */
export const getImagePath = (path: string): string => {
  if (!path) return '';
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${import.meta.env.BASE_URL}${cleanPath}`;
};

/**
 * Get the full path for a public asset
 * @param path - Relative path to the asset
 * @returns Full path with BASE_URL prefix
 */
export const getAssetPath = (path: string): string => {
  return getImagePath(path);
};

