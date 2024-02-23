import React from "react";
import { Box } from "@mui/material";
import Details from "../../components/forms/settings/Details";
import ProfilePhoto from "../../components/forms/settings/ProfilePhoto";
import ChangePassword from "../../components/forms/settings/ChangePassword";
import DashboardLayout from "../../layouts/DashboardLayout";

const Settings = () => {
  return (
    <DashboardLayout>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Box sx={{ flex: 1 }}>
          <ProfilePhoto />
        </Box>
        <Box sx={{ flex: 4, paddingLeft: "30px" }}>
          <Details />
          <ChangePassword />
        </Box>
      </Box>
    </DashboardLayout>
  );
};

export default Settings;
