import React from "react";
import CommonLayout from "../layouts/CommonLayout";
import pageNotFound from "../assets/404.png";
import { Box, Typography } from "@mui/material";

const PageNotFound = () => {
  return (
    <CommonLayout>
      <Box
        sx={{
          padding: "60px 300px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img src={pageNotFound} alt="Page not found" height="300px" />
        <Typography
          variant="h4"
          fontWeight={500}
          color="#454545"
          mt={-6}
          mb={6}
        >
          Page not found
        </Typography>
      </Box>
    </CommonLayout>
  );
};

export default PageNotFound;
