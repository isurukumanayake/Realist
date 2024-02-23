import { Box, LinearProgress, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/auth";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

function AccessAccount() {
  const { token } = useParams();

  const navigate = useNavigate();

  const { setAuth } = useAuth();

  useEffect(() => {
    axios
      .post("/access-account", { resetCode: token })
      .then((res) => {
        if (res.data?.error) {
          toast.error(res.data.error);
        } else {
          localStorage.setItem("auth", JSON.stringify(res.data));
          setAuth(res.data);
          toast("Please update your password in settings", {
            icon: <WarningAmberIcon color="warning" />,
          });
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong. Try again.");
      });
  }, [token]);

  return (
    <Box>
      <LinearProgress />
    </Box>
  );
}

export default AccessAccount;
