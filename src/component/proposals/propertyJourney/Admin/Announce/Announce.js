import {
  Box,
  Button,
  Grid,
  Typography,
  Tooltip,
  LinearProgress,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import handshake from "../../../../../../public/Images/handshake.png";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import media from "../../../../../../public/Images/Media.png";
import generate from "../../../../../../public/Images/generate.png";
import BaseModal from "../../../../reuseable/baseModal/BaseModal";
import ContractModal from "../contractModal/ContractModal";
import SaleCard from "../../../../reuseable/saleCard/SaleCard";
import ContractPdfModal from "../ContractPdfModal/ContractPdfModal";
import en from "locales/en";
import pt from "locales/pt";

function Announce({ handleNext, singlePropertyData, languageName }) {
  const t = languageName === "en" ? en : pt;
  return (
    <Box sx={{ mt: 4 }}>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Image height={40} width={60} src={handshake} alt="handshake" />
        <Typography
          variant="p"
          sx={{
            color: "#002152",
            fontSize: "24px",
            fontWeight: "700",
            lineHeight: "32px",
            ml: 1,
          }}
        >
          {t["Announce"]}
        </Typography>
      </Grid>
      <Box sx={{ mt: { xs: 2, sm: 2, md: 2, lg: 4 } }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={3}>
            <SaleCard singlePropertyData={singlePropertyData} />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={5}></Grid>
          <Grid item xs={12} sm={12} md={12} lg={4}></Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Announce;
