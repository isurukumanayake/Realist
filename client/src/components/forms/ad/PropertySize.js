import React from "react";
import {
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
} from "@mui/material";
import InputError from "../InputError";

const PropertySize = ({ formik, category }) => {
  return (
    <Stack spacing={1} mt={3}>
      <InputLabel htmlFor="propertySize-ad">
        {category == 101 && "House "} Size
      </InputLabel>
      <OutlinedInput
        id="propertySize-ad"
        type="number"
        name="propertySize"
        value={formik.values.propertySize}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="What's the size of your property?"
        endAdornment={<InputAdornment position="end">sqft</InputAdornment>}
        size="small"
        sx={{
          "& fieldset": {
            border:
              formik.touched.propertySize &&
              formik.errors.propertySize &&
              "1px solid #d32f2f",
            borderRadius: 1,
          },
        }}
      />
      {formik.touched.propertySize && formik.errors.propertySize && (
        <InputError error={formik.errors.propertySize} />
      )}
    </Stack>
  );
};

export default PropertySize;
