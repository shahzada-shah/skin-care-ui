# CONTE' E-Commerce Platform

Modern, elegant e-commerce platform for the CONTE' fashion brand. Built with React, TypeScript, and Tailwind CSS.

## Overview

A production-ready e-commerce application featuring:
- Elegant intro loader with blur transitions
- Responsive product catalog with advanced filtering
- Interactive product detail pages
- Shopping cart and wishlist functionality
- Clean, minimalist design aesthetic

## Tech Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router v7
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Database**: Supabase (configured but not yet implemented)

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── common/          # Shared components (Loader, Placeholders)
│   ├── home/            # Home page sections
│   ├── layout/          # Layout components (Header, Footer)
│   └── product/         # Product-related components
├── config/              # Configuration files (routes)
├── constants/           # Application constants
├── data/                # Mock data
├── hooks/               # Custom React hooks
├── layouts/             # Layout wrappers
├── pages/               # Page components
├── types/               # TypeScript type definitions
└── utils/               # Utility functions
```

## Key Features

### 1. Intro Loader
- Smooth blur fade transitions
- 2.8s cinematic loading experience
- Brand logo animation with subtle pulse effect
- Seamless transition to main application

### 2. Home Page
- **HeroSection**: Split layout showcasing collections
- **CategoriesSection**: Category navigation + new arrivals carousel
- **PromotionsSection**: Grid of promotional cards
- **FeaturedSection**: Alternating image/content layout
- **InstagramSection**: Social media gallery with scrolling

### 3. Product Catalog (/new)
- Advanced filtering (category, color, size, price)
- Responsive grid layout
- Real-time filter updates
- Empty state handling
- Product count display

### 4. Product Details
- Image gallery with thumbnails
- Color and size selection
- Quantity controls
- Add to cart/wishlist
- Collapsible product information
- Related products carousel

### 5. Shopping Experience
- Cart dropdown with real-time updates
- Wishlist functionality
- LocalStorage persistence
- Item quantity management
- Price calculations

## Component Documentation

### Common Components

**Loader** (`components/common/Loader.tsx`)
- Full-screen intro loader
- Blur fade transitions (800ms)
- Automatic timing (2.8s total)

**ImagePlaceholder** (`components/common/ImagePlaceholder.tsx`)
- Wireframe-style image placeholder
- Shows dimensions and labels
- Used for mockups

**PagePlaceholder** (`components/common/PagePlaceholder.tsx`)
- Placeholder for unimplemented pages
- CONTE' branded styling

### Home Components

All home components are fully documented with:
- Component purpose and features
- Layout breakpoints (mobile/tablet/desktop)
- Animation details
- Hover effects
- Usage examples

### Product Components

**ProductCard** - Individual product display with hover effects
**ProductGrid** - Responsive product grid layout
**ProductCarousel** - Scrollable product carousel
**FilterSidebar** - Advanced filtering interface
**ProductListingHeader** - Page header with count

### Layout Components

**TopBar** - Utility bar with certificates and contact info
**Header** - Main navigation with dropdowns
**PromoBanner** - Animated scrolling banner
**Footer** - Site footer with links and info

## Hooks

**useProductFilters** - Advanced product filtering logic
**useDropdowns** - Dropdown state management
**useStorageCounts** - Cart/wishlist count tracking
**useClickOutside** - Click outside detection

## Utilities

**storage.ts** - LocalStorage wrapper with type safety
- Cart operations (add, remove, update)
- Wishlist operations
- Event dispatching for UI updates

## Styling

### Design System
- **Font**: System font stack (light, normal, medium)
- **Colors**: Neutral palette (black, gray, white)
- **Spacing**: 8px grid system
- **Breakpoints**:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px

### Animation Principles
- Smooth transitions (300ms - 700ms)
- Subtle hover effects (scale, shadow, opacity)
- Blur effects for premium feel
- Ease-out timing for natural movement

## Routes

- `/` - Home page
- `/new` - New arrivals with filters
- `/catalog` - Product catalog (placeholder)
- `/product/:id` - Product detail page
- `/sales` - Sales page (placeholder)
- `/contacts` - Contact page (placeholder)

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run typecheck

# Lint code
npm run lint
```

## Development Guidelines

### Code Style
- All components must have JSDoc comments
- Use TypeScript for type safety
- Follow single responsibility principle
- Keep files under 300 lines when possible
- Use descriptive variable names

### Component Guidelines
- Always provide proper TypeScript interfaces
- Document all props with descriptions
- Include usage examples in JSDoc
- Add inline comments for complex logic
- Use semantic HTML elements

### Responsive Design
- Mobile-first approach
- Test all breakpoints
- Use Tailwind responsive classes
- Ensure text remains readable
- Maintain proper touch targets (44px min)

## Future Enhancements

- [ ] Supabase database integration
- [ ] User authentication
- [ ] Order management system
- [ ] Payment integration
- [ ] Product search functionality
- [ ] Product reviews and ratings
- [ ] Email notifications
- [ ] Admin dashboard

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Optimized bundle size
- Lazy loading for routes
- Image optimization ready
- Efficient state management
- Minimal re-renders

## License

Proprietary - CONTE' Fashion Brand

---

Built with attention to detail and a focus on user experience.
