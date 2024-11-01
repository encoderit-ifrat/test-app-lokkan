import React from "react";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  ListItemAvatar,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import cardMedia from "../../../../public/Images/pendant.png";
import rentImage from "../../../../public/Images/rentImage.png";
import avatar from "../../../../public/Images/AvatarPendant.png";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import BaseModal from "../../reuseable/baseModal/BaseModal";
import SeeProposalModal from "../seeProposalModal/SeeProposalModal";
import { _baseURL, _imageURL } from "../../../../consts";
import dayjs from "dayjs";
import { propertyAcceptData } from "../../../redux/proposalAccept/actions";
import { findPropertyData } from "../../../redux/property/actions";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { proposalRefuseData } from "../../../redux/proposalRefuse/actions";
import en from "locales/en";
import pt from "locales/pt";
import { useSession } from "next-auth/react";
import BaseCloseButton from "@/component/reuseable/baseCloseButton/BaseCloseButton";
import { formatBrazilianCurrency } from "@/utils/useUtilities";
import { useProposalRefuseMutation } from "@/queries/useProposlaRefuseMutation";
import { useProposalAcceptMutation } from "@/queries/useProposalAcceptMutation";
import toast from "react-hot-toast";

const omitEmpties = (obj) => {
  return Object.entries(obj).reduce((carry, [key, value]) => {
    if (![null, undefined, "", []].includes(value)) {
      carry[key] = value;
    }
    return carry;
  }, {});
};

