import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/login/Login";
import Dashboard from "./Layouts/Dashboard";
import NonAuth from "./Layouts/NonAuth";
import Root from "./Layouts/Root";
import { DASHBOARD_ROUTES, NON_AUTH_ROUTES } from "./utils/routeConstants";

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
            element: <HomePage />,
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
