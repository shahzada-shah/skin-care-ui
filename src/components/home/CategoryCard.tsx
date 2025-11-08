/**
 * CategoryCard Component
 *
 * Elegant, minimalistic card for displaying skincare collections.
 * Features sophisticated hover effects and modern glass-morphism design.
 *
 * @component
 */

interface CategoryCardProps {
  title: string;
  imageUrl: string;
  subtitle: string;
}

export const CategoryCard = ({ title, subtitle, imageUrl }: CategoryCardProps) => {
  return (
    <div className="relative h-[500px] md:h-full overflow-hidden group cursor-pointer bg-neutral-50">
      {/* Background Image with Smooth Zoom */}
      <div className="absolute inset-0">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        
        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-transparent" />
      </div>

      {/* Content Overlay - More Refined */}
      <div className="relative h-full flex flex-col justify-between p-8 md:p-10 lg:p-12">
        {/* Title - Subtle and Elegant */}
        <div className="transition-all duration-700 ease-out group-hover:transform group-hover:-translate-y-1">
          <div className="inline-block backdrop-blur-sm bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 transition-all duration-500 group-hover:bg-white/10 group-hover:backdrop-blur group-hover:border-white/20">
            <h2 className="text-2xl md:text-3xl font-light uppercase tracking-[0.3em] text-white/95 drop-shadow-md transition-all duration-700">
              {title}
            </h2>
          </div>
        </div>

        {/* Subtitle and CTA - Refined and Subtle */}
        <div className="space-y-4 transition-all duration-700 ease-out group-hover:transform group-hover:translate-y-0.5">
          {/* Subtitle - More Understated */}
          <div className="backdrop-blur bg-white/5 px-4 py-3 rounded-xl max-w-[300px] border border-white/10 transition-all duration-500 group-hover:bg-white/10 group-hover:backdrop-blur-md group-hover:border-white/20">
            <p className="text-xs md:text-sm leading-relaxed text-white/90 font-light tracking-wide">
              {subtitle}
            </p>
          </div>
          
          {/* Refined Minimalist Button */}
          <button className="group/btn relative overflow-hidden bg-white/90 backdrop-blur-sm text-black px-7 py-2.5 rounded-full text-xs font-medium uppercase tracking-[0.2em] transition-all duration-500 hover:bg-black hover:text-white hover:scale-[1.01] hover:shadow-xl hover:shadow-black/10 active:scale-[0.99] border border-white/40 hover:border-black">
            <span className="relative z-10 transition-all duration-500">Shop Now</span>
            {/* Subtle Shine Effect */}
            <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </button>
        </div>
      </div>

      {/* Very Subtle Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      
      {/* Minimal Inner Border */}
      <div className="absolute inset-0 ring-1 ring-inset ring-white/0 group-hover:ring-white/5 transition-all duration-700 pointer-events-none" />
    </div>
  );
};
