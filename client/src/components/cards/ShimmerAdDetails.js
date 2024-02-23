import { Skeleton, Stack, Typography } from "@mui/material";
import React from "react";

const ShimmerAdDetails = () => {
  return (
    <Stack mt={-12.5}>
      <Typography variant="body1">
        <Skeleton width={250} />
      </Typography>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h3" mt={1}>
          <Skeleton width={280} />
        </Typography>
        <Stack direction="row" gap={2}>
          <Skeleton width={80} height={110} />
          <Skeleton width={80} height={110} />
          <Skeleton width={80} height={110} />
        </Stack>
      </Stack>
      <Typography variant="h5" mt={-4.5}>
        <Skeleton width={400} />
      </Typography>
      <Stack direction="row" gap={1}>
        {Array(3)
          .fill()
          .map((_, index) => (
            <Skeleton key={index} width={200} height={65} />
          ))}
      </Stack>
      <Stack direction="row" mt={1} gap={4}>
        {Array(3)
          .fill()
          .map((_, index) => (
            <Typography key={index} variant="h6">
              <Skeleton width={150} />
            </Typography>
          ))}
      </Stack>
    </Stack>
  );
};

export default ShimmerAdDetails;
