import React from "react";
import SearchForm from "../components/forms/SearchForm";
import { useSearch } from "../contexts/search";
import AdCard from "../components/cards/AdCard";
import { Box, Grid } from "@mui/material";
import ShimmerAds from "../components/shimmer/ShimmerAds";
import NoAdResults from "../components/empty/NoAdResults";
import PaginationContainer from "../components/misc/PaginationContainer";

const Search = () => {
  const { search, setSearch } = useSearch();

  const setPage = (value) => {
    setSearch((prev) => ({ ...prev, pageNo: value }));
  };

  return (
    <>
      <SearchForm />
      <Box
        sx={{
          padding: "40px 90px",
        }}
      >
        {search.loading ? (
          <ShimmerAds />
        ) : search.results?.length > 0 ? (
          <>
            <Grid container spacing={5}>
              {search.results.map((ad) => (
                <Grid item key={ad._id}>
                  <AdCard ad={ad} />
                </Grid>
              ))}
            </Grid>
            <PaginationContainer
              count={search?.totalPages}
              page={search?.pageNo}
              setPage={setPage}
              limit={search?.limit}
              total={search?.totalAds}
              name="listings"
            />
          </>
        ) : (
          <NoAdResults />
        )}
      </Box>
    </>
  );
};

export default Search;
