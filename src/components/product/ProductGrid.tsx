/**
 * ProductGrid Component
 *
 * Displays a grid of product cards with consistent spacing and responsive layout.
 *
 * @component
 * @example
 * <ProductGrid products={products} />
 */

import { ProductCard } from './ProductCard';
import type { Product } from '../types';

interface ProductGridProps {
  products: Product[];
}

export const ProductGrid = ({ products }: ProductGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
};
