import {
  Box,
  Button,
  Grid,
  Typography,
  Tooltip,
  LinearProgress,
  CircularProgress,
  Skeleton,
  Snackbar,
} from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import certificate from "../../../../../../public/Images/certificate.png";
import maskedIcon from "../../../../../../public/Images/maskedIcon.png";
import content from "../../../../../../public/Images/content.png";

import BaseModal from "../../../../reuseable/baseModal/BaseModal";

import SaleCard from "../../../../reuseable/saleCard/SaleCard";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";

import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useDispatch, useSelector } from "react-redux";
import { findCertificateData } from "../../../../../redux/certificates/actions";
import {
  certificateNextStepApi,
  certificateSubmitApi,
} from "../../../../../api";
import { useSession } from "next-auth/react";
import en from "locales/en";
import pt from "locales/pt";
import { useRouter } from "next/router";
import MuiAlert from "@mui/material/Alert";
import BaseButton from "@/component/reuseable/baseButton/BaseButton";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function BrokerCertificateAndDocument({
  handleNext,
  singlePropertyData,
  languageName,
  handleBack,
}) {
  const { data: session } = useSession();

  const router = useRouter();
  const { query } = router;

  const t = languageName === "en" ? en : pt;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(findCertificateData("certificate"));
  }, [dispatch]);
  const [loading, setLoading] = useState(false);
  const [certificateTypes, setCertificateTypes] = useState([]);
  const allCertificateData = useSelector(
    (state) => state?.certificate?.certificateData
  );

  const Loading = useSelector((state) => state?.certificate?.loading);

  const [nextErrormessage, setNextErrorMessage] = useState("");
  const [open, setOpen] = React.useState(false);

  const [success, setSuccess] = useState(false);

  const handleRequestSubmit = async () => {
    if (certificateTypes.length > 0) {
      setLoading(true);
      const requireData = {
        contract_id: +singlePropertyData?.contract?.id,
        certificates_id: certificateTypes,
      };
      const [error, response] = await certificateSubmitApi(requireData);
      setLoading(false);
      if (!error) {
        setOpen(true);
        setSuccess(true);
        setNextErrorMessage(response?.data?.message);
      } else {
        setOpen(true);
        setNextErrorMessage(response?.data?.message);
      }
    }
  };

  const [nextLoading, setNextLoading] = useState(false);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleCertificateNext = async (event) => {
    setNextLoading(true);
    const [error, resp] = await certificateNextStepApi(query?.contractId);
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
          <Grid item xs={12} sm={12} md={12} lg={8}>
            {/* <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              {session?.user?.role === "buyer" && (
                <Typography
                  variant="p"
                  sx={{
                    color: "#1A1859",
                    fontSize: "16px",
                    lineHeight: "22px",
                    fontWeight: "700",
                  }}
                >
                  {t["Select the required documents"]}
                </Typography>
              )}
              {session?.user?.role === "buyer" && (
                <FormControl component="fieldset">
                  <FormControlLabel
                    value="end"
                    control={<Checkbox sx={{ color: "#002152" }} />}
                    onChange={(e) => {
                      if (e.target.checked === true) {
                        const allIdArray = allCertificateData?.map(
                          (data) => data?.id
                        );
                        setCertificateTypes(allIdArray);
                      } else {
                        setCertificateTypes([]);
                      }
                    }}
                    label={
                      <Typography
                        variant="h6"
                        style={{
                          color: "#002152",
                          fontSize: "14px",
                          fontWeight: "400",
                          lineHeight: "18px",
                        }}
                      >
                        {t["select all"]}
                      </Typography>
                    }
                    labelPlacement="end"
                  />
                </FormControl>
              )}
            </Grid> */}
            <Grid container spacing={3}>
              {Loading
                ? [0, 1, 2].map((data, index) => (
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
                  ))
                : allCertificateData?.map((data, index) => (
                    <Grid key={data?.id} item xs={12} sm={12} md={12} lg={6}>
                      <Box
                        // onClick={() => {
                        //   if (!certificateTypes?.includes(data.id)) {
                        //     if (session?.user?.role === "buyer") {
                        //       setCertificateTypes((current) => [
                        //         ...current,
                        //         data.id,
                        //       ]);
                        //     }
                        //   } else {
                        //     const newArray = certificateTypes?.filter(
                        //       (value) => value !== data.id
                        //     );
                        //     if (session?.user?.role === "buyer") {
                        //       setCertificateTypes(newArray);
                        //     }
                        //   }
                        // }}
                        sx={{
                          background: `${
                            certificateTypes?.includes(data.id)
                              ? "#0362F0"
                              : "#F2F5F6"
                          }`,
                          color: `${
                            certificateTypes?.includes(data.id)
                              ? "#ffffff"
                              : "#32414C"
                          }`,
                          borderRadius: "8px",
                          py: 2,
                          px: 2,
                          height: 120,
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
                                color: `${
                                  certificateTypes?.includes(data.id)
                                    ? "#ffffff"
                                    : "#32414C"
                                }`,
                                fontSize: "14px",
                                lineHeight: "18px",
                                fontWeight: "400",
                              }}
                            >
                              {data?.name}
                            </Typography>
                          </Box>
                        </Grid>
                      </Box>
                    </Grid>
                  ))}
            </Grid>
            {/* {session?.user?.role === "buyer" && (
              <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="flex-start"
              >
                <Button
                  onClick={handleRequestSubmit}
                  sx={{
                    background: "#34BE84",
                    color: "#ffffff",
                    fontSize: "16px",
                    lineHeight: "22px",
                    textTransform: "none",
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
            )} */}
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
              severity={success ? "success" : "error"}
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
            onClick={handleCertificateNext}
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
    </Box>
  );
}

export default BrokerCertificateAndDocument;
