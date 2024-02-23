import React from "react";
import { Box, Typography } from "@mui/material";
import PhotoIcon from "@mui/icons-material/Photo";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

function ImagePicker({ ad, setAd }) {
  const handleUpload = async (e) => {
    try {
      let files = e.target.files;
      files = Array.from(files);

      if (files && files.length > 0) {
        setAd({ ...ad, uploading: true });

        if (files.length + ad.photos.length > 5) {
          files = files.slice(0, 5 - ad.photos.length);
        }

        files.map((file) => {
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
                  setAd((prev) => ({
                    ...prev,
                    photos: [...prev.photos, data],
                    uploading: false,
                  }));
                } catch (error) {
                  console.log(error);
                  setAd({ ...ad, uploading: false });
                }
              },
              "base64"
            );
          });
        });
      }
    } catch (error) {
      console.log(error);
      setAd({ ...ad, uploading: false });
    }
  };

  const handleDelete = async (file) => {
    try {
      setAd({ ...ad, uploading: true });

      const { data } = await axios.post("/delete-image", file);

      if (data?.ok) {
        setAd((prev) => ({
          ...prev,
          photos: prev.photos.filter((photo) => photo.Key !== file.Key),
          uploading: false,
        }));
      }
    } catch (error) {
      console.log(error);
      setAd({ ...ad, uploading: false });
    }
  };

  const remainingSlots = Math.max(0, 4 - ad.photos.length);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: "10px",
      }}
    >
      {ad.photos.length > 0 &&
        ad.photos.map((file, index) => (
          <Box
            key={file.key}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#e7edee",
              height: "80px",
              width: "80px",
              position: "relative",
            }}
          >
            <RemoveCircleIcon
              style={{
                fontSize: "1rem",
                position: "absolute",
                top: "5px",
                right: "0",
                color: "#d32f2f",
                backgroundColor: "white",
                borderRadius: "50%",
                cursor: "pointer",
              }}
              onClick={() => handleDelete(file)}
            />
            <img
              key={index}
              src={file.Location}
              width="80px"
              alt={file.ETag}
              style={{ maxHeight: "80px" }}
            />
          </Box>
        ))}
      {ad.photos.length < 5 && (
        <>
          <label
            htmlFor="file-input"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #1976d2",
              height: "80px",
              width: "80px",
              cursor: "pointer",
              position: "relative",
            }}
          >
            <PhotoIcon sx={{ fontSize: "2rem", color: "#1976d2" }} />
            <Typography
              sx={{
                fontSize: "12px",
                textTransform: "none",
                color: "#1976d2",
              }}
              mt={1}
            >
              Add a photo
            </Typography>
            {ad.uploading && (
              <Box
                style={{
                  position: "absolute",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                  zIndex: "3",
                }}
              >
                <CircularProgress />
              </Box>
            )}
          </label>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={handleUpload}
            multiple
            hidden
          />
        </>
      )}
      {[...Array(remainingSlots)].map((_, index) => (
        <label
          key={index}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid lightgrey",
            height: "80px",
            width: "80px",
          }}
        >
          <PhotoIcon sx={{ fontSize: "2rem", color: "lightgrey" }} />
          <Typography
            sx={{
              fontSize: "12px",
              textTransform: "none",
              color: "lightgrey",
            }}
            mt={1}
          >
            Add a photo
          </Typography>
        </label>
      ))}
    </Box>
  );
}

export default ImagePicker;
