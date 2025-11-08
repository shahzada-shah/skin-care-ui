/**
 * NewPage Component
 *
 * Product listing page for new arrivals.
 * Features a filterable product grid with sidebar filters.
 *
 * Features:
 * - Product filtering by category, color, size, and price
 * - Filter sidebar with collapsible sections
 * - Product grid with responsive layout
 * - Empty state when no products match filters
 * - Clear filters functionality
 *
 * Layout:
 * - Mobile: Stacked layout (filters above, grid below)
 * - Desktop: Sidebar layout (filters left, grid right)
 *
 * Data Source:
 * - Uses mock product data from mockProducts
 * - Filtered via useProductFilters hook
 *
 * @component
 */

import { ProductListingHeader, FilterSidebar, ProductGrid } from '../components/product';
import { mockProducts } from '../data/mockProducts';
import { useProductFilters } from '../hooks';


export const NewPage = () => {
  // Filter to show only new products
  const newProducts = mockProducts.filter(product => product.isNew);
  
  const {
    filteredProducts,
    filters,
    toggleCategory,
    toggleColor,
    toggleSize,
    updateFilter,
    clearFilters,
  } = useProductFilters(newProducts);

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-8 md:py-12">
      {/* Page Header */}
      <ProductListingHeader
        title="New Arrivals"
        subtitle="Discover our latest skincare innovations"
        count={filteredProducts.length}
      />

      {/* Filter Sidebar + Product Grid */}
      <div className="mt-12 flex flex-col lg:flex-row gap-8 lg:gap-12">
        <FilterSidebar
          filters={filters}
          onToggleCategory={toggleCategory}
          onToggleColor={toggleColor}
          onToggleSize={toggleSize}
          onPriceChange={updateFilter}
          onClearFilters={clearFilters}
        />

        <main className="flex-1">
          <ProductGrid products={filteredProducts} />

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">
                No products found. Try adjusting your filters.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
