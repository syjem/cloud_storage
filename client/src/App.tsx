import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import SignInPage from '@/pages/sign-in';
import Files from '@/pages/files';
import Work from '@/pages/files/work';
import PrivateFiles from '@/pages/files/private';
import Images from '@/pages/images';
import Screenshots from '@/pages/images/screenshots';
import Uploader from '@/pages/images/uploader';
import Emails from '@/pages/emails';
import Inbox from '@/pages/emails/inbox';
import Trash from '@/pages/emails/trash';
import PrivateApp from '@/pages/private-app';
import PrivateRoute from '@/pages/private-route';
import PublicRoute from '@/pages/public-route';
import Links from '@/pages/links';
import Visited from '@/pages/links/visited';
import Favorites from '@/pages/images/favorites';

function App() {
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
      path: '/',
      element: (
        <PrivateRoute>
          <PrivateApp>
            <Outlet />
          </PrivateApp>
        </PrivateRoute>
      ),
      children: [
        {
          path: 'images',
          element: <Images />,
          children: [
            { path: 'screenshots', element: <Screenshots /> },
            { path: 'upload', element: <Uploader /> },
            { path: 'favorites', element: <Favorites /> },
          ],
        },
        {
          path: 'files',
          element: <Files />,
          children: [
            { path: 'work', element: <Work /> },
            { path: 'private', element: <PrivateFiles /> },
          ],
        },
        {
          path: 'emails',
          element: <Emails />,
          children: [
            { path: 'inbox', element: <Inbox /> },
            { path: 'trash', element: <Trash /> },
          ],
        },
        {
          path: 'links',
          element: <Links />,
          children: [{ path: 'visited', element: <Visited /> }],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
