import { useEffect, useState } from 'react';

const PROMO_MESSAGES = [
  '-15% discount on your first order',
  'Free shipping on orders over $100',
  '-15% discount on your first order',
  'Free shipping on orders over $100',
  '-15% discount on your first order',
  'Free shipping on orders over $100',
];

export const PromoBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % PROMO_MESSAGES.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black text-white py-2 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        <div className="relative h-5 flex items-center justify-center">
          {PROMO_MESSAGES.map((message, index) => (
            <div
              key={index}
              className={`absolute inset-0 flex items-center justify-center text-xs md:text-sm transition-all duration-500 ${
                index === currentIndex
                  ? 'opacity-100 translate-y-0'
                  : index < currentIndex
                  ? 'opacity-0 -translate-y-full'
                  : 'opacity-0 translate-y-full'
              }`}
            >
              {message}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
