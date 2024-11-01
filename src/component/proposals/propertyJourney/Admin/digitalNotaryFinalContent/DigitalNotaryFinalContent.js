import {
  Box,
  Button,
  Grid,
  Typography,
  Tooltip,
  LinearProgress,
  Divider,
  Skeleton,
} from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import SaleCard from "../../../../reuseable/saleCard/SaleCard";
import notary from "../../../../../../public/Images/notary.png";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useDispatch, useSelector } from "react-redux";
import { getFinalSubmittedData } from "../../../../../redux/finalData/actions";
import {
  certificateDownloadApi,
  contractDownloadApi,
} from "../../../../../api";
import BaseModal from "../../../../reuseable/baseModal/BaseModal";
import ContractPdfModal from "../ContractPdfModal/ContractPdfModal";
import DigitalNotaryPdfModal from "../digitalNotaryPdfModal/DigitalNotaryPdfModal";
import { useRouter } from "next/router";
import en from "locales/en";
import pt from "locales/pt";

function DigitalNotaryFinalContent({ singlePropertyData, languageName }) {
  const t = languageName === "en" ? en : pt;
  const dispatch = useDispatch();
  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    dispatch(getFinalSubmittedData(query?.contractId));
  }, [dispatch, query]);
  const submittedData = useSelector(
    (state) => state?.finalSubmit?.finalSubmittedData
  );

  const Loading = useSelector((state) => state?.finalSubmit?.loading);
  const [certificateData, setCertificateData] = useState("");

  const [contractPdfOpen, setContractPdfOpen] = React.useState(false);
  const handlePdfOpen = () => setContractPdfOpen(true);
  const handlePdfClose = () => setContractPdfOpen(false);

  const [digitalNotaryPdfOpen, setDigitalNotaryPdfOpen] = React.useState(false);
  const handleNotaryPdfOpen = (data) => {
    setDigitalNotaryPdfOpen(true);
    setCertificateData(data);
  };
  const handleNotaryPdfClose = () => setDigitalNotaryPdfOpen(false);
  return (
    <Box sx={{ mt: 4, mb: 2 }}>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Image height={40} width={60} src={notary} alt="notary" />
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
          {t["Digital notary"]}
        </Typography>
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
            {/* <Box
              sx={{
                px: 2,
                border: "1px solid #DBE1E5",
                borderRadius: "8px",
              }}
            >
              <Grid container sx={{ py: 1 }}>
                <Grid item xs={6}>
                  <Typography
                    variant="p"
                    sx={{
                      color: "#6C7A84",
                      fontSize: "16px",
                      lineHeight: "22px",
                      fontWeight: "400",
                    }}
                  >
                    Protocol No.:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="p"
                    sx={{
                      color: "#002152",
                      fontSize: "16px",
                      lineHeight: "22px",
                      fontWeight: "600",
                    }}
                  >
                    {submittedData?.notaries?.protocol_no}
                  </Typography>
                </Grid>
              </Grid>
              <Divider />
              <Grid container sx={{ py: 1 }}>
                <Grid item xs={6}>
                  <Typography
                    variant="p"
                    sx={{
                      color: "#6C7A84",
                      fontSize: "16px",
                      lineHeight: "22px",
                      fontWeight: "400",
                    }}
                  >
                    Registry:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="p"
                    sx={{
                      color: "#002152",
                      fontSize: "16px",
                      lineHeight: "22px",
                      fontWeight: "600",
                    }}
                  >
                    {submittedData?.notaries?.registration_no}
                  </Typography>
                </Grid>
              </Grid>
              <Divider />
              <Grid container sx={{ py: 1 }}>
                <Grid item xs={6}>
                  <Typography
                    variant="p"
                    sx={{
                      color: "#6C7A84",
                      fontSize: "16px",
                      lineHeight: "22px",
                      fontWeight: "400",
                    }}
                  >
                    Contact:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="p"
                    sx={{
                      color: "#002152",
                      fontSize: "16px",
                      lineHeight: "22px",
                      fontWeight: "600",
                    }}
                  >
                    {submittedData?.notaries?.phone}
                  </Typography>
                </Grid>
              </Grid>
              <Divider />
              <Grid container sx={{ py: 1 }}>
                <Grid item xs={6}>
                  <Typography
                    variant="p"
                    sx={{
                      color: "#6C7A84",
                      fontSize: "16px",
                      lineHeight: "22px",
                      fontWeight: "400",
                    }}
                  >
                    Return Term:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="p"
                    sx={{
                      color: "#002152",
                      fontSize: "16px",
                      lineHeight: "22px",
                      fontWeight: "600",
                    }}
                  >
                    {submittedData?.notaries?.return_period}
                  </Typography>
                </Grid>
              </Grid>
              <Divider />
              <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="flex-end"
                sx={{ mt: 1 }}
              >
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: "#002152",
                    fontSize: "14px",
                    lineHeight: "18px",
                    fontWeight: "600",
                    color: "#002152",
                    textTransform: "none",
                    paddingX: 4,
                    paddingY: 0.6,
                    mb: 2,

                    mr: 3,
                    "&:hover": {
                      borderColor: "#002152",
                      fontSize: "14px",
                      lineHeight: "18px",
                      fontWeight: "600",
                      color: "#002152",
                      textTransform: "none",
                      paddingX: 4,
                      paddingY: 0.6,
                    },
                  }}
                >
                  Download
                </Button>
              </Grid>
            </Box> */}
            <Box
              sx={{
                border: "1px solid #DBE1E5",
                borderRadius: "8px",
                px: 2,
                py: 2,
                mt: 2,
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
                    <Typography
                      varianat="p"
                      sx={{
                        color: "#0362F0",
                        fontSize: "14px",
                        lineHeight: "18px",
                        fontWeight: "400",
                      }}
                    >
                      {t["Contract"]}
                    </Typography>
                  </Button>
                </Box>
                <Box>
                  <Typography
                    variant="p"
                    sx={{
                      color: "#1A1859",
                      fontSize: "18px",
                      lineHeight: "28px",
                      fontWeight: "400",
                    }}
                  >
                    {submittedData?.contract_title}
                  </Typography>
                </Box>
              </Grid>
              <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="flex-end"
                sx={{ mt: 1 }}
                gap={1}
              >
                <Button
                  onClick={() =>
                    contractDownloadApi(singlePropertyData?.contract?.id)
                  }
                  variant="outlined"
                  sx={{
                    borderColor: "#002152",
                    fontSize: "14px",
                    lineHeight: "18px",
                    fontWeight: "600",
                    color: "#002152",
                    textTransform: "none",

                    "&:hover": {
                      borderColor: "#002152",
                      fontSize: "14px",
                      lineHeight: "18px",
                      fontWeight: "600",
                      color: "#002152",
                      textTransform: "none",
                    },
                  }}
                >
                    Baixar
                </Button>
                <Button
                  onClick={handlePdfOpen}
                  sx={{
                    background: "#0362F0",
                    color: "#ffffff",
                    fontWeight: "600",
                    fontSize: "14px",
                    lineHeight: "18px",
                    textTransform: "none",
                    "&:hover": {
                      background: "#0362F0",
                      color: "#ffffff",
                      fontWeight: "600",
                      fontSize: "14px",
                      lineHeight: "18px",
                    },
                  }}
                >
                  {t["Details"]}
                </Button>
              </Grid>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography
                variant="p"
                sx={{
                  color: "#1A1859",
                  fontSize: "16px",
                  fontWeight: 400,
                  lineHeight: "22px",
                }}
              >
                {t["Documents sent"]}
              </Typography>
            </Box>

            <Grid container spacing={2}>
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
                : submittedData?.sent_document?.documents?.map(
                    (data, index) => (
                      <Grid key={index} item xs={12} sm={12} md={12} lg={6}>
                        <Box
                          sx={{
                            border: "1px solid #34BE84",
                            borderRadius: "8px",
                            px: 2,
                            pt: 2,
                            mt: 1,
                            pb: 1,
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
                                <CheckCircleOutlineIcon
                                  sx={{ color: "#114B32" }}
                                />
                                <Typography
                                  varianat="p"
                                  sx={{
                                    color: "#114B32",
                                    fontSize: "14px",
                                    lineHeight: "18px",
                                    fontWeight: "400",
                                  }}
                                >
                                  {t["Document sent"]}
                                </Typography>
                              </Button>
                            </Box>
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
                                {data?.title?.slice(0, 30)}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid container spacing={2} sx={{ mt: 1 }}>
                            <Grid item xs={6}>
                              <Button
                                fullWidth
                                onClick={() =>
                                  certificateDownloadApi(
                                    singlePropertyData?.contract?.id,
                                    data?.certificate_type_id
                                  )
                                }
                                variant="outlined"
                                sx={{
                                  borderColor: "#002152",
                                  fontSize: "14px",
                                  lineHeight: "18px",
                                  fontWeight: "600",
                                  color: "#002152",
                                  textTransform: "none",

                                  "&:hover": {
                                    borderColor: "#002152",
                                    fontSize: "14px",
                                    lineHeight: "18px",
                                    fontWeight: "600",
                                    color: "#002152",
                                    textTransform: "none",
                                  },
                                }}
                              >
                                  Baixar
                              </Button>
                            </Grid>
                            <Grid item xs={6}>
                              <Button
                                onClick={() => handleNotaryPdfOpen(data)}
                                fullWidth
                                sx={{
                                  background: "#0362F0",
                                  color: "#ffffff",
                                  fontWeight: "600",
                                  fontSize: "14px",
                                  lineHeight: "18px",
                                  textTransform: "none",
                                  "&:hover": {
                                    background: "#0362F0",
                                    color: "#ffffff",
                                    fontWeight: "600",
                                    fontSize: "14px",
                                    lineHeight: "18px",
                                  },
                                }}
                              >
                                {t["Details"]}
                              </Button>
                            </Grid>
                          </Grid>
                        </Box>
                      </Grid>
                    )
                  )}
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <BaseModal isShowing={contractPdfOpen} isClose={handlePdfClose}>
        <Tooltip title="Something">
          <>
            <ContractPdfModal
              handleClose={handlePdfClose}
              handlePdfOpen={handlePdfOpen}
              singlePropertyData={singlePropertyData}
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

export default DigitalNotaryFinalContent;
