import React from "react";
import noAds from "../../assets/no-agents.png";
import { Box, Typography } from "@mui/material";

const NoAgents = () => {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <img src={noAds} alt="No matching results" height="240px" />

      <Typography variant="h5" mt={2}>
        Oops, we couldn't find any agent!
      </Typography>
      <Typography variant="body1" color="#454545" mt={1}>
        Please try again later.
      </Typography>
    </Box>
  );
};

export default NoAgents;
