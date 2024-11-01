import { Grid, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import timeColor from "../../../../public/Images/time_color.png";

function BrokerFacilities({ data }) {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Image height={40} width={43} src={data?.image} alt="color" />
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Typography
          variant="p"
          sx={{
            fontSize: "24px",
            fontWeight: "700",
            color: "#1A1859",
          }}
        >
          {data?.name}
        </Typography>
      </Grid>

      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Typography
          variant="p"
          sx={{
            fontSize: "18px",
            fontWeight: "400",
            color: "#7C7C99",
            textAlign: "center",
            lineHeight: "22px",
          }}
        >
          {data?.content}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default BrokerFacilities;
