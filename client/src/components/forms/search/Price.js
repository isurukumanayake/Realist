import React, { useState } from "react";
import { useSearch } from "../../../contexts/search";
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { buyPrices, rentPrices } from "../../../constants/PriceConstants";

const ITEM_HEIGHT = 88;
const ITEM_PADDING_TOP = 0;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 305,
    },
  },
  keepMounted: true,
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "left",
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "left",
  },
};

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

const Price = () => {
  const { search, setSearch } = useSearch();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const priceMenu = search?.type === "buy" ? buyPrices : rentPrices;

  return (
    <FormControl sx={{ m: 1, minWidth: 200 }}>
      <Select
        displayEmpty={true}
        MenuProps={{
          ...MenuProps,
          open,
          onClose: handleClose,
        }}
        open={open}
        onOpen={handleOpen}
        renderValue={() => {
          if (
            search.priceRangeLabel[0] === "$0" &&
            search.priceRangeLabel[1] === "Any Price"
          ) {
            return "Price";
          } else if (search.priceRangeLabel[1] === "Any Price") {
            return search.priceRangeLabel[0] + "+";
          } else if (search.priceRangeLabel[0] === "$0") {
            return "Up to " + search.priceRangeLabel[1];
          } else {
            return (
              search.priceRangeLabel[0] + " - " + search.priceRangeLabel[1]
            );
          }
        }}
        size="small"
        sx={{
          paddingY: 0.5,
          textAlign: "center",
          ":hover": { cursor: "pointer" },
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            p: 1,
            color: "#333",
            backgroundColor: "whitesmoke",
            mt: -1,
            fontWeight: 600,
          }}
        >
          Price Range
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          <FormControl sx={{ m: 1, minWidth: 134 }}>
            <Typography variant="body1">Minimum</Typography>
            <Select
              value={search.priceRange[0]}
              onChange={(e) =>
                setSearch({
                  ...search,
                  priceRange: [e.target.value, search.priceRange[1]],
                  priceRangeLabel: [
                    priceMenu.find((price) => price.value === e.target.value)
                      .name,
                    search.priceRangeLabel[1],
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
              {priceMenu
                .filter((price) => price.value < search.priceRange[1])
                .map((price) => (
                  <MenuItem key={price.name} value={price.value}>
                    {price.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <Typography color="grey" mt={5}>
            -
          </Typography>
          <FormControl sx={{ m: 1, minWidth: 134 }}>
            <Typography variant="body1">Maximum</Typography>
            <Select
              value={search.priceRange[1]}
              onChange={(e) =>
                setSearch({
                  ...search,
                  priceRange: [search.priceRange[0], e.target.value],
                  priceRangeLabel: [
                    search.priceRangeLabel[0],
                    priceMenu.find((price) => price.value === e.target.value)
                      .name,
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
              {priceMenu
                .filter((price) => price.value > search.priceRange[0])
                .map((price) => (
                  <MenuItem key={price.name} value={price.value}>
                    {price.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <Button
            sx={{ width: "100%", m: 1, textTransform: "none" }}
            type="submit"
            variant="contained"
            onClick={(e) => {
              e.preventDefault();
              handleClose();
            }}
          >
            Appply
          </Button>
        </Box>
      </Select>
    </FormControl>
  );
};

export default Price;
