import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./Components/Layout/Layout";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Profile from "./Pages/Profile/Profile";
import Recommendation from "./Pages/Recommendation/Recommendation";
import NotFound from "./Pages/NotFound/NotFound";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "profile",
          element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          ),
        },
        {
          path: "recommendation",
          element: (
            <ProtectedRoute>
              <Recommendation />
            </ProtectedRoute>
          ),
        },
      ],
      errorElement: <NotFound />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
