import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import SignInPage from '@/pages/sign-in';
import Dashboard from '@/pages/dashboard';
import { useAuthStore } from './stores/auth';
import React from 'react';

function App() {
  const PrivateRoute = ({ children }: { children: React.ReactElement }) => {
    const session = useAuthStore((state) => state.session);
    return session ? children : <Navigate to="/" replace />;
  };

  const PublicRoute = ({ children }: { children: React.ReactElement }) => {
    const session = useAuthStore((state) => state.session);
    return session ? <Navigate to="/dashboard" replace /> : children;
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <PublicRoute>
          <SignInPage />
        </PublicRoute>
      ),
    },
    {
      path: '/dashboard',
      element: (
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
