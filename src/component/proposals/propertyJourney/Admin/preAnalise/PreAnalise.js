import {
  Box,
  Button,
  Grid,
  Typography,
  Tooltip,
  LinearProgress,
  Skeleton,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import Image from "next/image";
import React, { useEffect } from "react";
import analise from "../../../../../../public/Images/analise.png";
import maskedIcon from "../../../../../../public/Images/maskedIcon.png";
import content from "../../../../../../public/Images/content.png";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

import generate from "../../../../../../public/Images/generate.png";
import BaseModal from "../../../../reuseable/baseModal/BaseModal";
import ContractModal from "../contractModal/ContractModal";
import SaleCard from "../../../../reuseable/saleCard/SaleCard";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import CertificateModal from "../certificateModal/CertificateModal";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import AnalysisPdfModal from "../AnalysisPdfModal/AnalysisPdfModal";
import { useDispatch, useSelector } from "react-redux";
import { findUploadCertificateData } from "../../../../../redux/uploadCertificate/actions";
import { useState } from "react";
import { AnaliseNextStepApi, certificateDownloadApi } from "../../../../../api";
import DigitalNotaryPdfModal from "../digitalNotaryPdfModal/DigitalNotaryPdfModal";
import en from "locales/en";
import pt from "locales/pt";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import MuiAlert from "@mui/material/Alert";
import BaseButton from "@/component/reuseable/baseButton/BaseButton";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function PreAnalise({
  handleNext,
  singlePropertyData,
  languageName,
  handleBack,
}) {
  const t = languageName === "en" ? en : pt;

  const router = useRouter();
  const { query } = router;
  const { data: session } = useSession();
  const dispatch = useDispatch();
  useEffect(() => {
    if(!+singlePropertyData?.contract?.id){
      return
    }
    dispatch(findUploadCertificateData(+singlePropertyData?.contract?.id));
  }, [dispatch, singlePropertyData?.contract?.id]);
  const uploadCertificateData = useSelector(
    (state) => state?.uploadCertificate?.uploadCertificateData
  );

  const Loading = useSelector((state) => state?.uploadCertificate?.loading);

  const [certificateData, setCertificateData] = useState("");
  //pdf_open
  const [analysisPdfOpen, setAnalysisPdfOpen] = React.useState(false);
  const handlePdfOpen = (data) => {
    setAnalysisPdfOpen(true);
    setCertificateData(data);
  };
  const handlePdfClose = () => setAnalysisPdfOpen(false);

  const [digitalNotaryPdfOpen, setDigitalNotaryPdfOpen] = React.useState(false);
  const handleNotaryPdfOpen = (data) => {
    setDigitalNotaryPdfOpen(true);
    setCertificateData(data);
  };
  const handleNotaryPdfClose = () => setDigitalNotaryPdfOpen(false);

  const [nextLoading, setNextLoading] = useState(false);
  const [nextErrormessage, setNextErrorMessage] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleAnaliseNext = async (event) => {
    setNextLoading(true);
    const [error, resp] = await AnaliseNextStepApi(query?.contractId);
    setNextLoading(false);
    if (!error) {
      if (resp?.data?.status === true) {
        handleNext();
        setOpen(false);
      } else {
        setOpen(true);
        setNextErrorMessage(resp?.data?.message);
      }
    }
  };

  return (
    <Box sx={{ mt: 4, mb: 2 }}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Image height={40} width={40} src={analise} alt="analise" />
          <Typography
            variant="p"
            sx={{
              color: "#002152",
              fontSize: "24px",
              fontWeight: "700",
              lineHeight: "32px",
              ml: 1,
            }}
          >
            {t["Pre analysis"]}
          </Typography>
        </Box>
        <Box>
          <BaseButton
            type="button"
            variant="outlined"
            color="error"
            sx="error"
            handleFunction={() => {
              router.replace({
                pathname:"/proposals",
                query: {
                  proposal_status:"accepted",
                  status: "approved",
                  page: 1,
                  per_page: 9
                }
              });
            }}
          >
            {t["Cancel"]}
          </BaseButton>
        </Box>
      </Grid>
      <Box sx={{ mt: { xs: 2, sm: 2, md: 2, lg: 4 } }}>
        <Grid container spacing={2}>
          {Loading ? (
            <Grid item xs={12} sm={12} md={12} lg={3}>
              <Skeleton
                variant="rect"
                height={230}
                sx={{ mx: 2, my: 2, borderRadius: "8px" }}
              />
            </Grid>
          ) : (
            <Grid item xs={12} sm={12} md={12} lg={3}>
              <SaleCard singlePropertyData={singlePropertyData} />
            </Grid>
          )}
          <Grid item xs={12} sm={12} md={12} lg={9}>
            {/* <Box
              sx={{
                background: "#FFFFFF",
                border: "1px solid #DBE1E5",
                borderRadius: "8px",
                px: 2,
                py: 2,
              }}
            >
              <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <Box>
                  <Button
                    sx={{
                      display: "flex",
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
                    <CheckCircleOutlineIcon sx={{ color: "#114B32" }} />
                    <Typography
                      varianat="p"
                      sx={{
                        color: "#114B32",
                        fontSize: "14px",
                        lineHeight: "18px",
                        fontWeight: "400",
                      }}
                    >
                      Analysis completed
                    </Typography>
                  </Button>
                </Box>
                <Box>
                  <Typography
                    variant="p"
                    sx={{
                      color: "#1A1859",
                      fontSize: "16px",
                      lineHeight: "22px",
                      fontWeight: "400",
                    }}
                  >
                    Joint certificate of debts related to federal taxes and the
                    active debt of the rural property union - Federal Revenue
                    Service - NIRF
                  </Typography>
                </Box>
                <Box sx={{ width: "100%", py: 1 }}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={12} lg={5}>
                      <Typography
                        sx={{
                          color: "#6C7A84",
                          fontSize: "14px",
                          lineHeight: "22px",
                          fontWeight: "400",
                        }}
                      >
                        Delivery: 06/13/2021,14:36
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={3}>
                      <Typography
                        sx={{
                          color: "#6C7A84",
                          fontSize: "14px",
                          lineHeight: "22px",
                          fontWeight: "400",
                        }}
                      >
                        Size: 1MB
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={4}>
                      <Typography
                        sx={{
                          color: "#6C7A84",
                          fontSize: "14px",
                          lineHeight: "22px",
                          fontWeight: "400",
                        }}
                      >
                        Format: PDF
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>

                <Grid container spacing={1}>
                  <Grid item xs={12} sm={12} md={12} lg={3}>
                    <Box
                      sx={{
                        background: "#E6F0FF",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        px: 3,
                        py: 2,
                      }}
                    >
                      <Image
                        height={50}
                        width={50}
                        src={analise}
                        alt="analise"
                      />
                      <Typography
                        variant="p"
                        sx={{
                          color: "#7450F0",
                          fontWeight: "400",
                          fontSize: "10px",
                          lineHeight: "14px",
                        }}
                      >
                        lukka
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={9}>
                    <Box
                      sx={{
                        background: "#F2F5F6",
                        borderRadius: "4px",
                        px: 2,
                        py: 4.5,
                        width: "100%",
                      }}
                    >
                      <Typography
                        variant="p"
                        sx={{
                          color: "#1A1859",
                          fontWeight: "400",
                          fontSize: "14px",
                          lineHeight: "22px",
                        }}
                      >
                        Document parsed, all data lorem ipsum dolor amet!
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Grid container spacing={1} sx={{ mt: 1 }}>
                  <Grid item xs={12} sm={12} md={12} lg={3}>
                    <Button
                      varinat="outlined"
                      fullWidth
                      sx={{
                        display: "flex",
                        border: "1px solid #000F1A",
                        color: "#ffffff",
                        textTransform: "none",
                        py: 0.5,
                        px: 2,
                        mt: { xs: 0, sm: 0, md: 0, lg: 1, xl: 0 },
                        "&: hover": {
                          border: "1px soli d#000F1A",
                          color: "#ffffff",
                          textTransform: "none",
                          py: 0.5,
                          px: 2,
                        },
                      }}
                    >
                      <CloudDownloadOutlinedIcon sx={{ color: "#000F1A" }} />
                      <Typography
                        variant="p"
                        sx={{
                          color: "#000F1A",
                          fontSize: "14px",
                          lineHeight: "18px",
                          fontWeight: "600",
                        }}
                      >
                        To go down
                      </Typography>
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={3}>
                    <Button
                      varinat="outlined"
                      fullWidth
                      sx={{
                        display: "flex",
                        border: "1px solid #000F1A",
                        color: "#ffffff",
                        textTransform: "none",
                        py: 0.5,
                        px: 2,
                        mt: { xs: 0, sm: 0, md: 0, lg: 1, xl: 0 },
                        "&: hover": {
                          border: "1px soli d#000F1A",
                          color: "#ffffff",
                          textTransform: "none",
                          py: 0.5,
                          px: 2,
                        },
                      }}
                    >
                      <VisibilityOutlinedIcon sx={{ color: "#000F1A" }} />
                      <Typography
                        variant="p"
                        sx={{
                          color: "#000F1A",
                          fontSize: "14px",
                          lineHeight: "18px",
                          fontWeight: "600",
                        }}
                      >
                        To view
                      </Typography>
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={6}>
                    <Button
                      fullWidth
                      variant="outlined"
                      sx={{
                        display: "flex",
                        background: "#DDF8ED",
                        border: "1px solid #34BE84",
                        color: "#ffffff",
                        textTransform: "none",
                        py: 0.5,
                        px: 2,
                        mt: { xs: 0, sm: 0, md: 0, lg: 1, xl: 0 },
                        "&: hover": {
                          background: "#DDF8ED",
                          color: "#ffffff",
                          textTransform: "none",
                          py: 0.5,
                          px: 2,
                          border: "1px solid #34BE84",
                        },
                      }}
                    >
                      <CheckCircleOutlineIcon sx={{ color: "#114B32" }} />
                      <Typography
                        variant="p"
                        sx={{
                          color: "#114B32",
                          fontSize: "14px",
                          lineHeight: "18px",
                          fontWeight: "600",
                        }}
                      >
                        Validated documnet
                      </Typography>
                    </Button>
                  </Grid>
                </Grid>
                
              </Grid>
            </Box> */}
            {Loading
              ? [0, 1, 2].map((data, index) => (
                  <Grid
                    key={index}
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    xxl={12}
                  >
                    <Skeleton
                      variant="rect"
                      height={150}
                      width={500}
                      sx={{ mx: 2, my: 2, borderRadius: "8px" }}
                    />
                  </Grid>
                ))
              : uploadCertificateData?.documents?.map((data, index) => (
                  <Box
                    key={index}
                    sx={{
                      background: "#FFFFFF",
                      border: "1px solid #DBE1E5",
                      borderRadius: "8px",
                      px: 2,
                      py: 2,
                      mt: 2,
                    }}
                  >
                    {data?.status === "certificate_validated" && (
                      <Box>
                        <Button
                          sx={{
                            display: "flex",
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
                          <CheckCircleOutlineIcon sx={{ color: "#114B32" }} />
                          <Typography
                            varianat="p"
                            sx={{
                              color: "#114B32",
                              fontSize: "14px",
                              lineHeight: "18px",
                              fontWeight: "400",
                            }}
                          >
                            {t["Analysis completed"]}
                          </Typography>
                        </Button>
                      </Box>
                    )}
                    <Grid
                      container
                      direction="column"
                      justifyContent="flex-start"
                      alignItems="flex-start"
                    >
                      <Box>
                        <Typography
                          variant="p"
                          sx={{
                            color: "#1A1859",
                            fontSize: "16px",
                            lineHeight: "22px",
                            fontWeight: "400",
                          }}
                        >
                          {data?.tag?.name}
                        </Typography>
                      </Box>
                      <Box sx={{ width: "100%", py: 1 }}>
                        <Grid container spacing={1}>
                          <Grid item xs={12} sm={12} md={12} lg={5}>
                            <Typography
                              sx={{
                                color: "#6C7A84",
                                fontSize: "14px",
                                lineHeight: "22px",
                                fontWeight: "400",
                              }}
                            >
                              {`${t["Delivery"]}: 06/13/2021,14:36 `}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={12} md={12} lg={3}>
                            <Typography
                              sx={{
                                color: "#6C7A84",
                                fontSize: "14px",
                                lineHeight: "22px",
                                fontWeight: "400",
                              }}
                            >
                              {`${t["Size"]}: 1MB`}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={12} md={12} lg={4}>
                            <Typography
                              sx={{
                                color: "#6C7A84",
                                fontSize: "14px",
                                lineHeight: "22px",
                                fontWeight: "400",
                              }}
                            >
                              {`${t["Format"]}: PDF`}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>

                      <Grid container spacing={1}>
                        <Grid item xs={12} sm={12} md={12} lg={3}>
                          <Box
                            sx={{
                              background: "#E6F0FF",
                              width: "100%",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                              px: 3,
                              py: 3.4,
                            }}
                          >
                            <Image
                              height={50}
                              width={50}
                              src={analise}
                              alt="analise"
                            />
                            <Typography
                              variant="p"
                              sx={{
                                color: "#7450F0",
                                fontWeight: "400",
                                fontSize: "10px",
                                lineHeight: "14px",
                              }}
                            >
                              lukka
                            </Typography>
                            <Typography
                              variant="p"
                              sx={{
                                color: "#1A1859",
                                fontWeight: "400",
                                fontSize: "14px",
                                lineHeight: "24px",
                              }}
                            >
                              {`1 ${t["items to review"]}`}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={9}>
                          <Box
                            sx={{
                              background: "#FFF7E6",
                              borderRadius: "4px",
                              px: 2,
                              py: { xs: 1, sm: 1, md: 1, lg: 2.6, xl: 1 },
                              width: "100%",
                            }}
                          >
                            <Grid
                              container
                              direction="row"
                              justifyContent="flex-start"
                              alignItems="flex-start"
                            >
                              <Typography
                                variant="p"
                                sx={{
                                  color: "#1A1859",
                                  fontWeight: "400",
                                  fontSize: "14px",
                                  lineHeight: "22px",
                                }}
                              >
                                {t["Analysis result"]}
                              </Typography>
                            </Grid>
                            <Grid container spacing={1} sx={{ mt: 1 }}>
                              <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={6}
                                key={index}
                                className="analysis-card"
                              >
                                <Button
                                  sx={{
                                    display: "flex",
                                    textTransform: "none",
                                    py: 0.5,
                                    px: 0.5,
                                    mt: 0,
                                    mb: 0,
                                  }}
                                >
                                  <HighlightOffIcon sx={{ color: "#664400" }} />
                                  <Typography
                                    variant="p"
                                    sx={{
                                      color: "#664400",
                                      fontSize: "12px",
                                      fontWeight: "400",
                                      lineHeight: "22px",
                                    }}
                                  >
                                    {data?.remarks || t["No comment available"]}
                                  </Typography>
                                </Button>
                              </Grid>
                            </Grid>
                          </Box>
                        </Grid>
                      </Grid>
                      <Grid container spacing={1} sx={{ mt: 1 }}>
                        <Grid item xs={12} sm={12} md={12} lg={3}>
                          <Button
                            onClick={() =>
                              certificateDownloadApi(
                                singlePropertyData?.contract?.id,
                                data?.certificate_type_id
                              )
                            }
                            varinat="outlined"
                            fullWidth
                            sx={{
                              display: "flex",
                              border: "1px solid #000F1A",
                              color: "#ffffff",
                              textTransform: "none",
                              py: 0.5,
                              px: 2,
                              mt: {
                                xs: 0,
                                sm: 0,
                                md: 0,
                                lg: 1,
                                xl: 0,
                              },
                              "&: hover": {
                                border: "1px soli d#000F1A",
                                color: "#ffffff",
                                textTransform: "none",
                                py: 0.5,
                                px: 2,
                              },
                            }}
                          >
                            <CloudDownloadOutlinedIcon
                              sx={{ color: "#000F1A" }}
                            />
                            <Typography
                              variant="p"
                              sx={{
                                color: "#000F1A",
                                fontSize: "14px",
                                lineHeight: "18px",
                                fontWeight: "600",
                              }}
                            >
                              {t["To go down"]}
                            </Typography>
                          </Button>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={3}>
                          <Button
                            onClick={() => handleNotaryPdfOpen(data)}
                            varinat="outlined"
                            fullWidth
                            sx={{
                              display: "flex",
                              border: "1px solid #000F1A",
                              color: "#ffffff",
                              textTransform: "none",
                              py: 0.5,
                              px: 2,
                              mt: {
                                xs: 0,
                                sm: 0,
                                md: 0,
                                lg: 1,
                                xl: 0,
                              },
                              "&: hover": {
                                border: "1px solid #000F1A",
                                color: "#ffffff",
                                textTransform: "none",
                                py: 0.5,
                                px: 2,
                              },
                            }}
                          >
                            <VisibilityOutlinedIcon sx={{ color: "#000F1A" }} />
                            <Typography
                              variant="p"
                              sx={{
                                color: "#000F1A",
                                fontSize: "14px",
                                lineHeight: "18px",
                                fontWeight: "600",
                              }}
                            >
                              {t["To view"]}
                            </Typography>
                          </Button>
                        </Grid>
                        {data?.status === "certificate_validated" ? (
                          <Grid item xs={12} sm={12} md={12} lg={6}>
                            <Button
                              fullWidth
                              variant="outlined"
                              disabled={
                                session?.user?.role === "owner"
                                  ? true
                                  : session?.user?.role === "construction_company"
                                  ? true
                                  : session?.user?.role === "broker"
                                  ? true
                                  : false
                              }
                              sx={{
                                display: "flex",
                                background: "#DDF8ED",
                                border: "1px solid #34BE84",
                                color: "#ffffff",
                                textTransform: "none",
                                py: 0.5,
                                px: 2,
                                mt: {
                                  xs: 0,
                                  sm: 0,
                                  md: 0,
                                  lg: 1,
                                  xl: 0,
                                },
                                "&: hover": {
                                  background: "#DDF8ED",
                                  color: "#ffffff",
                                  textTransform: "none",
                                  py: 0.5,
                                  px: 2,
                                  border: "1px solid #34BE84",
                                },
                              }}
                            >
                              <CheckCircleOutlineIcon
                                sx={{ color: "#114B32" }}
                              />
                              <Typography
                                variant="p"
                                sx={{
                                  color: "#114B32",
                                  fontSize: "14px",
                                  lineHeight: "18px",
                                  fontWeight: "600",
                                }}
                              >
                                {t["Validated document"]}
                              </Typography>
                            </Button>
                          </Grid>
                        ) : (
                          <Grid item xs={12} sm={12} md={12} lg={6}>
                            <Button
                              onClick={() => handlePdfOpen(data)}
                              disabled={
                                session?.user?.role === "owner"
                                  ? true
                                  : session?.user?.role === "broker"
                                  ? true
                                  : session?.user?.role === "construction_company"
                                  ? true
                                  : false
                              }
                              fullWidth
                              variant="outlined"
                              sx={{
                                background: "#7450F0",
                                border: "1px solid #7450F0",
                                color: "#ffffff",
                                fontSize: "16px",
                                lineHeight: "22px",
                                fontWeight: "600",
                                textTransform: "none",
                                py: 0.5,
                                px: 1,
                                mt: {
                                  xs: 0,
                                  sm: 0,
                                  md: 0,
                                  lg: 1,
                                  xl: 0,
                                },
                                "&: hover": {
                                  background: "#7450F0",
                                  border: "1px solid #7450F0",
                                  color: "#ffffff",
                                  fontSize: "16px",
                                  lineHeight: "22px",
                                  fontWeight: "600",
                                  textTransform: "none",
                                  py: 0.5,
                                  px: 2,
                                },
                              }}
                            >
                              {t["Validate document"]}
                            </Button>
                          </Grid>
                        )}
                      </Grid>
                    </Grid>
                  </Box>
                ))}
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          sx={{ mt: 2, mb: 2 }}
        >
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <Alert
              onClose={handleSnackbarClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              {nextErrormessage}
            </Alert>
          </Snackbar>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          sx={{ mt: 2, mb: 2 }}
        >
          <Button
            color="inherit"
            onClick={handleBack}
            // disabled={activeStep === 0}
            sx={{
              mr: 1,
              border: "1px solid #002152",
              borderRadius: "4px",
              px: 2,
              py: 1,
              color: "#002152",
              fontSize: "16px",
              fontWeight: "600",
              lineHeight: "22px",
              textTransform: "none",
            }}
          >
            {t["come back"]}
          </Button>

          <Button
            onClick={handleAnaliseNext}
            sx={{
              background: "#7450F0",
              borderRadius: "4px",
              px: 2,
              py: 1,
              color: "#ffffff",
              fontSize: "16px",
              fontWeight: "600",
              lineHeight: "22px",
              textTransform: "none",
              boxShadow: "0px 4px 8px rgba(81, 51, 182, 0.32)",
              "&:hover": {
                background: "#7450F0",
                borderRadius: "4px",
                px: 2,
                py: 1,
                color: "#ffffff",
                fontSize: "16px",
                fontWeight: "600",
                lineHeight: "22px",
                textTransform: "none",
                boxShadow: "0px 4px 8px rgba(81, 51, 182, 0.32)",
              },
            }}
          >
            {nextLoading && <CircularProgress size={22} color="inherit" />}
            {!nextLoading && t["Next"]}
          </Button>
        </Grid>
      </Box>
      <BaseModal isShowing={analysisPdfOpen} isClose={handlePdfClose}>
        <Tooltip title="Something">
          <>
            <AnalysisPdfModal
              handleClose={handlePdfClose}
              handlePdfOpen={handlePdfOpen}
              handleNext={handleNext}
              singlePropertyData={singlePropertyData}
              certificateData={certificateData}
            />
          </>
        </Tooltip>
      </BaseModal>
      <BaseModal
        isShowing={digitalNotaryPdfOpen}
        isClose={handleNotaryPdfClose}
      >
        <Tooltip title="Something">
          <>
            <DigitalNotaryPdfModal
              handleClose={handleNotaryPdfClose}
              handlePdfOpen={handleNotaryPdfOpen}
              singlePropertyData={singlePropertyData}
              certificateData={certificateData}
            />
          </>
        </Tooltip>
      </BaseModal>
      {/* <BaseModal isShowing={contractModalOpen} isClose={handleClose}>
        <Tooltip title="Something">
          <>
            <CertificateModal />
          </>
        </Tooltip>
      </BaseModal> */}
    </Box>
  );
}

export default PreAnalise;
