import {
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import InputError from "../InputError";

const Password = ({ formik, id, required }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Stack spacing={1} mt={3}>
      <InputLabel htmlFor={id}>Password{required && "*"}</InputLabel>
      <OutlinedInput
        id={id}
        name="password"
        type={showPassword ? "text" : "password"}
        placeholder="******"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        sx={{
          height: "50px",
          "& fieldset": {
            border:
              formik.touched.password &&
              formik.errors.password &&
              "1px solid #d32f2f",
            borderRadius: 1,
          },
        }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
              size="large"
            >
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </InputAdornment>
        }
      />
      {formik.touched.password && formik.errors.password && (
        <InputError error={formik.errors.password} />
      )}
    </Stack>
  );
};

export default Password;
