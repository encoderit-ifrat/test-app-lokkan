import React from "react";
import WantImage from "../../../../public/Images/Want.png";
import mobileWant from "../../../../public/Images/mobileWant.png";
import shapeImage from "../../../../public/Images/image_shape.png";
import { Grid, Box } from "@mui/material";
import Image from "next/image";

function SellSideContent() {
  return (
    <Grid
      container
      direction="row"
      justifyContent={{
        xs: "center",
        sm: "center",
        md: "center",
        lg: "flex-start",
        xl: "flex-start",
      }}
      alignItems="center"
      sx={{
        paddingTop: { xs: 0, sm: 0, md: 0, lg: 30, xl: 30 },
        paddingBottom: { xs: 0, sm: 0, md: 0, lg: 20, xl: 20 },
        // marginLeft: { xs: 0, sm: 0, md: 0, lg: 2, xl: 2 },
      }}
    >
      <Box
        sx={{
          position: { xl: "absolute", lg: "absolute" },
          display: {
            xl: "inline",
            lg: "inline",
            md: "none",
            xs: "none",
            sm: "none",
          },
        }}
      >
        <Image src={WantImage} alt="WantImage" />
      </Box>
      <Box
        sx={{
          display: {
            xl: "none",
            lg: "none",
            md: "inline",
            xs: "inline",
            sm: "inline",
          },
          position: "absolute",
        }}
      >
        <Image src={mobileWant} alt="WantImage" />
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
          top: "24vh",
          left: "26vh",
        }}
      >
        <Image src={shapeImage} alt="WantImage" />
      </Grid>
    </Grid>
  );
}

export default SellSideContent;
