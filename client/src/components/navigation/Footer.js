import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ULink = styled(Link)`
  color: white;
  margin: 10px 25px 10px 0;
  text-decoration: none;
  transition: 0.3s ease-in-out;

  &:hover,
  &.active {
    color: #dd7124;
  }
`;

const socials = [
  {
    link: "https://facebook.com",
    icon: <FaFacebook />,
  },
  {
    link: "https://twitter.com",
    icon: <FaXTwitter />,
  },
  {
    link: "https://linkedin.com",
    icon: <FaLinkedin />,
  },
  {
    link: "https://instagram.com",
    icon: <FaInstagram />,
  },
  {
    link: "https://pinterest.com",
    icon: <FaPinterest />,
  },
  {
    link: "https://youtube.com",
    icon: <FaYoutube />,
  },
];

const usefulLinks = [
  {
    title: "About us",
    link: "/about",
  },
  {
    title: "Careers",
    link: "/careers",
  },
  {
    title: "Accessibility",
    link: "/accessibility",
  },
  {
    title: "Feedback",
    link: "/feedback",
  },
  {
    title: "Media Room",
    link: "/media",
  },
  {
    title: "Ad choices",
    link: "/ad-choices",
  },
  {
    title: "Advertise with us",
    link: "/advertise",
  },
  {
    title: "Agent Support",
    link: "/agent-support",
  },
  {
    title: "Privacy",
    link: "/privacy",
  },
  {
    title: "Terms",
    link: "/terms",
  },
  {
    title: "Tech Blog",
    link: "/tech-blog",
  },
  {
    title: "Agent Blog",
    link: "/agent-blog",
  },
  {
    title: "Sitemap",
    link: "/sitemap",
  },
];

const IconWrapper = ({ children }) => {
  return (
    <Box
      sx={{
        height: "40px",
        width: "40px",
        borderRadius: "50%",
        backgroundColor: "white",
        color: "#2b3d66",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "20px",
      }}
    >
      {children}
    </Box>
  );
};

const Footer = () => {
  return (
    <Box
      sx={{
        minHeight: "240px",
        backgroundColor: "#2b3d66",
        bottom: "0",
        color: "whitesmoke",
        padding: "50px 90px",
      }}
    >
      <Stack direction="row" spacing={1.5}>
        {socials.map((social, index) => (
          <a href={social.link} key={index} target="_blank" rel="noreferrer">
            <IconWrapper>{social.icon}</IconWrapper>
          </a>
        ))}
      </Stack>
      <Stack direction={{ xs: "column", sm: "row" }} flexWrap="wrap" mt={4}>
        {usefulLinks.map((link) => (
          <ULink to="#" key={link.link}>
            <Typography variant="subtitle1">{link.title}</Typography>
          </ULink>
        ))}
      </Stack>
      <Typography
        variant="subtitle2"
        mt={4}
        sx={{ fontWeight: 300, fontSize: "12px" }}
      >
        &copy; 2023 - {new Date().getFullYear()}&nbsp;
        <Link
          to="/"
          style={{
            color: "white",
            fontWeight: 500,
          }}
        >
          Realist
        </Link>
        &nbsp; All rights reserved
      </Typography>
    </Box>
  );
};

export default Footer;
