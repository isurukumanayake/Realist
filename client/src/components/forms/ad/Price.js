import React from "react";
import {
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
} from "@mui/material";
import CurrencyInput from "react-currency-input-field";
import InputError from "../InputError";

const Price = ({ formik, type, category }) => {
  return (
    <Stack spacing={1} mt={3}>
      <InputLabel htmlFor="price-ad">
        {type === "sell"
          ? "Price"
          : `Rent ${category == 105 ? "/ night" : "/ month"}`}
      </InputLabel>
      <OutlinedInput
        id="price-ad"
        name="price"
        defaultValue={formik.values.price}
        onChange={(e) =>
          formik.setFieldValue("price", e.target.value.replace(/,/g, ""))
        }
        onBlur={formik.handleBlur}
        placeholder={
          type == "sell"
            ? "How much do you want to sell your property for?"
            : "What's the rent of the property?"
        }
        startAdornment={<InputAdornment position="start">$</InputAdornment>}
        inputComponent={CurrencyInput}
        inputProps={{
          style: { textAlign: "right" },
        }}
        size="small"
        sx={{
          "& fieldset": {
            border:
              formik.touched.price &&
              formik.errors.price &&
              "1px solid #d32f2f",
            borderRadius: 1,
          },
        }}
      />
      {formik.touched.price && formik.errors.price && (
        <InputError error={formik.errors.price} />
      )}
    </Stack>
  );
};

export default Price;
