import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/auth";
import axios from "axios";
import UserAdCard from "../../components/cards/UserAdCard";
import { Box, Grid, LinearProgress } from "@mui/material";
import DashboardLayout from "../../layouts/DashboardLayout";
import NoAds from "../../components/empty/NoAds";
import PaginationContainer from "../../components/misc/PaginationContainer";
import ShimmerAds from "../../components/shimmer/ShimmerAds";

const MyAds = () => {
  const { auth, setAuth } = useAuth();

  const [ads, setAds] = useState([]);
  const [total, setTotal] = useState();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [loading, setLoading] = useState(false);

  const seller = auth.user?.role?.includes("Seller");

  const limit = 16;

  useEffect(() => {
    if (seller) {
      fetchAds();
    }
  }, [auth.token !== "", page]);

  const fetchAds = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/user-ads?page=${page}&limit=${limit}`);
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
          {total > 0 ? (
            <>
              <Grid container spacing={5}>
                {ads.map((ad) => (
                  <Grid item key={ad._id}>
                    <UserAdCard ad={ad} refreshAds={fetchAds} />
                  </Grid>
                ))}
              </Grid>

              <PaginationContainer
                count={totalPages}
                page={page}
                setPage={setPage}
                limit={limit}
                total={total}
                name="listings"
              />
            </>
          ) : (
            <NoAds />
          )}
        </>
      )}
    </DashboardLayout>
  );
};

export default MyAds;
