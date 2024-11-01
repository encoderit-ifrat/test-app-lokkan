import {
  Box,
  Button,
  Grid,
  Typography,
  Tooltip,
  LinearProgress,
  Snackbar,
  Alert,
  CircularProgress,
  Skeleton,
} from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import certificate from "../../../../../../public/Images/certificate.png";
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
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCertificate,
  findRequireCertificateData,
} from "../../../../../redux/requireCertificate/actions";
import {
  certificateDownloadApi,
  requestDocumentsApi,
} from "../../../../../api";
import { useRouter } from "next/router";
import DigitalNotaryPdfModal from "../digitalNotaryPdfModal/DigitalNotaryPdfModal";
import en from "locales/en";
import pt from "locales/pt";
import BaseButton from "@/component/reuseable/baseButton/BaseButton";

function CertificatesAndDocuments({
  handleNext,
  singlePropertyData,
  languageName,
  handleBack,
}) {
  const router = useRouter();
  const { query } = router;

  const t = languageName === "en" ? en : pt;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      findRequireCertificateData(
        +singlePropertyData?.contract?.id || +query?.contractId
      )
    );
  }, [dispatch, singlePropertyData?.contract?.id, query?.contractId]);
  const requireCertificateData = useSelector(
    (state) => state?.requireCertificate?.requireCertificateData
  );
  const uploadCount = useSelector(
    (state) => state?.requireCertificate?.uploadCount
  );

  const [certificateData, setCertificateData] = useState("");
  //contract_modal_open
  const [contractModalOpen, setContractModalOpen] = React.useState(false);

  const Loading = useSelector((state) => state?.requireCertificate?.loading);

  const handleOpen = (data) => {
    setCertificateData(data);
    setContractModalOpen(true);
  };
  const handleClose = () => setContractModalOpen(false);

  const [progress, setProgress] = React.useState(40);
  const [loading, setLoading] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleClickSnackbar = () => {
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleRequestDocument = async () => {
    setLoading(true);
    const [error, response] = await requestDocumentsApi(
      +singlePropertyData?.contract?.id
    );
    setLoading(false);
    if (!error) {
      if (response?.data?.status === true) {
        handleNext();
      } else {
        handleClickSnackbar();
      }
    }
  };

  const [digitalNotaryPdfOpen, setDigitalNotaryPdfOpen] = React.useState(false);
  const handleNotaryPdfOpen = (data) => {
    setDigitalNotaryPdfOpen(true);
    setCertificateData(data);
  };
  const handleNotaryPdfClose = () => setDigitalNotaryPdfOpen(false);

  return (
    <Box sx={{ mt: 4 }}>
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
          <Image height={40} width={60} src={certificate} alt="handshake" />
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
            {t["Certificates and documents"]}
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
                pathname: "/proposals",
                query: {
                  proposal_status: "accepted",
                  status: "approved",
                  page: 1,
                  per_page: 9,
                },
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

          <Grid item xs={12} sm={12} md={12} lg={8}>
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
                {`${t["Requested documents"]} ${uploadCount || 0}/${
                  requireCertificateData?.documents?.length || 0
                }`}
              </Typography>
            </Box>
            <Grid container spacing={3}>
              {!Loading
                ? requireCertificateData?.documents?.map((data, index) => (
                    <Grid
                      key={index}
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      lg={6}
                      sx={{ mt: 1 }}
                    >
                      <Box
                        sx={{
                          background: "#FFFFFF",
                          border: "1px solid #DBE1E5",
                          borderRadius: "8px",
                          py: 2,
                          mt: 2,
                          px: {
                            xs: 0,
                            sm: 0,
                            md: 0,
                            lg: 2,
                            xl: 2,
                          },
                          height: {
                            xs: 200,
                            sm: 200,
                            md: 200,
                            lg: 200,
                            xl: 180,
                          },
                        }}
                      >
                        <Grid
                          container
                          direction="column"
                          justifyContent="center"
                          alignItems="center"
                        >
                          <Box>
                            <Typography
                              variant="p"
                              sx={{
                                color: "#1A1859",
                                fontSize: "14px",
                                lineHeight: "18px",
                                fontWeight: "400",
                              }}
                            >
                              {data?.tag?.name}
                            </Typography>
                          </Box>

                          {data?.status === "certificate_uploaded" ? (
                            <Box
                              sx={{
                                background: "#FFFFFF",
                                border: "1px solid #DBE1E5",
                                borderRadius: "8px",
                                py: 2,
                                px: {
                                  xs: 2,
                                  sm: 2,
                                  md: 0,
                                  lg: 2,
                                  xl: 0.6,
                                  xxl: 1,
                                },
                              }}
                            >
                              <Grid
                                container
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                              >
                                <Grid
                                  container
                                  direction="row"
                                  justifyContent={{
                                    xs: "center",
                                    sm: "center",
                                    md: "center",
                                    lg: "flex-start",
                                    xl: "center",
                                  }}
                                  alignItems="center"
                                  sx={{ mt: 2 }}
                                >
                                  <Button
                                    onClick={() =>
                                      certificateDownloadApi(
                                        singlePropertyData?.contract?.id,
                                        data?.certificate_type_id
                                      )
                                    }
                                    sx={{
                                      background: "#7450F0",
                                      color: "#ffffff",
                                      mr: 1,
                                      "&: hover": {
                                        background: "#7450F0",
                                        color: "#ffffff",
                                      },
                                    }}
                                  >
                                    <Image src={content} alt="content" />
                                  </Button>
                                  <Button
                                    onClick={() =>
                                      dispatch(
                                        deleteCertificate(
                                          singlePropertyData?.contract?.id,
                                          data?.certificate_type_id
                                        )
                                      )
                                    }
                                    sx={{
                                      background: "#F44336",
                                      color: "#ffffff",
                                      mr: 1,

                                      "&: hover": {
                                        background: "#F44336",
                                        color: "#ffffff",
                                      },
                                    }}
                                  >
                                    <Image src={maskedIcon} alt="maskedIcon" />
                                  </Button>
                                  <Button
                                    onClick={() => handleNotaryPdfOpen(data)}
                                    sx={{
                                      display: "flex",
                                      background: "#0362F0",
                                      color: "#ffffff",
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
                                        background: "#0362F0",
                                        color: "#ffffff",
                                        textTransform: "none",
                                        py: 0.5,
                                        px: 1,
                                      },
                                    }}
                                  >
                                    <VisibilityOutlinedIcon
                                      sx={{
                                        color: "#ffffff",
                                      }}
                                    />
                                    <Typography
                                      variant="p"
                                      sx={{
                                        color: "#ffffff",
                                        fontSize: "14px",
                                        lineHeight: "18px",
                                        fontWeight: "400",
                                      }}
                                    >
                                      {t["To view"]}
                                    </Typography>
                                  </Button>
                                </Grid>
                              </Grid>
                            </Box>
                          ) : (
                            <Box
                              sx={{
                                px: {
                                  xs: 2,
                                  sm: 2,
                                  md: 2,
                                  lg: 0,
                                  xl: 2,
                                },
                                width: "100%",
                                mt: 2,
                              }}
                            >
                              <Button
                                fullWidth
                                onClick={() => handleOpen(data)}
                                varinat="outlined"
                                sx={{
                                  display: "flex",
                                  border: "1px solid #000F1A",
                                  color: "#000F1A",
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
                                    color: "#000F1A",
                                    textTransform: "none",
                                    py: 0.5,
                                    px: 2,
                                  },
                                }}
                              >
                                <CloudUploadOutlinedIcon
                                  sx={{ color: "#000F1A" }}
                                />
                                <Typography
                                  variant="p"
                                  sx={{
                                    color: "#000F1A",
                                    fontSize: "14px",
                                    lineHeight: "18px",
                                    fontWeight: "400",
                                    ml: 0.5,
                                  }}
                                >
                                  {t["send documents"]}
                                </Typography>
                              </Button>
                            </Box>
                          )}
                        </Grid>
                      </Box>
                    </Grid>
                  ))
                : [0, 1, 2].map((data, index) => (
                    <Grid
                      key={index}
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      lg={6}
                      xl={6}
                      xxl={6}
                    >
                      <Skeleton
                        variant="rect"
                        height={150}
                        width={300}
                        sx={{ mx: 2, my: 2, borderRadius: "8px" }}
                      />
                    </Grid>
                  ))}
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="flex-start"
            >
              <Button
                onClick={handleRequestDocument}
                sx={{
                  background: "#34BE84",
                  color: "#ffffff",
                  fontSize: "16px",
                  lineHeight: "22px",
                  textTransform: "none",
                  width: {
                    xs: "50%",
                    sm: "50%",
                    md: "50%",
                    lg: "50%",
                    xl: "40%",
                    xxl: "30%",
                  },
                  mt: 5,
                  px: 2,
                  "&: hover": {
                    background: "#34BE84",
                    color: "#ffffff",
                    fontSize: "16px",
                    lineHeight: "22px",
                    px: 2,
                  },
                }}
              >
                {loading && <CircularProgress size={22} color="inherit" />}
                {!loading && t["requested documents"]}
              </Button>
            </Grid>
          </Grid>
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
        </Grid>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        key={"top"}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {t["Please upload all requested documents"]}
        </Alert>
      </Snackbar>
      <BaseModal isShowing={contractModalOpen} isClose={handleClose}>
        <Tooltip title="Something">
          <>
            <CertificateModal
              handleClose={handleClose}
              certificateData={certificateData}
              singlePropertyData={singlePropertyData}
              languageName={languageName}
              uploadCount={uploadCount}
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
    </Box>
  );
}

export default CertificatesAndDocuments;
