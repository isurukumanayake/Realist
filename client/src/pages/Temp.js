import { Box } from "@mui/material";
import React from "react";
import CommonLayout from "../layouts/CommonLayout";
import ShimmerAd from "../components/shimmer/ShimmerAd";

const Temp = () => {
  return (
    <CommonLayout>
      <Box
        sx={{
          padding: "60px 90px",
        }}
      >
        <ShimmerAd />
      </Box>
    </CommonLayout>
  );
};

export default Temp;
