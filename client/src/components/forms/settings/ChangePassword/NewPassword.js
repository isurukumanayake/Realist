import { InputLabel, OutlinedInput, Stack } from "@mui/material";
import React from "react";
import InputError from "../../InputError";

const NewPassword = ({ formik }) => {
  return (
    <Stack spacing={1} mt={3}>
      <InputLabel htmlFor="password-user">New password</InputLabel>
      <OutlinedInput
        id="password-user"
        name="password"
        type="password"
        placeholder="Enter new password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        size="small"
        sx={{
          "& fieldset": {
            border:
              formik.touched.password &&
              formik.errors.password &&
              "1px solid #d32f2f",
            borderRadius: 1,
          },
        }}
      />
      {formik.touched.password && formik.errors.password && (
        <InputError error={formik.errors.password} />
      )}
    </Stack>
  );
};

export default NewPassword;
