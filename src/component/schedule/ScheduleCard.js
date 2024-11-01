import React, { useEffect } from "react";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { Button, CircularProgress, Container, Grid } from "@mui/material";
import { useState } from "react";

// import rentImage from "../public/Images/rentCard.png";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneEnabledOutlinedIcon from "@mui/icons-material/PhoneEnabledOutlined";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import {
  cancelSchedule,
  completeSchedule,
} from "../../redux/schedules/actions";
import { _baseURL, _imageURL } from "../../../consts";
import en from "locales/en";
import pt from "locales/pt";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { formatBrazilianCurrency } from "@/utils/useUtilities";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 14,
  },
}));

function ScheduleCard({ data, languageName }) {
  const t = languageName === "en" ? en : pt;
  const [loading, setLoading] = useState(false);
  const [compelteLoading, setCompleteLoading] = useState(false);
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const handleCancelSchedule = (id) => {
    setLoading(true);
    const data = {
      schedule_id: id,
    };
    dispatch(cancelSchedule(data));
    setLoading(false);
  };

  const handleCompleteSchedule = (id) => {
    setCompleteLoading(true);
    const data = {
      schedule_id: id,
    };
    dispatch(completeSchedule(data));
    setCompleteLoading(false);
  };

  const myLoader = ({ src }) => {
    return `${_imageURL}/${src}`;
  };

  const [pastedObject, setPastedObject] = useState(null);

  const handleCopy = (data) => {
    const copiedString =
      `aluguel: ${data?.property?.brl_rent}\n` +
      `hora criada: ${data?.property?.created_at}\n` +
      `endereço: ${data?.property?.address?.address}\n` +
      `nome do comprador: ${data?.buyer?.name}\n` +
      `e-mail do comprador: ${data?.buyer?.email}\n` +
      `telefone do Comprador: ${data?.buyer?.phone}\n`;
    navigator.clipboard
      .writeText(copiedString)
      .then(() => {
        console.log("Object copied successfully");
      })
      .catch((error) => {
        console.error("Error copying object:", error);
      });
  };

  const handlePaste = () => {
    navigator.clipboard
      .readText()
      .then((text) => {
        const parsedObject = JSON.parse(text);
        setPastedObject(parsedObject);
        console.log("Object pasted successfully:", parsedObject);
      })
      .catch((error) => {
        console.error("Error pasting object:", error);
      });
  };

  useEffect(() => {
    const handleContextMenu = (event) => {
      event.preventDefault();
      handleCopy();
    };

    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "c") {
        handleCopy();
      } else if (event.ctrlKey && event.key === "v") {
        handlePaste();
      }
    };

    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const router = useRouter();

  return (
    <Container maxWidth="xl" sx={{ marginTop: 5 }}>
      <Box
        sx={{
          width: "100%",
          background: "#ffffff",
          borderRadius: "6px",
          pr: { xs: 0, sm: 0, md: 1, lg: 2, xl: 2 },
          pb: { xs: 2, md: 0 },
        }}
      >
        <Grid container spacing={{ xs: 0, sm: 0, md: 0, lg: 2, xl: 2, xxl: 2 }}>
          <Grid item xs={12} sm={12} md={12} lg={4} className="rentImage">
            <Box
              sx={{
                cursor: "pointer",
                width: "100%",
                height: "200px",
                position: "relative",
              }}
              onClick={() =>
                router.push({
                  pathname: `/visualizacao-da-propriedade/${data?.property?.id}/${data?.property?.property_title}`,
                })
              }
            >
              <Image
                loader={myLoader}
                src={`${data?.property?.attachments?.[0]?.file_path}`}
                layout="fill"
                objectFit="cover"
                alt="rentImage"
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={8}>
            <Grid container spacing={10}>
              <Grid item xs={12} sm={12} md={12} lg={4}>
                <Grid
                  container
                  direction="column"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  sx={{
                    px: { xs: 2, sm: 2, md: 2, lg: 0 },
                    py: { xs: 2, sm: 2, md: 2, lg: 0 },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#002152",
                      fontWeight: "700",
                      fontSize: {
                        xs: "16px",
                        sm: "16px",
                        md: "16px",
                        lg: "12px",
                        xl: "16px",
                      },
                      lineHeight: "22px",
                    }}
                  >
                    {t["property details"]}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#002152",
                      fontWeight: "700",
                      fontSize: {
                        xs: "24px",
                        sm: "24px",
                        md: "24px",
                        lg: "14px",
                        xl: "24px",
                      },
                      lineHeight: "32px",
                    }}
                  >
                    {formatBrazilianCurrency(data?.property?.brl_rent)}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#6C7A84",
                      fontWeight: "400",
                      fontSize: {
                        xs: "16px",
                        sm: "16px",
                        md: "16px",
                        lg: "12px",
                        xl: "16px",
                      },
                      lineHeight: "22px",
                    }}
                  >
                    {data?.property?.address?.address}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#6C7A84",
                      fontWeight: "400",
                      fontSize: {
                        xs: "16px",
                        sm: "16px",
                        md: "16px",
                        lg: "12px",
                        xl: "16px",
                      },
                      lineHeight: "22px",
                    }}
                  >
                    {` ${t["created on"]}: ${dayjs(
                      data?.property?.created_at
                    ).format("DD/MM/YYYY")}
                      `}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={4}>
                <Grid
                  container
                  direction="column"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  sx={{
                    px: { xs: 2, sm: 2, md: 2, lg: 0 },
                    py: { xs: 2, sm: 2, md: 2, lg: 0 },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#002152",
                      fontWeight: "700",
                      fontSize: {
                        xs: "16px",
                        sm: "16px",
                        md: "16px",
                        lg: "12px",
                        xl: "16px",
                      },
                      lineHeight: "22px",
                      pl: 0.5,
                    }}
                  >
                    {t["visitor data"]}
                  </Typography>
                  <Button
                    sx={{
                      display: "flex",
                      padding: 0,
                      textTransform: "none",
                      mt: 1,
                      "&:hover": {
                        background: "transparent",
                      },
                    }}
                  >
                    <PermIdentityOutlinedIcon sx={{ color: "#6C7A84" }} />
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#6C7A84",
                        fontWeight: "400",
                        fontSize: {
                          xs: "16px",
                          sm: "16px",
                          md: "16px",
                          lg: "12px",
                          xl: "16px",
                        },
                        lineHeight: "22px",
                      }}
                    >
                      {data?.buyer?.name}
                    </Typography>
                  </Button>
                  <Button
                    sx={{
                      display: "flex",
                      padding: 0,
                      textTransform: "none",
                      mt: 1,
                      "&:hover": {
                        background: "transparent",
                      },
                    }}
                  >
                    <EmailOutlinedIcon sx={{ color: "#6C7A84" }} />
                    <LightTooltip title={data?.buyer?.email}>
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#6C7A84",
                        fontWeight: "400",
                        fontSize: {
                          xs: "16px",
                          sm: "16px",
                          md: "16px",
                          lg: "12px",
                          xl: "16px",
                        },
                        lineHeight: "22px",
                      }}
                    >
                        {data?.buyer?.email?.length > 23
                ? `${data?.buyer?.email?.slice(0, 23)}..`
                : `${data?.buyer?.email}`}
                    </Typography>
                    </LightTooltip>
                  </Button>
                  <Button
                    sx={{
                      display: "flex",
                      padding: 0,
                      textTransform: "none",
                      mt: 1,
                      "&:hover": {
                        background: "transparent",
                      },
                    }}
                  >
                    <PhoneEnabledOutlinedIcon sx={{ color: "#6C7A84" }} />
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#6C7A84",
                        fontWeight: "400",
                        fontSize: {
                          xs: "16px",
                          sm: "16px",
                          md: "16px",
                          lg: "12px",
                          xl: "16px",
                        },
                        lineHeight: "22px",
                      }}
                    >
                      {data?.buyer?.phone
                        ? data?.buyer?.phone
                        : " -- -- -- -- -- -- -- -- --"}
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={4}>
                <Grid
                  container
                  direction="column"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  sx={{
                    px: { xs: 2, sm: 2, md: 2, lg: 0 },
                    py: { xs: 2, sm: 2, md: 2, lg: 0 },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#002152",
                      fontWeight: "700",
                      fontSize: {
                        xs: "16px",
                        sm: "16px",
                        md: "16px",
                        lg: "12px",
                        xl: "16px",
                      },
                      lineHeight: "22px",
                    }}
                  >
                    {t["visit data"]}
                  </Typography>

                  <Typography
                    variant="h6"
                    sx={{
                      color: "#6C7A84",
                      fontWeight: "700",
                      fontSize: {
                        xs: "16px",
                        sm: "16px",
                        md: "16px",
                        lg: "12px",
                        xl: "16px",
                      },
                      lineHeight: "22px",
                      mt: 1,
                    }}
                  >
                    <span style={{ fontWeight: "400" }}>Date:</span>
                    {` ${dayjs(data?.date).format("DD/MM/YYYY")}
                      `}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#6C7A84",
                      fontWeight: "700",
                      fontSize: {
                        xs: "16px",
                        sm: "16px",
                        md: "16px",
                        lg: "12px",
                        xl: "16px",
                      },
                      lineHeight: "22px",
                      mt: 1,
                    }}
                  >
                    <span style={{ fontWeight: "400" }}>Time:</span>
                    {/* {` $${dayjs(data?.time).format("HH:mm:00")}
                      `} */}
                    {data?.time}
                  </Typography>
                  {data?.buyer?.observation && (
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#6C7A84",
                        fontWeight: "700",
                        fontSize: {
                          xs: "16px",
                          sm: "16px",
                          md: "16px",
                          lg: "12px",
                          xl: "16px",
                        },
                        lineHeight: "22px",
                        mt: 1,
                      }}
                    >
                      <span style={{ fontWeight: "400" }}>Observation:</span>
                      {` ${data?.buyer?.observation}`}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              alignItems="flex-end"
              gap={{
                xs: 0.5,
                sm: 0.5,
                md: 0.5,
                lg: 2,
                xl: 2,
                xxl: 2,
              }}
              sx={{
                justifyContent: {
                  xs: "flex-start", // Small devices
                  md: "flex-end", // Medium and larger devices
                },
                px: { xs: 2, md: 0 },
              }}
              // sx={{ ml: { xs: 1, sm: 1, md: 1, lg: 0 } }}
            >
              <Button
                disabled={
                  session?.user?.role === "broker" ||
                  session?.user?.role === "construction_company"
                }
                onClick={() => handleCompleteSchedule(data?.id)}
                variant="outlined"
                sx={{
                  borderColor: "#047857",
                  color: "#047857",
                  textTransform: "none",
                  fontSize: "16px",
                  fontWeight: "600",
                  lineHeight: "22px",
                  mt: { xs: 3, sm: 3, md: 3, lg: 0, xl: 3 },
                  mb: 1,
                  "&:hover": {
                    borderColor: "#047857",
                    color: "#047857",
                  },
                }}
              >
                {compelteLoading && (
                  <CircularProgress size={22} color="inherit" />
                )}
                {!compelteLoading && "Visita completa"}
              </Button>
              <Button
                disabled={
                  session?.user?.role === "broker" ||
                  session?.user?.role === "construction_company"
                }
                onClick={() => handleCancelSchedule(data?.id)}
                variant="outlined"
                sx={{
                  borderColor: "#F44336",
                  color: "#F44336",
                  textTransform: "none",
                  fontSize: "16px",
                  fontWeight: "600",
                  lineHeight: "22px",
                  mt: { xs: 3, sm: 3, md: 3, lg: 0, xl: 3 },
                  mb: 1,
                  "&:hover": {
                    borderColor: "#F44336",
                    color: "#F44336",
                  },
                }}
              >
                {loading && <CircularProgress size={22} color="inherit" />}
                {!loading && t["Cancel visit"]}
              </Button>
              <Button
                onClick={() => handleCopy(data)}
                variant="contained"
                sx={{
                  textTransform: "none",
                  mt: { xs: 1, md: 3, lg: 0, xl: 3 },
                  mb: 1,

                  fontSize: "16px",
                  fontWeight: "600",
                  lineHeight: "22px",
                }}
              >
                {t["Copy information"]}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default ScheduleCard;
