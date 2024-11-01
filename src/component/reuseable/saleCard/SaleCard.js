import React from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  Tooltip,
  LinearProgress,
  Skeleton,
} from "@mui/material";
import media from "../../../../public/Images/Media.png";
import Image from "next/image";
import { _baseURL, _imageURL } from "../../../../consts";
import Link from "next/link";
import { formatBrazilianCurrency } from "@/utils/useUtilities";
import pt from "locales/pt";

function SaleCard({ singlePropertyData }) {
  const filterData = singlePropertyData?.attachments?.find(
    (data) => data?.title === "cover_photo"
  );
  const myLoader = ({ src }) => {
    return `${_imageURL}/${src}`;
  };
  const t = pt;

  if (!filterData?.file_path) {
    return (
      <Grid container spacing={1}>
        <Skeleton
          variant="rect"
          height={250}
          width={"100%"}
          sx={{ mx: 2, my: 2, borderRadius: "8px" }}
        />
      </Grid>
    );
  }
  return (
    <Link
      href={`/visualizacao-da-propriedade/${singlePropertyData?.id}/${singlePropertyData?.property_title}`}
      as={`/visualizacao-da-propriedade/${singlePropertyData.id}/${singlePropertyData?.property_title}`}
    >
      <a
        style={{
          textDecoration: "none",
          listStyle: "none",
          width: "100%",
        }}
      >
        <Box
          sx={{
            background: "#FFFFFF",
            border: "1px solid #DBE1E5",
            borderRadius: "8px",
          }}
        >
          <Image
            loader={myLoader}
            src={`${filterData?.file_path}`}
            height={250}
            width={300}
            layout="responsive"
            alt="media"
          />
          <Box sx={{ mt: 2, px: 2 }}>
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
              {t[singlePropertyData?.ad_type]}
            </Button>
            <Typography
              variant="h1"
              sx={{
                color: "#1A1859",
                fontWeight: "700",
                fontSize: "16px",
                lineHeight: "32px",
                mt: 1,
              }}
            >
              {formatBrazilianCurrency(singlePropertyData?.brl_rent)}
            </Typography>
            <Typography
              variant="h1"
              sx={{
                color: "#6C7A84",
                fontWeight: "400",
                fontSize: "16px",
                lineHeight: "22px",
                my: 1,
              }}
            >
              {singlePropertyData?.address?.address}
            </Typography>
          </Box>
        </Box>
      </a>
    </Link>
  );
}

export default SaleCard;
