import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store";
import { DASHBOARD_ROUTES } from "../utils/routeConstants";

const NonAuth = () => {
  const { user } = useAuthStore();
  if (user !== null) {
    return <Navigate to={DASHBOARD_ROUTES.root} />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default NonAuth;
