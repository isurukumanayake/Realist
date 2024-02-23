import React, { useEffect } from "react";
import { useSearch } from "../../contexts/search";
import { Box } from "@mui/material";
import SearchBar from "../misc/SearchBar";
import Price from "./search/Price";
import Category from "./search/Category";
import Rooms from "./search/Rooms";
import More from "./search/More";
import useCustomSearch from "../../hooks/useCustomSearch";

const SearchForm = () => {
  const { search, setSearch } = useSearch();

  const { handleSearch } = useCustomSearch();

  useEffect(() => {
    handleSearch();
  }, [
    search.type,
    search.address,
    search.category,
    search.priceRange,
    search.minBedrooms,
    search.minBathrooms,
    search.listingStatus,
    search.minParkings,
    search.propertySizeRange,
    search.lotSizeRange,
    search.pageNo,
  ]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        gap: "4px",
        flexWrap: "wrap",
        alignItems: "center",
        padding: "12px 80px",
        boxShadow: "0px 0px 4px 0px #0000001a",
        position: "sticky",
        top: "0",
        zIndex: "20",
        background: "#fff",
      }}
    >
      <SearchBar elevate={false} theme={true} />

      <Category />
      <Price />
      <Rooms />
      <More />
    </Box>
  );
};

export default SearchForm;
