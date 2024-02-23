import { Box, Grid } from "@mui/material";
import React from "react";
import ShimmerAgentCard from "../cards/ShimmerAgentCard";

const ShimmerAgents = () => {
  return (
    <Box
      sx={{
        padding: "60px 90px",
      }}
    >
      <Grid container spacing={5}>
        {[...Array(4)].map((_, index) => (
          <Grid item key={index}>
            <ShimmerAgentCard />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ShimmerAgents;
