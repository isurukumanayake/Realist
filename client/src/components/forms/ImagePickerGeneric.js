import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import PhotoIcon from "@mui/icons-material/Photo";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

function ImagePicker() {
  const [selectedFile, setSelectedFile] = useState([]);

  const handleFileChange = (e) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      // Combine the new files with the existing ones
      const updatedFiles = [...selectedFile, ...Array.from(files)];

      // Trim the array to the first 5 elements
      const trimmedFiles = updatedFiles.slice(0, 5);

      setSelectedFile(trimmedFiles);
    }
  };

  const handleUpload = () => {
    try {
    } catch (error) {}
  };

  const handleDelete = () => {
    try {
    } catch (error) {}
  };

  const remainingSlots = selectedFile.length > 4 ? 0 : 4 - selectedFile.length;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
        }}
      >
        {selectedFile.length > 0 &&
          selectedFile.map((file, index) => (
            <Box
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
              />
              <img
                key={index}
                src={URL.createObjectURL(file)}
                width="80px"
                alt={`Selected ${index}`}
              />
            </Box>
          ))}
        {selectedFile.length < 5 && (
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
            </label>
            <input
              id="file-input"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              multiple
              hidden
            />
          </>
        )}
        {[...Array(remainingSlots)].map((_, index) => (
          <label
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
    </>
  );
}

export default ImagePicker;
