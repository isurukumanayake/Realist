import React from "react";
import { InputLabel, OutlinedInput, Stack } from "@mui/material";
import InputError from "../InputError";

const Parkings = ({ formik }) => {
  return (
    <Stack spacing={1} mt={3}>
      <InputLabel htmlFor="parkings-ad">Parkings</InputLabel>
      <OutlinedInput
        id="parkings-ad"
        type="number"
        name="parkings"
        value={formik.values.parkings}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="How many parkings are there?"
        size="small"
        sx={{
          "& fieldset": {
            border:
              formik.touched.parkings &&
              formik.errors.parkings &&
              "1px solid #d32f2f",
            borderRadius: 1,
          },
        }}
      />
      {formik.touched.parkings && formik.errors.parkings && (
        <InputError error={formik.errors.parkings} />
      )}
    </Stack>
  );
};

export default Parkings;
