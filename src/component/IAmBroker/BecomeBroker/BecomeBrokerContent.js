import React from "react";
import becomeBroker from "../../../../public/Images/becomeBroker.png";
import becomeBrokerMobile from "../../../../public/Images/becomeBrokerMobile.png";
import shapeImage from "../../../../public/Images/image_shape.png";
import { Grid, Box } from "@mui/material";
import Image from "next/image";

function BecomeBrokerContent() {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{
        paddingTop: { xs: 0, sm: 0, md: 0, lg: 30, xl: 30 },
        paddingBottom: { xs: 0, sm: 0, md: 0, lg: 20, xl: 20 },
        marginLeft: { xs: 0, sm: 0, md: 0, lg: 2, xl: 2 },
      }}
    >
      <Box
        sx={{
          position: { xl: "absolute", lg: "absolute" },
          display: {
            xl: "inline",
            lg: "inline",
            md: "inline",
            xs: "none",
            sm: "none",
          },
        }}
      >
        <Image src={becomeBroker} alt="becomeBroker" />
      </Box>
      <Box
        sx={{
          display: {
            xl: "none",
            lg: "none",
            md: "none",
            xs: "inline",
            sm: "inline",
          },
          position: "absolute",
        }}
      >
        <Image src={becomeBrokerMobile} alt="brokerMobile" />
      </Box>
      <Grid
        sx={{
          display: {
            xs: "none",
            sm: "none",
            md: "none",
            xl: "inline",
            lg: "inline",
          },
          position: "relative",
          top: {xs:'-28vh',xxxl:'-10vh'},
          left: {xs:'16vh',xxxl:'5vh'},
        }}
      >
        <Image src={shapeImage} alt="WantImage" />
      </Grid>

      <Grid
        sx={{
          display: {
            xs: "inline",
            sm: "inline",
            md: "inline",
            xl: "none",
            lg: "none",
          },
          position: "relative",
          top: "-12vh",
          left: "14vh",
        }}
      >
        <Image src={shapeImage} alt="WantImage" />
      </Grid>
    </Grid>
  );
}

export default BecomeBrokerContent;
