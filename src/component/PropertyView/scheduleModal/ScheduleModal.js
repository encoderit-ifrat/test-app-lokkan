import { Box, Button, Grid, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import submitProposal from "../../../../public/Images/submit_proposal.png";
import Link from "next/link";
import en from "locales/en";
import pt from "locales/pt";

function ScheduleModal({ handleClose, languageName }) {
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
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Box>
            <Image src={submitProposal} alt="submit" />
          </Box>
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
              lineHeight: "32px",
            }}
          >
            {t["Thank you for Creating a Schedule"]}
          </Typography>
        </Grid>

        <Button
          onClick={handleClose}
          fullWidth
          sx={{
            mt: 1,
            py: 1,
            background: "#DBE1E5",
            color: "#1A1859",
            fontSize: "16px",
            fontWeight: "600",
            lineHeight: "22px",
            textTransform: "none",
          }}
        >
          {t["Close"]}
        </Button>
      </Box>
    </Box>
  );
}

export default ScheduleModal;
