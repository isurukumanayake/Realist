import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import NewPassword from "./ChangePassword/NewPassword";
import ConfirmPassword from "./ChangePassword/ConfirmPassword";
import { ChangePasswordSchema } from "../../schemas/ChangePassword";

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);

  const [initialValues, setInitialValues] = useState({
    password: "",
    confirmPassword: "",
  });

  const formik = useFormik({
    initialValues,
    validationSchema: ChangePasswordSchema,
    onSubmit: (values) => {
      setLoading(true);
      axios
        .put("/update-password", values)
        .then((res) => {
          if (res.data?.error) {
            toast.error(res.data.error);
            setLoading(false);
            return;
          } else {
            toast.success("Password updated");
            setLoading(false);
            formik.resetForm();
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    },
  });

  return (
    <Box color="#454545" mt={5}>
      <Typography variant="h5" mb={1}>
        Sign in & Security
      </Typography>
      <Divider />
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ width: "50%" }}>
          <NewPassword formik={formik} />
          <ConfirmPassword formik={formik} />

          <Button
            type="submit"
            variant="outlined"
            disabled={loading}
            sx={{
              marginTop: "30px",
              textTransform: "none",
              width: "160px",
            }}
          >
            {loading ? (
              <CircularProgress
                variant="indeterminate"
                color="common"
                size={24}
                thickness={4}
              />
            ) : (
              "Change password"
            )}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ChangePassword;
