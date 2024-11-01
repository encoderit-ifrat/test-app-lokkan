import React from "react";
import BrokerImage from "../../../../../public/Images/who_broker.png";
import shapeImage from "../../../../../public/Images/Image_shape_blue.png";
import { Grid, Box } from "@mui/material";
import Image from "next/image";

function BrokerImageContent({ imageSrc }) {
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
        marginLeft: { xs: 0, sm: 0, md: 0, lg: 2, xl: 2 },
      }}
    >
      <Grid sx={{ position: { xl: "absolute", lg: "absolute" } }}>
        <Image src={imageSrc} alt="WantImage" />
      </Grid>
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
          top: "-24vh",
          left: "-3vh",
        }}
      >
        <Image src={shapeImage} alt="WantImage" />
      </Grid>
    </Grid>
  );
}

export default BrokerImageContent;
