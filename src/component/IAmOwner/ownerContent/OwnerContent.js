import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import BaseButton from "../../reuseable/button/BaseButton";
import Image from "next/image";
import Link from "next/link";
import BaseHomeButton from "@/component/reuseable/button/BaseHomeButton";

function OwnerContent({ languageName, setKnowMoreModal }) {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ height: "75vh" , px:{xs:2,sm:2,md:0} }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: "56px",
          fontWeight: "700",
          lineHeight: "67.2px",
          color: "#ffffff",
        }}
      >
        Venda 100% digital
      </Typography>
      <Typography
        variant="h1"
        sx={{
          mt: 2,
          fontSize: "32px",
          fontWeight: "400",
          lineHeight: "38.4px",
          color: "#ffffff",
        }}
      >
        Facilidade em agendamento de visitas e escritura pública
      </Typography>
      <Link
        href={{
          pathname: "/registration",
          query: {
            user_type: "owner",
          },
        }}
      >
        <a
          style={{
            textDecoration: "none",
            listStyle: "none",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <BaseButton
            name={"Quero vender agora"}
            width={{
              xs: "90%",
              sm: "90%",
              md: "50%",
              xl: "30%",
              lg: "35%",
            }}
            fontSize={"24px"}
            borderRadius={"25px"}
            margin={"4vh 0 0 0"}
          />
        </a>
      </Link>

      <BaseHomeButton
        name={"Saiba mais"}
        width={{
          xs: "90%",
          sm: "90%",
          md: "50%",
          xl: "30%",
          lg: "35%",
        }}
        fontSize={"20px"}
        borderRadius={"25px"}
        margin={"4vh 0 0 0"}
        color={"#ffffff"}
        background={"transparent"}
        handleFunction={() => setKnowMoreModal(true)}
      />
    </Grid>
  );
}

export default OwnerContent;
