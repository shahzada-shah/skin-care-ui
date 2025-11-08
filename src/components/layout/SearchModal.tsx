/**
 * SearchModal Component
 *
 * Full-screen search modal with backdrop blur effect.
 * Features trending searches, recent search history, and dynamic search results.
 * Closes on ESC key, clicking outside, or clicking the close button.
 *
 * @component
 * @example
 * <SearchModal isOpen={true} onClose={() => setOpen(false)} />
 */

import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, X, TrendingUp, Clock } from 'lucide-react';
import { mockProducts } from '../../data/mockProducts';
import type { Product } from '../../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const trendingSearches = [
    'Serums',
    'Moisturizers',
    'Cleansers',
    'Face Masks',
    'New Arrivals',
  ];

  const recentSearches = [
    'Hydrating Serum',
    'Anti-Aging Bundle',
    'Vitamin C',
  ];

  // Dynamic search filtering
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();
    
    return mockProducts.filter((product) => {
      const nameMatch = product.name.toLowerCase().includes(query);
      const categoryMatch = product.category.toLowerCase().includes(query);
      const descriptionMatch = product.description?.toLowerCase().includes(query);
      
      return nameMatch || categoryMatch || descriptionMatch;
    }).slice(0, 8); // Limit to 8 results
  }, [searchQuery]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      // Clear search when modal closes
      setSearchQuery('');
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-8 md:pt-20"
      onClick={onClose}
    >
      <div
        className={`absolute inset-0 bg-black/50 backdrop-blur-md transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div
        className={`relative w-full max-w-3xl mx-3 md:mx-4 bg-white rounded-xl md:rounded-2xl shadow-2xl transition-all duration-300 ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 md:p-6 border-b border-gray-200">
          <div className="flex items-center gap-3 md:gap-4">
            <Search className="text-gray-400 flex-shrink-0" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              className="flex-1 text-base md:text-lg outline-none placeholder:text-gray-400"
            />
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-300 hover:rotate-90 flex-shrink-0"
              aria-label="Close search"
            >
              <X size={20} className="md:w-6 md:h-6 text-gray-400" />
            </button>
          </div>
        </div>

        <div className="p-4 md:p-6 max-h-[60vh] md:max-h-[500px] overflow-y-auto">
          {!searchQuery ? (
            <div className="space-y-6">
              <div className="animate-fadeIn">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp size={18} className="text-gray-400" />
                  <h3 className="text-sm font-semibold text-gray-900 uppercase">
                    Popular Searches
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {trendingSearches.map((search, index) => (
                    <button
                      key={search}
                      className="px-3 md:px-4 py-1.5 md:py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-xs md:text-sm text-gray-700 transition-all duration-300 hover:scale-105 animate-fadeIn"
                      style={{ animationDelay: `${index * 50}ms` }}
                      onClick={() => setSearchQuery(search)}
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>

              {recentSearches.length > 0 && (
                <div className="animate-fadeIn" style={{ animationDelay: '200ms' }}>
                  <div className="flex items-center gap-2 mb-4">
                    <Clock size={18} className="text-gray-400" />
                    <h3 className="text-sm font-semibold text-gray-900 uppercase">
                      Recent Searches
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {recentSearches.map((search, index) => (
                      <button
                        key={search}
                        className="w-full text-left px-3 md:px-4 py-2 md:py-3 hover:bg-gray-50 rounded-lg transition-all duration-200 flex items-center gap-2 md:gap-3 group animate-fadeIn"
                        style={{ animationDelay: `${250 + index * 50}ms` }}
                        onClick={() => setSearchQuery(search)}
                      >
                        <Clock size={14} className="md:w-4 md:h-4 text-gray-400 group-hover:text-gray-600 transition-colors flex-shrink-0" />
                        <span className="text-xs md:text-sm text-gray-700 group-hover:text-black transition-colors">
                          {search}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3 animate-fadeIn">
              <h3 className="text-sm font-semibold text-gray-900 uppercase mb-4">
                Search Results ({searchResults.length})
              </h3>
              {searchResults.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-sm text-gray-500">No products found for "{searchQuery}"</p>
                  <p className="text-xs text-gray-400 mt-2">Try searching for something else</p>
                </div>
              ) : (
                searchResults.map((product, index) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    onClick={onClose}
                    className="w-full text-left p-3 md:p-4 hover:bg-gray-50 rounded-lg transition-all duration-200 flex items-center gap-3 md:gap-4 group animate-fadeIn block"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded overflow-hidden flex items-center justify-center flex-shrink-0 group-hover:shadow-md transition-all">
                      {product.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-[10px] md:text-xs text-gray-400">LUXE</div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs md:text-sm font-medium text-gray-900 group-hover:text-black transition-colors truncate">
                        {product.name}
                      </h4>
                      <p className="text-[10px] md:text-xs text-gray-500 mt-0.5 md:mt-1">{product.category}</p>
                    </div>
                    <div className="text-xs md:text-sm font-semibold text-gray-900 whitespace-nowrap">
                      ${product.price}
                    </div>
                  </Link>
                ))
              )}
            </div>
          )}
        </div>

        <div className="p-3 md:p-4 border-t border-gray-200 bg-gray-50 rounded-b-xl md:rounded-b-2xl">
          <div className="flex items-center justify-between text-[10px] md:text-xs text-gray-500">
            <span className="hidden sm:inline">Press ESC to close</span>
            <span className="sm:hidden">ESC to close</span>
            <span className="hidden sm:inline">Enter to search</span>
            <span className="sm:hidden">Enter to search</span>
          </div>
        </div>
      </div>
    </div>
  );
};
