import React from "react";
import { FormHelperText } from "@mui/material";
import { RiErrorWarningLine } from "react-icons/ri";

const InputError = ({ error }) => {
  return (
    <FormHelperText
      error
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <RiErrorWarningLine style={{ marginRight: "3px" }} />
      {error}
    </FormHelperText>
  );
};

export default InputError;
