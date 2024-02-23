import React from "react";
import noAds from "../../assets/no-content.png";
import { Box, Typography } from "@mui/material";

const NoAdResults = () => {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <img src={noAds} alt="No matching results" height="240px" />

      <Typography variant="h5" mt={4}>
        We couldn't find anything that quite matches your search.
      </Typography>
      <Typography variant="body1" color="#454545" mt={2}>
        Perhaps try removing some filters or searching in more suburbs.
      </Typography>
    </Box>
  );
};

export default NoAdResults;
