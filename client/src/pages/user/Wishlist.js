import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import axios from "axios";
import { Box, Grid, LinearProgress } from "@mui/material";
import AdCard from "../../components/cards/AdCard";
import EmptyWishlist from "../../components/empty/EmptyWishlist";
import PaginationContainer from "../../components/misc/PaginationContainer";
import ShimmerAds from "../../components/shimmer/ShimmerAds";

const Wishlist = () => {
  const [ads, setAds] = useState([]);
  const [total, setTotal] = useState();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [loading, setLoading] = useState(false);

  const limit = 4;

  useEffect(() => {
    fetchAds();
  }, [page]);

  const fetchAds = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/wishlist?page=${page}&limit=${limit}`);
      setAds(data.ads);
      setTotal(data.total);
      setTotalPages(data.totalPages);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      {loading ? (
        <>
          <LinearProgress sx={{ marginTop: "-50px" }} />
          <Box sx={{ marginTop: "50px" }}>
            <ShimmerAds />
          </Box>
        </>
      ) : (
        <>
          {ads?.length > 0 ? (
            <>
              <Grid container spacing={5}>
                {ads.map((ad) => (
                  <Grid item key={ad._id}>
                    <AdCard ad={ad} refreshWishlist={fetchAds} />
                  </Grid>
                ))}
              </Grid>
              <PaginationContainer
                count={totalPages}
                page={page}
                setPage={setPage}
                limit={limit}
                total={total}
                name="saved listings"
              />
            </>
          ) : (
            <EmptyWishlist />
          )}
        </>
      )}
    </DashboardLayout>
  );
};

export default Wishlist;
