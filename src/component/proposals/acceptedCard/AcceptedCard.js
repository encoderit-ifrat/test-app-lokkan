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
import pt from "locales/pt";
import en from "locales/en";
import { IsBuyerRegisteredApi } from "@/api";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { formatBrazilianCurrency } from "@/utils/useUtilities";

function AcceptedCard({ propertyData, languageName }) {
  const t = languageName === "en" ? en : pt;
  const myLoader = ({ src }) => {
    return `${_imageURL}/${src}`;
  };
  const router = useRouter();

  const Status = [
    { name: t["Announce"], slug: "announcement" },
    { name: t["Proposal"], slug: "proposal" },
    { name: t["Contract"], slug: "contract_uploaded" },
    { name: t["Certificates and documents"], slug: "certificate" },
    { name: t["Pre analysis"], slug: "certificate_validated" },
    { name: t["Digital notery"], slug: "notary" },
  ];

  const Statusindex = Status.findIndex((object) => {
    return object.slug === propertyData?.contract?.status;
  });

  const handleGenerateContract = async () => {
    const [error, response] = await IsBuyerRegisteredApi();
    if (!error) {
      if (response?.data?.status) {
        router.replace({
          pathname: "/proposals/property-journey",
          query: {
            propertyId: propertyData?.id,
            contractId: propertyData?.contract?.id,
            step_count: 1,
          },
        });
      } else {
        toast.error("Você tem que preencher as informações do usuário");
      }
    }
  };

  const handleGoToTheJourney = async () => {
    const [error, response] = await IsBuyerRegisteredApi();
    if (!error) {
      if (response?.data?.status) {
        router.replace({
          pathname: "/proposals/property-journey",
          query: {
            propertyId: propertyData?.id,
            contractId: propertyData?.contract?.id,
            step_count:
              propertyData?.contract?.status === "certificate"
                ? 2
                : propertyData?.contract?.status === "certificate_validated"
                ? 3
                : propertyData?.contract?.status === "notary"
                ? 4
                : 1,
          },
        });
      } else {
        toast.error("Você tem que preencher as informações do usuário");
      }
    }
  };

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
          alt="pendant"
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
              background: "rgba(116, 80, 240, 0.2)",
              borderRadius: "2px",
              padding: "2px 8px",
              color: "#7450F0",
              fontSize: "14px",
              lineHeight: "18px",
              fontWeight: "400",
              mr: 1,
            }}
          >
            {t[propertyData?.ad_type]}
          </Button>
          <Button
            sx={{
              textTransform: "none",
              background: "#FFF7E6",
              borderRadius: "2px",
              padding: "2px 8px",
              color: "#229464",
              fontSize: "14px",
              lineHeight: "18px",
              fontWeight: "400",
              ml: "3px",
            }}
          >
            {t["proposal accepted"]}
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

      <Box sx={{ mt: 1, px: 2, minHeight:250 }}>
        {Status?.map((data, index) => (
          <Button key={index} sx={{ display: "flex", textTransform: "none" }}>
            {index <= Statusindex || index === 0 || index === 1 ? (
              <CheckIcon sx={{ color: "#34BE84" }} />
            ) : (
              <FiberManualRecordIcon
                sx={{ color: "#9FAAB1", height: "2vh", width: "2vh" }}
              />
            )}

            <Typography
              variant="h5"
              sx={{
                color: `${
                  index <= Statusindex || index === 0 || index === 1
                    ? "#34BE84"
                    : "#9FAAB1"
                }`,
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "18px",
                ml: `${
                  index <= Statusindex || index === 0 || index === 1
                    ? "0vh"
                    : "1vh"
                }`,
              }}
            >
              {data?.name}
            </Typography>
          </Button>
        ))}
        {/* <Button sx={{ display: "flex", textTransform: "none" }}>
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
            Proposal
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
            Contract
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
            Certificates and documents
          </Typography>
        </Button>
        <Button sx={{ display: "flex", textTransform: "none" }}>
          <FiberManualRecordIcon
            sx={{ color: "#9FAAB1", height: "2vh", width: "2vh" }}
          />
          <Typography
            variant="h5"
            sx={{
              color: "#9FAAB1",
              fontSize: "14px",
              fontWeight: "400",
              lineHeight: "18px",
              ml: 1,
            }}
          >
            Pre-analysis
          </Typography>
        </Button>
        <Button sx={{ display: "flex", textTransform: "none" }}>
          <FiberManualRecordIcon
            sx={{ color: "#9FAAB1", height: "2vh", width: "2vh" }}
          />
          <Typography
            variant="h5"
            sx={{
              color: "#9FAAB1",
              fontSize: "14px",
              fontWeight: "400",
              lineHeight: "18px",
              ml: 1,
            }}
          >
            Digital notery
          </Typography>
        </Button> */}
      </Box>
      <Grid container spacing={1} sx={{ px: 2, mt: 1 }}>
        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
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
            onClick={handleGoToTheJourney}
          >
            {t["Go to the journey"]}
          </Button>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
          <Button
            fullWidth
            disabled={Statusindex - 1 > 2}
            sx={{
              color: "#FFFFFF",
              fontSize: "14px",

              lineHeight: "18px",
              fontWeight: "600",
              background: "#7450F0",
              borderRadius: "4px",

              textTransform: "none",

              "&:hover": {
                color: "#FFFFFF",
                fontSize: "14px",

                lineHeight: "18px",
                fontWeight: "600",
                background: "#7450F0",
                borderRadius: "4px",

                textTransform: "none",
              },
            }}
            onClick={handleGenerateContract}
          >
            {t["Generate contract"]}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AcceptedCard;
