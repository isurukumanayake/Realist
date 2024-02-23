import { Box, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const TabBar = () => {
  const location = useLocation();

  const tabData = [
    { label: "My Ads", path: "/user/my-ads" },
    { label: "Saved Listings", path: "/user/saved-listings" },
    { label: "Enquired Properties", path: "/user/enquired-properties" },
    { label: "Settings", path: "/user/settings" },
  ];

  const [value, setValue] = useState(location.pathname);

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs value={value}>
        {tabData.map((tab, index) => (
          <Tab
            key={index}
            component={Link}
            to={tab.path}
            label={tab.label}
            value={tab.path}
            sx={{ textTransform: "none" }}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default TabBar;
