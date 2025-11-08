/**
 * CatalogPage Component
 *
 * Main product catalog page showing all products.
 * Features a filterable product grid with sidebar filters.
 *
 * @component
 */

import { ProductListingHeader, FilterSidebar, ProductGrid } from '../components/product';
import { mockProducts } from '../data/mockProducts';
import { useProductFilters } from '../hooks';


export const CatalogPage = () => {
  const {
    filteredProducts,
    filters,
    toggleCategory,
    toggleColor,
    toggleSize,
    updateFilter,
    clearFilters,
  } = useProductFilters(mockProducts);

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-8 md:py-12">
      {/* Page Header */}
      <ProductListingHeader
        title="Catalog"
        subtitle="Explore our complete skincare collection"
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
