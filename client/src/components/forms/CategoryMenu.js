import React, { Fragment } from "react";
import {
  Box,
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";

const CategoryMenu = ({ isOpen, handleClose, menuOptions, selectedOption }) => {
  return (
    <Dialog onClose={handleClose} open={isOpen} fullWidth>
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Select category
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        {menuOptions.map((option, index) => (
          <Fragment key={option.name}>
            <Box
              component={Link}
              to={`/ad/post/details?type=${selectedOption}&category=${option.value}`}
              my={1.5}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                textDecoration: "none",
                color: "inherit",
                "&:hover": {
                  cursor: "pointer",
                  color: "#1976d2",
                },
              }}
              onClick={handleClose}
            >
              <Typography>{option.name}</Typography>
              <ArrowForwardIosIcon fontSize="12px" />
            </Box>
            {index < menuOptions.length - 1 && <Divider />}
          </Fragment>
        ))}
      </DialogContent>
    </Dialog>
  );
};

export default CategoryMenu;
