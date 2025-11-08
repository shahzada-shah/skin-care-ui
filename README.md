# LUXE Skincare E-Commerce Platform

> A modern, elegant e-commerce web application for luxury skincare products. Built with React, TypeScript, and Tailwind CSS with automated CI/CD deployment.

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://shahzada-shah.github.io/luxe-skincare/)
[![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-blue)](https://github.com/shahzada-shah/luxe-skincare/actions)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61dafb)](https://reactjs.org/)

**Live Demo**: [https://shahzada-shah.github.io/luxe-skincare/](https://shahzada-shah.github.io/luxe-skincare/)

---

## 📋 Project Overview

LUXE is a production-ready, full-featured e-commerce platform designed for luxury skincare brands. It demonstrates modern web development practices, clean architecture, and professional UI/UX design patterns.

### Key Highlights
- ✅ **Fully Responsive** - Optimized for mobile, tablet, and desktop
- ✅ **Type-Safe** - Built with TypeScript for robust code quality
- ✅ **Modern Stack** - React 18, Vite, Tailwind CSS
- ✅ **CI/CD Pipeline** - Automated deployment via GitHub Actions
- ✅ **Production Ready** - Optimized builds and performance
- ✅ **Clean Architecture** - Organized, maintainable codebase

---

## 🚀 Tech Stack

### Core Technologies
| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI Framework | 18.3 |
| **TypeScript** | Type Safety | 5.5 |
| **Vite** | Build Tool | 5.4 |
| **Tailwind CSS** | Styling | 3.4 |
| **React Router** | Navigation | 6.28 |
| **Lucide React** | Icons | Latest |

### DevOps & Tools
- **GitHub Actions** - Automated CI/CD pipeline
- **GitHub Pages** - Static site hosting
- **ESLint** - Code linting
- **npm** - Package management

---

## ✨ Features Implemented

### 🛍️ E-Commerce Functionality
- **Product Catalog** with advanced filtering (category, volume, price range)
- **Dynamic Product Detail Pages** with image galleries
- **Shopping Cart** with quantity management and persistent storage
- **Wishlist** functionality with localStorage persistence
- **Search** with real-time filtering across products
- **Product Carousels** with smooth scroll navigation

### 🎨 UI/UX Features
- **Elegant Loading Screen** with blur transitions
- **Responsive Navigation** with dropdown menus
- **Category Navigation** with circular icons
- **Promotion Bundles** slider with wishlisting
- **Instagram Feed** integration section
- **Custom Animations** and hover effects throughout

### 🔐 Authentication Pages
- **Login Page** with elegant form design
- **Sign-Up Page** with real-time password validation
- **Password Strength Indicator** with requirements checklist
- **Social Login Options** (Google, Facebook)

### 🛒 Checkout Experience
- **Multi-Step Checkout** (Cart → Shipping → Payment → Confirmation)
- **Progress Indicator** showing current step
- **Form Validation** with clean error handling
- **Order Summary** sidebar with live totals

### 🎯 Additional Features
- **Dark Mode Compatible** design system
- **Custom Hooks** for reusable logic
- **Event-Driven Updates** for cart/wishlist
- **Accessibility** considerations
- **SEO-Friendly** routing structure

---

## 📁 Project Structure

```
luxe-skincare/
├── .github/
│   └── workflows/
│       └── deploy.yml          # CI/CD pipeline configuration
├── public/
│   └── images/                 # Static assets
│       ├── categories/         # Category images
│       ├── products/           # Product images
│       ├── bundles/            # Bundle promotional images
│       └── instagram/          # Social media content
├── src/
│   ├── components/             # React components
│   │   ├── common/            # Reusable components (Loader, etc.)
│   │   ├── home/              # Homepage sections
│   │   ├── layout/            # Layout components (Header, Footer)
│   │   └── product/           # Product-related components
│   ├── config/                # App configuration
│   │   └── routes.tsx         # Centralized routing
│   ├── constants/             # App constants
│   ├── contexts/              # React Context providers
│   ├── data/                  # Mock data
│   │   └── mockProducts.ts    # Product database (12 items)
│   ├── hooks/                 # Custom React hooks
│   ├── pages/                 # Page components
│   ├── types/                 # TypeScript interfaces
│   └── utils/                 # Utility functions
└── package.json
```

---

## 🎯 Core Accomplishments

### 1. **Professional UI/UX Design**
- Minimalist, luxury aesthetic matching high-end skincare brands
- Subtle animations and transitions for premium feel
- Responsive design tested across all device sizes
- Hover effects, blur overlays, and smooth scrolling

### 2. **State Management**
- LocalStorage integration for cart/wishlist persistence
- Custom hooks for managing dropdown states
- Event-driven architecture for cross-component updates
- Type-safe storage utilities

### 3. **Dynamic Routing**
- React Router v6 with nested routes
- Dynamic product detail pages
- Proper basename configuration for GitHub Pages
- Route constants for maintainability

### 4. **Form Handling**
- Real-time password validation
- Multi-step form flows
- Input sanitization
- Disabled autocomplete for security

### 5. **CI/CD Pipeline**
- Automated build on every push to main
- GitHub Actions workflow
- Optimized production builds
- Automatic deployment to GitHub Pages

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/shahzada-shah/luxe-skincare.git

# Navigate to project directory
cd luxe-skincare

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

---

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## 🔄 CI/CD Pipeline

The project includes a fully configured GitHub Actions workflow that:

1. **Triggers** on every push to the `main` branch
2. **Installs** dependencies using npm ci
3. **Builds** the project with Vite
4. **Deploys** to GitHub Pages automatically
5. **Serves** the site at the live URL

**Workflow File**: `.github/workflows/deploy.yml`

### Deployment Process
```
Push to Main → GitHub Actions → Build → Deploy → Live Site
```

---

## 🎨 Design System

### Color Palette
- **Primary**: Black (#000000)
- **Secondary**: Grayscale (#1a1a1a, #4a4a4a, #f5f5f5)
- **Accent**: White (#ffffff)
- **Success**: Green (#10b981)

### Typography
- **Headings**: Light to Medium weight
- **Body**: System font stack
- **Tracking**: Wide letter spacing for luxury feel

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

---

## 🔑 Key Components

### Custom Hooks
- `useProductFilters` - Advanced filtering logic
- `useCarousel` - Reusable carousel functionality
- `useStorageCounts` - Cart/wishlist counter management
- `useDropdowns` - Dropdown state management
- `useClickOutside` - Click-outside detection

### Utility Functions
- `storage.ts` - Type-safe localStorage wrapper
- Event dispatching for UI updates
- Cart and wishlist operations

---

## 📱 Responsive Design

All components are fully responsive with:
- Mobile-first approach
- Fluid typography
- Flexible grid layouts
- Touch-optimized interactions
- Conditional rendering for different screen sizes

---

## 🎓 Learning Outcomes

This project demonstrates proficiency in:

- ✅ **React Development** - Functional components, hooks, context
- ✅ **TypeScript** - Interfaces, type safety, generics
- ✅ **State Management** - LocalStorage, custom hooks, event-driven updates
- ✅ **Routing** - React Router v6, nested routes, dynamic routing
- ✅ **Styling** - Tailwind CSS, responsive design, animations
- ✅ **Build Tools** - Vite configuration, optimization
- ✅ **CI/CD** - GitHub Actions, automated deployment
- ✅ **Git Workflow** - Clean commits, professional commit messages
- ✅ **Code Organization** - Modular architecture, separation of concerns
- ✅ **Best Practices** - Type safety, code splitting, performance optimization

---

## 🌐 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## 📈 Performance

- **Optimized Bundle Size** - Code splitting and tree shaking
- **Lazy Loading** - Route-based code splitting
- **Efficient Rendering** - Minimal re-renders
- **Fast Load Times** - Optimized assets

---

## 👨‍💻 Developer

**Shahzada Shah**  
- Full-Stack Developer specializing in modern web applications
- Proficient in React, TypeScript, Node.js, and cloud deployment
- Focus on clean code, user experience, and scalable architecture

---

## 📄 License

This project is proprietary and was built as a portfolio demonstration piece.

---

## 🙏 Acknowledgments

- Designed and developed by Kazi Digital Studio
- Icons by Lucide React
- Hosted on GitHub Pages

---

**Built with ❤️ and attention to detail**
