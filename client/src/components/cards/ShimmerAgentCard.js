import { Skeleton, Stack } from "@mui/material";
import React from "react";

const ShimmerAgentCard = () => {
  return (
    <Stack spacing={0.6}>
      <Skeleton variant="rounded" width={300} height={260} />
      <Skeleton variant="rounded" width={300} height={25} />
      <Skeleton variant="rounded" width={180} height={15} />
    </Stack>
  );
};

export default ShimmerAgentCard;
