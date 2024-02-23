import { Box, Paper, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import bgImage from "../assets/bg.jpg";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";
import Email from "../components/forms/register/Email";
import Password from "../components/forms/register/Password";
import { RegisterSchema } from "../components/schemas/Register";
import CustomButton from "../components/misc/CustomButton";

const Register = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      setLoading(true);
      axios
        .post("/pre-register", values)
        .then((res) => {
          if (res.data?.error) {
            toast.error(res.data.error);
            setLoading(false);
          } else {
            toast.success("Please check your email to activate account");
            setLoading(false);
            navigate("/");
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
              <Typography variant="h5">Sign Up</Typography>
              <Typography
                component={Link}
                variant="body2"
                sx={{ textDecoration: "none" }}
                color="primary"
                to="/login"
              >
                Already have an account?
              </Typography>
            </Stack>
            <Email formik={formik} id="email-signup" required={true} />
            <Password formik={formik} id="password-signup" required={true} />
            <Stack spacing={3} mt={5}>
              <Typography variant="subtitle1" sx={{ fontSize: "12px" }}>
                By Signing up, you agree to our &nbsp;
                <Link
                  variant="subtitle2"
                  to="#"
                  style={{ textDecoration: "none" }}
                >
                  Terms of Service
                </Link>
                &nbsp; and &nbsp;
                <Link
                  variant="subtitle2"
                  component={Link}
                  to="#"
                  style={{ textDecoration: "none" }}
                >
                  Privacy Policy
                </Link>
              </Typography>
              <CustomButton loading={loading} name="Create Account" />
            </Stack>
          </form>
        </Box>
      </Paper>
    </Box>
  );
};

export default Register;
