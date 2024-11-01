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
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

function BecomeBroker({
  contentData,
  buttonVisible,
  languageName,
  handleLoginOpen,
}) {
  const { data: session } = useSession();
  const t = languageName === "en" ? en : pt;
  const router = useRouter();
  const handleAdvertise = () => {
    router.push("/brokers");
  };
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        marginTop: { xs: 12, sm: 12, md: 1, lg: 1, xl: 1 },
        marginLeft: { xs: "0.5vh", sm: "0.5vh", md: 0, lg: 0, xl: 0 },
      }}
    >
      {contentData?.map((data, index) => (
        <Grid key={index} container spacing={1}>
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
                {data.info}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      ))}
      {buttonVisible && (
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          {/* <Link href="/registration">
            <a
              style={{
                textDecoration: "none",
                listStyle: "none",
                width: "100%",
              }}
            > */}
          <BaseButton
            name={t["Be a partner"]}
            width={"70%"}
            fontSize={"24px"}
            margin={"4vh 0 0 0"}
            handleFunction={!session ? handleLoginOpen : handleAdvertise}
          />
          {/* </a>
          </Link> */}
        </Grid>
      )}
    </Grid>
  );
}

export default BecomeBroker;
