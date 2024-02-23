import { Skeleton, Stack, Typography } from "@mui/material";
import React from "react";

const ShimmerAgent = () => {
  return (
    <Stack direction="row">
      <Stack flex="5" paddingRight="20px">
        <Typography variant="h6">
          <Skeleton width={65} />
        </Typography>
        <Typography variant="h3">
          <Skeleton width={400} />
        </Typography>
        <Typography variant="h5" mt={0.5}>
          <Skeleton width={200} />
        </Typography>
        <Typography variant="body2" mt={1}>
          <Skeleton width={150} />
        </Typography>
        <Stack direction="row" spacing={2} mt={2}>
          <Typography variant="h6" align="center">
            <Skeleton height={70} width={70} />
          </Typography>
          <Typography variant="h6" align="center">
            <Skeleton height={70} width={70} />
          </Typography>
        </Stack>
        <Stack mt={-2} mb={2}>
          <Skeleton height={200} width={1050} />
        </Stack>
      </Stack>
      <Stack flex="5" paddingLeft="20px">
        <Skeleton variant="circular" width={240} height={240} />
      </Stack>
    </Stack>
  );
};

export default ShimmerAgent;
