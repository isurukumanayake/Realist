import React from "react";
import home from "../../assets/home.png";
import { Box, Typography } from "@mui/material";

const EmptyWishlist = () => {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <img src={home} alt="Empty wishlist" height="200px" />

      <Typography variant="h4" mt={5}>
        Sorry, no saved listings yet
      </Typography>
      <Typography variant="body1" color="#454545" mt={1}>
        That's ok, you can save any of the listings to look at later simply by
        tapping on the ❤
      </Typography>
    </Box>
  );
};

export default EmptyWishlist;
