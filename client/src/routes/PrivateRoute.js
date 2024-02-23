import React from "react";
import { useAuth } from "../contexts/auth";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
  const { auth } = useAuth();

  return auth?.token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: window.location.pathname }} />
  );
}

export default PrivateRoute;
