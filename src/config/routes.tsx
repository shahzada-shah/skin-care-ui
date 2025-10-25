/**
 * Route Configuration
 *
 * Central location for all application routes.
 */

import { RouteObject } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { HomePage } from '../pages/HomePage';
import { CatalogPage } from '../pages/CatalogPage';
import { ProductDetailPage } from '../pages/ProductDetailPage';
import { NewPage } from '../pages/NewPage';
import { SalesPage } from '../pages/SalesPage';
import { ContactsPage } from '../pages/ContactsPage';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'catalog',
        element: <CatalogPage />,
      },
      {
        path: 'product/:id',
        element: <ProductDetailPage />,
      },
      {
        path: 'new',
        element: <NewPage />,
      },
      {
        path: 'sales',
        element: <SalesPage />,
      },
      {
        path: 'contacts',
        element: <ContactsPage />,
      },
    ],
  },
];

export const ROUTES = {
  HOME: '/',
  CATALOG: '/catalog',
  PRODUCT: '/product',
  NEW: '/new',
  SALES: '/sales',
  CONTACTS: '/contacts',
} as const;

export const getProductRoute = (productId: string) => `${ROUTES.PRODUCT}/${productId}`;
