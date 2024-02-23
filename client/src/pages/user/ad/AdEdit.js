import React, { useEffect, useState } from "react";
import Navbar from "../../../components/navigation/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  FormHelperText,
  Typography,
} from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ImagePicker from "../../../components/forms/ImagePicker";
import { useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";
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
import Status from "../../../components/forms/ad/Status";

function AdEdit() {
  const navigate = useNavigate();

  const { slug } = useParams();

  const [category, setCategory] = useState(0);
  const [type, setType] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [loaded, setLoaded] = useState(false);

  const [loading, setLoading] = useState(false);

  const initialValues = {
    _id: "",
    type: "",
    category: "",
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
    sold: "",
    photos: [],
    uploading: false,
    categoryValue: category,
  };

  useEffect(() => {
    if (slug) {
      fetchAd();
    }
  }, [slug]);

  const fetchAd = async () => {
    try {
      const { data } = await axios.get(`/ad/${slug}`);

      formik.setValues({
        ...formik.values,
        ...Object.fromEntries(
          Object.entries(data.ad).map(([key, value]) => [
            key,
            value === null ? "" : value,
          ])
        ),
      });
      setCategory(data.ad.categoryValue);
      setCategoryName(data.ad.category);
      setType(data.ad.type);
      setLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: AdSchema,
    onSubmit: (values) => {
      setLoading(true);
      axios
        .put(`/ad/${formik.values._id}`, values)
        .then((res) => {
          if (res.data?.error) {
            toast.error(res.data.error);
            setLoading(false);
          } else {
            toast.success("Ad updated successfully");
            setLoading(false);
            navigate("/user/my-ads");
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    },
  });

  useEffect(() => {
    formik.handleBlur("photos");
  }, [formik.values.photos]);

  return (
    <>
      <Navbar />
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
              {loaded && (
                <Price formik={formik} type={type} category={category} />
              )}
              <Status formik={formik} />
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
                  "Update ad"
                )}
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </>
  );
}

export default AdEdit;
