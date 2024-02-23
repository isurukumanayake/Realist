import { useState } from "react";
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import logo from "../../assets/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useAuth } from "../../contexts/auth";

const Link = styled(NavLink)`
  padding: 5px 20px;
  text-decoration: none;
  color: white;
  border: 5px solid transparent;
  transition: border 0.3s ease-in-out;

  &:hover,
  &.active {
    border-bottom: 3px solid #dd7124;
    // border-top: 3px solid #dd7124;
    border-radius: 1px;
  }
`;

const Navbar = () => {
  const [anchorElUser, setAnchorElUser] = useState(false);

  const navigate = useNavigate();

  const { auth, setAuth } = useAuth();

  const loggedIn =
    auth.user !== null && auth.token !== "" && auth.refreshToken !== "";

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(false);
  };

  const logout = () => {
    setAuth({
      user: null,
      token: "",
      refreshToken: "",
    });
    localStorage.removeItem("auth");
    navigate("/");
  };

  const settings = [
    {
      name: "Profile",
      handleClick: () => navigate(`/agent/${auth.user?.username}`),
    },
    { name: "My Ads", handleClick: () => navigate("/user/my-ads") },
    {
      name: "Saved Listings",
      handleClick: () => navigate("/user/saved-listings"),
    },
    {
      name: "Settings",
      handleClick: () => navigate("/user/settings"),
    },
    { name: "Logout", handleClick: logout },
  ];

  return (
    <Box
      p={2}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#2b3d66",
      }}
    >
      <img
        src={logo}
        height="50px"
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      />
      <Box display="flex">
        <Typography variant="body1" display="inline-block" mr={4} mt={2}>
          <Link to="/ads/buy">Buy</Link>
        </Typography>

        <Typography variant="body1" display="inline-block" mr={4} mt={2}>
          <Link to="/ads/rent">Rent</Link>
        </Typography>

        <Typography variant="body1" display="inline-block" mr={4} mt={2}>
          <Link to="/agents">Agents</Link>
        </Typography>

        <Typography variant="body1" display="inline-block" mr={4} mt={2}>
          <Link to="/ad/post">Post Ad</Link>
        </Typography>

        {!loggedIn ? (
          <>
            <Typography variant="body1" display="inline-block" mr={4} mt={2}>
              <Link to="/login">Login</Link>
            </Typography>
            <Typography variant="body1" display="inline-block" mr={4} mt={2}>
              <Link to="/register">Register</Link>
            </Typography>
          </>
        ) : (
          <>
            <Box mt={1}>
              {/* <Tooltip title="Open settings"> */}
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt={auth.user?.name}
                  src={auth.user?.photo?.Location}
                />
                <ArrowDropDownIcon style={{ color: "white" }} />
              </IconButton>
              {/* </Tooltip> */}
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => {
                  // Conditionally render "Profile" only if the user's role includes 'seller'
                  if (
                    setting.name === "Profile" &&
                    !auth.user?.role?.includes("Seller")
                  ) {
                    return null; // Skip rendering "Profile" if the condition is not met
                  }
                  return (
                    <MenuItem key={setting.name} onClick={setting.handleClick}>
                      <Typography textAlign="center">{setting.name}</Typography>
                    </MenuItem>
                  );
                })}
              </Menu>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};
export default Navbar;
