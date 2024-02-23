import { IconButton, Tooltip } from "@mui/material";
import React from "react";
import { useAuth } from "../../contexts/auth";
import { FaRegHeart } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function LikeUnlike({ ad }) {
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

      toast.success("Unsaved listing");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {auth.user?.wishlist?.includes(ad._id) ? (
        <Tooltip title="Unsave" arrow>
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
        </Tooltip>
      ) : (
        <Tooltip title="Save" arrow>
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
        </Tooltip>
      )}
    </>
  );
}

export default LikeUnlike;
