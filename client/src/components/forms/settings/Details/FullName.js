import { InputLabel, OutlinedInput, Stack } from "@mui/material";
import React from "react";
import InputError from "../../InputError";

const FullName = ({ formik }) => {
  return (
    <Stack spacing={1} mt={3}>
      <InputLabel htmlFor="name-user">Full Name</InputLabel>
      <OutlinedInput
        id="name-user"
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
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
