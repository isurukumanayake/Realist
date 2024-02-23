import React, { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/auth";
import userPic from "../../../assets/user.png";
import { Box, Button, CircularProgress } from "@mui/material";
import axios from "axios";
import Resizer from "react-image-file-resizer";
import toast from "react-hot-toast";

const ProfilePhoto = () => {
  const { auth, setAuth } = useAuth();

  const [photo, setPhoto] = useState(null);

  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (photo) {
      handleSubmit();
    }
  }, [photo]);

  const handleUpload = async (e) => {
    try {
      let file = e.target.files[0];

      if (file) {
        setUploading(true);

        new Promise(() => {
          Resizer.imageFileResizer(
            file,
            1080,
            720,
            "JPEG",
            100,
            0,
            async (uri) => {
              try {
                const { data } = await axios.post("/upload-image", {
                  image: uri,
                });
                setPhoto(data);
                setUploading(false);
              } catch (error) {
                console.log(error);
                setUploading(false);
              }
            },
            "base64"
          );
        });
      }
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  const handleDelete = async (file) => {
    try {
      setUploading(true);

      const { data } = await axios.post("/delete-image", file);

      if (data?.ok) {
        setPhoto(null);
        setUploading(false);

        await handleSubmit();
      }
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const { data } = await axios.put("/update-profile", {
        photo,
      });

      if (data?.error) {
        toast.error(data.error);
        setLoading(false);
        return;
      } else {
        setAuth({ ...auth, user: data });

        let fromLS = JSON.parse(localStorage.getItem("auth"));
        fromLS.user = data;
        localStorage.setItem("auth", JSON.stringify(fromLS));

        toast.success("Profile updated successfully");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        paddingX: "30px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <img
        src={auth.user.photo?.Location ? auth.user.photo.Location : userPic}
        width="200px"
        height="200px"
        style={{ borderRadius: "50%" }}
        //   alt={photo.ETag}
      />

      <Button
        component="label"
        htmlFor="file-input"
        variant="contained"
        disabled={uploading || loading}
        fullWidth
        sx={{
          marginTop: "40px",
          textTransform: "none",
        }}
      >
        {uploading || loading ? (
          <CircularProgress
            variant="indeterminate"
            color="common"
            size={24}
            thickness={4}
          />
        ) : (
          "Upload photo"
        )}
      </Button>

      <input
        id="file-input"
        type="file"
        accept="image/*"
        onChange={handleUpload}
        hidden
      />

      {auth.user?.photo && (
        <Button
          variant="outlined"
          disabled={uploading || loading}
          fullWidth
          onClick={() => handleDelete(auth.user.photo)}
          sx={{
            marginTop: "20px",
            textTransform: "none",
          }}
        >
          {uploading || loading ? (
            <CircularProgress
              variant="indeterminate"
              color="common"
              size={24}
              thickness={4}
            />
          ) : (
            "Remove photo"
          )}
        </Button>
      )}
    </Box>
  );
};

export default ProfilePhoto;
