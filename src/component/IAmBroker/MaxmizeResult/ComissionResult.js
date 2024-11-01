import { Grid, Typography } from "@mui/material";
import en from "locales/en";
import pt from "locales/pt";
import React from "react";

function ComissionResult({ fullCommission, yourCommission, languageName }) {
  const t = languageName === "en" ? en : pt;
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ height: "50vh" }}
    >
      <Typography
        variant="p"
        sx={{ fontSize: "48px", fontWeight: "800", color: "#7450F0" }}
      >
        {`${fullCommission.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}`}
      </Typography>
      <Typography
        variant="p"
        sx={{ fontSize: "20px", fontWeight: "400", color: "#4B4B66" }}
      >
        {t["full commission"]}
      </Typography>
      <Typography
        variant="p"
        sx={{ fontSize: "48px", fontWeight: "800", color: "#1A1859" }}
      >
        {`${yourCommission.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}`}
      </Typography>
      <Typography
        variant="p"
        sx={{ fontSize: "20px", fontWeight: "400", color: "#4B4B66" }}
      >
        {t["your commission"]}
      </Typography>
    </Grid>
  );
}

export default ComissionResult;
