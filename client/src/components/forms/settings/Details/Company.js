import { InputLabel, OutlinedInput, Stack } from "@mui/material";
import React from "react";
import InputError from "../../InputError";

const Company = ({ formik }) => {
  return (
    <Stack spacing={1} mt={3}>
      <InputLabel htmlFor="company-user">Company</InputLabel>
      <OutlinedInput
        id="company-user"
        name="company"
        value={formik.values.company}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        size="small"
        sx={{
          "& fieldset": {
            border:
              formik.touched.company &&
              formik.errors.company &&
              "1px solid #d32f2f",
            borderRadius: 1,
          },
        }}
      />
      {formik.touched.company && formik.errors.company && (
        <InputError error={formik.errors.company} />
      )}
    </Stack>
  );
};

export default Company;
