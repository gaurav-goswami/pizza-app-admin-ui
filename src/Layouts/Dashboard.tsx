import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store";
import { NON_AUTH_ROUTES } from "../utils/routeConstants";
import DashboardSideBar from "../Components/General/DashboardSideBar";

const Dashboard = () => {
  const { user } = useAuthStore();
  if (user === null) {
    return <Navigate to={`${NON_AUTH_ROUTES.auth}/${NON_AUTH_ROUTES.login}`} />;
  }

  return (
    <>
      <DashboardSideBar>
        <Outlet />
      </DashboardSideBar>
    </>
  );
};

export default Dashboard;
