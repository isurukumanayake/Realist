import {
  Box,
  Checkbox,
  FormControlLabel,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import bgImage from "../assets/bg.jpg";
import logo from "../assets/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/auth";
import Email from "../components/forms/register/Email";
import Password from "../components/forms/register/Password";
import CustomButton from "../components/misc/CustomButton";
import { LoginSchema } from "../components/schemas/Login";

const Login = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { setAuth } = useAuth();

  const location = useLocation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      setLoading(true);
      axios
        .post("/login", values)
        .then((res) => {
          if (res.data?.error) {
            toast.error(res.data.error);
            setLoading(false);
          } else {
            setAuth(res.data);
            localStorage.setItem("auth", JSON.stringify(res.data));
            setLoading(false);

            if (location.state?.from) {
              navigate(location.state.from);
            } else {
              navigate("/");
            }
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something went wrong. Try again.");
          setLoading(false);
        });
    },
  });

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src={bgImage}
        alt="background"
        style={{
          position: "absolute",
          zIndex: "-100",
          width: "100vw",
          height: "100vh",
          opacity: "0.8",
          filter: "blur(1px)",
          objectFit: "cover",
        }}
      />

      <Link to="/">
        <img
          src={logo}
          alt="Realist"
          style={{
            position: "absolute",
            top: "16px",
            left: "16px",
            height: "50px",
            zIndex: "2",
          }}
        />
      </Link>

      <Paper elevation={8}>
        <Box sx={{ width: "auto", backgroundColor: "white", padding: "48px" }}>
          <form onSubmit={formik.handleSubmit}>
            <Stack
              spacing={1}
              direction="row"
              justifyContent="space-between"
              alignItems="baseline"
            >
              <Typography variant="h5">Login</Typography>
              <Typography
                component={Link}
                variant="body2"
                sx={{ textDecoration: "none" }}
                color="primary"
                to="/register"
              >
                Don't have an account?
              </Typography>
            </Stack>
            <Email formik={formik} id="email-login" />
            <Password formik={formik} id="password-login" />
            <Stack
              spacing={16.3}
              mt={3}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <FormControlLabel
                control={<Checkbox size="small" edge="start" />}
                label={
                  <Typography variant="body2" color="#5A5A5A">
                    Keep me signed in
                  </Typography>
                }
              />
              <Link
                to="/auth/forgot-password"
                style={{
                  textDecoration: "none",
                  color: "#5A5A5A",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.textDecoration = "underline")
                }
                onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
              >
                Forgot Password?
              </Link>
            </Stack>
            <Stack spacing={3} mt={3}>
              <CustomButton loading={loading} name="Login" />
            </Stack>
          </form>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
