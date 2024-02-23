import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
} from "@mui/material";
import InputError from "../InputError";

const LandSize = ({ formik }) => {
  return (
    <Stack direction="row" spacing={2} mt={3}>
      <Stack direction="column" spacing={1} flex={3}>
        <InputLabel htmlFor="landSize-ad">Land Size</InputLabel>
        <OutlinedInput
          id="landSize-ad"
          type="number"
          name="landSize"
          value={formik.values.landSize}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="What's the size of your land?"
          size="small"
          sx={{
            "& fieldset": {
              border:
                formik.touched.landSize &&
                formik.errors.landSize &&
                "1px solid #d32f2f",
              borderRadius: 1,
            },
          }}
        />
        {formik.touched.landSize && formik.errors.landSize && (
          <InputError error={formik.errors.landSize} />
        )}
      </Stack>
      <Stack spacing={1} flex={1}>
        <InputLabel htmlFor="landSize-unit-ad">Unit</InputLabel>
        <FormControl>
          <Select
            value={formik.values.landSizeUnit}
            onChange={formik.handleChange}
            inputProps={{
              id: "landSize-unit-ad",
              name: "landSizeUnit",
            }}
            size="small"
          >
            <MenuItem value="perches">perches</MenuItem>
            <MenuItem value="acres">acres</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </Stack>
  );
};

export default LandSize;
