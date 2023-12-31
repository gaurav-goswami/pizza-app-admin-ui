import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store";

const Dashboard = () => {
  const { user } = useAuthStore();
  if (user === null) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default Dashboard;
