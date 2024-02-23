import React from "react";
import { useSearch } from "../../../contexts/search";
import { Box, FormControl, MenuItem, Select, Typography } from "@mui/material";
import { LotSizeConstants } from "../../../constants/LotSizeConstants";

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

const LotSize = () => {
  const { search, setSearch } = useSearch();

  return (
    <>
      <Typography variant="body1" sx={{ m: 1, mb: 0 }}>
        Lot Size
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
            value={search.lotSizeRange[0]}
            onChange={(e) =>
              setSearch({
                ...search,
                lotSizeRange: [e.target.value, search.lotSizeRange[1]],
              })
            }
            MenuProps={SubMenuProps}
            size="small"
            sx={{
              paddingY: 0.5,
              ":hover": { cursor: "pointer" },
            }}
          >
            {LotSizeConstants.filter(
              (item) => item.value < search.lotSizeRange[1]
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
            value={search.lotSizeRange[1]}
            onChange={(e) =>
              setSearch({
                ...search,
                lotSizeRange: [search.lotSizeRange[0], e.target.value],
              })
            }
            MenuProps={SubMenuProps}
            size="small"
            sx={{
              paddingY: 0.5,
              ":hover": { cursor: "pointer" },
            }}
          >
            {LotSizeConstants.filter(
              (item) => item.value > search.lotSizeRange[0]
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

export default LotSize;
