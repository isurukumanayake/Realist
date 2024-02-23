import React from "react";
import question from "../../assets/question.png";
import { Box, Typography } from "@mui/material";

const NoEnquiredProperties = () => {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <img src={question} alt="No enquired properties" height="200px" />

      <Typography variant="h4" mt={5}>
        Sorry, no enquired properties yet
      </Typography>
      <Typography variant="body1" color="#454545" mt={1}>
        That's ok, you can enquire about any property using the contact form
      </Typography>
    </Box>
  );
};

export default NoEnquiredProperties;
