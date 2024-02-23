import {
  Box,
  Tab,
  Tabs,
  ThemeProvider,
  createTheme,
  useTheme,
} from "@mui/material";
import React from "react";
import { useSearch } from "../../contexts/search";

const TypeSelect = () => {
  const theme = useTheme();

  const { search, setSearch } = useSearch();

  const customizedTheme = createTheme(theme, {
    components: {
      MuiTab: {
        styleOverrides: {
          root: {
            color: theme.palette.secondary.contrastText,
            textTransform: "none",
            fontWeight: 600,
            fontSize: "1.05rem",
            "&.Mui-selected": {
              color: theme.palette.secondary.contrastText,
            },
          },
        },
      },
    },
  });

  const handleChange = (event, newValue) => {
    setSearch((prev) => ({ ...prev, type: newValue }));
  };

  return (
    <ThemeProvider theme={customizedTheme}>
      <Box mb={2.5} width="180px">
        <Tabs
          value={search?.type}
          onChange={handleChange}
          TabIndicatorProps={{
            style: {
              background: "white",
              height: "4px",
            },
          }}
        >
          <Tab label="Buy" value="buy" />
          <Tab label="Rent" value="rent" />
        </Tabs>
      </Box>
    </ThemeProvider>
  );
};

export default TypeSelect;
