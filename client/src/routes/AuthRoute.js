import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/auth";
import { Navigate, Outlet } from "react-router-dom";

function AuthRoute() {
  const { auth } = useAuth();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  if (loading) {
    return;
  }

  return auth?.user ? <Navigate to="/" replace /> : <Outlet />;
}

export default AuthRoute;
