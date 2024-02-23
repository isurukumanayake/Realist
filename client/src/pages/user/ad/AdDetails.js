import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  FormHelperText,
  Typography,
} from "@mui/material";
import { rentMenu, sellMenu } from "../../../constants/AdConstants";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CategoryMenu from "../../../components/forms/CategoryMenu";
import ImagePicker from "../../../components/forms/ImagePicker";
import { useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../../contexts/auth";
import { RiErrorWarningLine } from "react-icons/ri";
import { AdSchema } from "../../../components/schemas/Ad";
import Address from "../../../components/forms/ad/Address";
import PropertyType from "../../../components/forms/ad/PropertyType";
import Rooms from "../../../components/forms/ad/Rooms";
import Parkings from "../../../components/forms/ad/Parkings";
import LandSize from "../../../components/forms/ad/LandSize";
import PropertySize from "../../../components/forms/ad/PropertySize";
import Title from "../../../components/forms/ad/Title";
import Description from "../../../components/forms/ad/Description";
import Price from "../../../components/forms/ad/Price";
import CommonLayout from "../../../layouts/CommonLayout";

function AdDetails() {
  const location = useLocation();

  const { auth, setAuth } = useAuth();

  const queryString = location.search;
  const queryParams = new URLSearchParams(queryString);

  const type = queryParams.get("type");
  const category = queryParams.get("category");

  const categoryName =
    type === "sell"
      ? sellMenu
          .map((c) => (c.value === category ? c.name : null))
          .filter((value) => value !== null)[0]
      : rentMenu
          .map((c) => (c.value === category ? c.name : null))
          .filter((value) => value !== null)[0];

  const [open, setOpen] = useState(false);
  const selectedOption = type;

  const [loading, setLoading] = useState(false);

  const initialValues = {
    type,
    category: categoryName,
    address: "",
    bedrooms: "",
    bathrooms: "",
    parkings: "",
    landSize: "",
    landSizeUnit: "perches",
    propertySize: "",
    subCategory: "",
    title: "",
    description: "",
    price: "",
    photos: [],
    uploading: false,
    categoryValue: category,
  };

  const formik = useFormik({
    initialValues,
    validationSchema: AdSchema,
    onSubmit: (values) => {
      setLoading(true);
      axios
        .post("/ad", values)
        .then((res) => {
          if (res.data?.error) {
            toast.error(res.data.error);
            setLoading(false);
          } else {
            // update user in context
            setAuth({ ...auth, user: res.data.user });
            // update user in local storage
            const fromLS = JSON.parse(localStorage.getItem("auth"));
            fromLS.user = res.data.user;
            localStorage.setItem("auth", JSON.stringify(fromLS));

            toast.success("Ad created successfully");
            setLoading(false);

            // reload page on redirect
            window.location.href = "/user/my-ads";
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    },
  });

  useEffect(() => {
    formik.resetForm({
      values: initialValues,
    });
  }, [category]);

  useEffect(() => {
    formik.handleBlur("photos");
  }, [formik.values.photos]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const menuOptions = selectedOption === "sell" ? sellMenu : rentMenu;

  return (
    <CommonLayout>
      <Box
        sx={{
          bgcolor: "#e7edee",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          padding: "40px 200px",
        }}
      >
        <Box
          sx={{
            bgcolor: "white",
            py: "30px",
            px: "30px",
            borderRadius: "5px",
            width: "982px",
          }}
        >
          <Box
            mb={2}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h5">Fill in the details</Typography>
            <Box
              sx={{
                display: "flex",
              }}
            >
              <LocalOfferIcon
                sx={{ transform: "scaleX(-1)", mr: "8px", color: "#2b3d66" }}
              />
              <Typography variant="body1" mr={2}>
                {categoryName} {type === "sell" ? "For Sale" : "Rental"}
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontSize: "12px", cursor: "pointer", mb: "3px" }}
                color="primary"
                onClick={handleClickOpen}
              >
                Change
              </Typography>
            </Box>
          </Box>

          <Divider />

          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ padding: "50px 240px" }}>
              <Address formik={formik} />
              {(category == 103 || category == 104 || category == 105) && (
                <PropertyType formik={formik} category={category} />
              )}
              {(category == 101 ||
                category == 102 ||
                category == 104 ||
                category == 105) && <Rooms formik={formik} />}
              {(category == 101 ||
                category == 102 ||
                category == 103 ||
                category == 105) && <Parkings formik={formik} />}
              {(category == 100 || category == 101) && (
                <LandSize formik={formik} />
              )}
              {(category == 101 ||
                category == 102 ||
                category == 103 ||
                category == 104 ||
                category == 105) && (
                <PropertySize formik={formik} category={category} />
              )}
              <Title formik={formik} />
              <Description formik={formik} />
              <Price formik={formik} type={type} category={category} />
            </Box>
            <Divider />

            <Box sx={{ padding: "30px 240px" }}>
              <Typography variant="h6" mb={3}>
                Add up to 5 photos
              </Typography>
              <ImagePicker ad={formik.values} setAd={formik.setValues} />
              {formik.touched.photos && formik.errors.photos && (
                <FormHelperText
                  error
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <RiErrorWarningLine style={{ marginRight: "3px" }} />
                  {formik.errors.photos}
                </FormHelperText>
              )}
              <Button
                type="submit"
                variant="contained"
                disabled={loading || formik.values.uploading}
                fullWidth
                sx={{
                  marginTop: "40px",
                  textTransform: "none",
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
                  "Post Ad"
                )}
              </Button>
            </Box>
          </form>
        </Box>
      </Box>

      <CategoryMenu
        isOpen={open}
        handleClose={handleClose}
        menuOptions={menuOptions}
        selectedOption={selectedOption}
      />
    </CommonLayout>
  );
}

export default AdDetails;
