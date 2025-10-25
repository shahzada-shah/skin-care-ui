/**
 * MainLayout Component
 *
 * Wraps all pages with consistent header, footer, and top bar.
 * Provides the main structure for the application.
 */

import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { TopBar, Header, PromoBanner, Footer } from '../components/layout';
import { ScrollToTopButton } from '../components/common';
import { useScrollToTop } from '../hooks';

interface MainLayoutProps {
  children?: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  useScrollToTop();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <TopBar />
      <Header />
      <PromoBanner />
      <main className="flex-grow">{children || <Outlet />}</main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};
