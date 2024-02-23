import React from "react";
import { Stack, TextField } from "@mui/material";
import InputError from "../InputError";

const FullName = ({ formik, loggedIn }) => {
  return (
    <Stack spacing={1} mt={3}>
      <TextField
        label="Full name*"
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        disabled={!loggedIn}
        size="small"
        sx={{
          "& fieldset": {
            border:
              formik.touched.name && formik.errors.name && "1px solid #d32f2f",
            borderRadius: 1,
          },
        }}
      />
      {formik.touched.name && formik.errors.name && (
        <InputError error={formik.errors.name} />
      )}
    </Stack>
  );
};

export default FullName;
