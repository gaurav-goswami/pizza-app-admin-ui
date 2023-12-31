import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/login/Login";
import Dashboard from "./Layouts/Dashboard";
import NonAuth from "./Layouts/NonAuth";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
  {
    path: '/auth',
    element: <NonAuth />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
    ]
  },
]);
