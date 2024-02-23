import { Box, Pagination, Typography } from "@mui/material";
import React from "react";

const PaginationContainer = ({ count, page, setPage, limit, total, name }) => {
  const startRange = (page - 1) * limit + 1;
  const endRange = Math.min(page * limit, total);

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <Box
        spacing={2}
        mt={6}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Pagination
          variant="outlined"
          color="primary"
          size="large"
          count={count}
          page={page}
          onChange={handleChange}
        />
      </Box>
      <Typography variant="body2" textAlign="center" color="gray" mt={4}>
        Showing {startRange} - {endRange} of {total} {name}
      </Typography>
    </>
  );
};

export default PaginationContainer;
