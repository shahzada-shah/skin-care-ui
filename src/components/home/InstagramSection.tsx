/**
 * InstagramSection Component
 *
 * Social media integration section with Instagram post gallery.
 * Encourages user engagement through social media.
 *
 * Features:
 * - Horizontally scrollable gallery of Instagram posts
 * - Gradient fade on edges for visual polish
 * - Direct link to Instagram profile
 * - Hashtag call-to-action
 *
 * Layout:
 * - Header with title and Instagram CTA button
 * - Description with hashtag information
 * - Scrolling gallery of posts (6 items)
 *
 * Post Cards:
 * - Fixed width: 224px (mobile), 256px (tablet), 288px (desktop)
 * - 3:4 aspect ratio (portrait)
 * - Hover effects: Shadow elevation and subtle scale
 *
 * @component
 */

const instagramPosts = [
  { id: 1, imageUrl: '/images/instagram/ig_01.png', aspectRatio: '3/4' },
  { id: 2, imageUrl: '/images/instagram/ig_02.png', aspectRatio: '3/4' },
  { id: 3, imageUrl: '/images/instagram/ig_03.png', aspectRatio: '3/4' },
  { id: 4, imageUrl: '/images/instagram/ig_4.png', aspectRatio: '3/4' },
  { id: 5, imageUrl: '/images/instagram/ig_5.png', aspectRatio: '3/4' },
  { id: 6, imageUrl: '/images/instagram/ig_06.png', aspectRatio: '3/4' },
];

export const InstagramSection = () => {
  

  return (
    <section className="bg-white py-12 md:py-16 lg:py-20 overflow-hidden" aria-label="Instagram Feed">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        {/* Header Section */}
        <div className="mb-8 md:mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-8 mb-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide">
              follow us on INSTAGRAM
            </h2>
            <a
              href="https://instagram.com/luxeskincare"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-black text-white px-6 md:px-8 py-3 md:py-3.5 rounded-full text-sm md:text-base font-medium hover:bg-gray-800 transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-lg self-start"
              aria-label="Visit Luxe Instagram profile"
            >
              @luxeskincare
            </a>
          </div>

          {/* Call to Action Description */}
          <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-3xl">
            Share your LUXE skincare routine on Instagram with the tag #LuxeGlow and get a chance to be featured on our online store page.
          </p>
        </div>

        {/* Scrolling Gallery */}
        <div className="relative -mx-4 md:-mx-6">
          {/* Edge Gradient Overlays for Visual Polish */}
          <div
            className="absolute left-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"
            aria-hidden="true"
          />

          {/* Scrollable Post Container */}
          <div className="overflow-x-auto scrollbar-hide" role="list">
            <div className="flex gap-3 md:gap-4 px-4 md:px-6 pb-4">
              {instagramPosts.map((post) => (
                <a
                  key={post.id}
                  href="https://instagram.com/luxeskincare"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 w-56 md:w-64 lg:w-72 group cursor-pointer"
                  role="listitem"
                  aria-label={`Instagram post ${post.id}`}
                >
                  <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.02]">
                    <div style={{ aspectRatio: post.aspectRatio }}>
                      <img
                        src={post.imageUrl}
                        alt={`LUXE Skincare Instagram post ${post.id}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    {/* Hover Overlay Effect */}
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-lg" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hide scrollbar while maintaining functionality */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};
