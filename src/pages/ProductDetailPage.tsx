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

  const [selectedSize, setSelectedSize] = useState('50ml');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(
    storage.isInWishlist(product.id, '50ml')
  );

  const availableSizes = ['30ml', '50ml', '100ml'];
  const thumbnails = [0, 1, 2, 3];

  // Update wishlist state when size changes
  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    setIsWishlisted(storage.isInWishlist(product.id, size));
  };

  const handleAddToCart = () => {
    storage.addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        size: selectedSize,
      },
      quantity
    );
  };

  const toggleWishlist = () => {
    if (isWishlisted) {
      storage.removeFromWishlist(product.id, selectedSize);
    } else {
      storage.addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        size: selectedSize,
      });
    }
    setIsWishlisted(!isWishlisted);
  };

  // Mock similar products for the carousel
  const similarProducts = mockProducts.slice(0, 6).map(p => ({
    ...p,
    imageUrl: p.imageUrl || '/images/products/luxe-hydrating-mist.png'
  }));

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-6 md:py-10">
        {/* Breadcrumb */}
        <nav className="text-xs md:text-sm text-gray-500 mb-8 md:mb-10">
          <Link to="/" className="hover:text-black transition-colors">
            HOME
          </Link>
          <span className="mx-2">/</span>
          <Link to="/catalog" className="hover:text-black transition-colors">
            SHOP
          </Link>
          <span className="mx-2">/</span>
          <span>{product.category || 'SKINCARE'}</span>
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
                    className={`aspect-[3/4] bg-gradient-to-br from-gray-50 to-gray-100 rounded overflow-hidden border-2 transition-all duration-200 ${
                      selectedImage === index
                        ? 'border-black shadow-sm'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    {index === 0 && product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={`${product.name} thumbnail`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center p-1">
                        <div className="text-center">
                          <div className="text-[8px] font-light tracking-wider text-gray-400">LUXE</div>
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <div className="flex-1 aspect-[3/4] bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden shadow-sm">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center p-8">
                    <div className="border-2 border-dashed border-gray-300 w-full h-3/4 flex items-center justify-center rounded">
                      <div className="text-center text-gray-400">
                        <div className="text-sm font-medium mb-1">LUXE PRODUCT</div>
                        <div className="text-xs">800 × 1200</div>
                      </div>
                    </div>
                  </div>
                )}
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

              {/* Product Type */}
              <p className="text-sm text-gray-500 mb-6">{product.category || 'Skincare Treatment'}</p>

              {/* Price */}
              <div className="text-3xl md:text-4xl font-light mb-8">
                ${product.price}
              </div>

              {/* Size/Volume Selection */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium uppercase tracking-wide">
                    SIZE: {selectedSize}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {availableSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => handleSizeChange(size)}
                      className={`py-3 px-4 text-sm border rounded transition-all duration-200 ${
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
                Find in Stores
              </button>

              {/* Collapsible Sections */}
              <div className="border-t border-gray-200">
                <CollapsibleSection title="KEY BENEFITS" defaultOpen>
                  {product.benefits && product.benefits.length > 0 ? (
                    <ul className="list-disc list-inside space-y-1.5 text-gray-600">
                      {product.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  ) : (
                    <>
                      <p className="text-gray-700 mb-4">
                        Advanced formula designed to deliver visible results while nourishing and protecting your skin.
                      </p>
                      <ul className="list-disc list-inside space-y-1.5 text-gray-600">
                        <li>Deeply hydrates and moisturizes</li>
                        <li>Improves skin texture and tone</li>
                        <li>Reduces fine lines and wrinkles</li>
                        <li>Dermatologist tested and approved</li>
                        <li>Suitable for all skin types</li>
                        <li>Cruelty-free and vegan formula</li>
                      </ul>
                    </>
                  )}
                </CollapsibleSection>

                <CollapsibleSection title="INGREDIENTS">
                  <div className="space-y-3 text-gray-700">
                    {product.keyIngredients && (
                      <p>
                        <span className="font-medium">Key Ingredients:</span> {product.keyIngredients}
                      </p>
                    )}
                    {product.fullIngredients && (
                      <p className="text-sm text-gray-600">
                        {product.fullIngredients}
                      </p>
                    )}
                    {!product.keyIngredients && !product.fullIngredients && (
                      <>
                        <p>
                          <span className="font-medium">Key Ingredients:</span> Hyaluronic Acid, Vitamin C, Niacinamide, Peptides, Ceramides
                        </p>
                        <p className="text-sm text-gray-600">
                          Aqua, Glycerin, Sodium Hyaluronate, Ascorbic Acid, Niacinamide, Palmitoyl Tripeptide-5, Ceramide NP, Tocopherol, Panthenol
                        </p>
                      </>
                    )}
                  </div>
                </CollapsibleSection>

                <CollapsibleSection title="HOW TO USE">
                  {product.howToUse && product.howToUse.length > 0 ? (
                    <ol className="list-decimal list-inside space-y-2 text-gray-700">
                      {product.howToUse.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ol>
                  ) : (
                    <div className="space-y-3 text-gray-700">
                      <p>
                        <span className="font-medium">Morning & Evening:</span> Apply 2-3 drops to cleansed face and neck
                      </p>
                      <p>
                        <span className="font-medium">Pro Tip:</span> Gently pat into skin for better absorption
                      </p>
                      <p>
                        <span className="font-medium">Follow with:</span> Your favorite moisturizer and SPF during the day
                      </p>
                    </div>
                  )}
                </CollapsibleSection>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        <div className="mt-20 md:mt-28 border-t border-gray-100 pt-16">
          <ProductCarousel
            title="similar"
            viewAllLink="/catalog"
            products={similarProducts}
          />
        </div>
      </div>
    </div>
  );
};
