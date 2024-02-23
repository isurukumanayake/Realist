import { Box, IconButton } from "@mui/material";
import React from "react";
import { useAuth } from "../../contexts/auth";
import { FaRegHeart } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function LikeUnlikeAdCard({ ad, refreshWishlist }) {
  const { auth, setAuth } = useAuth();

  const navigate = useNavigate();

  const addToWishlist = async () => {
    try {
      if (auth.user === null) {
        navigate("/login", { state: { from: `/ad/${ad.slug}` } });
        return;
      }
      const { data } = await axios.post(`/wishlist`, { adId: ad._id });
      const fromLS = JSON.parse(localStorage.getItem("auth"));
      fromLS.user = data;
      localStorage.setItem("auth", JSON.stringify(fromLS));
      setAuth({ ...auth, user: data });

      toast.success("Saved listing");
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromWishlist = async () => {
    try {
      if (auth.user === null) {
        navigate("/login");
        return;
      }
      const { data } = await axios.delete(`/wishlist/${ad._id}`);
      const fromLS = JSON.parse(localStorage.getItem("auth"));
      fromLS.user = data;
      localStorage.setItem("auth", JSON.stringify(fromLS));
      setAuth({ ...auth, user: data });

      //For the saved listings page to refresh
      refreshWishlist();

      toast.success("Unsaved listing");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ position: "absolute", bottom: 4, right: 4, zIndex: 2 }}>
      {auth.user?.wishlist?.includes(ad._id) ? (
        <IconButton
          type="button"
          onClick={() => removeFromWishlist()}
          sx={{
            p: "10px",
            background: "#B22222",
            color: "white",
            border: "1px solid #B22222",
            "&:hover": {
              background: "#B22222",
              color: "white",
              border: "1px solid #B22222",
            },
          }}
          aria-label="search"
        >
          <FaRegHeart />
        </IconButton>
      ) : (
        <IconButton
          type="button"
          onClick={() => addToWishlist()}
          sx={{
            p: "10px",
            background: "white",
            color: "darkgrey",
            border: "1px solid darkgrey",
            "&:hover": {
              background: "#B22222",
              color: "white",
              border: "1px solid #B22222",
            },
          }}
          aria-label="search"
        >
          <FaRegHeart />
        </IconButton>
      )}
    </Box>
  );
}

export default LikeUnlikeAdCard;
