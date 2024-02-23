import React from "react";
import TabBar from "../components/navigation/TabBar";
import { Box } from "@mui/material";
import CommonLayout from "./CommonLayout";

const DashboardLayout = ({ children }) => {
  return (
    <CommonLayout>
      <Box sx={{ padding: "30px 90px" }}>
        <TabBar />
        <Box
          sx={{
            margin: "50px 0",
          }}
        >
          {children}
        </Box>
      </Box>
    </CommonLayout>
  );
};

export default DashboardLayout;
