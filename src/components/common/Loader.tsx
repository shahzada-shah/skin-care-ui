/**
 * Loader Component
 *
 * Full-screen intro loader displayed before the application loads.
 * Features an elegant CONTE' brand animation with smooth blur fade transitions.
 *
 * Animation Sequence:
 * 1. Logo fades in and scales up
 * 2. Logo pulses gently
 * 3. Logo fades out with blur effect
 * 4. Main content fades in from blur
 *
 * Timing:
 * - Logo appears at 0s
 * - Displays for 2s
 * - Fades out with blur over 0.8s
 * - Total duration: 2.8s
 *
 * @component
 */

import { useEffect, useState } from 'react';

interface LoaderProps {
  onLoadingComplete?: () => void;
}

export const Loader = ({ onLoadingComplete }: LoaderProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const fadeOutTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 2000);

    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 2800);

    const completeTimer = setTimeout(() => {
      onLoadingComplete?.();
    }, 2800);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(hideTimer);
      clearTimeout(completeTimer);
    };
  }, [onLoadingComplete]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 bg-white z-50 flex items-center justify-center transition-all duration-[800ms] ease-out ${
        isFadingOut ? 'opacity-0 blur-loader' : 'opacity-100'
      }`}
      role="status"
      aria-label="Loading application"
    >
      <div className="text-center animate-fade-in">
        {/* Brand Logo */}
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-light tracking-[0.3em] text-black animate-pulse-subtle">
          LUXE
        </h1>

        {/* Optional subtitle */}
        <p className="mt-4 text-sm md:text-base tracking-widest text-gray-400 uppercase animate-fade-in-delayed">
          Skincare & Beauty
        </p>
      </div>

      {/* Custom animations */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fade-in-delayed {
          0%, 30% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse-subtle {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.9;
            transform: scale(1.02);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }

        .animate-fade-in-delayed {
          animation: fade-in-delayed 1s ease-out forwards;
        }

        .animate-pulse-subtle {
          animation: pulse-subtle 2s ease-in-out infinite;
        }

        .blur-loader {
          filter: blur(20px);
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
};
