import { InputLabel, OutlinedInput, Stack } from "@mui/material";
import React from "react";
import InputError from "../../InputError";

const Username = ({ formik }) => {
  return (
    <Stack spacing={1} mt={3}>
      <InputLabel htmlFor="username-user">Username</InputLabel>
      <OutlinedInput
        id="username-user"
        name="username"
        value={formik.values.username}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        size="small"
        sx={{
          "& fieldset": {
            border:
              formik.touched.username &&
              formik.errors.username &&
              "1px solid #d32f2f",
            borderRadius: 1,
          },
        }}
      />
      {formik.touched.username && formik.errors.username && (
        <InputError error={formik.errors.username} />
      )}
    </Stack>
  );
};

export default Username;
