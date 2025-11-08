/**
 * App Component
 *
 * Root application component with routing configuration.
 * Manages the intro loader with smooth blur transitions before displaying the main application.
 *
 * Flow:
 * 1. Shows Loader component on initial load
 * 2. Loader fades out with blur effect after 2s
 * 3. Main content fades in from blur at 2.8s
 * 4. Routes managed by centralized config (config/routes.tsx)
 *
 * @component
 */

import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './config/routes';
import { Loader } from './components/common';

const router = createBrowserRouter(routes, {
  basename: import.meta.env.BASE_URL,
});

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <Loader onLoadingComplete={handleLoadingComplete} />}
      <div
        className={`transition-all duration-700 ease-out ${
          isLoading ? 'opacity-0 blur-md scale-105' : 'opacity-100 blur-0 scale-100'
        }`}
      >
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
