import React from "react";
import { InputLabel, Stack } from "@mui/material";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import InputError from "../InputError";

const Address = ({ formik }) => {
  return (
    <Stack spacing={1}>
      <InputLabel htmlFor="address-ad">Address</InputLabel>
      <GooglePlacesAutocomplete
        apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
        apiOptions="au"
        selectProps={{
          id: "address-ad",
          name: "address",
          defaultInputValue: formik.values?.address,
          placeholder: formik.values?.address || "Please enter address",
          onChange: ({ value }) =>
            formik.setFieldValue("address", value.description),
          onBlur: formik.handleBlur,
          InputProps: { inputProps: { name: "address" } },
          styles: {
            control: (provided, state) => ({
              ...provided,
              height: "45px",
              borderColor:
                (formik.touched.address ||
                  formik.touched["react-select-2-input"]) &&
                formik.errors.address
                  ? "#d32f2f"
                  : "hsl(0, 0%, 80%)",
            }),
          },
        }}
      />
      {(formik.touched.address || formik.touched["react-select-2-input"]) &&
        formik.errors.address && <InputError error={formik.errors.address} />}
    </Stack>
  );
};

export default Address;
