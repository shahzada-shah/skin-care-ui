/**
 * PagePlaceholder Component
 *
 * Displays a placeholder page with themed styling matching the CONTE' brand.
 * Used for pages that are under construction or not yet implemented.
 *
 * @component
 * @example
 * <PagePlaceholder title="НОВИНКИ" description="Новые поступления скоро будут доступны" />
 */

import type { PagePlaceholderProps } from '../types';

export const PagePlaceholder = ({ title, description }: PagePlaceholderProps) => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl md:text-7xl font-light tracking-wider mb-6 uppercase">
          {title}
        </h1>
        {description && (
          <p className="text-lg md:text-xl text-gray-600 font-light tracking-wide">
            {description}
          </p>
        )}
        <div className="mt-12 w-24 h-0.5 bg-black mx-auto" />
      </div>
    </div>
  );
};
