import React from "react";
import { Stack, TextField } from "@mui/material";
import InputError from "../InputError";

const Email = ({ formik, loggedIn }) => {
  return (
    <Stack spacing={1} mt={3}>
      <TextField
        label="Email*"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        disabled={!loggedIn}
        size="small"
        sx={{
          "& fieldset": {
            border:
              formik.touched.email &&
              formik.errors.email &&
              "1px solid #d32f2f",
            borderRadius: 1,
          },
        }}
      />
      {formik.touched.email && formik.errors.email && (
        <InputError error={formik.errors.email} />
      )}
    </Stack>
  );
};

export default Email;
