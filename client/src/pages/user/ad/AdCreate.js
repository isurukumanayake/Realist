import React, { useEffect, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import rent from "../../../assets/rent.png";
import sell from "../../../assets/sale.png";
import { rentMenu, sellMenu } from "../../../constants/AdConstants";
import CategoryMenu from "../../../components/forms/CategoryMenu";
import { useAuth } from "../../../contexts/auth";
import CommonLayout from "../../../layouts/CommonLayout";

function AdCreate() {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const { auth, setAuth } = useAuth();

  const handleClickOpen = (option) => {
    setOpen(true);
    setSelectedOption(option);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const menuOptions = selectedOption === "sell" ? sellMenu : rentMenu;

  return (
    <CommonLayout>
      <Box
        sx={{
          bgcolor: "#e7edee",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          padding: "100px 200px",
        }}
      >
        <Box
          sx={{
            bgcolor: "white",
            py: "50px",
            borderRadius: "5px",
            width: "982px",
          }}
        >
          <Stack direction="column" justifyContent="center" alignItems="center">
            <Typography variant="h6">
              Welcome {auth.user?.name ? auth.user?.name : auth.user?.username}!
              Let's post an ad.
            </Typography>
            <Typography variant="body2" mt={1}>
              Choose any option below
            </Typography>
          </Stack>
          <Stack
            direction="row"
            display="flex"
            spacing={12}
            justifyContent="center"
            alignItems="center"
            mt={5}
            mb={3}
          >
            <Button
              onClick={() => handleClickOpen("sell")}
              sx={{
                flexDirection: "column",
                border: "2px solid #1976d2",
                px: "60px",
                py: "20px",
                ":hover": {
                  bgcolor: "#e7edee",
                },
              }}
            >
              <img src={sell} style={{ height: "100px" }} />
              <Typography variant="h5" mt={2}>
                Sell
              </Typography>
            </Button>
            <Button
              onClick={() => handleClickOpen("rent")}
              sx={{
                flexDirection: "column",
                border: "2px solid #1976d2",
                px: "60px",
                py: "20px",
                ":hover": {
                  bgcolor: "#e7edee",
                },
              }}
            >
              <img src={rent} style={{ height: "100px" }} />
              <Typography variant="h5" mt={2}>
                Rent
              </Typography>
            </Button>
          </Stack>
        </Box>
      </Box>

      <CategoryMenu
        isOpen={open}
        handleClose={handleClose}
        menuOptions={menuOptions}
        selectedOption={selectedOption}
      />
    </CommonLayout>
  );
}

export default AdCreate;
