import { Box, Button, Grid, InputAdornment, Typography } from "@mui/material";
import React from "react";
import impulseImage from "../../../../public/Images/impulse.png";
import Image from "next/image";
import { useState } from "react";
import BaseTextField from "../../reuseable/baseTextField/BaseTextField";
import en from "locales/en";
import pt from "locales/pt";
import { formatBrazilianCurrency } from "@/utils/useUtilities";
import { reverseBrCurrencyFormat } from "@/utils/reverseBrCurrencyFormat";

function CalulateComission({
  setFullCommission,
  setYourCommission,
  languageName,
}) {
  const t = languageName === "en" ? en : pt;
  const [salevalue, setSaleValue] = useState(0);
  const [commission, setCommission] = useState(0);
  // const [value, setValue] = useState("");

  const [valid, setValid] = useState(false);

  const handleComissionChange = (e) => {
    setValid(/^\d{3,}$/.test(e.target.value));

    setCommission(e.target.value);
  };

  const handleSaleValueChange = (e) => {
    console.log("🟥 ~ handleSaleValueChange ~ e.target.value:", e.target.value);
    setSaleValue(
      reverseBrCurrencyFormat(formatBrazilianCurrency(e.target.value))
    );
    e.target.value = formatBrazilianCurrency(e.target.value).slice(2);
    // setSaleValue(e.target.value.replaceAll(".", ""));
    // if (e.target.value != "" && e.target.value != null) {
    //   e.target.value = parseInt(
    //     e.target.value.replaceAll(".", "")
    //   ).toLocaleString();
    // }
  };

  const handleCalculation = () => {
    console.log("🟥 ~ handleCalculation ~ salevalue:");
    const fullComissionValue = salevalue * (commission / 100);
    setFullCommission(fullComissionValue);

    // const yourComissionValue = fullComissionValue * (70 / 100);
    const yourComissionValue = fullComissionValue * (70 / 100);

    setYourCommission(yourComissionValue);
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="flex-start"
      sx={{ borderRight: "1px dashed #D3D3DF", px: 2 }}
    >
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Image height={90} width={108} src={impulseImage} alt="impulse" />
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
          }}
        >
          {t["Simulate a sale here"]}
        </Typography>
      </Grid>
      <BaseTextField
        label={t["Sale value"]}
        placeholder={t["Sale value"]}
        size={"medium"}
        onChange={handleSaleValueChange}
        sx={{ mt: 4 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Typography variant="p" sx={{ color: "#7450F0" }}>
                R$
              </Typography>
            </InputAdornment>
          ),
        }}
      />
      <BaseTextField
        label={t["Commission"]}
        placeholder={t["Commission"]}
        size={"medium"}
        type={"number"}
        sx={{ mt: 4 }}
        // value={commission}
        onChange={handleComissionChange}
        // error={!valid && commission.length > 0 ? true : false}
        required={true}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Typography variant="p" sx={{ color: "#7450F0" }}>
                %
              </Typography>
            </InputAdornment>
          ),
        }}
      />
      <Button
        sx={{
          background: `#00C1B4`,
          borderRadius: "6px",
          color: "#ffffff",
          fontSize: "24px",
          fontWeight: "700",
          textTransform: "none",
          marginTop: 3,
          width: "100%",
          "&:hover": {
            background: `#00C1B4`,
            borderRadius: "6px",
            color: "#ffffff",
            fontSize: "24px",
            fontWeight: "700",
            textTransform: "none",
            marginTop: 3,
            width: "100%",
          },
        }}
        onClick={handleCalculation}
      >
        {t["calculate my commission"]}
      </Button>
    </Grid>
  );
}

export default CalulateComission;
