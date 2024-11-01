import { Box, Grid, Skeleton, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import propertyImage from "../../../../public/Images/propertyImage.png";
import { _baseURL, _imageURL } from "../../../../consts";
import { formatBrazilianCurrency } from "@/utils/useUtilities";

function PropertyCard({ srcImage, amount }) {
  const myLoader = ({ src }) => {
    return `${_imageURL}/${src}`;
  };

  if (!srcImage?.[0]?.file_path) {
    return (
      <Grid container spacing={1}>
            <Skeleton
              variant="rect"
              height={220}
              width={"100%"}
              sx={{ mx: 2, my: 2, borderRadius: "8px" }}
            />
      </Grid>
    );
  }
  return (
    <Box
      sx={{
        border: "1px solid #9FAAB1",
        borderRadius: "6px",
        overflow: "hidden",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <Box
            sx={{
              height: 200,
              width: "100%",
              display: { xs: "none", sm: "none", md: "none", lg: "block" },
              overflow: "hidden",
              position: "relative",
            }}
          >
            <Image
              loader={myLoader}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              src={`${srcImage?.[0]?.file_path}`}
              alt="property"
            />
          </Box>
          <Box
            sx={{
              height: "100%",
              width: "100%",
              display: { lg: "none" },
              overflow: "hidden",
              position: "relative",
            }}
          >
            <Image
            loader={myLoader}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            src={`${srcImage?.[0]?.file_path}`}
            alt="property"
            />
          </Box>
        </Grid>
        <Grid item xs={7}>
          <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{ pt: { xs: 0, sm: 0, md: 0, lg: 0, xl: 3 } }}
          >
            <Typography
              variant="p"
              sx={{
                color: " #002152",
                fontSize: {
                  xs: "14px",
                  sm: "24px",
                  md: "24px",
                  lg: "24px",
                  xl: "24px",
                },
                fontWeight: "700",
                lineHeight: "32px",
              }}
            >
              {formatBrazilianCurrency(amount)}
            </Typography>
            <Typography
              variant="p"
              sx={{
                color: "#9FAAB1",
                fontSize: {
                  xs: "10px",
                  sm: "16px",
                  md: "16px",
                  lg: "16px",
                  xl: "16px",
                },
                fontWeight: "400",
                lineHeight: {
                  xs: "16px",
                  sm: "24px",
                  md: "24px",
                  lg: "24px",
                  xl: "24px",
                },
              }}
            >
              Jaceguai Street, Bela Vista, São Paulo - SP - CEP 01315010
            </Typography>
            <Typography
              variant="p"
              sx={{
                color: "#9FAAB1",
                fontSize: {
                  xs: "10px",
                  sm: "16px",
                  md: "16px",
                  lg: "16px",
                  xl: "16px",
                },
                fontWeight: "400",
                lineHeight: {
                  xs: "16px",
                  sm: "24px",
                  md: "24px",
                  lg: "24px",
                  xl: "24px",
                },
              }}
            >
              created on: 08/18/2020
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default PropertyCard;
