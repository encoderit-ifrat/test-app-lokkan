import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import trackImage from "../../../../public/Images/track.png";
import digitalImage from "../../../../public/Images/digital.png";
import fastImage from "../../../../public/Images/fast.png";
import Image from "next/image";
import BaseButton from "../../reuseable/button/BaseButton";
import Link from "next/link";
import en from "locales/en";
import pt from "locales/pt";

function WantToSell({ languageName }) {
  const t = languageName === "en" ? en : pt;
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        marginTop: 1,
        marginLeft: { xs: "0.6vh", sm: "0.6vh", md: 0, lg: 0, xl: 0 },
      }}
    >
      <Grid
        container
        spacing={1}
        sx={{
          backgroundColor: "#ffffff",
          borderRadius: "6px",
          paddingX: { xs: 0, sm: 0, md: 0, lg: 4, xl: 4 },
          paddingY: 2.5,
          position: "relative",
          // marginLeft: { xs: "0.5vh", sm: "0.5vh" },
        }}
      >
        <Grid item xs={12} sm={12} md={4} lg={3} xl={3}>
          <Image src={trackImage} alt="track" />
        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={9} xl={9}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
          >
            <Typography
              variant="p"
              sx={{
                fontSize: "24px",
                fontWeight: "700",
                color: "#1A1859",
              }}
            >
              {t["track everything online"]}
            </Typography>
            <Typography
              variant="p"
              sx={{
                fontSize: "18px",
                fontWeight: "400",
                color: "#7C7C99",
              }}
            >
              {
                t[
                  "Announcements, schedules of visits and proposals all in the palm of your hands"
                ]
              }
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={1}
        sx={{
          backgroundColor: "#ffffff",
          borderRadius: "6px",
          paddingX: 4,
          paddingY: 2.5,
          marginTop: 3,
        }}
      >
        <Grid item xs={12} sm={12} md={4} lg={3} xl={3}>
          <Image src={digitalImage} alt="track" />
        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={9} xl={9}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
          >
            <Typography
              variant="p"
              sx={{
                fontSize: "24px",
                fontWeight: "700",
                color: "#1A1859",
              }}
            >
              {t["100% digital processes"]}
            </Typography>
            <Typography
              variant="p"
              sx={{
                fontSize: "18px",
                fontWeight: "400",
                color: "#7C7C99",
              }}
            >
              {
                t[
                  "Signing of contracts, issuance of certificates, documents and even public deed of purchase and sale, all digitally, without leaving home"
                ]
              }
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={1}
        sx={{
          backgroundColor: "#ffffff",
          borderRadius: "6px",
          paddingX: 4,
          paddingY: 2.5,
          marginTop: 3,
        }}
      >
        <Grid item xs={12} sm={12} md={4} lg={3} xl={3}>
          <Image src={fastImage} alt="track" />
        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={9} xl={9}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
          >
            <Typography
              variant="p"
              sx={{
                fontSize: "24px",
                fontWeight: "700",
                color: "#1A1859",
              }}
            >
              {t["Fast sale!"]}
            </Typography>
            <Typography
              variant="p"
              sx={{
                fontSize: "18px",
                fontWeight: "400",
                color: "#7C7C99",
              }}
            >
              {t["Fastest sales process on the market"]}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Link href="/cadastro-de-proprietario">
        <a
          style={{
            textDecoration: "none",
            listStyle: "none",
            width: "100%",
          }}
        >
          <BaseButton
            name={t["Advertise"]}
            width={"100%"}
            fontSize={"24px"}
            margin={"4vh 0 0 0"}
          />
        </a>
      </Link>
    </Grid>
  );
}

export default WantToSell;
