import { Grid } from "@mui/material";
import React from "react";
import ShimmerAdCard from "../cards/ShimmerAdCard";

const ShimmerAds = () => {
  return (
    <Grid container spacing={5}>
      {[...Array(4)].map((_, index) => (
        <Grid item key={index}>
          <ShimmerAdCard />
        </Grid>
      ))}
    </Grid>
  );
};

export default ShimmerAds;
