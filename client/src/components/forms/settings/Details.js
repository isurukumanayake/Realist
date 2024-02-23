import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/auth";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";
import FullName from "./Details/FullName";
import Username from "./Details/Username";
import Phone from "./Details/Phone";
import Address from "./Details/Address";
import Company from "./Details/Company";
import Bio from "./Details/Bio";
import { ProfileDetailsSchema } from "../../schemas/ProfileDetails";

const Details = () => {
  const { auth, setAuth } = useAuth();

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    username: "",
    company: "",
    about: "",
  });

  useEffect(() => {
    if (!auth) {
      navigate("/login");
    } else {
      setInitialValues({
        name: auth.user?.name,
        email: auth.user?.email,
        phone: auth.user?.phone,
        address: auth.user?.address,
        username: auth.user?.username,
        company: auth.user?.company,
        about: auth.user?.about,
      });
    }
  }, [auth, navigate]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: ProfileDetailsSchema,
    onSubmit: (values) => {
      setLoading(true);
      axios
        .put("/update-profile", values)
        .then((res) => {
          if (res.data?.error) {
            toast.error(res.data.error);
            setLoading(false);
          } else {
            setAuth({ ...auth, user: res.data });

            let fromLS = JSON.parse(localStorage.getItem("auth"));
            fromLS.user = res.data;
            localStorage.setItem("auth", JSON.stringify(fromLS));

            toast.success("Profile updated successfully");
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    },
  });

  return (
    <Box color="#454545">
      <Typography variant="h5" mb={1}>
        Personal Info
      </Typography>
      <Divider />
      <Box sx={{ display: "flex" }} mt={2}>
        <Typography variant="body1" color="#2b3d66">
          Email:&nbsp;
        </Typography>
        <Typography variant="body1">{formik.values.email}</Typography>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ width: "50%" }}>
          <FullName formik={formik} />
          <Username formik={formik} />
          <Phone formik={formik} />
          <Address formik={formik} />
          <Company formik={formik} />
          <Bio formik={formik} />

          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{
              marginTop: "40px",
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
              "Update details"
            )}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Details;
