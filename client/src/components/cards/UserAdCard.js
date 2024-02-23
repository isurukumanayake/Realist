import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { IoBedOutline } from "react-icons/io5";
import { TbBath } from "react-icons/tb";
import { BiArea } from "react-icons/bi";
import { Badge } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { formatNumber } from "../../helpers/ad";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";
import ConfirmDialog from "../dialogs/ConfirmDialog";
import { useAuth } from "../../contexts/auth";

const UserAdCard = ({ ad, refreshAds }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [confirmOpen, setConfirmOpen] = useState(false);

  const { auth, setAuth } = useAuth();

  const handleDelete = async () => {
    try {
      setLoading(true);
      const { data } = await axios.delete(`/ad/${ad?._id}`);

      if (data?.error) {
        toast.error(data.error);
        setLoading(false);
        return;
      } else {
        // update user in context
        setAuth({ ...auth, user: data.user });
        // update user in local storage
        const fromLS = JSON.parse(localStorage.getItem("auth"));
        fromLS.user = data.user;
        localStorage.setItem("auth", JSON.stringify(fromLS));

        toast.success("Ad deleted successfully");
        setLoading(false);
        refreshAds();
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
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
          <Link
            to={`/ad/${ad.slug}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <CardMedia
              component="img"
              alt={`${ad?.category}-${ad?.address}-${ad?.type}-${ad?.price}`}
              height="200"
              image={ad?.photos?.[0].Location}
            />
            <CardContent>
              <Typography variant="h6" component="div" mb={0.5} mt={-1}>
                ${formatNumber(ad?.price)}
              </Typography>
              <Typography variant="body2" color="#454545" mb={1} noWrap>
                {ad?.address}
              </Typography>
              <Grid container mb={-1} color="#454545">
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
                  <Typography
                    component="div"
                    display="flex"
                    alignItems="center"
                  >
                    <BiArea style={{ marginRight: "5px" }} />
                    <span style={{ color: "black" }}>
                      {ad?.categoryValue === 100
                        ? ad?.landSize
                        : ad?.propertySize}
                      &nbsp;
                    </span>
                    {ad?.categoryValue === 100 ? ad?.landSizeUnit : "sqft"}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Link>
          <Divider />
          <Box sx={{ display: "flex" }}>
            <Button
              type="submit"
              variant="text"
              fullWidth
              color="success"
              onClick={() => navigate(`/user/ad/edit/${ad?.slug}`)}
              sx={{
                textTransform: "none",
                gap: 0.5,
              }}
            >
              <MdOutlineEdit style={{ marginBottom: "1px" }} />
              Edit Ad
            </Button>
            <Divider orientation="vertical" flexItem />
            <Button
              type="submit"
              variant="text"
              fullWidth
              color="error"
              onClick={() => setConfirmOpen(true)}
              disabled={loading}
              sx={{
                textTransform: "none",
                gap: 0.5,
              }}
            >
              {loading ? (
                <CircularProgress
                  variant="indeterminate"
                  color="common"
                  size={24}
                  thickness={4}
                />
              ) : (
                <>
                  <MdDeleteOutline style={{ marginBottom: "1px" }} />
                  Delete
                </>
              )}
            </Button>
          </Box>
        </Card>
      </Badge.Ribbon>
      <ConfirmDialog
        title="Delete Ad"
        open={confirmOpen}
        setOpen={setConfirmOpen}
        onConfirm={handleDelete}
      >
        Are you sure you want to delete this ad?
      </ConfirmDialog>
    </>
  );
};

export default UserAdCard;
