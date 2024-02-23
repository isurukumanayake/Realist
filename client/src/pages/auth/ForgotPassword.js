import {
  Box,
  Button,
  CircularProgress,
  InputLabel,
  OutlinedInput,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import bgImage from "../../assets/bg.jpg";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";

function ForgotPassword() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      setLoading(true);
      axios
        .post("/forgot-password", values)
        .then((res) => {
          if (res.data?.error) {
            toast.error(res.data.error);
            setLoading(false);
          } else {
            toast.success("Password reset mail sent");
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
        <Box
          sx={{
            backgroundColor: "white",
            padding: "48px",
            width: "470px",
          }}
        >
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={1}>
              <Typography variant="h5">Forgot Password</Typography>
            </Stack>
            <Stack spacing={1} mt={3}>
              <InputLabel htmlFor="email-signup">
                Please enter your email
              </InputLabel>
              <OutlinedInput
                id="email-signup"
                name="email"
                placeholder="demo@company.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                sx={{
                  height: "50px",
                }}
              />
            </Stack>
            <Stack spacing={3} mt={5}>
              <Button type="submit" variant="contained" disabled={loading}>
                {loading ? (
                  <CircularProgress
                    variant="indeterminate"
                    color="common"
                    size={24}
                    thickness={4}
                  />
                ) : (
                  "Submit"
                )}
              </Button>
            </Stack>
          </form>
        </Box>
      </Paper>
    </Box>
  );
}

export default ForgotPassword;
