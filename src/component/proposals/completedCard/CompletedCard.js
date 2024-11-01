import {
  Avatar,
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import cardMedia from "../../../../public/Images/pendant.png";
import CheckIcon from "@mui/icons-material/Check";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { _baseURL, _imageURL } from "../../../../consts";
import en from "locales/en";
import pt from "locales/pt";
import { formatBrazilianCurrency } from "@/utils/useUtilities";

function CompletedCard({ propertyData, languageName }) {
  const myLoader = ({ src }) => {
    return `${_imageURL}/${src}`;
  };

  const t = languageName === "en" ? en : pt;
  return (
    <Box
      sx={{
        background: "#ffffff",
        boxShadow: "0px 4px 8px rgba(0, 33, 82, 0.08)",
        borderRadius: "8px",
        paddingBottom: 2,
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Image
          loader={myLoader}
          src={`${propertyData?.attachments[0]?.file_path}`}
          alt="completed"
          height={200}
          width={500}
        />
      </Box>

      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Box sx={{ pl: 2, mt: 2 }}>
          <Button
            sx={{
              textTransform: "none",
              background: "#E0F2FE",
              borderRadius: "2px",
              padding: "2px 8px",
              color: " #0362F0",
              fontSize: "14px",
              lineHeight: "18px",
              fontWeight: "400",
              mr: 1,
            }}
          >
            {t[propertyData?.ad_type]}
          </Button>
        </Box>
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{ pl: 2, mt: 2 }}
      >
        <Typography
          variant="p"
          sx={{
            color: "#1A1859",
            fontSize: "24px",
            fontWeight: "700",
            lineHeight: "32px",
          }}
        >
          {formatBrazilianCurrency(propertyData?.brl_rent)}
        </Typography>
        <Typography
          variant="p"
          sx={{
            color: "#1A1859",
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "18px",
            mt: 1,
          }}
        >
          {propertyData?.address?.address}
        </Typography>
      </Grid>

      <Box sx={{ mt: 1, px: 2 }}>
        <Button sx={{ display: "flex", textTransform: "none" }}>
          <CheckIcon sx={{ color: "#34BE84" }} />
          <Typography
            variant="h5"
            sx={{
              color: "#34BE84",
              fontSize: "14px",
              fontWeight: "400",
              lineHeight: "18px",
            }}
          >
            {t["Announce"]}
          </Typography>
        </Button>
        <Button sx={{ display: "flex", textTransform: "none" }}>
          <CheckIcon sx={{ color: "#34BE84" }} />
          <Typography
            variant="h5"
            sx={{
              color: "#34BE84",
              fontSize: "14px",
              fontWeight: "400",
              lineHeight: "18px",
            }}
          >
            {t["Proposal"]}
          </Typography>
        </Button>
        <Button sx={{ display: "flex", textTransform: "none" }}>
          <CheckIcon sx={{ color: "#34BE84" }} />
          <Typography
            variant="h5"
            sx={{
              color: "#34BE84",
              fontSize: "14px",
              fontWeight: "400",
              lineHeight: "18px",
            }}
          >
            {t["Contract"]}
          </Typography>
        </Button>
        <Button sx={{ display: "flex", textTransform: "none" }}>
          <CheckIcon sx={{ color: "#34BE84" }} />
          <Typography
            variant="h5"
            sx={{
              color: "#34BE84",
              fontSize: "14px",
              fontWeight: "400",
              lineHeight: "18px",
            }}
          >
            {t["Certificates and documents"]}
          </Typography>
        </Button>
        <Button sx={{ display: "flex", textTransform: "none" }}>
          <CheckIcon sx={{ color: "#34BE84" }} />
          <Typography
            variant="h5"
            sx={{
              color: "#34BE84",
              fontSize: "14px",
              fontWeight: "400",
              lineHeight: "18px",
            }}
          >
            {t["Pre analysis"]}
          </Typography>
        </Button>
        <Button sx={{ display: "flex", textTransform: "none" }}>
          <CheckIcon sx={{ color: "#34BE84" }} />
          <Typography
            variant="h5"
            sx={{
              color: "#34BE84",
              fontSize: "14px",
              fontWeight: "400",
              lineHeight: "18px",
            }}
          >
            {t["Digital notery"]}
          </Typography>
        </Button>
      </Box>
      <Grid container spacing={1} sx={{ px: 2, mt: 1 }}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Link
            href={{
              pathname: "/proposals/property-journey",
              query: {
                propertyId: propertyData?.id,
                contractId: propertyData?.contract?.id,
                step_count: 5,
              },
            }}
          >
            <Button
              fullWidth
              sx={{
                color: "#FFFFFF",
                fontSize: "14px",
                lineHeight: "18px",
                fontWeight: "600",

                background: "#0362F0",
                borderRadius: "4px",

                textTransform: "none",
                "&:hover": {
                  color: "#FFFFFF",
                  fontSize: "14px",
                  lineHeight: "18px",
                  fontWeight: "600",
                  background: "#0362F0",
                  borderRadius: "4px",

                  textTransform: "none",
                },
              }}
            >
              {t["See documentation"]}
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CompletedCard;
