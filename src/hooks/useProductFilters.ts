/**
 * useProductFilters Hook
 *
 * Custom hook for managing product filtering state and logic.
 * Handles categories, price range, colors, and sizes.
 *
 * @example
 * const { filteredProducts, filters, updateFilter, clearFilters } = useProductFilters(products);
 */

import { useState, useMemo } from 'react';
import type { Product } from '../types';

export interface FilterState {
  categories: string[];
  priceMin: number;
  priceMax: number;
  colors: string[];
  sizes: string[];
}

export const useProductFilters = (products: Product[]) => {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceMin: 0,
    priceMax: 500,
    colors: [],
    sizes: [],
  });

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
        return false;
      }

      if (product.priceNumeric < filters.priceMin || product.priceNumeric > filters.priceMax) {
        return false;
      }

      if (filters.colors.length > 0 && product.color && !filters.colors.includes(product.color)) {
        return false;
      }

      if (filters.sizes.length > 0 && product.sizes) {
        const hasMatchingSize = filters.sizes.some((size) => product.sizes?.includes(size));
        if (!hasMatchingSize) {
          return false;
        }
      }

      return true;
    });
  }, [products, filters]);

  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const toggleCategory = (category: string) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };

  const toggleColor = (color: string) => {
    setFilters((prev) => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter((c) => c !== color)
        : [...prev.colors, color],
    }));
  };

  const toggleSize = (size: string) => {
    setFilters((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const clearFilters = () => {
    setFilters({
      categories: [],
      priceMin: 0,
      priceMax: 500,
      colors: [],
      sizes: [],
    });
  };

  return {
    filteredProducts,
    filters,
    updateFilter,
    toggleCategory,
    toggleColor,
    toggleSize,
    clearFilters,
  };
};
