import React from "react";
import { useSearch } from "../../../contexts/search";
import { FormControl, MenuItem, Select, Typography } from "@mui/material";

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

const parkings = [
  { value: "any", name: "Any" },
  { value: "1", name: "1+" },
  { value: "2", name: "2+" },
  { value: "3", name: "3+" },
  { value: "4", name: "4+" },
];

const Parkings = () => {
  const { search, setSearch } = useSearch();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setSearch({ ...search, minParkings: value });
  };

  return (
    <>
      <Typography variant="body1" sx={{ m: 1, mb: 0 }}>
        Parkings
      </Typography>
      <FormControl sx={{ m: 1, width: "100%" }}>
        <Select
          value={search.minParkings}
          onChange={handleChange}
          displayEmpty={true}
          MenuProps={MenuProps}
          size="small"
          sx={{ paddingY: 0.5 }}
        >
          {parkings.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default Parkings;
