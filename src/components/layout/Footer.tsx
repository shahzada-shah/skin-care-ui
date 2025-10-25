import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';

export const Footer = () => {
  const [showCredits, setShowCredits] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const FOOTER_SECTIONS = {
    service: {
      title: 'SERVICE',
      links: [
        { label: 'Sales Rules', href: '#' },
        { label: 'Loyalty Program', href: '#' },
        { label: 'Cookie Settings', href: '#' },
      ],
    },
    additional: {
      title: 'ADDITIONAL',
      links: [
        { label: 'Promotions and Discounts', href: '#' },
        { label: 'Fitting', href: '#' },
        { label: 'Size Guide', href: '#' },
        { label: 'FAQ', href: '#' },
        { label: 'About Certificate', href: '#' },
        { label: 'Contact Us', href: '/contacts' },
        { label: 'Blog', href: '#' },
      ],
    },
    shop: {
      title: 'LUXESHOP',
      links: [
        { label: 'Catalog', href: '/catalog' },
        { label: 'About Company', href: '#' },
        { label: 'Privacy Policy', href: '#' },
        { label: 'Store Locations', href: '#' },
        { label: 'Partnership and Advertising', href: '#' },
        { label: 'Blog', href: '#' },
      ],
    },
    info: {
      title: 'INFORMATION',
      links: [
        { label: 'Sitemap', href: '#' },
        { label: 'Advanced Search', href: '#' },
        { label: 'Certificates', href: '#' },
        { label: 'Careers at Luxe', href: '#' },
        { label: 'Franchise at Luxe', href: '#' },
      ],
    },
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setShowCredits(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = window.setTimeout(() => {
      setShowCredits(false);
    }, 2000);
  };

  return (
    <footer className="bg-[#1a1a1a] text-white">
      <div className="border-b border-gray-800">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-12 md:py-16 lg:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-10 lg:gap-12">
            {Object.values(FOOTER_SECTIONS).map((section, idx) => (
              <div key={idx}>
                <h3 className="text-sm font-semibold mb-6 tracking-wider">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link, index) => (
                    <li key={index}>
                      <Link
                        to={link.href}
                        className="text-sm text-gray-400 hover:text-white transition-colors duration-300"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h3 className="text-sm font-semibold mb-6 tracking-wider">CONTACTS</h3>
              <div className="space-y-4 text-sm text-gray-400">
                <div>
                  <p className="font-medium text-white mb-1">+375 17 336 42 83</p>
                  <p className="text-xs">8:00 - 23:00</p>
                </div>
                <div>
                  <a href="mailto:shop@luxeshop.com" className="hover:text-white transition-colors">
                    shop@luxeshop.com
                  </a>
                </div>
                <div>
                  <p>Republic of Belarus,</p>
                  <p>Minsk, ul. Nemiga 5</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-8">
          <div className="flex flex-col items-center gap-3">
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="text-xs tracking-[0.2em] text-gray-500 hover:text-gray-300 transition-all duration-300 uppercase font-light group"
              aria-label="Development credits"
            >
              <span className="inline-block group-hover:scale-[1.02] transition-transform duration-300">
                DEVELOPED BY KAZI DIGITAL STUDIO
              </span>
            </div>

            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                showCredits
                  ? 'max-h-20 opacity-100'
                  : 'max-h-0 opacity-0'
              }`}
            >
              <p className="text-[11px] text-gray-600 text-center leading-relaxed pt-2">
                <span className="inline-block">Shahzada Shah - Lead Senior Developer</span>
                <span className="mx-2 text-gray-700">|</span>
                <span className="inline-block">Jimmy Carrera - Lead Designer</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
