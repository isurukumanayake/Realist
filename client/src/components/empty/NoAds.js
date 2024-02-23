import React from "react";
import advertisement from "../../assets/advertisement.png";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NoAds = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <img src={advertisement} alt="No Ads" height="200px" />

      <Typography variant="h4" mt={5}>
        You don't have any ads yet.
      </Typography>
      <Button
        type="submit"
        variant="outlined"
        onClick={() => navigate("/ad/post")}
        sx={{
          marginTop: "20px",
          textTransform: "none",
        }}
      >
        Create your ad now!
      </Button>
    </Box>
  );
};

export default NoAds;
