/**
 * ImagePlaceholder Component
 *
 * Wireframe-style placeholder for images with dashed border and icon.
 * Shows dimensions text and image icon for a professional mockup appearance.
 *
 * @component
 * @example
 * <ImagePlaceholder width={600} height={800} label="PRODUCT IMAGE" />
 */

import { Image } from 'lucide-react';

interface ImagePlaceholderProps {
  width?: number;
  height?: number;
  label?: string;
  className?: string;
}

export const ImagePlaceholder = ({
  width = 600,
  height = 800,
  label = 'PRODUCT IMAGE',
  className = '',
}: ImagePlaceholderProps) => {
  return (
    <div
      className={`flex items-center justify-center bg-gray-200 ${className}`}
      style={{ aspectRatio: `${width}/${height}` }}
      role="img"
      aria-label={`${label} placeholder ${width} by ${height} pixels`}
    >
      <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-400 rounded-lg mx-8 my-8 min-w-[200px]">
        <Image size={48} className="text-gray-400 mb-4" strokeWidth={1.5} />
        <div className="text-gray-500 text-sm font-medium tracking-wide text-center">
          {label}
        </div>
        <div className="text-gray-400 text-xs mt-2">
          {width} × {height}
        </div>
      </div>
    </div>
  );
};
