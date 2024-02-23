import { Skeleton, Stack } from "@mui/material";
import React from "react";

const ShimmerAdCard = () => {
  return (
    <Stack spacing={0.6}>
      <Skeleton variant="rounded" width={300} height={200} />
      <Skeleton variant="rounded" width={150} height={20} />
      <Skeleton variant="rounded" width={300} height={20} />
      <Skeleton variant="rounded" width={300} height={25} />
    </Stack>
  );
};

export default ShimmerAdCard;
