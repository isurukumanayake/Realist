import { InputLabel, OutlinedInput, Stack } from "@mui/material";
import React from "react";
import InputError from "../InputError";

const Email = ({ formik, id, required }) => {
  return (
    <Stack spacing={1} mt={3}>
      <InputLabel htmlFor={id}>Email{required && "*"}</InputLabel>
      <OutlinedInput
        id={id}
        name="email"
        placeholder="demo@company.com"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        sx={{
          height: "50px",
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
