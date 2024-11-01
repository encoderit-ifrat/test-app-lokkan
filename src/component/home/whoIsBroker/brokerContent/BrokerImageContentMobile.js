import React from "react";
import BrokerImage from "../../../../../public/Images/who_broker_mobile.png";
import shapeImage from "../../../../../public/Images/Image_shape_blue.png";
import { Grid, Box } from "@mui/material";
import Image from "next/image";

function BrokerImageContentMobile({ imageSrc }) {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{
        paddingTop: { xs: 0, sm: 0, md: 0, lg: 30, xl: 30 },
        paddingBottom: { xs: 0, sm: 0, md: 0, lg: 20, xl: 20 },
        // marginLeft: { xs: 0, sm: 0, md: 0, lg: 2, xl: 2 },
      }}
    >
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
        <Image src={imageSrc} alt="WantImage" />
      </Box>
    </Grid>
  );
}

export default BrokerImageContentMobile;
