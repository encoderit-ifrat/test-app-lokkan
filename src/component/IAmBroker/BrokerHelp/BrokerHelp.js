import { FormControl, Grid, InputLabel, Typography } from "@mui/material";
import React from "react";
import BaseButton from "../../reuseable/button/BaseButton";
import BaseOutlinedZipInput from "../../reuseable/baseOutlinedZipInput/BaseOutlinedZipInput";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import en from "locales/en";
import pt from "locales/pt";

function BrokerHelp({
  name,
  content,
  buttonName,
  fieldItem,
  handleLoginOpen,
  languageName,
  broker,
}) {
  const t = languageName === "en" ? en : pt;
  const { data: session } = useSession();
  const router = useRouter();
  const [value, setValue] = React.useState("");

  const handleAdvertise = () => {
    if (!broker) {
      router.push("/my-properties/new-property");
      localStorage.setItem("Zip_code", value);
    } else {
      router.push("/brokers");
    }
  };
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="flex-start"
      sx={{ ml: 3 }}
    >
      <Typography
        variant="p"
        sx={{
          fontSize: {
            sm: "48px",
            xs: "48px",
            md: "48px",
            lg: "50px",
            xl: "50px",
          },
          lineHeight: "55px",
          fontWeight: "800",
          color: "#1A1859",
        }}
      >
        {name}
      </Typography>
      {/* <Typography
        variant="p"
        sx={{
          fontSize: {
            sm: "48px",
            xs: "48px",
            md: "48px",
            lg: "50px",
            xl: "50px",
          },
          fontWeight: "800",
          color: "#1A1859",
        }}
      >
        real estate market
      </Typography> */}
      <Typography
        variant="p"
        sx={{
          paddingTop: 3,
          fontSize: "20px",
          fontWeight: "400",
          color: "#1A1859",
        }}
      >
        {content}
      </Typography>
      {fieldItem && (
        <FormControl variant="outlined" sx={{ width: "100%", marginTop: 3 }}>
          <InputLabel htmlFor="sandbox" variant="outlined">
            {t["Zip code"]}
          </InputLabel>
          <BaseOutlinedZipInput
            placeholder={"Eg: 00000-000"}
            label={t["Zip Code"]}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </FormControl>
      )}

      <BaseButton
        name={buttonName}
        width={"100%"}
        fontSize={"24px"}
        margin={"3vh 0 0 0"}
        handleFunction={!session ? handleLoginOpen : handleAdvertise}
      />
    </Grid>
  );
}

export default BrokerHelp;
