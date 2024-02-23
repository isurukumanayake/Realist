import { Button, CircularProgress } from "@mui/material";
import React from "react";

const CustomButton = ({ loading, name }) => {
  return (
    <Button type="submit" variant="contained" disabled={loading}>
      {loading ? (
        <CircularProgress
          variant="indeterminate"
          color="common"
          size={24}
          thickness={4}
        />
      ) : (
        name
      )}
    </Button>
  );
};

export default CustomButton;
