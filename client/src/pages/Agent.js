import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AgentDetails from "../components/cards/AgentDetails";
import { Box, Grid, Typography } from "@mui/material";
import AdCard from "../components/cards/AdCard";
import CommonLayout from "../layouts/CommonLayout";
import PaginationContainer from "../components/misc/PaginationContainer";
import ShimmerAgent from "../components/shimmer/ShimmerAgent";
import ShimmerAds from "../components/shimmer/ShimmerAds";

const Agent = () => {
  const params = useParams();

  const navigate = useNavigate();

  const [agent, setAgent] = useState();
  const [ads, setAds] = useState([]);
  const [totalAds, setTotalAds] = useState();
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const [total, setTotal] = useState();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();

  const adLimit = 16;

  useEffect(() => {
    if (params?.username) {
      fetchAgent();
    }
  }, [params?.username]);

  useEffect(() => {
    if (agent?._id) {
      fetchAds();
    }
  }, [agent]);

  useEffect(() => {
    fetchAds();
  }, [page]);

  const fetchAgent = async () => {
    try {
      setLoading1(true);
      const { data } = await axios.get(`/agent/${params.username}`);
      setAgent(data.agent);
      setTotalAds(data.totalAds);
      setLoading1(false);
    } catch (error) {
      console.error(error);
      setLoading1(false);
      navigate("/404");
    }
  };

  const fetchAds = async () => {
    try {
      setLoading2(true);
      const { data } = await axios.get(
        `/agent-ads/${agent._id}?page=${page}&limit=${adLimit}`
      );
      setAds(data.ads);
      setTotal(data?.total);
      setTotalPages(data?.totalPages);
      setLoading2(false);
    } catch (error) {
      console.error(error);
      setLoading2(false);
    }
  };

  return (
    <CommonLayout>
      <Box
        sx={{
          padding: "60px 90px",
        }}
      >
        {loading1 ? (
          <ShimmerAgent />
        ) : (
          <AgentDetails agent={agent} total={totalAds} />
        )}

        <Typography
          variant="h5"
          sx={{ fontWeight: 500 }}
          mt={loading1 ? -0.5 : 5}
          mb={2}
        >
          My listings
        </Typography>

        {loading1 || loading2 ? (
          <ShimmerAds />
        ) : (
          <>
            <Grid container spacing={5}>
              {ads.map((ad) => (
                <Grid item key={ad._id}>
                  <AdCard ad={ad} />
                </Grid>
              ))}
            </Grid>

            <PaginationContainer
              count={totalPages}
              page={page}
              setPage={setPage}
              limit={adLimit}
              total={total}
              name="listings"
            />
          </>
        )}
      </Box>
    </CommonLayout>
  );
};

export default Agent;
