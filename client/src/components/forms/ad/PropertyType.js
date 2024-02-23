import React from "react";
import { InputLabel, MenuItem, Select, Stack } from "@mui/material";
import {
  CPSubMenu,
  HSTSubMenu,
  RASubMenu,
} from "../../../constants/AdConstants";
import InputError from "../InputError";

const PropertyType = ({ formik, category }) => {
  return (
    <Stack spacing={1} mt={3}>
      <InputLabel htmlFor="propertType-ad">Property Type</InputLabel>
      <Select
        id="propertType-ad"
        name="subCategory"
        value={formik.values.subCategory || 0}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        size="small"
        sx={{
          "& fieldset": {
            border:
              formik.touched.subCategory &&
              formik.errors.subCategory &&
              "1px solid #d32f2f",
            borderRadius: 1,
          },
        }}
      >
        <MenuItem value={0} disabled>
          <span style={{ color: "grey" }}>Property Type</span>
        </MenuItem>
        {category == 103 &&
          CPSubMenu.map((item) => (
            <MenuItem key={item.name} value={item.value}>
              {item.name}
            </MenuItem>
          ))}
        {category == 104 &&
          RASubMenu.map((item) => (
            <MenuItem key={item.name} value={item.value}>
              {item.name}
            </MenuItem>
          ))}
        {category == 105 &&
          HSTSubMenu.map((item) => (
            <MenuItem key={item.name} value={item.value}>
              {item.name}
            </MenuItem>
          ))}
      </Select>
      {formik.touched.subCategory && formik.errors.subCategory && (
        <InputError error={formik.errors.subCategory} />
      )}
    </Stack>
  );
};

export default PropertyType;
