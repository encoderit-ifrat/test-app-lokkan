import {
  Box,
  Button,
  Grid,
  Typography,
  Tooltip,
  LinearProgress,
  Skeleton,
  Popover,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import handshake from "../../../../../../public/Images/handshake.png";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import media from "../../../../../../public/Images/Media.png";
import generate from "../../../../../../public/Images/generate.png";
import BaseModal from "../../../../reuseable/baseModal/BaseModal";
import ContractModal from "../contractModal/ContractModal";
import SaleCard from "../../../../reuseable/saleCard/SaleCard";
import ContractPdfModal from "../ContractPdfModal/ContractPdfModal";
import { contractDownloadApi, contractNextStepApi } from "../../../../../api";
import { useSession } from "next-auth/react";
import en from "locales/en";
import pt from "locales/pt";
import { useRouter } from "next/router";
import MuiAlert from "@mui/material/Alert";
import BaseButton from "@/component/reuseable/baseButton/BaseButton";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Contract({
  handleNext,
  singlePropertyData,
  Loading,
  languageName,
  handleBack,
}) {
  const { data: session } = useSession();
  const router = useRouter();
  const { query } = router;

  const t = languageName === "en" ? en : pt;
  //contract_modal_open
  const [contractModalOpen, setContractModalOpen] = React.useState(false);
  const handleOpen = () => setContractModalOpen(true);
  const handleClose = () => setContractModalOpen(false);

  // const [hideGenerateContract, setHideGenerateContract] = useState(false);

  //pdf_open
  const [contractPdfOpen, setContractPdfOpen] = React.useState(false);
  const handlePdfOpen = () => setContractPdfOpen(true);
  const handlePdfClose = () => setContractPdfOpen(false);
  const [loadingDownload, setLoadingDownload] = useState(false);
  const [progress, setProgress] = React.useState(40);

  // const handleDownload = async () => {
  //   setLoadingDownload(true);
  //   const [error, response] = await contractDownloadApi(
  //     +singlePropertyData?.contract?.id
  //   );
  //   setLoadingDownload(false);
  //   if (!error) {
  //     console.log({ response });
  //     console.log("downloaded");
  //   } else {
  //     const errors = error?.response?.data?.errors ?? {};
  //     console.log({ errors });
  //   }
  // };

  const [nextLoading, setNextLoading] = useState(false);
  const [nextErrormessage, setNextErrorMessage] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleContractNext = async (event) => {
    setNextLoading(true);
    const [error, resp] = await contractNextStepApi(query?.contractId);
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
          <Image height={40} width={60} src={handshake} alt="handshake" />
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
            {t["Digital contract"]}
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

          {singlePropertyData?.contract?.status === "new" ? (
            <Grid item xs={12} sm={12} md={12} lg={5}>
              <Box
                sx={{
                  background: "#FFFFFF",
                  border: "1px solid #DBE1E5",
                  borderRadius: "8px",
                  py: {
                    xs: 2,
                    sm: 2,
                    md: 4.4,
                    lg: 4.4,
                    xl: 5.4,
                    xxl: 5.8,
                  },
                }}
              >
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ px: 2 }}
                >
                  <Image src={generate} alt="generateImage" />
                  <Typography
                    variant="h1"
                    sx={{
                      color: "#1A1859",
                      fontWeight: "700",
                      fontSize: "24px",
                      lineHeight: "32px",
                      mt: 1,
                    }}
                  >
                    {session?.user?.role === "admin"
                      ? t["Generate your digital contract"]
                      : t["Admin will generate a contract"]}
                  </Typography>

                  {session?.user?.role === "admin" && (
                    <Button
                      fullWidth
                      sx={{
                        color: "#FFFFFF",
                        fontSize: "16px",

                        lineHeight: "22px",
                        fontWeight: "600",
                        background: "#7450F0",
                        borderRadius: "4px",

                        textTransform: "none",
                        mt: 1,
                        py: 1,

                        "&:hover": {
                          color: "#FFFFFF",
                          fontSize: "16px",

                          lineHeight: "22px",
                          fontWeight: "600",
                          background: "#7450F0",
                          borderRadius: "4px",

                          textTransform: "none",
                          mt: 1,
                          py: 1,
                        },
                      }}
                      onClick={handleOpen}
                    >
                      {t["Generate contract"]}
                    </Button>
                  )}
                </Grid>
              </Box>
            </Grid>
          ) : (
            <Grid item xs={12} sm={12} md={12} lg={4}>
              <Box
                sx={{
                  background: "#FFFFFF",
                  border: "1px solid #DBE1E5",
                  borderRadius: "8px",
                }}
              >
                <Box sx={{ mt: 1, px: 2 }}>
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
                    {t["waiting for signature"]}
                  </Button>
                  <Typography
                    variant="h1"
                    sx={{
                      color: "#1A1859",
                      fontSize: "18px",
                      lineHeight: "28px",
                      fontWeight: "400",
                      mt: 0.5,
                    }}
                  >
                    {singlePropertyData?.contract?.documents[0]?.title?.slice(
                      0,
                      25
                    )}
                  </Typography>
                  {/* <Typography
                    variant="h1"
                    sx={{
                      color: "#6C7A84",
                      fontSize: "14px",
                      lineHeight: "18px",
                      fontWeight: "400",
                      mt: 0.5,
                    }}
                  >
                    {`${t["subscriptions"]} (2/5)`}
                  </Typography> */}
                </Box>
                {/* <Box sx={{ width: "100%", px: 2, my: 1 }}>
                  <LinearProgress
                    sx={{
                      "& .MuiLinearProgress-barColorPrimary": {
                        backgroundColor: "#7450F0",
                        borderRadius: "10px",
                      },
                      backgroundColor: "#f5f5f5",
                      borderRadius: "10px",
                      // "& .MuiLinearProgress-colorPrimary": {
                      //   backgroundColor: "#F5F5F5",
                      // },
                    }}
                    variant="determinate"
                    value={progress}
                  />
                </Box> */}
                <Grid container spacing={2} sx={{ px: 2, my: 1 }}>
                  <Grid item xs={12} sm={12} md={12} lg={6}>
                    <Button
                      onClick={() =>
                        contractDownloadApi(singlePropertyData?.contract?.id)
                      }
                      color="inherit"
                      fullWidth
                      sx={{
                        mr: 1,
                        border: "1px solid #002152",
                        borderRadius: "4px",
                        px: 2,
                        py: 0.5,
                        color: "#002152",
                        fontSize: "16px",
                        fontWeight: "600",
                        lineHeight: "22px",
                        textTransform: "none",
                      }}
                    >
                        Baixar
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={6}>
                    <Button
                      onClick={handlePdfOpen}
                      fullWidth
                      sx={{
                        background: "#0362F0",
                        borderRadius: "4px",
                        px: 2,
                        py: 0.5,
                        color: "#ffffff",
                        fontSize: "16px",
                        fontWeight: "600",
                        lineHeight: "22px",
                        textTransform: "none",
                        boxShadow: "0px 4px 8px rgba(81, 51, 182, 0.32)",
                        "&:hover": {
                          background: "#0362F0",
                          borderRadius: "4px",
                          px: 2,
                          py: 0.5,
                          color: "#ffffff",
                          fontSize: "16px",
                          fontWeight: "600",
                          lineHeight: "22px",
                          textTransform: "none",
                          boxShadow: "0px 4px 8px rgba(81, 51, 182, 0.32)",
                        },
                      }}
                    >
                      {t["Details"]}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          )}
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
          {/* <Button
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
          </Button> */}

          <Button
            onClick={handleContractNext}
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
      <BaseModal isShowing={contractModalOpen} isClose={handleClose}>
        <Tooltip title="Something">
          <>
            <ContractModal
              handleClose={handleClose}
              singlePropertyData={singlePropertyData}
              languageName={languageName}
            />
          </>
        </Tooltip>
      </BaseModal>
      <BaseModal isShowing={contractPdfOpen} isClose={handlePdfClose}>
        <Tooltip title="Something">
          <>
            <ContractPdfModal
              handleClose={handlePdfClose}
              handlePdfOpen={handlePdfOpen}
              handleNext={handleNext}
              singlePropertyData={singlePropertyData}
              languageName={languageName}
            />
          </>
        </Tooltip>
      </BaseModal>
    </Box>
  );
}

export default Contract;
