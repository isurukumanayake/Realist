import React from "react";
import Navbar from "../components/navigation/Navbar";
import { Box, Typography } from "@mui/material";
import bg1 from "../assets/bg1.jpg";
import bg2 from "../assets/bg2.jpg";
import "../index.css";
import SearchBar from "../components/misc/SearchBar";
import TypeSelect from "../components/misc/TypeSelect";

function Home() {
  return (
    <>
      <Navbar />
      <Box
        sx={{
          backgroundColor: "rgba(43, 61, 102, 0.9)",
          width: "100%",
          height: `calc(100vh - 82px)`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <img
          src={bg2}
          alt="Background Image"
          style={{
            width: "100%",
            height: "100%",
            // objectFit: "cover",
            opacity: 0.3,
            clipPath: "polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%)",
            position: "absolute",
            top: 0,
            zIndex: 0,
            animation: "zoomInOut1 6s infinite alternate ease-in-out",
          }}
        />
        <img
          src={bg1}
          alt="Background Image"
          style={{
            width: "100%",
            height: "100%",
            // opacity: 0.7,
            clipPath: "polygon(100% 0, 75% 0%, 100% 50%, 75% 100%, 100% 100%)",
            position: "absolute",
            top: 0,
            zIndex: -1,
          }}
        />

        <Box
          height="100%"
          width="100%"
          ml={40}
          mt={6}
          sx={{
            zIndex: 3,
            position: "absolute",
            top: "0",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            color="common.white"
            style={{ fontWeight: "600", fontSize: "4em", lineHeight: "1.2" }}
            mb={6.5}
          >
            Discover <br />
            Most Suitable <br />
            Property
          </Typography>

          <TypeSelect />
          <SearchBar elevate={true} />
        </Box>
      </Box>
    </>
  );
}

export default Home;
