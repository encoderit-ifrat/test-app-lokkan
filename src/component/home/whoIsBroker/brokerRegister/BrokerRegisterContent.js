import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import technologyImage from "../../../../../public/Images/technology.png";
import clientsImage from "../../../../../public/Images/clients.png";
import earnImage from "../../../../../public/Images/earn.png";
import Image from "next/image";
import BaseButton from "../../../reuseable/button/BaseButton";
import Link from "next/link";
import en from "locales/en";
import pt from "locales/pt";

function BrokerRegisterContent({ contentData, buttonVisible, languageName }) {
  const t = languageName === "en" ? en : pt;
  return (
    <Grid
      container
      direction="column"
      justifyContent={{
        xs: "center",
        sm: "center",
        md: "center",
        lg: "flex-start",
        xl: "flex-start",
      }}
      alignItems="center"
      sx={{
        marginTop: 1,
        marginLeft: { xs: "0.5vh", sm: "0.5vh", md: 0, lg: 0, xl: 0 },
      }}
    >
      {contentData?.map((data, index) => (
        <Grid
          key={index}
          container
          spacing={1}
          sx={{
            backgroundColor: "#F9F9FB",
            borderRadius: "6px",
            paddingX: 4,
            paddingY: 2.5,
            position: { xs: "relative", sm: "relative" },
            mb: { xs: 2, xm: 2, md: 5, xl: 5, lg: 5 },
          }}
        >
          <Grid item xs={12} sm={12} md={4} lg={3} xl={3}>
            <Image src={data.imageSrc} alt="track" />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={9} xl={9}>
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
                {data.name}
              </Typography>
              <Typography
                variant="p"
                sx={{
                  fontSize: "18px",
                  fontWeight: "400",
                  color: "#7C7C99",
                }}
              >
                {data?.info}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      ))}
      {/* <Grid
        container
        spacing={1}
        sx={{
          backgroundColor: "#F9F9FB",
          borderRadius: "6px",
          paddingX: 4,
          paddingY: 2.5,
          marginTop: 3,
        }}
      >
        <Grid item xs={12} sm={12} md={4} lg={3} xl={3}>
          <Image src={clientsImage} alt="track" />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={9} xl={9}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
          >
            <Typography
              variant="p"
              sx={{ fontSize: "24px", fontWeight: "700", color: "#1A1859" }}
            >
              track everything online
            </Typography>
            <Typography
              variant="p"
              sx={{ fontSize: "18px", fontWeight: "400", color: "#7C7C99" }}
            >
              We offer the best technologies, the most complete and agile advice
              on the market and the highest commission, the broker gets up to
              70% of the total commission.
            </Typography>
          </Grid>
        </Grid>
      </Grid> */}
      {/* <Grid
        container
        spacing={1}
        sx={{
          backgroundColor: "#F9F9FB",
          borderRadius: "6px",
          paddingX: 4,
          paddingY: 2.5,
          marginTop: 3,
        }}
      >
        <Grid item xs={12} sm={12} md={4} lg={3} xl={3}>
          <Image src={earnImage} alt="track" />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={9} xl={9}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
          >
            <Typography
              variant="p"
              sx={{ fontSize: "24px", fontWeight: "700", color: "#1A1859" }}
            >
              track everything online
            </Typography>
            <Typography
              variant="p"
              sx={{ fontSize: "18px", fontWeight: "400", color: "#7C7C99" }}
            >
              We offer the best technologies, the most complete and agile advice
              on the market and the highest commission, the broker gets up to
              70% of the total commission.
            </Typography>
          </Grid>
        </Grid>
      </Grid> */}
      {buttonVisible && (
        <Link href="/cadastro-de-corretor">
          <a
            style={{
              textDecoration: "none",
              listStyle: "none",
              width: "100%",
            }}
          >
            <BaseButton
              name={t["Register"]}
              width={"100%"}
              fontSize={"24px"}
              // margin={"4vh 0 0 0"}
            />
          </a>
        </Link>
      )}
    </Grid>
  );
}

export default BrokerRegisterContent;
