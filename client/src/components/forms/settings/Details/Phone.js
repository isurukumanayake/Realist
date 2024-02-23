import { InputLabel, OutlinedInput, Stack } from "@mui/material";
import React from "react";
import InputError from "../../InputError";

const Phone = ({ formik }) => {
  return (
    <Stack spacing={1} mt={3}>
      <InputLabel htmlFor="phone-user">Phone</InputLabel>
      <OutlinedInput
        id="phone-user"
        name="phone"
        value={formik.values.phone}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        size="small"
        sx={{
          "& fieldset": {
            border:
              formik.touched.phone &&
              formik.errors.phone &&
              "1px solid #d32f2f",
            borderRadius: 1,
          },
        }}
      />
      {formik.touched.phone && formik.errors.phone && (
        <InputError error={formik.errors.phone} />
      )}
    </Stack>
  );
};

export default Phone;
