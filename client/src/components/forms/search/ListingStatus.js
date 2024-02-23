import React from "react";
import { useSearch } from "../../../contexts/search";
import {
  Checkbox,
  FormControl,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

const ITEM_HEIGHT = 88;
const ITEM_PADDING_TOP = 0;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
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

const statuses = [
  { value: "Available", name: "Available" },
  { value: "Sold", name: "Sold" },
];

const ListingStatus = () => {
  const { search, setSearch } = useSearch();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setSearch({ ...search, listingStatus: value });
  };

  return (
    <>
      <Typography variant="body1" sx={{ m: 1, mb: 0 }}>
        Listing Status
      </Typography>
      <FormControl sx={{ m: 1, width: "100%" }}>
        <Select
          multiple
          value={search.listingStatus}
          onChange={handleChange}
          displayEmpty={true}
          renderValue={() =>
            ` ${
              search.listingStatus.length !== statuses.length &&
              search.listingStatus.length !== 0
                ? statuses.find(
                    (item) => item.value === search.listingStatus[0]
                  ).name
                : "Listing Status"
            }`
          }
          MenuProps={MenuProps}
          size="small"
          sx={{ paddingY: 0.5 }}
        >
          {statuses.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              <Checkbox checked={search.listingStatus.includes(item.value)} />
              <ListItemText primary={item.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default ListingStatus;
