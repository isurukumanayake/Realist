import React, { useEffect, useState } from "react";
import LikeUnlike from "../misc/LikeUnlike";
import { formatNumber } from "../../helpers/ad";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { GiHomeGarage } from "react-icons/gi";
import { RiRuler2Line } from "react-icons/ri";
import { BsPinMap } from "react-icons/bs";
import { LuBuilding } from "react-icons/lu";
import dayjs from "dayjs";
import axios from "axios";

const AdDetails = ({ ad }) => {
  const [saves, setSaves] = useState(0);

  useEffect(() => {
    fetchSaves();
  }, [ad]);

  const fetchSaves = async () => {
    try {
      const { data } = await axios.get(`/ad/${ad._id}/saves`);
      setSaves(data.saves);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ paddingY: "20px" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            sx={{
              height: "14px",
              width: "14px",
              borderRadius: "50%",
              backgroundColor: ad?.sold ? "red" : "green",
              marginRight: "5px",
            }}
          />
          <Typography variant="body1">
            {ad?.type === "sell"
              ? `${ad?.category} For Sale`
              : `${ad?.category} For Rent`}
          </Typography>
        </Box>
        <LikeUnlike ad={ad} />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
        mt={1}
      >
        <Box sx={{ flex: 3 }}>
          <Stack direction="row" alignItems="baseline">
            <Typography variant="h3" sx={{ fontWeight: 700 }}>
              ${formatNumber(ad?.price)}
            </Typography>
            {ad?.type === "rent" && (
              <Typography variant="h6" color="#333" sx={{ fontWeight: 400 }}>
                &nbsp;/{ad?.categoryValue === 105 ? "nt" : "mo"}
              </Typography>
            )}
          </Stack>
          <Typography variant="h5" mt={1}>
            {ad.address}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flex: 1, justifyContent: "space-between" }}>
          <Box mx={1}>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {ad?.categoryValue !== 100 && ad?.categoryValue !== 103
                ? ad?.bedrooms
                : "--"}
            </Typography>
            <Typography variant="h5" color="#454545">
              beds
            </Typography>
          </Box>
          <Box mx={1}>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {ad?.categoryValue !== 100 && ad?.categoryValue !== 103
                ? ad?.bathrooms
                : "--"}
            </Typography>
            <Typography variant="h5" color="#454545">
              baths
            </Typography>
          </Box>
          <Box mx={1}>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {ad?.categoryValue === 100 ? ad?.landSize : ad?.propertySize}
            </Typography>
            <Typography variant="h5" color="#454545">
              {ad?.categoryValue === 100 ? ad?.landSizeUnit : "sqft"}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-start" }} mt={2}>
        {ad?.categoryValue !== 100 && (
          <>
            {(ad?.categoryValue === 103 ||
              ad?.categoryValue === 104 ||
              ad?.categoryValue === 105) && (
              <Box
                sx={{
                  width: "200px",
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "whitesmoke",
                  padding: "10px",
                }}
                mr={1}
              >
                <LuBuilding />
                <Typography ml={1}>{ad?.subCategory}</Typography>
              </Box>
            )}
            {ad?.categoryValue !== 104 && (
              <Box
                sx={{
                  width: "200px",
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "whitesmoke",
                  padding: "10px",
                }}
                mr={1}
              >
                <GiHomeGarage />
                <Typography ml={1}>
                  {ad?.parkings} parking{ad?.parkings > 1 && "s"}
                </Typography>
              </Box>
            )}
            {ad?.categoryValue !== 105 && (
              <Box
                sx={{
                  width: "200px",
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "whitesmoke",
                  padding: "10px",
                }}
                mr={1}
              >
                <RiRuler2Line />
                <Typography ml={1}>
                  ${formatNumber(parseInt(ad?.price / ad?.propertySize))}/sqft
                </Typography>
              </Box>
            )}
            {ad?.categoryValue === 101 && (
              <Box
                sx={{
                  width: "200px",
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "whitesmoke",
                  padding: "10px",
                }}
                mr={1}
              >
                <BsPinMap />
                <Typography ml={1}>
                  {ad?.landSize} {ad?.landSizeUnit} lot
                </Typography>
              </Box>
            )}
          </>
        )}
      </Box>

      <Box
        sx={{ display: "flex", alignItems: "baseline" }}
        mt={ad?.categoryValue !== 100 ? 3 : 1}
      >
        <Box sx={{ display: "flex", alignItems: "baseline", width: "180px" }}>
          <Typography variant="h6" sx={{ fontSize: "16px", fontWeight: 600 }}>
            {dayjs().diff(dayjs(ad?.createdAt), "days") > 0
              ? dayjs().diff(dayjs(ad?.createdAt), "days") + " days"
              : dayjs().diff(dayjs(ad?.createdAt), "hours") > 0
              ? dayjs().diff(dayjs(ad?.createdAt), "hours") + " hours"
              : dayjs().diff(dayjs(ad?.createdAt), "minutes") > 0
              ? dayjs().diff(dayjs(ad?.createdAt), "minutes") + " minutes"
              : "Just now"}
          </Typography>
          &nbsp;
          <Typography variant="body1" color="#454545">
            on Realist
          </Typography>
        </Box>
        |&nbsp;
        <Box sx={{ display: "flex", alignItems: "baseline", width: "100px" }}>
          <Typography variant="h6" sx={{ fontSize: "16px", fontWeight: 600 }}>
            {ad?.views}
          </Typography>
          &nbsp;
          <Typography variant="body1" color="#454545">
            {ad?.views > 1 ? "views" : "view"}
          </Typography>
        </Box>
        |&nbsp;
        <Box sx={{ display: "flex", alignItems: "baseline", width: "100px" }}>
          <Typography variant="h6" sx={{ fontSize: "16px", fontWeight: 600 }}>
            {saves}
          </Typography>
          &nbsp;
          <Typography variant="body1" color="#454545">
            saves
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default AdDetails;
