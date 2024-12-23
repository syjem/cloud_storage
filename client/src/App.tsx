import { createBrowserRouter, RouterProvider } from "react-router-dom"
import SignInPage from "@/pages/sign-in"
import Dashboard from "@/pages/dashboard"

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <SignInPage />
    },
    {
      path: '/dashboard',
      element: <Dashboard />
    }
  ])

  return <RouterProvider router={router} />

}

export default App