function PendantsCard({ propertyData, languageName, refetch, loadingRefetch }) {
  const t = languageName === "en" ? en : pt;
  const dispatch = useDispatch();
  const { data: session } = useSession();

  //add_see_proposal_modal
  const [seeProposalOpen, setSeeProposalOpen] = useState(false);
  const [selectProposal, setSelectProposal] = useState("");
  const handleSeeProposalOpen = (data) => {
    setSelectProposal(data);
    setSeeProposalOpen(true);
  };
  const handleSeeProposalClose = () => setSeeProposalOpen(false);
  // const [acceptid, setAcceptId] = useState("");
  // const [refuseId, setRefuseId] = useState("");
  // const { query } = useRouter();

  const refuseMutation = useProposalRefuseMutation();
  const acceptMutation = useProposalAcceptMutation();

  const handleProposalRefuse = (id) => {
    const body = {
      id: id,
    };
    refuseMutation.mutate(body, {
      onError(error) {
        console.log(error);
      },
      onSuccess: async (data) => {
        await loadingRefetch();
        await refetch();
      },
    });
  };

  const handleProposalAccept = async (id) => {
    // setAcceptId(id);
    const body = {
      property_id: propertyData?.id,
      proposal_id: id,
    };
    acceptMutation.mutate(body, {
      onError(error) {
        if (error?.response?.status === 422) {
          toast.error(error?.response?.data?.message);
        } else {
          toast.error("Algo deu errado");
        }
      },
      onSuccess: async (data) => {
        await loadingRefetch();
        await refetch();
      },
    });
    // dispatch(
    //   propertyAcceptData({ property_id: propertyData?.id, proposal_id: id })
    // );
    // setTimeout(() => {
    //   loadingRefetch();
    //   refetch();
    // }, 1000);
  };

  // const acceptLoading = useSelector((state) => state?.propertyAccept?.loading);
  // const refuseLoading = useSelector((state) => state?.proposalRefuse?.loading);

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const myLoader = ({ src }) => {
    return `${_imageURL}/${src}`;
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => {
    return (
      <Box
        sx={{
          width: anchor === "top" || anchor === "bottom" ? "auto" : 380,
        }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mt: 2, px: 2 }}
        >
          <Typography
            variant="p"
            sx={{
              color: "#1A1859",
              fontSize: "24px",
              lineHeight: "32px",
              fontWeight: "700",
            }}
          >
            {t["Proposals"]}
          </Typography>
          <BaseCloseButton />
        </Grid>
        <Box
          sx={{
            background: "#ffffff",
            boxShadow: "0px 4px 8px rgba(0, 33, 82, 0.08)",
            border: "1px solid #DBE1E5",
            borderRadius: { xs: 0, sm: 0, md: 0, lg: "8px", xl: "8px" },
            mt: 2,
            mx: 2,
          }}
        >
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={4}
              xl={4}
              // className="rentImageCard"
            >
              <Box>
                <Image
                  alt="rent"
                  loader={myLoader}
                  src={`${propertyData?.attachments[0]?.file_path}`}
                  height={110}
                  width={100}
                  style={{ borderRadius: "8px 0 0 8px" }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
              <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                sx={{ p: { xs: 2, sm: 2, md: 2, lg: 0 }, mt: 0.5 }}
              >
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                >
                  <Box>
                    <Button
                      sx={{
                        textTransform: "none",
                        background: "rgba(116, 80, 240, 0.2)",
                        borderRadius: "2px",
                        padding: "2px 8px",
                        color: "#7450F0",
                        fontSize: "12px",
                        lineHeight: "18px",
                        fontWeight: "400",
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
                        fontSize: "12px",
                        lineHeight: "18px",
                        fontWeight: "400",
                        ml: "3px",
                      }}
                    >
                      {t["pending proposal"]}
                    </Button>
                  </Box>
                </Grid>
                <Typography
                  variant="p"
                  sx={{
                    color: "#002152",
                    fontSize: "16px",
                    lineHeight: "28px",
                    fontWeight: "500",
                  }}
                >
                  {formatBrazilianCurrency(propertyData?.brl_rent)}
                </Typography>
                <Typography
                  variant="p"
                  sx={{
                    color: " #9FAAB1",
                    fontSize: "12px",
                    lineHeight: "20px",
                    fontWeight: "300",

                    mr: 0.5,
                  }}
                >
                  {propertyData?.address?.address}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ mt: 1 }}>
          <Typography
            variant="p"
            sx={{
              color: "#9FAAB1",
              fontSize: "14px",
              fontWeight: "400",
              lineHeight: "18px",

              px: 2,
            }}
          >
            {t["Proposals"]} ({`${propertyData.proposals.length}`})
          </Typography>
        </Box>
        {propertyData?.proposals?.map((data, index) => (
          <Box key={index}>
            <Grid container spacing={1}>
              <Grid item xs={7}>
                <List
                // sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
                >
                  <ListItem>
                    {data?.user?.attachments?.[0]?.file_path ? (
                      <ListItemAvatar>
                        <Avatar>
                          <Image
                            loader={myLoader}
                            src={data?.user?.attachments[0]?.file_path}
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
                      primary={`${data?.user?.name}`}
                      secondary={`${dayjs(data?.created_at).format(
                        "DD/MM/YYYY"
                      )}, ${dayjs(data?.created_at, "YYYY-MM-DD+h:mm").format(
                        "HH:mm:00"
                      )}`}
                    />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={5}>
                <List
                // sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
                >
                  <ListItem>
                    <ListItemText
                      primary={formatBrazilianCurrency(data?.total_amount)}
                      secondary={`${data?.payment_type}`}
                    />
                  </ListItem>
                  {data?.vehicle && (
                    <ListItem>
                      <ListItemText
                        primary={
                          data?.vehicle?.price
                            ? formatBrazilianCurrency(
                                (+data?.vehicle?.price)?.toFixed(2)
                              )
                            : "pendant"
                        }
                        secondary={`valor do veículo`}
                      />
                    </ListItem>
                  )}
                </List>
              </Grid>
            </Grid>
            {(data?.proposal_type === "general" &&
              session?.user?.role === "owner") ||
            (data?.proposal_type === "counter" &&
              session?.user?.role === "buyer" &&
              parseInt(session?.user?.userId) !== data?.user?.id) ||
            (data?.proposal_type === "counter" &&
              session?.user?.role === "owner" &&
              parseInt(session?.user?.userId) !== data?.user?.id) ||
            session?.user?.role === "admin" ? (
              <Grid container spacing={2} sx={{ px: 1 }}>
                <Grid item xs={12} sm={12} md={12} lg={3}>
                  <Button
                    onClick={() => handleProposalRefuse(data.id)}
                    fullWidth
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
                    {t["refuse"]}
                  </Button>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={6}>
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
                    onClick={() => handleSeeProposalOpen(data)}
                  >
                    {t["See proposal"]}
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
                    onClick={() => handleProposalAccept(data.id)}
                  >
                    {t["To accept"]}
                  </Button>
                </Grid>
              </Grid>
            ) : (
              ""
            )}
            <Divider sx={{ px: 2, mt: 1 }} />
          </Box>
        ))}
        <BaseModal isShowing={seeProposalOpen} isClose={handleSeeProposalClose}>
          <Tooltip title="Something">
            <>
              <SeeProposalModal
                handleSeeProposalClose={handleSeeProposalClose}
                propertyData={propertyData}
                proposalData={selectProposal}
                languageName={languageName}
                handleProposalAccept={handleProposalAccept}
                handleProposalRefuse={handleProposalRefuse}
              />
            </>
          </Tooltip>
        </BaseModal>
      </Box>
    );
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
          width={500}
          height={200}
          alt="pendant"
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
            {t["pending proposal"]}
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
        <Typography
          variant="p"
          sx={{
            color: "#9FAAB1",
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "18px",
            mt: 1,
          }}
        >
          {`${propertyData?.proposals.length} ${t["Proposals"]}:`}
        </Typography>
      </Grid>
      <Box
        sx={{
          mb: 2,
          display: "flex",
          flexDirection: "column",
          height: 200,
          overflow: "hidden",
          overflowY: "scroll",
          // justifyContent="flex-end" # DO NOT USE THIS WITH 'scroll'
        }}
      >
        {propertyData?.proposals?.map((data, index) => (
          <Box key={index}>
            <Grid container spacing={1}>
              <Grid item xs={7}>
                <List>
                  <ListItem sx={{ margin: 0, paddingY: "1px" }}>
                    {data?.user?.attachments?.[0]?.file_path ? (
                      <ListItemAvatar>
                        <Avatar>
                          <Image
                            loader={myLoader}
                            src={data?.user?.attachments[0]?.file_path}
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
                      sx={{ ml: "3px" }}
                      primary={
                        <Typography
                          variant="p"
                          sx={{
                            fontSize: "14px",
                            fontWeight: 400,
                            color: "#1A1859",
                            lineHeight: "18px",
                          }}
                        >
                          {data?.user?.name}
                        </Typography>
                      }
                      secondary={
                        <Typography
                          variant="h5"
                          sx={{
                            fontSize: "12px",
                            fontWeight: 400,
                            color: "#9FAAB1",
                            lineHeight: "18px",
                          }}
                        >
                          {`${dayjs(data?.created_at).format(
                            "DD/MM/YYYY"
                          )}, ${dayjs(
                            data?.created_at,
                            "YYYY-MM-DD+h:mm"
                          ).format("HH:mm:00")}`}
                        </Typography>
                      }
                    />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={5}>
                <List
                // sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
                >
                  <ListItem>
                    <ListItemText
                      primary={
                        <Typography
                          variant="p"
                          sx={{
                            fontSize: "12px",
                            fontWeight: 400,
                            color: "#1A1859",
                            lineHeight: "18px",
                            width: "100%",
                          }}
                        >
                          {formatBrazilianCurrency(data?.total_amount)}
                        </Typography>
                      }
                    />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
            <Divider sx={{ px: 2, mt: 1 }} />
          </Box>
        ))}
      </Box>
      <Grid container spacing={1} sx={{ px: 2, mt: 1 }}>
        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
          <Link
            href={{
              pathname: "/my-properties/include-proposal",
              query: omitEmpties({
                property_id: propertyData?.id,
              }),
            }}
          >
            <Button
              fullWidth
              disabled={
                session?.user?.role === "broker"
                  ? true
                  : session?.user?.role === "construction_company"
                  ? true
                  : session?.user?.role === "owner"
                  ? true
                  : false
              }
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
            >
              {t["Include Proposal"]}
            </Button>
          </Link>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
          <Button
            fullWidth
            onClick={toggleDrawer("right", true)}
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
          >
            {t["See proposal"]}
          </Button>
          <SwipeableDrawer
            anchor={"right"}
            open={state["right"]}
            onClose={toggleDrawer("right", false)}
            onOpen={toggleDrawer("right", true)}
          >
            {list("right")}
          </SwipeableDrawer>
        </Grid>
      </Grid>
    </Box>
  );
}

export default PendantsCard;
