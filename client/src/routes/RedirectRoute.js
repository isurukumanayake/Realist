import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function RedirectRoute() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 700);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  if (loading) {
    return;
  }

  return <Navigate to="/login" state={{ from: window.location.pathname }} />;
}

export default RedirectRoute;
