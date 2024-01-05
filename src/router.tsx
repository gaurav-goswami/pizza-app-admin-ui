import { createBrowserRouter } from "react-router-dom";
import { DASHBOARD_ROUTES, NON_AUTH_ROUTES } from "./utils/routeConstants";
// layouts
import Root from "./Layouts/Root";
import Dashboard from "./Layouts/Dashboard";
import NonAuth from "./Layouts/NonAuth";

// Protected pages
import DashboardPage from "./pages/ProtectedRoutes/Dashboard/Dashboard";

import Login from "./pages/login/Login";
import Users from "./pages/ProtectedRoutes/Dashboard/Users/Users";
import Restaurants from "./pages/ProtectedRoutes/Dashboard/Restaurants/Restaurants";
import Products from "./pages/ProtectedRoutes/Dashboard/Products/Products";
import Promos from "./pages/ProtectedRoutes/Dashboard/Promos/Promos";

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
          {
            path: DASHBOARD_ROUTES.users,
            element: <Users />,
          },
          {
            path: DASHBOARD_ROUTES.restaurants,
            element: <Restaurants />,
          },
          {
            path: DASHBOARD_ROUTES.products,
            element: <Products />,
          },
          {
            path: DASHBOARD_ROUTES.promos,
            element: <Promos />,
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
