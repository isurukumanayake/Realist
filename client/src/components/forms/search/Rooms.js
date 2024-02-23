import React, { useState } from "react";
import { useSearch } from "../../../contexts/search";
import {
  Box,
  Button,
  FormControl,
  Select,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import {
  bathroomsSelection,
  bedroomsSelection,
} from "../../../constants/RoomConstants";

const ITEM_HEIGHT = 88;
const ITEM_PADDING_TOP = 0;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 310,
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

const Rooms = () => {
  const { search, setSearch } = useSearch();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
        renderValue={() => {
          if (search.minBedrooms === "any" && search.minBathrooms === "any") {
            return "Beds & Baths";
          } else if (search.minBedrooms === "any") {
            return `0+ bd, ${search.minBathrooms}+ ba`;
          } else if (search.minBathrooms === "any") {
            return `${search.minBedrooms}+ bd, 0+ ba`;
          } else {
            return `${search.minBedrooms}+ bd, ${search.minBathrooms}+ ba`;
          }
        }}
        size="small"
        sx={{
          paddingY: 0.5,
          textAlign: "center",
          ":hover": { cursor: "pointer" },
        }}
      >
        <Box>
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
            Number of Bedrooms
          </Typography>
          <FormControl sx={{ m: 1 }}>
            <Typography variant="body1">Bedrooms</Typography>
            <ToggleButtonGroup
              color="primary"
              value={search.minBedrooms}
              exclusive
              onChange={(e) =>
                setSearch({ ...search, minBedrooms: e.target.value })
              }
              size="small"
              sx={{ marginTop: "6px" }}
            >
              {bedroomsSelection.map((item) => (
                <ToggleButton
                  key={item.value}
                  sx={{ width: 50, textTransform: "none" }}
                  value={item.value}
                >
                  {item.name}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </FormControl>

          <Typography
            variant="subtitle1"
            sx={{
              p: 1,
              color: "#333",
              backgroundColor: "whitesmoke",
              mt: 1,
              fontWeight: 600,
            }}
          >
            Number of Bathrooms
          </Typography>
          <FormControl sx={{ m: 1 }}>
            <Typography variant="body1">Bathrooms</Typography>
            <ToggleButtonGroup
              color="primary"
              value={search.minBathrooms}
              exclusive
              onChange={(e) =>
                setSearch({ ...search, minBathrooms: e.target.value })
              }
              size="small"
              sx={{ marginTop: "6px" }}
            >
              {bathroomsSelection.map((item) => (
                <ToggleButton
                  key={item.value}
                  sx={{ width: 50, textTransform: "none" }}
                  value={item.value}
                >
                  {item.name}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </FormControl>

          <Button
            sx={{ width: "95%", m: 1, textTransform: "none" }}
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

export default Rooms;
