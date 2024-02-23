import { InputLabel, OutlinedInput, Stack } from "@mui/material";
import React from "react";
import InputError from "../../InputError";

const ConfirmPassword = ({ formik }) => {
  return (
    <Stack spacing={1} mt={3}>
      <InputLabel htmlFor="confirmPassword-user">Confirm password</InputLabel>
      <OutlinedInput
        id="confirmPassword-user"
        name="confirmPassword"
        type="password"
        placeholder="Confirm new password"
        value={formik.values.confirmPassword}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        size="small"
        sx={{
          "& fieldset": {
            border:
              formik.touched.confirmPassword &&
              formik.errors.confirmPassword &&
              "1px solid #d32f2f",
            borderRadius: 1,
          },
        }}
      />
      {formik.touched.confirmPassword && formik.errors.confirmPassword && (
        <InputError error={formik.errors.confirmPassword} />
      )}
    </Stack>
  );
};

export default ConfirmPassword;
