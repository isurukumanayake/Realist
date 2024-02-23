import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/auth";
import axios from "axios";
import { Outlet } from "react-router-dom";
import RedirectRoute from "./RedirectRoute";

function PrivateRoute() {
  const { auth } = useAuth();

  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (auth?.token) {
      getCurrentUser();
    }
  }, [auth?.token]);

  const getCurrentUser = async () => {
    await axios
      .get("/current-user")
      .then((res) => {
        setOk(true);
      })
      .catch((err) => {
        console.log(err);
        setOk(false);
      });
  };

  return ok ? <Outlet /> : <RedirectRoute />;
}

export default PrivateRoute;
