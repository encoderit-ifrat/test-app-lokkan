import BaseWhatsappButton from "@/component/reuseable/baseWhatsappButton/BaseWhatsappButton";
import { formatBrazilianCurrency } from "@/utils/useUtilities";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import en from "locales/en";
import pt from "locales/pt";
import { useSession } from "next-auth/react";
import React from "react";
import { Link as ScrollLink } from "react-scroll";
function AmountView({
  setNegotiate,
  setSchedule,
  singlePropertyData,
  handleProposalOpen,

  languageName,
  content,
}) {
  const t = languageName === "en" ? en : pt;
  const { data: session } = useSession();
  return (
    <Stack
      spacing={3}
      sx={{
        background: "#ffffff",
        boxShadow: "0px 4px 34px rgba(0, 0, 0, 0.08)",
        borderRadius: "8px",
        ml: 0,
        px: 4,
        width: "100%",
        py: 6,
      }}
      direction={{
        xs: "column",
        md: "row",
      }}
      alignItems={"center"}
      justifyContent={"space-between"}
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
        {+singlePropertyData?.property?.brl_rent > 0 && (
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{
              flex: 1,
              // bgcolor: "red",
            }}
          >
            <Typography
              variant="p"
              sx={{
                fontSize: "16px",
                fontWeight: "400",
                color: "#1A1859",
              }}
            >
              {t["sale value"]}
            </Typography>
            <Typography
              variant="p"
              sx={{
                fontSize: "24px",
                fontWeight: "800",
                color: "#1A1859",
              }}
            >
              {formatBrazilianCurrency(singlePropertyData?.property?.brl_rent)}
            </Typography>
          </Stack>
        )}

        {+singlePropertyData?.property?.condominium > 0 && (
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{
              flex: 1,
              // bgcolor: "red",
            }}
          >
            <Typography
              variant="p"
              sx={{
                fontSize: "16px",
                fontWeight: "400",
                color: "#1A1859",
              }}
            >
              {t["Condominium"]}
            </Typography>
            <Typography
              variant="p"
              sx={{
                fontSize: "24px",
                fontWeight: "800",
                color: "#1A1859",
              }}
            >
              {formatBrazilianCurrency(
                singlePropertyData?.property?.condominium
              )}
            </Typography>
          </Stack>
        )}

        {+singlePropertyData?.property?.brl_iptu > 0 && (
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{
              flex: 1,
              // bgcolor: "red",
            }}
          >
            <Typography
              variant="p"
              sx={{
                fontSize: "16px",
                fontWeight: "400",
                color: "#1A1859",
              }}
            >
              IPTU
            </Typography>
            <Typography
              variant="p"
              sx={{
                fontSize: "24px",
                fontWeight: "800",
                color: "#1A1859",
              }}
            >
              {formatBrazilianCurrency(singlePropertyData?.property?.brl_iptu)}
            </Typography>
          </Stack>
        )}
      </Stack>
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{
          display: {
            xs: "none",
            sm: "flex",
          },
        }}
        spacing={1}
      >
        <BaseWhatsappButton content={content} />
        <Button
          disabled={
            session?.user?.role === "broker" || session?.user?.role === "construction_company" || session?.user?.role === "owner"
          }
          variant="contained"
          color="primary"
          sx={{
            px: 4,
            fontSize: "16px",
            fontWeight: "600",
            textTransform: "none",
            minWidth: "195px",
            background: "#0E97F7",
            borderRadius: "4px",
            "&: hover": {
              px: 4,
              fontSize: "16px",
              fontWeight: "600",
              textTransform: "none",
              minWidth: "195px",
              background: "#0E97F7",
              borderRadius: "4px",
            },
          }}
          onClick={() => {
            setNegotiate(true);
            setSchedule(false);
            handleProposalOpen();
          }}
        >
          {t["Negotiate"]}
        </Button>
        <ScrollLink to="schedule_visit" smooth={true} duration={500}>
          <Button
            disabled={
              session?.user?.role === "broker" || session?.user?.role === "construction_company" ||
              session?.user?.role === "owner"
            }
            variant="contained"
            color="secondary"
            sx={{
              px: 4,
              fontSize: "16px",
              fontWeight: "600",
              textTransform: "none",
              minWidth: "195px",
              background: "#7450F0",
              borderRadius: "4px",
              "&: hover": {
                px: 4,
                fontSize: "16px",
                fontWeight: "600",
                textTransform: "none",
                minWidth: "195px",
                background: "#7450F0",
                borderRadius: "4px",
              },
            }}
            onClick={() => {
              setSchedule(true);
              setNegotiate(false);
              // if (window.scrollY < 500) {
              //   window.scrollBy({ top: 500, left: 0, behavior: "smooth" });
              // }
            }}
          >
            {t["Schedule visit"]}
          </Button>
        </ScrollLink>
      </Stack>
    </Stack>
  );
}

export default AmountView;
