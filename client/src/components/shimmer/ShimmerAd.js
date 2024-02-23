import { Box, Skeleton, Stack, Typography } from "@mui/material";
import React from "react";
import ShimmerAdDetails from "../cards/ShimmerAdDetails";

const ShimmerAd = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Stack>
        <Stack direction="row" gap={1}>
          <Stack mt={-20}>
            <Skeleton width={950} height={720} />
          </Stack>
          <Stack direction="column" mt={2}>
            {Array(5)
              .fill()
              .map((_, index) => (
                <Stack key={index} mt={-5.5}>
                  <Skeleton height={132} width={100} />
                </Stack>
              ))}
          </Stack>
        </Stack>
        <ShimmerAdDetails />
        <Stack mt={-10.5}>
          <Skeleton width={620} height={500} />
          <Typography variant="h5" mt={-8}>
            <Skeleton width={800} />
          </Typography>
          <Typography variant="body1" mt={-6}>
            <Skeleton height={300} />
          </Typography>
        </Stack>
      </Stack>
      <Stack mt={-110}>
        <Skeleton width={260} height={800} />
      </Stack>
    </Box>
  );
};

export default ShimmerAd;
