/**
 * ProductDetailPage Component
 *
 * Displays detailed product information with image gallery, size/color selection,
 * collapsible sections, and related products carousel.
 *
 * @component
 * @example
 * <ProductDetailPage />
 */

import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ChevronDown, Minus, Plus } from 'lucide-react';
import { ImagePlaceholder } from '../components/common';
import { ProductCarousel } from '../components/product';
import { mockProducts } from '../data/mockProducts';
import { storage } from '../utils/storage';

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const CollapsibleSection = ({ title, children, defaultOpen = false }: CollapsibleSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-5 text-left group hover:text-gray-600 transition-colors"
      >
        <span className="text-sm font-medium uppercase tracking-wide">{title}</span>
        <ChevronDown
          size={20}
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <div className="pb-6 text-sm text-gray-600 leading-relaxed space-y-2 animate-in fade-in duration-300">
          {children}
        </div>
      )}
    </div>
  );
};

export const ProductDetailPage = () => {
  const { id } = useParams();
  const product = mockProducts.find((p) => p.id === id) || mockProducts[0];

  const [selectedColor, setSelectedColor] = useState(product.color || 'Black');
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '38');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(storage.isInWishlist(product.id));

  const availableColors = [
    { name: 'Black', hex: '#000000' },
    { name: 'Beige', hex: '#E8DCC4' },
    { name: 'Gray', hex: '#9CA3AF' },
  ];

  const thumbnails = [0, 1, 2, 3];

  const handleAddToCart = () => {
    storage.addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity,
    });
  };

  const toggleWishlist = () => {
    if (isWishlisted) {
      storage.removeFromWishlist(product.id);
    } else {
      storage.addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
      });
    }
    setIsWishlisted(!isWishlisted);
  };

  const relatedProducts = mockProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-6 md:py-10">
        {/* Breadcrumb */}
        <nav className="text-xs md:text-sm text-gray-500 mb-8 md:mb-10">
          <Link to="/" className="hover:text-black transition-colors">
            HOME
          </Link>
          <span className="mx-2">/</span>
          <Link to="/new" className="hover:text-black transition-colors">
            WOMEN
          </Link>
          <span className="mx-2">/</span>
          <span>NEW COLLECTION</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column - Images */}
          <div className="lg:col-span-7">
            <div className="flex gap-3 md:gap-4">
              {/* Thumbnail Column */}
              <div className="flex md:flex-col gap-2 md:gap-3 w-16 md:w-20">
                {thumbnails.map((index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-[3/4] bg-gray-50 rounded overflow-hidden border-2 transition-all duration-200 ${
                      selectedImage === index
                        ? 'border-black shadow-sm'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center">
                      <ImagePlaceholder
                        width={80}
                        height={120}
                        label=""
                        className="h-full w-full"
                      />
                    </div>
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <div className="flex-1 aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-50 rounded-lg overflow-hidden shadow-sm">
                <div className="w-full h-full flex items-center justify-center p-8">
                  <div className="border-2 border-dashed border-gray-300 w-full h-3/4 flex items-center justify-center rounded">
                    <div className="text-center text-gray-400">
                      <div className="text-sm font-medium mb-1">MAIN PRODUCT IMAGE</div>
                      <div className="text-xs">800 × 1200</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              {/* Product Title */}
              <h1 className="text-2xl md:text-3xl font-light mb-2 leading-tight">
                {product.name}
              </h1>

              {/* Product Code */}
              <p className="text-sm text-gray-500 mb-6">from viscose LBD 3332</p>

              {/* Price */}
              <div className="text-3xl md:text-4xl font-light mb-8">
                ${product.price}
              </div>

              {/* Color Selection */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium uppercase tracking-wide">
                    COLOR: {selectedColor.toUpperCase()}
                  </span>
                </div>
                <div className="flex gap-3">
                  {availableColors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                        selectedColor === color.name
                          ? 'border-black ring-2 ring-black ring-offset-2 scale-110'
                          : 'border-gray-300 hover:border-gray-500 hover:scale-105'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      aria-label={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium uppercase tracking-wide">
                    SIZE:
                  </span>
                  <button className="text-xs text-gray-500 hover:text-black transition-colors underline underline-offset-2">
                    Size Chart
                  </button>
                </div>
                <div className="grid grid-cols-6 gap-2">
                  {product.sizes?.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 text-sm border transition-all duration-200 ${
                        selectedSize === size
                          ? 'border-black bg-black text-white shadow-sm'
                          : 'border-gray-300 hover:border-black hover:shadow-sm'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-8">
                <div className="inline-flex items-center border border-gray-300 rounded hover:border-gray-400 transition-colors">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-4 hover:bg-gray-50 transition-all active:bg-gray-100 border-r border-gray-300"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={18} strokeWidth={1.5} />
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    className="w-20 text-center text-lg border-0 focus:outline-none focus:ring-0 bg-transparent"
                    min="1"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-4 hover:bg-gray-50 transition-all active:bg-gray-100 border-l border-gray-300"
                    aria-label="Increase quantity"
                  >
                    <Plus size={18} strokeWidth={1.5} />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mb-6">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-black text-white py-4 px-6 rounded-full text-sm font-medium uppercase tracking-wide hover:bg-gray-800 transition-all duration-300 hover:shadow-lg active:scale-[0.98]"
                >
                  ADD TO CART
                </button>
                <button
                  onClick={toggleWishlist}
                  className="p-4 border border-gray-300 rounded-full hover:border-black transition-all duration-200 hover:shadow-md active:scale-[0.95]"
                  aria-label={
                    isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'
                  }
                >
                  <Heart
                    size={20}
                    className={`transition-all duration-200 ${
                      isWishlisted
                        ? 'fill-red-500 text-red-500'
                        : 'text-gray-600'
                    }`}
                  />
                </button>
              </div>

              {/* Store Link */}
              <button className="text-sm text-gray-500 hover:text-black transition-colors underline underline-offset-2 mb-8">
                Available in Stores
              </button>

              {/* Collapsible Sections */}
              <div className="border-t border-gray-200">
                <CollapsibleSection title="COMPOSITION">
                  <p className="text-gray-700">
                    The bodysuit made of soft ribbed fabric with viscose helps create
                    a minimalist casual look and will be an excellent addition to your
                    basic wardrobe.
                  </p>
                  <ul className="list-disc list-inside space-y-1.5 mt-4 text-gray-600">
                    <li>round neckline with placket</li>
                    <li>long sleeves</li>
                    <li>snap fastening at bottom</li>
                    <li>placket with functional buttons</li>
                    <li>new finishing with narrow strip tape</li>
                    <li>brazilian style panties</li>
                  </ul>
                </CollapsibleSection>

                <CollapsibleSection title="ABOUT PRODUCT">
                  <div className="space-y-3 text-gray-700">
                    <p>
                      <span className="font-medium">Composition:</span> 95% viscose, 5%
                      elastane
                    </p>
                    <p>
                      <span className="font-medium">Care:</span> delicate wash
                      at temperature not exceeding 30°C
                    </p>
                    <p>
                      <span className="font-medium">Made in:</span> Belarus
                    </p>
                  </div>
                </CollapsibleSection>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 md:mt-28 border-t border-gray-100 pt-16">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl md:text-3xl font-light">similar</h2>
              <Link
                to="/new"
                className="text-sm underline underline-offset-2 hover:text-gray-600 transition-colors"
              >
                VIEW ALL
              </Link>
            </div>
            <ProductCarousel products={relatedProducts} />
          </div>
        )}
      </div>
    </div>
  );
};
