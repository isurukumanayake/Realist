import axios from "axios";
import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import AgentCard from "../components/cards/AgentCard";
import CommonLayout from "../layouts/CommonLayout";
import ShimmerAgents from "../components/shimmer/ShimmerAgents";
import PaginationContainer from "../components/misc/PaginationContainer";
import NoAgents from "../components/empty/NoAgents";

const Agents = () => {
  const [agents, setAgents] = useState([]);

  const [total, setTotal] = useState();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [loading, setLoading] = useState(false);

  const limit = 4;

  useEffect(() => {
    fetchAgents();
  }, [page]);

  const fetchAgents = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/agents?page=${page}&limit=${limit}`);
      setAgents(data?.agents);
      setTotal(data?.total);
      setTotalPages(data?.totalPages);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <CommonLayout>
      {loading ? (
        <ShimmerAgents />
      ) : (
        <Box
          sx={{
            padding: "60px 90px",
          }}
        >
          {agents.length > 0 ? (
            <>
              <Grid container spacing={5}>
                {agents.map((agent) => (
                  <Grid item key={agent._id}>
                    <AgentCard agent={agent} />
                  </Grid>
                ))}
              </Grid>

              <PaginationContainer
                count={totalPages}
                page={page}
                setPage={setPage}
                limit={limit}
                total={total}
                name="agents"
              />
            </>
          ) : (
            <NoAgents />
          )}
        </Box>
      )}
    </CommonLayout>
  );
};

export default Agents;
