import { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { MainLayout } from './layouts/MainLayout';

const Dashboard = lazy(() => import('./pages/Dashboard').then((m) => ({ default: m.Dashboard })));
const Societies = lazy(() => import('./pages/Societies').then((m) => ({ default: m.Societies })));
const Events = lazy(() => import('./pages/Events').then((m) => ({ default: m.Events })));
const AI = lazy(() => import('./pages/AI').then((m) => ({ default: m.AI })));

function PageFallback() {
  return (
    <div className="flex items-center justify-center min-h-[40vh]">
      <div className="w-10 h-10 rounded-full border-2 border-neon-cyan dark:border-neon-purple border-t-transparent animate-spin" />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ThemeProvider>
        <AuthProvider>
          <MainLayout />
        </AuthProvider>
      </ThemeProvider>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageFallback />}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: '/societies',
        element: (
          <Suspense fallback={<PageFallback />}>
            <Societies />
          </Suspense>
        ),
      },
      {
        path: '/events',
        element: (
          <Suspense fallback={<PageFallback />}>
            <Events />
          </Suspense>
        ),
      },
      {
        path: '/ai',
        element: (
          <Suspense fallback={<PageFallback />}>
            <AI />
          </Suspense>
        ),
      },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
