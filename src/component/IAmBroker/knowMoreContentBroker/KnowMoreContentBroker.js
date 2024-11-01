import { Box, Button, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import submitProposal from "../../../../public/Images/submit_proposal.png";
import stepFinish from "../../../../public/Images/step_finish.png";
import technologyImage from "../../../../public/Images/advertise.png";
import clientsImage from "../../../../public/Images/handshake.png";
import earnImage from "../../../../public/Images/broker_help.png";

import Link from "next/link";
import en from "locales/en";
import pt from "locales/pt";
import BaseButton from "@/component/reuseable/button/BaseButton";
import BaseCloseButton from "@/component/reuseable/baseCloseButton/BaseCloseButton";
import CalulateComission from "../MaxmizeResult/CalulateComission";
import ComissionResult from "../MaxmizeResult/ComissionResult";

function KnowMoreContentBroker({
  handleClose,
  languageName,
  buttonName,
  href,
}) {
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
    // {
    //   name: "zero burocracia, 100% agilidade aumente seus lucros com a comissão mais alta do mercado",
    //   info: "Trabalhe com quem valoriza o seu trabalho e reconhece o seu esforço. na lokkan, você terá a oportunidade de ganhar a maior comissão do mercado imobiliário, com 70% do valor da comissão. seja recompensado pelo seu talento e dedicação!",
    //   imageSrc: clientsImage,
    // },
    {
      // name: "Anúncios ilimitados",
      // info: "Nos principais portais (OLX Imóveis, ZAP e Viva Real) para máxima visibilidade dos seus imóveis e mais clientes para você!",
      name: "Marketing Digital Multicanal",
      info: "Revolucione a forma como você se conecta com seus clientes. Envio de imóveis e mensagens no WhatsApp, e-mails personalizados e publicações nas redes sociais, tudo em um só lugar.",
      imageSrc: clientsImage,
      imageSrc: technologyImage,
    },
    {
      name: "Processo 100% digital",
      info: "Do agendamento de visitas à escritura pública, tudo online, com praticidade e economia de tempo. Acessibilidade em qualquer lugar e a qualquer hora.",
      imageSrc: earnImage,
    },
  ];

  const [fullCommission, setFullCommission] = useState(0);
  const [yourCommission, setYourCommission] = useState(0);
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
            Quero evoluir
          </Typography>
          <BaseCloseButton handleClose={handleClose} />
        </Grid>
        <Box
          sx={{
            background: "#FFFFFF",
            borderRadius: "6px",
            boxShadow: "0px 8px 24px rgba(3, 2, 39, 0.07)",
            mt: 4,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} xl={6} lg={6}>
              <CalulateComission
                setFullCommission={setFullCommission}
                setYourCommission={setYourCommission}
                languageName={"pt"}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} xl={6} lg={6}>
              <ComissionResult
                fullCommission={fullCommission}
                yourCommission={yourCommission}
                languageName={"pt"}
              />
            </Grid>
          </Grid>
        </Box>

        <Grid container spacing={4} sx={{ mt: 0.5 }}>
          {brokerData?.map((data, index) => (
            <Grid item xs={12} md={6} lg={6} key={index}>
              <Grid
                container
                spacing={1}
                sx={{
                  backgroundColor: "#F9F9FB",
                  borderRadius: "6px",
                  paddingX: 4,
                  paddingY: 2.5,
                  position: { xs: "relative", sm: "relative" },
                  paddingBottom: `${index < 2 ? "4.5vh" : "1.5vh"}`,
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

export default KnowMoreContentBroker;
