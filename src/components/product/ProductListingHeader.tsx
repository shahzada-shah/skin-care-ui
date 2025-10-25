/**
 * ProductListingHeader Component
 *
 * Header section for product listing pages with title, count, and sort options.
 *
 * @component
 * @example
 * <ProductListingHeader title="Women's Clothing" count={281} />
 */

interface ProductListingHeaderProps {
  title: string;
  subtitle?: string;
  count: number;
}

export const ProductListingHeader = ({ title, subtitle, count }: ProductListingHeaderProps) => {
  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-light tracking-wide mb-2">
            {title}
            <span className="text-sm text-gray-500 ml-3">({count})</span>
          </h1>
          {subtitle && (
            <p className="text-sm text-gray-600 leading-relaxed max-w-xl">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
