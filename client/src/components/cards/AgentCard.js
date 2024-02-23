import React, { useEffect, useState } from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Badge } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import agentPhoto from "../../assets/agent.png";

dayjs.extend(relativeTime);

const AgentCard = ({ agent }) => {
  const [adCount, setAdCount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    if (agent?._id) {
      fetchAdCount();
    }
  }, [agent?._id]);

  const fetchAdCount = async () => {
    try {
      const { data } = await axios.get(`/agent-ad-count/${agent._id}`);
      setAdCount(data);
    } catch (error) {
      console.log(error);
    }
  };

  const hanleOnClick = () => {
    axios.put(`/agent/${agent._id}/increment-views`);
    navigate(`/agent/${agent.username}`);
  };

  return (
    <Badge.Ribbon
      text={`${adCount} listing${adCount == 1 ? "" : "s"}`}
      color={"green"}
    >
      <Card
        sx={{
          width: 300,
          "&:hover": {
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            cursor: "pointer",
          },
        }}
        onClick={hanleOnClick}
      >
        <CardMedia
          component="img"
          alt={agent?.username}
          height="260"
          sx={{
            objectFit: agent?.photo?.Location ? "cover" : "contain",
            backgroundColor: "#f5f5f5",
          }}
          image={agent?.photo?.Location ?? agentPhoto}
        />
        <CardContent>
          <Typography variant="h6" component="div" mb={0.5} mt={-1}>
            {agent?.name ? agent?.name : agent?.username}
          </Typography>
          <Typography variant="body2" color="#454545" mb={-1}>
            Joined {dayjs(agent?.createdAt).fromNow()}
          </Typography>
        </CardContent>
      </Card>
    </Badge.Ribbon>
  );
};

export default AgentCard;
