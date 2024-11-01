import React from "react";
import dynamic from "next/dynamic";
import {
  Avatar,
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/material";
const BasicBreadcrumbs = dynamic(() =>
  import("@/component/reuseable/baseBreadCrumb/BaseBreadCrumb")
);

import { Fragment, useEffect, useMemo, useState } from "react";
import proposeImage from "../../../public/Images/proposal_modal.png";
import en from "locales/en";
import pt from "locales/pt";
import { _imageURL } from "consts";
import { reverseBrCurrencyFormat } from "@/utils/reverseBrCurrencyFormat";
import { useRouter } from "next/router";
import Image from "next/image";
import { useGetProposalQuery } from "@/queries/useGetProposalQuery";
import { findSinglePropertyData } from "@/redux/singleProperty/actions";
import { useDispatch, useSelector } from "react-redux";
import { formatBrazilianCurrency } from "@/utils/useUtilities";
import PropertyCard from "@/component/properties/PropertyCard/PropertyCard";
import dayjs from "dayjs";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { useProposalRefuseMutation } from "@/queries/useProposlaRefuseMutation";
import { useProposalAcceptMutation } from "@/queries/useProposalAcceptMutation";
import BaseModal from "../reuseable/baseModal/BaseModal";
import CounterProposalModal from "../proposals/counterProposalModal/counterProposalModal";
import BaseButton from "../reuseable/button/BaseButton";

const drawerWidth = 240;

function ProposalDetails({ language }) {
  const router = useRouter();
  const { query } = router;
  const { params } = query;
  const [id] = params || [];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(findSinglePropertyData(id));
  }, [dispatch, id]);

  const propertyData = useSelector(
    (state) => state?.singleProperty?.singlePropertyData
  );

  const {
    data: proposalData,
    isLoading,
    isFetching,
    isFetched,
  } = useGetProposalQuery(query?.proposal_id);
  const proposal = proposalData?.data?.proposal;

  const seoImage = useMemo(() => {
    return propertyData?.attachments?.find(
      (data) => data?.title === "cover_photo"
    );
  }, [propertyData]);

  const BreadCrumbsData = [{ stage: "Proposta", route: "proposals" }];

  const [myValue, setMyValue] = useState(language || "pt");
  const t = myValue === "en" ? en : pt;

  const goBack = () => {
    router.replace("/proposals");
  };

  const myLoader = ({ src }) => {
    return `${_imageURL}/${src}`;
  };
  const myVehicleLoader = ({ src }) => {
    return `${src}`;
  };

  const [counterProposalOpen, setCounterProposalOpen] = useState(false);
  const handleCounterProposalOpen = () => setCounterProposalOpen(true);
  const handleCounterProposalClose = () => setCounterProposalOpen(false);

  const [acceptLoading, setAcceptLoading] = useState(false);
  const [refuseLoading, setRefuseLoading] = useState(false);

  const refuseMutation = useProposalRefuseMutation();
  const acceptMutation = useProposalAcceptMutation();

  const handleProposalRefuse = () => {
    setRefuseLoading(true);
    const body = {
      id: query?.proposal_id,
    };
    refuseMutation.mutate(body, {
      onError(error) {
        setRefuseLoading(false);
      },
      onSuccess: async (data) => {
        setRefuseLoading(false);
        router.replace("/proposals");
      },
    });
  };

  const handleProposalAccept = async () => {
    setAcceptLoading(true);
    // setAcceptId(id);
    const body = {
      property_id: id,
      proposal_id: query?.proposal_id,
    };
    acceptMutation.mutate(body, {
      onError(error) {
        setAcceptLoading(false);
        if (error?.response?.status === 422) {
          toast.error(error?.response?.data?.message);
        } else {
          toast.error("Algo deu errado");
        }
      },
      onSuccess: async (data) => {
        setAcceptLoading(false);
        router.replace({
          pathname: "/proposals",
          query: {
            proposal_status: "accepted",
            status: "approved",
            page: 1,
            per_page: 9,
          },
        });
      },
    });
  };

  if ((isFetched && isFetching) || isLoading) {
    return (
      <Container maxWidth="md" sx={{ px: 2, py: 0 }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ height: "100vh" }}
        >
          <CircularProgress size="8rem" />
        </Grid>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        flexGrow: 1,

        width: { sm: `calc(100% - ${drawerWidth}px)` },
        paddingX: { xs: 0, sm: 0, md: 6, lg: 6, xl: 6 },
        paddingY: { xs: 0, sm: 0, md: 3, lg: 3, xl: 3 },
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          sx={{ mt: { xs: 8, sm: 8, md: 8, lg: 0 } }}
        >
          <BasicBreadcrumbs
            BreadcrumbsData={BreadCrumbsData}
            lastStageData={"Detalhes da proposta"}
          />
        </Grid>
        <Box sx={{ mt: 2 }}>
          <Button sx={{ display: "flex" }}>
            <Image src={proposeImage} alt="proposeImage" />
            <Typography
              variant="p"
              sx={{
                fontSize: "24px",
                fontWeight: 700,
                color: "#002152",

                textTransform: "none",
              }}
            >
              Detalhes da proposta
            </Typography>
          </Button>
        </Box>
        <Box sx={{ mt: 4 }}>
          <PropertyCard srcImage={[seoImage]} amount={propertyData?.brl_rent} />
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6} lg={4}>
            <List
            // sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              <ListItem>
                {proposal?.user?.attachments?.[0]?.file_path ? (
                  <ListItemAvatar>
                    <Avatar>
                      <Image
                        loader={myLoader}
                        src={proposal?.user?.attachments[0]?.file_path}
                        alt="avatar"
                        width={50}
                        height={50}
                      />
                    </Avatar>
                  </ListItemAvatar>
                ) : (
                  <ListItemAvatar>
                    <Avatar></Avatar>
                  </ListItemAvatar>
                )}
                <ListItemText
                  primary={`${proposal?.user?.name}`}
                  secondary={`${dayjs(proposal?.created_at).format(
                    "DD/MM/YYYY"
                  )}, ${dayjs(proposal?.created_at, "YYYY-MM-DD+h:mm").format(
                    "HH:mm:00"
                  )}`}
                  sx={{
                    "& .MuiListItemText-primary": {
                      color: "#6C7A84",
                      fontWeight: 400,
                      lineHeight: "22px",
                      fontSize: "16px",
                    }, // Change primary text color
                    "& .MuiListItemText-secondary": {
                      color: "#1A1859",
                      fontWeight: 600,
                      lineHeight: "28px",
                      fontSize: "18px",
                    }, // Change secondary text color
                  }}
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4}>
            <List>
              <ListItem>
                <ListItemText
                  primary={"Valor da proposta"}
                  secondary={`${formatBrazilianCurrency(
                    proposal?.total_amount
                  )}`}
                  sx={{
                    "& .MuiListItemText-primary": {
                      color: "#6C7A84",
                      fontWeight: 400,
                      lineHeight: "22px",
                      fontSize: "16px",
                    }, // Change primary text color
                    "& .MuiListItemText-secondary": {
                      color: "#1A1859",
                      fontWeight: 600,
                      lineHeight: "28px",
                      fontSize: "18px",
                    }, // Change secondary text color
                  }}
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4}>
            <List>
              <ListItem>
                <ListItemText
                  primary={"Tipo de pagamento"}
                  secondary={`${t[proposal?.payment_type]}`}
                  sx={{
                    "& .MuiListItemText-primary": {
                      color: "#6C7A84",
                      fontWeight: 400,
                      lineHeight: "22px",
                      fontSize: "16px",
                    }, // Change primary text color
                    "& .MuiListItemText-secondary": {
                      color: "#1A1859",
                      fontWeight: 600,
                      lineHeight: "28px",
                      fontSize: "18px",
                    }, // Change secondary text color
                  }}
                />
              </ListItem>
            </List>
          </Grid>
          {proposal?.observation && (
            <Grid item xs={12} sm={12} md={6} lg={4}>
              <List>
                <ListItem>
                  <ListItemText
                    primary={"Observação"}
                    secondary={`${proposal?.observation}`}
                    sx={{
                      "& .MuiListItemText-primary": {
                        color: "#6C7A84",
                        fontWeight: 400,
                        lineHeight: "22px",
                        fontSize: "16px",
                      }, // Change primary text color
                      "& .MuiListItemText-secondary": {
                        color: "#1A1859",
                        fontWeight: 600,
                        lineHeight: "28px",
                        fontSize: "18px",
                      }, // Change secondary text color
                    }}
                  />
                </ListItem>
              </List>
            </Grid>
          )}
        </Grid>
        {proposal?.vehicle && (
          <Fragment>
            <Divider />
            <Box
              display="flex"
              alignItems="center"
              gap={1}
              sx={{ mt: 2, px: 2 }}
            >
              {" "}
              {/* Flex container with gap between items */}
              <DirectionsCarIcon sx={{ color: "#1A1859" }} />
              <Typography
                variant="body1"
                sx={{
                  color: "#1A1859",
                  fontWeight: 600,
                  lineHeight: "28px",
                  fontSize: "18px",
                }}
              >
                Veículo como forma de pagamento
              </Typography>
            </Box>
            <Box sx={{ mt: 2, px: 2 }}>
              <Typography
                variant="body1"
                sx={{
                  color: "#6C7A84",
                  fontWeight: 400,
                  lineHeight: "22px",
                  fontSize: "16px",
                }}
              >
                Valor do veículo
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#1A1859",
                  fontWeight: 600,
                  lineHeight: "28px",
                  fontSize: "18px",
                }}
              >
                {proposal?.vehicle?.price
                  ? formatBrazilianCurrency(
                      (+proposal?.vehicle?.price).toFixed(2)
                    )
                  : t["pendant"]}
              </Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <List>
                  <ListItem>
                    <ListItemText
                      primary={"Marca"}
                      secondary={`${proposal?.vehicle?.brand}`}
                      sx={{
                        "& .MuiListItemText-primary": {
                          color: "#6C7A84",
                          fontWeight: 400,
                          lineHeight: "22px",
                          fontSize: "16px",
                        }, // Change primary text color
                        "& .MuiListItemText-secondary": {
                          color: "#1A1859",
                          fontWeight: 600,
                          lineHeight: "28px",
                          fontSize: "18px",
                        }, // Change secondary text color
                      }}
                    />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={4}>
                <List>
                  <ListItem>
                    <ListItemText
                      primary={"Modelo"}
                      secondary={`${proposal?.vehicle?.model}`}
                      sx={{
                        "& .MuiListItemText-primary": {
                          color: "#6C7A84",
                          fontWeight: 400,
                          lineHeight: "22px",
                          fontSize: "16px",
                        }, // Change primary text color
                        "& .MuiListItemText-secondary": {
                          color: "#1A1859",
                          fontWeight: 600,
                          lineHeight: "28px",
                          fontSize: "18px",
                        }, // Change secondary text color
                      }}
                    />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={4}>
                <List>
                  <ListItem>
                    <ListItemText
                      primary={"Ano"}
                      secondary={`${proposal?.vehicle?.year}`}
                      sx={{
                        "& .MuiListItemText-primary": {
                          color: "#6C7A84",
                          fontWeight: 400,
                          lineHeight: "22px",
                          fontSize: "16px",
                        }, // Change primary text color
                        "& .MuiListItemText-secondary": {
                          color: "#1A1859",
                          fontWeight: 600,
                          lineHeight: "28px",
                          fontSize: "18px",
                        }, // Change secondary text color
                      }}
                    />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
            <Box
              display="flex"
              alignItems="center"
              gap={1}
              sx={{ mt: 1, px: 2 }}
            >
              {" "}
              {/* Flex container with gap between items */}
              <Typography
                variant="body1"
                sx={{
                  color: "#1A1859",
                  fontWeight: 600,
                  lineHeight: "28px",
                  fontSize: "18px",
                }}
              >
                Imagens de veículos:
              </Typography>
            </Box>
            <Grid container spacing={2} sx={{ mt: 2, px: 2 }}>
              {proposal?.vehicle?.media?.map((data, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  {" "}
                  {/* Adjust for responsiveness */}
                  <Image
                    loader={myVehicleLoader}
                    src={`${data?.media_url}`} // Replace with your actual image path
                    alt="Image 1"
                    width={300}
                    height={300}
                    style={{ borderRadius: "8px", objectFit: "cover" }}
                  />
                </Grid>
              ))}
            </Grid>
          </Fragment>
        )}
        <Grid container spacing={2} sx={{ px: 1, mt: 3, mb: 2 }}>
          <Grid item xs={12} sm={12} md={12} lg={3}>
            <Button
              color="inherit"
              fullWidth
              size="small"
              variant="outlined"
              onClick={goBack}
              sx={{
                width: "100%",
                textTransform: "none",
              }}
            >
              {t["come back"]}
            </Button>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={3}>
            <Button
              fullWidth
              onClick={() => handleProposalRefuse(proposalData?.id)}
              sx={{
                color: " #002152",
                fontSize: "14px",

                lineHeight: "18px",
                fontWeight: "600",
                background: "#DBE1E5",
                borderRadius: "4px",

                textTransform: "none",

                "&:hover": {
                  color: " #002152",
                  fontSize: "14px",

                  lineHeight: "18px",
                  fontWeight: "600",
                  background: "#DBE1E5",
                  borderRadius: "4px",

                  textTransform: "none",
                },
              }}
            >
              {refuseLoading ? (
                <CircularProgress size={22} color="inherit" />
              ) : (
                t["refuse"]
              )}
            </Button>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={3}>
            <Button
              fullWidth
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
              onClick={handleCounterProposalOpen}
            >
              {t["Counter proposal"]}
            </Button>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={3}>
            <Button
              fullWidth
              sx={{
                color: "#FFFFFF",
                fontSize: "14px",

                lineHeight: "18px",
                fontWeight: "600",
                background: " #34BE84",
                borderRadius: "4px",

                textTransform: "none",

                "&:hover": {
                  color: "#FFFFFF",
                  fontSize: "14px",

                  lineHeight: "18px",
                  fontWeight: "600",
                  background: " #34BE84",
                  borderRadius: "4px",

                  textTransform: "none",
                },
              }}
              onClick={handleProposalAccept}
            >
              {acceptLoading ? (
                <CircularProgress size={22} color="inherit" />
              ) : (
                t["To accept"]
              )}
            </Button>
          </Grid>
        </Grid>
      </Container>
      <BaseModal
        isShowing={counterProposalOpen}
        isClose={handleCounterProposalClose}
      >
        <Tooltip title="Something">
          <>
            <CounterProposalModal
              handleCounterProposalClose={handleCounterProposalClose}
              proposalData={proposal}
              propertyData={propertyData}
              languageName={language}
            />
          </>
        </Tooltip>
      </BaseModal>
    </Box>
  );
}

export default ProposalDetails;
