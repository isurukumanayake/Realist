import React from "react";
import { InputLabel, OutlinedInput, Stack, Typography } from "@mui/material";
import InputError from "../InputError";

const Description = ({ formik }) => {
  return (
    <Stack spacing={1} mt={3}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="baseline"
        color="grey"
      >
        <InputLabel htmlFor="description-ad">Description</InputLabel>
        <Typography sx={{ fontSize: "12px" }}>
          {formik.values.description.length}/5000
        </Typography>
      </Stack>
      <OutlinedInput
        id="description-ad"
        multiline
        rows={4}
        name="description"
        value={formik.values.description}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="More details = more responses!"
        size="small"
        sx={{
          "& fieldset": {
            border:
              formik.touched.description &&
              formik.errors.description &&
              "1px solid #d32f2f",
            borderRadius: 1,
          },
        }}
      />
      {formik.touched.description && formik.errors.description && (
        <InputError error={formik.errors.description} />
      )}
    </Stack>
  );
};

export default Description;
