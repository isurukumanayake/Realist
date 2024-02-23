import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { useSearch } from "../../contexts/search";
import { CircularProgress, IconButton, Paper } from "@mui/material";
import useCustomSearch from "../../hooks/useCustomSearch";

const SearchBar = ({ elevate, theme }) => {
  const [isFocused, setIsFocused] = useState(false);

  const { search, setSearch } = useSearch();

  const { handleSearch } = useCustomSearch();

  return (
    <Paper
      elevation={elevate ? 8 : 0}
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 400,
        borderRadius: "20px",
        border: `2px solid ${
          isFocused ? (theme ? "#1976d2" : "#2b3d66") : "#eeeeee"
        }`,
      }}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      {/* <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Address, City, Zip, or Neighborhood"
            /> */}
      <GooglePlacesAutocomplete
        apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
        apiOptions="au"
        selectProps={{
          name: "address",
          defaultInputValue: search?.address,
          isClearable: true,
          placeholder: search?.address || "Address, City, or Neighborhood",
          onChange: (e) => {
            setSearch({
              ...search,
              address: e?.value.description ? e.value.description : "",
            });
          },
          styles: {
            control: (provided, state) => ({
              ...provided,
              height: "45px",
              border: 0,
              boxShadow: "none",
              width: 340,
              borderRadius: "20px",
            }),
          },
        }}
      />
      <IconButton
        type="button"
        sx={{
          p: "10px",
          background: "#dd7124",
          color: "white",
          "&:hover": {
            background: "rgb(221, 113, 36, 0.8)",
          },
        }}
        aria-label="search"
        onClick={handleSearch}
      >
        {search?.loading ? (
          <CircularProgress
            variant="indeterminate"
            color="common"
            size={24}
            thickness={4}
          />
        ) : (
          <SearchIcon />
        )}
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
