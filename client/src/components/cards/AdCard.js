import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { IoBedOutline } from "react-icons/io5";
import { TbBath } from "react-icons/tb";
import { BiArea } from "react-icons/bi";
import { Badge } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { formatNumber } from "../../helpers/ad";
import axios from "axios";
import LikeUnlikeAdCard from "../misc/LikeUnlikeAdCard";

const AdCard = ({ ad, refreshWishlist }) => {
  const navigate = useNavigate();

  const hanleOnClick = () => {
    axios.put(`/ad/${ad._id}/increment-views`);
    navigate(`/ad/${ad.slug}`);
  };

  return (
    <Badge.Ribbon
      text={
        ad?.type === "sell"
          ? `${ad?.category} For Sale`
          : `${ad?.category} Rental`
      }
      color={ad?.type === "sell" ? "light-blue" : "purple"}
    >
      <Card
        sx={{
          width: 300,
          "&:hover": {
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            cursor: "pointer",
          },
        }}
      >
        <Box sx={{ position: "relative" }}>
          <CardMedia
            component="img"
            alt={`${ad?.category}-${ad?.address}-${ad?.type}-${ad?.price}`}
            height="200"
            image={ad?.photos?.[0].Location}
            onClick={hanleOnClick}
          />
          <LikeUnlikeAdCard ad={ad} refreshWishlist={refreshWishlist} />
        </Box>
        <CardContent onClick={hanleOnClick}>
          <Typography variant="h6" component="div" mb={0.5} mt={-1}>
            ${formatNumber(ad?.price)}
          </Typography>
          <Typography variant="body2" color="#454545" mb={1} noWrap>
            {ad?.address}
          </Typography>
          <Grid
            container
            mb={-1}
            color="#454545"
            justifyContent="space-between"
          >
            {ad?.categoryValue !== 100 && ad?.categoryValue !== 103 && (
              <>
                <Grid item xs={3.6}>
                  <Typography
                    component="div"
                    display="flex"
                    alignItems="center"
                  >
                    <IoBedOutline style={{ marginRight: "5px" }} />
                    <span style={{ color: "black" }}>{ad?.bedrooms}</span>
                  </Typography>
                </Grid>
                <Grid item xs={3.6}>
                  <Typography
                    component="div"
                    display="flex"
                    alignItems="center"
                  >
                    <TbBath
                      style={{ marginRight: "5px" }}
                      color="text.secondary"
                    />
                    <span style={{ color: "black" }}>{ad?.bathrooms}</span>
                  </Typography>
                </Grid>
              </>
            )}
            <Grid item xs={4.8}>
              <Typography component="div" display="flex" alignItems="center">
                <BiArea style={{ marginRight: "5px" }} />
                <span style={{ color: "black" }}>
                  {ad?.categoryValue === 100 ? ad?.landSize : ad?.propertySize}
                  &nbsp;
                </span>
                {ad?.categoryValue === 100 ? ad?.landSizeUnit : "sqft"}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Badge.Ribbon>
  );
};

export default AdCard;
