import { Box, Grid, InputBase, Paper, Typography } from "@mui/material";
import React from "react";
import SearchComponent from "../../reuseable/SearchComponent/SearchComponent";

function CategorySubscribe() {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        height: "25vh",
        background: "linear-gradient(90deg, #20BAF6 0%, #7450F0 100%)",
        mt: 3,
      }}
    >
      <Typography
        variant="p"
        sx={{
          fontSize: "16px",
          lineHeight: "19px",
          fontWeight: "600",
          color: "#ffffff",
        }}
      >
        Subscribe to our newsletter!
      </Typography>
      <Paper
        component="form"
        sx={{
          mt: 2,
          display: "flex",
          alignItems: "center",
          // border: "1px solid red",
          boxShadow: "none",
          //   border: "1px solid #D3D3DF",
          borderRadius: "4px",
          width: {
            xs: "90%",
            sm: "90%",
            md: "70%",
            xl: "40%",
            lg: "50%",
          },
          mx: { xs: 2, sm: 2, md: 0, lg: 0, xl: 0 },
        }}
      >
        <Grid sx={{ paddingRight: 2, width: "100%" }}>
          <InputBase
            fullWidth
            sx={{ ml: 1, flex: 1 }}
            placeholder="Email"
            inputProps={{
              "aria-label": "search google maps",
              style: {
                color: "#9F9FA9",
                fontSize: "16px",
              },
            }}
          />
        </Grid>
        <Box
          sx={{
            backgroundColor: "#00C1B4",
            padding: "1vh",
            borderRadius: "0px 4px 4px 0px",
            boxShadow: "0px 4px 34px rgba(0, 0, 0, 0.08)",

            width: {
              xs: "35%",
              sm: "25%",
              md: "15%",
              lg: "30%",
              xl: "30%",
            },
            textAlign: "center",
          }}
        >
          To send
        </Box>
      </Paper>
    </Grid>
  );
}

export default CategorySubscribe;
