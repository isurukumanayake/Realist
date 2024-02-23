import { Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { GoOrganization } from "react-icons/go";
import agentPhoto from "../../assets/agent.png";

dayjs.extend(relativeTime);

const AgentDetails = ({ agent, total }) => {
  console.log(agent?.about);
  return (
    <Stack direction="row">
      <Stack flex="5" paddingRight="20px">
        <Typography variant="h6" color="darkgrey" mb={-1}>
          AGENT
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 600 }}>
          {agent?.name ? agent?.name : agent?.username}
        </Typography>
        {agent?.company && (
          <Typography variant="h5" mt={0.5} color=" #333333">
            <Stack direction="row" alignItems="center" gap={0.5}>
              <GoOrganization />
              {agent?.company}
            </Stack>
          </Typography>
        )}
        <Typography variant="body2" mt={2}>
          Joined {dayjs(agent?.createdAt).fromNow()}
        </Typography>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
          mt={3}
        >
          <Stack direction="column">
            <Typography variant="body1" color="#454545">
              Listings
            </Typography>
            <Typography variant="h6" align="center">
              {total}
            </Typography>
          </Stack>
          <Stack direction="column">
            <Typography variant="body1" color="#454545">
              Views
            </Typography>
            <Typography variant="h6" align="center">
              {agent?.views}
            </Typography>
          </Stack>
        </Stack>

        {agent?.about && (
          <Stack>
            <Typography variant="h5" sx={{ fontWeight: 500 }} mt={3}>
              About me
            </Typography>
            <Typography
              variant="body1"
              mt={1}
              color="#454545"
              textAlign="justify"
              sx={{ whiteSpace: "pre-line" }}
            >
              {agent?.about}
            </Typography>
          </Stack>
        )}
      </Stack>
      <img
        src={agent?.photo?.Location ?? agentPhoto}
        alt={agent?.username}
        style={{
          borderRadius: "50%",
          height: "240px",
          width: "240px",
          flex: 1,
        }}
      />
    </Stack>
  );
};

export default AgentDetails;
