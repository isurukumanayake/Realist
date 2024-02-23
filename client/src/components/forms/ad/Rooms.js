import React from "react";
import { InputLabel, OutlinedInput, Stack } from "@mui/material";
import InputError from "../InputError";

const Rooms = ({ formik }) => {
  return (
    <>
      <Stack spacing={1} mt={3}>
        <InputLabel htmlFor="bedrooms-ad">Bedrooms</InputLabel>
        <OutlinedInput
          id="bedrooms-ad"
          type="number"
          name="bedrooms"
          value={formik.values.bedrooms}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="How many bedrooms are there?"
          size="small"
          sx={{
            "& fieldset": {
              border:
                formik.touched.bedrooms &&
                formik.errors.bedrooms &&
                "1px solid #d32f2f",
              borderRadius: 1,
            },
          }}
        />
        {formik.touched.bedrooms && formik.errors.bedrooms && (
          <InputError error={formik.errors.bedrooms} />
        )}
      </Stack>
      <Stack spacing={1} mt={3}>
        <InputLabel htmlFor="bathrooms-ad">Bathrooms</InputLabel>
        <OutlinedInput
          id="bathrooms-ad"
          type="number"
          name="bathrooms"
          value={formik.values.bathrooms}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="How many bathrooms are there?"
          size="small"
          sx={{
            "& fieldset": {
              border:
                formik.touched.bathrooms &&
                formik.errors.bathrooms &&
                "1px solid #d32f2f",
              borderRadius: 1,
            },
          }}
        />
        {formik.touched.bathrooms && formik.errors.bathrooms && (
          <InputError error={formik.errors.bathrooms} />
        )}
      </Stack>
    </>
  );
};

export default Rooms;
