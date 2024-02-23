import React from "react";
import { Stack, TextField } from "@mui/material";
import InputError from "../InputError";

const Phone = ({ formik, loggedIn }) => {
  return (
    <Stack spacing={1} mt={3}>
      <TextField
        label="Phone*"
        name="phone"
        value={formik.values.phone}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        disabled={!loggedIn}
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
