/**
 * NotFoundPage Component
 *
 * Custom 404 error page with LUXE branding.
 * Provides elegant error handling with navigation back to home.
 *
 * @component
 */

import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-light tracking-[0.3em] text-black mb-2">
            LUXE
          </h1>
          <p className="text-sm tracking-[0.2em] text-gray-500 uppercase">
            Skincare & Beauty
          </p>
        </div>

        {/* Error Message */}
        <div className="mb-12">
          <div className="text-9xl md:text-[200px] font-light text-gray-200 mb-4 leading-none">
            404
          </div>
          <h2 className="text-2xl md:text-3xl font-light tracking-wide text-gray-800 mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
            We couldn't find the page you're looking for. The page may have been moved, 
            deleted, or the URL might be incorrect.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/"
            className="group flex items-center gap-2 bg-black text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
          >
            <Home size={20} />
            <span className="tracking-wide">Return Home</span>
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="group flex items-center gap-2 border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:border-black hover:text-black transition-all duration-300"
          >
            <ArrowLeft size={20} />
            <span className="tracking-wide">Go Back</span>
          </button>
        </div>

        {/* Popular Links */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <p className="text-xs uppercase tracking-wider text-gray-500 mb-6">
            Popular Pages
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/new"
              className="text-sm tracking-wide text-gray-600 hover:text-black transition-colors duration-300"
            >
              New Arrivals
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              to="/sales"
              className="text-sm tracking-wide text-gray-600 hover:text-black transition-colors duration-300"
            >
              Sales
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              to="/catalog"
              className="text-sm tracking-wide text-gray-600 hover:text-black transition-colors duration-300"
            >
              Catalog
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              to="/contacts"
              className="text-sm tracking-wide text-gray-600 hover:text-black transition-colors duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Search Suggestion */}
        <div className="mt-8">
          <p className="text-xs text-gray-500 flex items-center justify-center gap-2">
            <Search size={14} />
            <span>Use the search bar to find what you're looking for</span>
          </p>
        </div>
      </div>
    </div>
  );
};

