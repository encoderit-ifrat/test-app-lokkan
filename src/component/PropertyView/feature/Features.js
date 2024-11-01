import React from "react";
import { Button, Grid, Typography, Box, Stack } from "@mui/material";
import Image from "next/image";
import bed from "../../../../public/Images/bed.png";
import rule from "../../../../public/Images/rule.png";
import check from "../../../../public/Images/check.png";
import bath from "../../../../public/Images/bath.png";
import building from "../../../../public/Images//building.svg";
import car from "../../../../public/Images/car.png";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import en from "locales/en";
import pt from "locales/pt";

function Features({ singlePropertyData, languageName }) {
  console.log("🟥 ~ Features ~ singlePropertyData:", singlePropertyData);
  const t = languageName === "en" ? en : pt;

  return (
    <Stack
      container
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      sx={{ pl: 3, my: 2 }}
    >
      <Typography
        variant="p"
        sx={{ color: "#1A1859", fontWeight: "700", fontSize: "18px" }}
      >
        Características
      </Typography>
      <Stack
        direction={{
          xs: "column",
          md: "row",
        }}
        alignItems={"center"}
        justifyContent={"space-between"}
        spacing={2}
        sx={{ mt: 1 }}
      >
        <Stack
          spacing={3}
          direction={{
            xs: "column",
            md: "row",
          }}
          sx={{
            flex: 1,
            // bgcolor: "red",
          }}
          alignItems={"center"}
          justifyContent={"center"}
        >
          {+singlePropertyData?.property?.land_area > 0 && (
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              spacing={1}
              sx={{
                width: "100%",
              }}
            >
              <Image src={rule} alt="rule" width={24} height={24} />
              <Typography
                variant="p"
                sx={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#7C7C99",
                }}
              >
                {`${singlePropertyData?.property?.land_area} m² of terreno`}
              </Typography>
            </Stack>
          )}
          {+singlePropertyData?.property?.property_area > 0 && (
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              spacing={1}
              sx={{
                width: "100%",
              }}
            >
              <Image src={rule} alt="rule" width={24} height={24} />
              <Typography
                variant="p"
                sx={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#7C7C99",
                }}
              >
                {`${singlePropertyData?.property?.property_area} m² of construcao`}
              </Typography>
            </Stack>
          )}

          {+singlePropertyData?.property?.no_of_rooms > 0 && (
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              spacing={1}
              sx={{
                width: "100%",
              }}
            >
              <Image src={bed} alt="bed" width={24} height={24} />
              <Typography
                variant="p"
                sx={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#7C7C99",
                }}
              >
                {`${singlePropertyData?.property?.no_of_rooms} ${t["bedrooms"]}`}
              </Typography>
            </Stack>
          )}
          {+singlePropertyData?.property?.no_of_suites > 0 && (
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              spacing={1}
              sx={{
                width: "100%",
              }}
            >
              <Image src={bed} alt="bed" width={24} height={24} />
              <Typography
                variant="p"
                sx={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#7C7C99",
                }}
              >
                {`${singlePropertyData?.property?.no_of_suites} ${t["suites"]}`}
              </Typography>
            </Stack>
          )}

          {+singlePropertyData?.property?.no_of_bathrooms > 0 && (
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              spacing={1}
              sx={{
                width: "100%",
              }}
            >
              <Image src={bath} alt="bath" width={24} height={24} />
              <Typography
                variant="p"
                sx={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#7C7C99",
                }}
              >
                {`${singlePropertyData?.property?.no_of_bathrooms} ${t["bathrooms"]}`}
              </Typography>
            </Stack>
          )}

          {+singlePropertyData?.property?.no_of_parking_spaces > 0 && (
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              spacing={1}
              sx={{
                width: "100%",
              }}
            >
              <Image src={car} alt="bath" width={24} height={24} />
              <Typography
                variant="p"
                sx={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#7C7C99",
                }}
              >
                {`${singlePropertyData?.property?.no_of_parking_spaces} ${t["parking space"]}`}
              </Typography>
            </Stack>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}

export default Features;
