import { InputLabel, OutlinedInput, Stack } from "@mui/material";
import React from "react";
import InputError from "../../InputError";

const Bio = ({ formik }) => {
  return (
    <Stack spacing={1} mt={3}>
      <InputLabel htmlFor="about-user">Bio</InputLabel>
      <OutlinedInput
        id="about-user"
        multiline
        rows={3}
        name="about"
        value={formik.values.about}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        // size="small"
        sx={{
          "& fieldset": {
            border:
              formik.touched.about &&
              formik.errors.about &&
              "1px solid #d32f2f",
            borderRadius: 1,
          },
        }}
      />
      {formik.touched.about && formik.errors.about && (
        <InputError error={formik.errors.about} />
      )}
    </Stack>
  );
};

export default Bio;
