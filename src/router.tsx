import { createBrowserRouter } from "react-router-dom";
import { DASHBOARD_ROUTES, NON_AUTH_ROUTES } from "./utils/routeConstants";
// layouts
import Root from "./Layouts/Root";
import Dashboard from "./Layouts/Dashboard";
import NonAuth from "./Layouts/NonAuth";

// Protected pages
import DashboardPage from "./pages/ProtectedRoutes/Dashboard/Dashboard";

import Login from "./pages/login/Login";

export const router = createBrowserRouter([
  {
    path: DASHBOARD_ROUTES.root,
    element: <Root />,
    children: [
      {
        path: "",
        element: <Dashboard />,
        children: [
          {
            path: "",
            element: <DashboardPage />,
          },
        ],
      },
      {
        path: NON_AUTH_ROUTES.auth,
        element: <NonAuth />,
        children: [
          {
            path: NON_AUTH_ROUTES.login,
            element: <Login />,
          },
        ],
      },
    ],
  },
]);
