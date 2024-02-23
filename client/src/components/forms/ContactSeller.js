import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth";
import toast from "react-hot-toast";
import axios from "axios";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useFormik } from "formik";
import { ContactSellerSchema } from "../schemas/ContactSeller";
import FullName from "./contact-seller/FullName";
import Email from "./contact-seller/Email";
import Phone from "./contact-seller/Phone";
import Message from "./contact-seller/Message";

const ContactSeller = ({ ad }) => {
  const { auth, setAuth } = useAuth();

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const loggedIn = auth.user !== null && auth.token !== "";

  const [initialValues, setInitialValues] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    if (auth.user) {
      setInitialValues({
        name: auth.user.name,
        email: auth.user.email,
        phone: auth.user.phone,
        message: `I am interested in ${ad?.address}.`,
      });
    }
  }, [auth, ad]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: ContactSellerSchema,
    onSubmit: (values) => {
      setLoading(true);
      axios
        .post("/contact-seller", { ...values, adId: ad._id })
        .then((res) => {
          if (res.data?.error) {
            toast.error(res.data.error);
            setLoading(false);
          } else {
            toast.success("Message sent successfully!");
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
    <Box
      sx={{
        padding: "15px 10px",
        outline: "1px solid lightgray",
        borderRadius: "5px",
      }}
    >
      <Typography variant="h6">More about this property</Typography>

      <form onSubmit={formik.handleSubmit}>
        <FullName formik={formik} loggedIn={loggedIn} />
        <Email formik={formik} loggedIn={loggedIn} />
        <Phone formik={formik} loggedIn={loggedIn} />
        <Message formik={formik} loggedIn={loggedIn} />

        <Button
          type="submit"
          variant="contained"
          disabled={loading || formik.values.uploading || !loggedIn}
          fullWidth
          sx={{
            marginTop: "20px",
            textTransform: "none",
          }}
        >
          {loggedIn ? (
            loading ? (
              <CircularProgress
                variant="indeterminate"
                color="common"
                size={24}
                thickness={4}
              />
            ) : (
              "Email agent"
            )
          ) : (
            "Login to send enquiry"
          )}
        </Button>

        <Typography
          variant="body2"
          sx={{
            marginTop: "10px",
            fontSize: "10px",
            textAlign: "justify",
          }}
        >
          By proceeding, you give consent to receive calls, texts, and emails
          regarding your inquiry and home-related matters, but this does not
          obligate you to make any purchase.
        </Typography>
      </form>
    </Box>
  );
};

export default ContactSeller;
