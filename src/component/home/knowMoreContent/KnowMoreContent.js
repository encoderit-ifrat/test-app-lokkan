import { Box, Button, Grid, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import submitProposal from "../../../../public/Images/submit_proposal.png";
import stepFinish from "../../../../public/Images/step_finish.png";
import technologyImage from "../../../../public/Images/track.png";
import clientsImage from "../../../../public/Images/clients.png";
import colaborateImage from "../../../../public/Images/colaborate.png";
import earnImage from "../../../../public/Images/fast.png";
import Link from "next/link";
import en from "locales/en";
import pt from "locales/pt";
import BaseButton from "@/component/reuseable/button/BaseButton";
import BaseCloseButton from "@/component/reuseable/baseCloseButton/BaseCloseButton";

function KnowMoreContent({ handleClose, languageName, buttonName, href }) {
  const style = {
    position: "absolute",
    top: "45%",
    left: "50%",
    // top:{xs:"80%"},
    transform: "translate(-50%, -50%)",
    width: { xs: "80%", sm: "80%", md: "60%", lg: "60%", xl: "60%" },
    bgcolor: "#ffffff",
    // border: "2px solid #000",
    boxShadow: "none",
    borderRadius: "12px",
    maxHeight: "85vh",
    overflowY: "scroll",
    px: 3,
    py: 2,
  };

  const t = languageName === "en" ? en : pt;

  const brokerData = [
    {
      name: "Compra garantida",
      info: "Devolução integral do seu investimento em caso de distrato justificado*, tranquilidade para realizar o seu sonho sem preocupações.",
      imageSrc: clientsImage,
    },
    {
      name: "Processo 100% digital",
      info: "Do agendamento de visitas à escritura pública, tudo online, com praticidade e economia de tempo. Acessibilidade em qualquer lugar e a qualquer hora.",
      imageSrc: clientsImage,
      imageSrc: technologyImage,
    },
    {
      name: "Transparência e eficiência",
      info: "Negociação direta entre proprietário e comprador, sem intermediários.Todos os trâmites e documentos online, com total clareza e segurança.",
      imageSrc: earnImage,
    },
    {
      name: "Praticidade",
      info: "Diga adeus à burocracia! O que antes era moroso e complicado, agora é simples e acessível para todos.",
      imageSrc: colaborateImage,
    },
  ];
  return (
    <Box sx={style}>
      <Box sx={{ width: "100%" }}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: "24px",
              fontWeight: "700",
              lineHeight: "32px",
              color: "#002152",
            }}
          >
            Cansado das complicações e inseguranças da compra de um imóvel?
          </Typography>
          <BaseCloseButton handleClose={handleClose} />
        </Grid>
        <Grid container spacing={4} sx={{ pt: 2 }}>
          {brokerData?.map((data, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Grid
                container
                spacing={1}
                sx={{
                  backgroundColor: "#F9F9FB",
                  borderRadius: "6px",
                  minHeight: "300px",
                  paddingX: 4,
                  paddingY: 2.5,
                  position: { xs: "relative", sm: "relative" },
                  paddingBottom: `2.5vh`,
                  //   mb: { xs: 2, xm: 2, md: 5, xl: 5, lg: 5 },
                }}
              >
                <Grid item xs={12}>
                  <Image
                    src={data.imageSrc}
                    alt="track"
                    height={100}
                    width={140}
                  />
                </Grid>
                <Grid item xs={12}>
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
            </Grid>
          ))}
        </Grid>
        <Link href={href}>
          <a
            style={{
              textDecoration: "none",
              listStyle: "none",
              width: "100%",
              display: "flex",
            }}
          >
            <BaseButton
              name={buttonName || t["search real estate"]}
              width={"100%"}
              fontSize={"24px"}
              borderRadius={"25px"}
              margin={"4vh 0 0 0"}
            />
          </a>
        </Link>
      </Box>
    </Box>
  );
}

export default KnowMoreContent;
