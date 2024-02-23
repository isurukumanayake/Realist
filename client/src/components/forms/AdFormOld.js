import React from "react";
import { useFormik } from "formik";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { FormControl, InputAdornment, TextField } from "@mui/material";
import CurrencyInput from "react-currency-input-field";

function AdForm() {
  const formik = useFormik({
    initialValues: {
      photos: [],
      uploading: false,
      price: "",
      address: "",
      bedrooms: "",
      bathrooms: "",
      carpark: "",
      landsize: "",
      type: "",
      title: "",
      description: "",
    },
  });

  return (
    <div style={{ padding: "80px" }}>
      <GooglePlacesAutocomplete
        apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
        apiOptions="au"
        selectProps={{
          name: "address",
          defaultInputValue: formik.values?.address,
          placeholder: "Please Enter Address",
          onChange: ({ value }) =>
            formik.setFieldValue("address", value.description),
          // styles: {
          //   control: (provided, state) => ({
          //     ...provided,
          //     border: "none",
          //     boxShadow: "none",
          //   }),
          // },
        }}
      />

      <FormControl fullWidth sx={{ m: 1 }}>
        <TextField
          // label="With normal TextField"
          name="price"
          onChange={formik.handleChange}
          sx={{ m: 1, width: "25ch" }}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
            inputProps: {
              style: { textAlign: "right" },
            },
            inputComponent: CurrencyInput,
          }}
        />
      </FormControl>
      <h1>Hi there</h1>
    </div>
  );
}

export default AdForm;
