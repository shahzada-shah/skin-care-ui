/**
 * Footer Component
 *
 * Main footer component with navigation links, contact information, and development credits.
 * Features:
 * - Organized footer sections (Service, Additional, Shop, Information)
 * - Contact details and location
 * - Hover-activated development credits with auto-fade
 * - Responsive grid layout
 * - Professional styling with smooth transitions
 *
 * @component
 */

import { useState, useRef } from 'react';

export const Footer = () => {
  const [showCredits, setShowCredits] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const FOOTER_SECTIONS = {
    service: {
      title: 'CUSTOMER CARE',
      links: [
        { label: 'Shipping & Returns', href: '#' },
        { label: 'Rewards Program', href: '#' },
        { label: 'Order Tracking', href: '#' },
      ],
    },
    additional: {
      title: 'DISCOVER',
      links: [
        { label: 'Special Offers', href: '#' },
        { label: 'Skincare Quiz', href: '#' },
        { label: 'Ingredient Glossary', href: '#' },
        { label: 'FAQ', href: '#' },
        { label: 'Sustainability', href: '#' },
        { label: 'Contact Us', href: '/contacts' },
        { label: 'Beauty Journal', href: '#' },
      ],
    },
    shop: {
      title: 'LUXE SKINCARE',
      links: [
        { label: 'Shop All', href: '/catalog' },
        { label: 'Our Story', href: '#' },
        { label: 'Privacy Policy', href: '#' },
        { label: 'Store Locator', href: '#' },
        { label: 'Professional Partners', href: '#' },
        { label: 'Blog', href: '#' },
      ],
    },
    info: {
      title: 'COMPANY',
      links: [
        { label: 'About Us', href: '#' },
        { label: 'Product Finder', href: '#' },
        { label: 'Certifications', href: '#' },
        { label: 'Careers', href: '#' },
        { label: 'Press & Media', href: '#' },
      ],
    },
  };

  /**
   * Handles mouse enter event - shows credits and clears any pending hide timeout
   */
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setShowCredits(true);
  };

  /**
   * Handles mouse leave event - hides credits after 2 second delay
   */
  const handleMouseLeave = () => {
    timeoutRef.current = window.setTimeout(() => {
      setShowCredits(false);
    }, 2000);
  };

  return (
    <footer className="bg-gradient-to-b from-[#1a1a1a] to-black text-white">
      <div className="border-b border-gray-800/50">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-12 md:py-16 lg:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-10 lg:gap-12">
            {Object.values(FOOTER_SECTIONS).map((section, idx) => (
              <div key={idx}>
                <h3 className="text-xs font-semibold mb-6 tracking-[0.15em] text-gray-300">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link, index) => (
                    <li key={index}>
                      <a
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        className="text-sm text-gray-400 hover:text-white transition-colors duration-300 inline-block hover:translate-x-0.5 transform cursor-pointer"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h3 className="text-sm font-semibold mb-6 tracking-wider">CONNECT</h3>
              <div className="space-y-4 text-sm text-gray-400">
                <div>
                  <p className="font-medium text-white mb-1">1-800-LUXE-SKIN</p>
                  <p className="text-xs">Mon-Fri 9:00 - 18:00 EST</p>
                </div>
                <div>
                  <a href="mailto:hello@luxeskincare.com" className="hover:text-white transition-colors duration-300">
                    hello@luxeskincare.com
                  </a>
                </div>
                <div className="pt-2">
                  <p className="text-xs text-gray-500 mb-2">FOLLOW US</p>
                  <div className="flex gap-4">
                    <a href="https://instagram.com/luxeskincare" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300" aria-label="Instagram">
                      IG
                    </a>
                    <a href="#" className="hover:text-white transition-colors duration-300" aria-label="Facebook">
                      FB
                    </a>
                    <a href="#" className="hover:text-white transition-colors duration-300" aria-label="TikTok">
                      TK
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black/95 backdrop-blur-sm">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-6">
          <div className="flex flex-col items-center gap-4">
            <p className="text-xs text-gray-500 text-center">
              © {new Date().getFullYear()} LUXE Skincare. All rights reserved.
            </p>
            
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="text-[10px] tracking-[0.2em] text-gray-600 hover:text-gray-400 transition-all duration-300 uppercase font-light group text-center px-4 cursor-default"
              aria-label="Development credits"
            >
              <span className="inline-block group-hover:scale-[1.02] transition-transform duration-300">
                Crafted by Kazi Digital Studio
              </span>
            </div>

            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                showCredits
                  ? 'max-h-20 opacity-100'
                  : 'max-h-0 opacity-0'
              }`}
            >
              <p className="text-[10px] text-gray-700 text-center leading-relaxed px-4">
                <span className="inline-block">Shahzada Shah — Lead Developer</span>
                <span className="mx-2 text-gray-800 hidden sm:inline">•</span>
                <span className="inline-block">Jimmy Carrera — Creative Director</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
