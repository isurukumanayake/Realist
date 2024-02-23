import React from "react";
import { InputLabel, OutlinedInput, Stack } from "@mui/material";
import InputError from "../InputError";

const Title = ({ formik }) => {
  return (
    <Stack spacing={1} mt={3}>
      <InputLabel htmlFor="title-ad">Title</InputLabel>
      <OutlinedInput
        id="title-ad"
        name="title"
        value={formik.values.title}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Keep it short!"
        size="small"
        sx={{
          "& fieldset": {
            border:
              formik.touched.title &&
              formik.errors.title &&
              "1px solid #d32f2f",
            borderRadius: 1,
          },
        }}
      />
      {formik.touched.title && formik.errors.title && (
        <InputError error={formik.errors.title} />
      )}
    </Stack>
  );
};

export default Title;
