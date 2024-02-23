import React from "react";
import { useSearch } from "../../../contexts/search";
import { Box, FormControl, MenuItem, Select, Typography } from "@mui/material";
import { SqftConstants } from "../../../constants/SqftConstants";

const SUB_ITEM_HEIGHT = 48;
const SUB_ITEM_PADDING_TOP = 0;
const SubMenuProps = {
  PaperProps: {
    style: {
      maxHeight: SUB_ITEM_HEIGHT * 4.5 + SUB_ITEM_PADDING_TOP,
    },
  },
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "left",
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "left",
  },
};

const PropertySize = () => {
  const { search, setSearch } = useSearch();

  return (
    <>
      <Typography variant="body1" sx={{ m: 1, mb: 0 }}>
        Square Feet
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <FormControl sx={{ m: 1, minWidth: 0.44 }}>
          <Select
            value={search.propertySizeRange[0]}
            onChange={(e) =>
              setSearch({
                ...search,
                propertySizeRange: [
                  e.target.value,
                  search.propertySizeRange[1],
                ],
              })
            }
            MenuProps={SubMenuProps}
            size="small"
            sx={{
              paddingY: 0.5,
              ":hover": { cursor: "pointer" },
            }}
          >
            {SqftConstants.filter(
              (item) => item.value < search.propertySizeRange[1]
            ).map((item) => (
              <MenuItem key={item.name} value={item.value}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Typography color="grey" mt={2.5}>
          -
        </Typography>
        <FormControl sx={{ m: 1, minWidth: 0.44 }}>
          <Select
            value={search.propertySizeRange[1]}
            onChange={(e) =>
              setSearch({
                ...search,
                propertySizeRange: [
                  search.propertySizeRange[0],
                  e.target.value,
                ],
              })
            }
            MenuProps={SubMenuProps}
            size="small"
            sx={{
              paddingY: 0.5,
              ":hover": { cursor: "pointer" },
            }}
          >
            {SqftConstants.filter(
              (item) => item.value > search.propertySizeRange[0]
            ).map((item) => (
              <MenuItem key={item.name} value={item.value}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </>
  );
};

export default PropertySize;
