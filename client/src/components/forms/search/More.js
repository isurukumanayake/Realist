import React, { useState } from "react";
import { useSearch } from "../../../contexts/search";
import {
  Box,
  Button,
  Divider,
  FormControl,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import Parkings from "./Parkings";
import ListingStatus from "./ListingStatus";
import PropertySize from "./PropertySize";
import LotSize from "./LotSize";

const ITEM_HEIGHT = 160;
const ITEM_PADDING_TOP = 0;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 350,
    },
  },
  keepMounted: true,
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "right",
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "right",
  },
};

const More = () => {
  const { search, setSearch, initialState } = useSearch();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const clearFilters = () => {
    if (search?.page === "/ads/buy") {
      setSearch({
        ...initialState,
        type: "buy",
        category: ["100", "101", "102", "103"],
        priceRange: [0, 1000000000],
      });
    } else if (search?.page === "/ads/rent") {
      setSearch({
        ...initialState,
        type: "rent",
        category: ["100", "101", "102", "103", "104", "105"],
        priceRange: [0, 1000000],
      });
    }
  };

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
        renderValue={() => "More"}
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
          More filters
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          <ListingStatus />
          <Parkings />
          <PropertySize />
          <LotSize />
          <Divider sx={{ marginTop: "10px", width: "100%" }} />
          <Stack direction="row-reverse" width="100%" mt={0.5} py={0.5} mb={-1}>
            <Button
              sx={{ width: "100%", m: 1, textTransform: "none" }}
              type="submit"
              variant="contained"
              onClick={() => handleClose()}
            >
              Appply
            </Button>
            <Button
              sx={{ width: "100%", m: 1, textTransform: "none" }}
              type="submit"
              variant="outlined"
              onClick={() => clearFilters()}
            >
              Reset all filters
            </Button>
          </Stack>
        </Box>
      </Select>
    </FormControl>
  );
};

export default More;
