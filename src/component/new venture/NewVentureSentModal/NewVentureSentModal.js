import { Box, Button, Grid, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import submitProposal from "../../../../public/Images/submit_proposal.png";
import stepFinish from "../../../../public/Images/step_finish.png";
import Link from "next/link";
import en from "locales/en";
import pt from "locales/pt";

function NewVentureSentModal({ handleClose, languageName }) {
  const t = languageName === "en" ? en : pt;
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    // top:{xs:"80%"},
    transform: "translate(-50%, -50%)",
    width: { xs: "80%", sm: "80%", md: "60%", lg: "35%", xl: "35%" },
    bgcolor: "#ffffff",
    // border: "2px solid #000",
    boxShadow: "none",
    borderRadius: "12px",
    maxHeight: "70vh",
    overflowY: "scroll",
    px: 3,
    py: 2,
  };
  return (
    <Box sx={style}>
      <Box sx={{ width: "100%" }}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Image src={stepFinish} alt="stepFinish" />
          <Typography
            variant="p"
            sx={{
              color: "#1A1859",
              fontSize: "24px",
              fontWeight: "700",
              lineHeight: "29px",
              textAlign: "center",
              mt: 2,
            }}
          >
            novo projeto criado
          </Typography>
          <Typography
            variant="p"
            sx={{
              color: "#7C7C99",
              fontSize: "16px",
              fontWeight: "400",
              lineHeight: "22px",
              textAlign: "center",
              mt: 2,
            }}
          >
            Obrigado por criar o projeto
          </Typography>
        </Grid>
        <Link
          href={{
            pathname: "/my-properties",
            query: {
              page: 1,
              per_page: 9,
            },
          }}
        >
          <Button
            fullWidth
            sx={{
              mt: 1,
              py: 1,
              background: " linear-gradient(90deg, #20BAF6 0%, #7450F0 100%)",
              color: "#ffffff",
              fontSize: "16px",
              fontWeight: "600",
              lineHeight: "22px",
              textTransform: "none",
              mt: 3,
              mb: 5,
            }}
            //   onClick={handleProposalClose}
          >
            Conclude
          </Button>
        </Link>
      </Box>
    </Box>
  );
}

export default NewVentureSentModal;
