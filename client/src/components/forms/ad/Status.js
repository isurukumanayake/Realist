import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";

const Status = ({ formik }) => {
  return (
    <Stack spacing={1} mt={3}>
      <InputLabel htmlFor="status-ad">Status</InputLabel>
      <FormControl>
        <Select
          value={formik.values.sold}
          onChange={formik.handleChange}
          inputProps={{
            id: "status-ad",
            name: "sold",
          }}
          size="small"
        >
          <MenuItem value={false}>Available</MenuItem>
          <MenuItem value={true}>Sold</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
};

export default Status;
