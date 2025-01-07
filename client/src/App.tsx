import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import SignInPage from '@/pages/sign-in';
import Files from '@/pages/files';
import Work from '@/pages/files/work';
import PrivateFiles from '@/pages/files/private';
import Images from '@/pages/images';
import Personal from '@/pages/images/personal';
import Screenshots from '@/pages/images/screenshots';
import Important from '@/pages/images/important';
import Emails from '@/pages/emails';
import Inbox from '@/pages/emails/inbox';
import Trash from '@/pages/emails/trash';
import PrivateApp from '@/pages/private-app';
import PrivateRoute from '@/pages/private-route';
import PublicRoute from '@/pages/public-route';
import Links from '@/pages/links';
import Visited from '@/pages/links/visited';

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
            { path: 'personal', element: <Personal /> },
            { path: 'screenshots', element: <Screenshots /> },
            { path: 'important', element: <Important /> },
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
