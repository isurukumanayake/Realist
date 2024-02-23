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
import { rentMenu, sellMenu } from "../../../constants/AdConstants";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const ITEM_HEIGHT = 100;
const ITEM_PADDING_TOP = 0;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
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

const Category = () => {
  const { search, setSearch } = useSearch();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    if (value.includes("select-all")) {
      // Select all options
      const allPropertyTypes = propertyMenu.map((item) => item.value);
      setSearch({ ...search, category: allPropertyTypes });
    } else if (value.includes("deselect-all")) {
      // Deselect all options
      setSearch({ ...search, category: [] });
    } else {
      // Handle individual option selection
      setSearch({ ...search, category: value });
    }
  };

  const propertyMenu = search?.type === "buy" ? sellMenu : rentMenu;

  return (
    <FormControl sx={{ m: 1, width: 180 }}>
      <Select
        multiple
        value={search.category}
        onChange={handleChange}
        displayEmpty={true}
        renderValue={() =>
          `Property Type ${
            search.category.length !== propertyMenu.length &&
            search.category.length !== 0
              ? `(${search.category.length})`
              : ""
          }`
        }
        MenuProps={MenuProps}
        size="small"
        sx={{ paddingY: 0.5, textAlign: "center" }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            p: 1,
            pl: 3,
            color: "#333",
            backgroundColor: "whitesmoke",
            mt: -1,
            fontWeight: 600,
          }}
        >
          Property Type
        </Typography>
        <MenuItem
          value={
            search.category.length === propertyMenu.length
              ? "deselect-all"
              : "select-all"
          }
        >
          <Checkbox icon={<CheckCircleIcon />} />
          <ListItemText
            primary={
              search.category.length === propertyMenu.length
                ? "Deselect All"
                : "Select All"
            }
          />
        </MenuItem>
        {propertyMenu.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            <Checkbox checked={search.category.includes(item.value)} />
            <ListItemText primary={item.name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Category;
