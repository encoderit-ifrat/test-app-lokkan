import {
  Autocomplete,
  Box,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import BaseButton from "../../reuseable/button/BaseButton";
import homeImage from "../../../../public/Images/home.png";
import Image from "next/image";
import Link from "next/link";
import BaseTextField from "../../reuseable/baseTextField/BaseTextField";
import BaseAutocomplete from "../../reuseable/baseAutocomplete/BaseAutocomplete";
import en from "locales/en";
import pt from "locales/pt";
import BaseHomeButton from "@/component/reuseable/button/BaseHomeButton";
import { formatBrazilianCurrency } from "@/utils/useUtilities";
import BaseOutlinedAreaInput from "@/component/reuseable/baseOutlinedAreaInput/BaseOutlinedAreaInput";
import { useRouter } from "next/router";
import { reverseBrCurrencyFormat } from "@/utils/reverseBrCurrencyFormat";

// const AutoComplete = styled(Autocomplete)`
//   & .MuiInputBase-input {
//     height: {xl:0.9rem,lg:0.9rem};
//   }
// `;

const omitEmpties = (obj) => {
  return Object.entries(obj).reduce((carry, [key, value]) => {
    if (![null, undefined, ""].includes(value)) {
      carry[key] = value;
    }
    return carry;
  }, {});
};

function FulfillDream({ languageName, setKnowMoreModal }) {
  const [value, setValue] = useState("");

  const router = useRouter();

  const t = languageName === "en" ? en : pt;

  const [locationName, setLocationName] = useState(null);

  const handleValueChange = (v) => {
    v != null && setValue(v);
  };

  const handleLocationChange = (e) => {
    setLocationName(e.target.value);
  };
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event, newInputValue) => {
    const formattedValue = formatBrazilianCurrency(newInputValue);
    setInputValue(formattedValue);
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ height: "75vh" }}
    >
      <BaseTextField
        fullWidth
        label={"Onde você quer um imóvel?"}
        placeholder={"procure por rua, bairro ou cidade"}
        InputLabelProps={{
          sx: {
            color: "#ffffff", // Change label color here
          },
        }}
        sx={{
          mt: 4,
          width: { xs: "90%", sm: "90%", md: "50%", xl: "30%", lg: "35%" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#ffffff",
              borderRadius: "25px",
            },
          },
          "&:hover": {
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#0362F0",
              },
            },
          },
        }}
        inputProps={{
          style: { color: "#ffffff" }, // Change placeholder color here
        }}
        onChange={(e) => handleLocationChange(e)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Image src={homeImage} alt="homeImage" />
            </InputAdornment>
          ),
        }}
      />
      <BaseAutocomplete
        options={valueUpto || []}
        label={"Faixa de preço"}
        getOptionLabel={(option) => option.label || ""}
        sx={{
          mt: 4,
          width: { xs: "90%", sm: "90%", md: "50%", xl: "30%", lg: "35%" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#ffffff", // Change border color here
              borderRadius: "25px",
            },
          },
          "& .MuiSvgIcon-root": {
            color: "#ffffff", // Change arrow icon color here
          },
          "&:hover": {
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#0362F0",
              },
            },
          },
        }}
        isOptionEqualToValue={(option, value) => option.label === value.value}
        size={"medium"}
        placeholder={t["Value up to"]}
        onChange={(e, v, r, d) => handleValueChange(v)}
        value={value}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        inputTextColor={{ color: "#ffffff" }}
      />
      {/* <Autocomplete
        getOptionLabel={(option) => option.label || ""}
        options={valueUpto || []}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label={"Faixa de preço"}
            variant="outlined"
            sx={{
              color: "#ffffff",
            }}
            InputLabelProps={{ sx: { color: "#ffffff" } }}
          />
        )}
        sx={{
          mt: 4,
          width: { xs: "90%", sm: "90%", md: "50%", xl: "30%", lg: "35%" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#ffffff", // Change border color here
              borderRadius: "25px",
            },
          },
          "& .MuiSvgIcon-root": {
            color: "#ffffff", // Change arrow icon color here
          },
          "&:hover": {
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#0362F0",
                color: "#ffffff",
              },
            },
          },
        }}
      />
     */}

      <BaseButton
        name={t["search real estate"]}
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
        handleFunction={() =>
          router.push({
            pathname: "/buscar-imoveis",
            query: omitEmpties({
              status: "approved",
              location: locationName && locationName,
              value_up_to: value && reverseBrCurrencyFormat(value.label),
              page: 1,
              per_page: 9,
            }),
          })
        }
      />

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

export default FulfillDream;

const valueUpto = [
  { label: "R$ 100.000,00", id: 1 },
  { label: "R$ 200.000,00", id: 2 },
  { label: "R$ 300.000,00", id: 3 },
  { label: "R$ 500.000,00", id: 4 },
  { label: "R$ 700.000,00", id: 5 },
  { label: "R$ 1.000.000,00", id: 6 },
  { label: "R$ 10.000.000,00", id: 7 },
];
