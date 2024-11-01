import {
  Avatar,
  Box,
  Button,
  Grid,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import React from "react";
import brokerImage from "../../../../public/Images/broker-pendant.png";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneEnabledOutlinedIcon from "@mui/icons-material/PhoneEnabledOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import Image from "next/image";
import { useDispatch } from "react-redux";
import {
  changeStatusBroker,
  deleteBroker,
} from "../../../redux/broker/actions";
import dayjs from "dayjs";
import { _baseURL, _imageURL } from "consts";
import pt from "locales/pt";
import en from "locales/en";
import BaseCloseButton from "@/component/reuseable/baseCloseButton/BaseCloseButton";
import { useBrokerDeleteMutation } from "@/queries/useBrokerDeleteMutation";
import { useBrokerStatusUpdateMutation } from "@/queries/useBrokerStatusUpdateMutation";
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

function TabpendantCard({
  brokerInfo,
  languageName,
  brokerCountRefetch,
  refetch,
  page,
}) {
  const t = languageName === "en" ? en : pt;
  const dispatch = useDispatch();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

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

  const mutation = useBrokerDeleteMutation(page);
  const statusMutation = useBrokerStatusUpdateMutation(page);

  const handleStatusBroker = (id) => {
    const body = {
      user_id: id,
      status: "active",
    };
    statusMutation.mutate(body, {
      onError(error) {
        console.log(error);
      },
      onSuccess: async (data) => {
        await refetch();
        await brokerCountRefetch();
      },
    });
    // dispatch(changeStatusBroker(data));
    // refetch();
    // brokerCountRefetch();
  };

  const handleFailBroker = async (id) => {
    const body = {
      broker_id: id,
    };
    mutation.mutate(body, {
      onError(error) {
        console.log(error);
      },
      onSuccess: async (data) => {
        await refetch();
        await brokerCountRefetch();
      },
    });
  };

  const myLoader = ({ src }) => {
    return `${_imageURL}/${src}`;
  };

  const list = (anchor) => (
    <Box
      sx={{ width: { xs: "auto", sm: "auto", md: 380 } }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
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
            fontSize: { xs: "16px", md: "24px" },
            lineHeight: "32px",
            fontWeight: "700",
          }}
        >
          {t["Brokers"]}
        </Typography>
        <BaseCloseButton handleClose={toggleDrawer(anchor, false)} />
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
      ></Box>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{ px: 1.5, py: 1 }}
      >
        <Box>
          {brokerInfo?.attachments[0]?.file_path ? (
            <Image
              loader={myLoader}
              src={`${brokerInfo?.attachments[0]?.file_path}`}
              alt="brokerImage"
              height={70}
              width={70}
            />
          ) : (
            <Avatar />
          )}
        </Box>
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{ px: 1.5, py: 1 }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "#002152",
            fontWeight: "400",
            fontSize: "16px",
            lineHeight: "22px",
            pl: 0.5,
          }}
        >
          {`Name: ${brokerInfo?.name}`}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "#002152",
            fontWeight: "400",
            fontSize: "16px",
            lineHeight: "22px",
            pl: 0.5,
            mt: 1,
          }}
        >
          {`Data de nascimento: ${dayjs(
            brokerInfo?.additional_info?.dob
          ).format("DD/MM/YYYY")}`}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "#002152",
            fontWeight: "400",
            fontSize: "16px",
            lineHeight: "22px",
            pl: 0.5,
            mt: 1,
          }}
        >
          {` RG: ${brokerInfo?.additional_info?.rg}`}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "#002152",
            fontWeight: "400",
            fontSize: "16px",
            lineHeight: "22px",
            pl: 0.5,
            mt: 1,
          }}
        >
          {`CPF: ${brokerInfo?.additional_info?.cpf}`}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "#002152",
            fontWeight: "400",
            fontSize: "16px",
            lineHeight: "22px",
            pl: 0.5,
            mt: 1,
          }}
        >
          {`CRECI: ${brokerInfo?.additional_info?.creci_number}`}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "#002152",
            fontWeight: "400",
            fontSize: "16px",
            lineHeight: "22px",
            pl: 0.5,
            mt: 1,
          }}
        >
          {`Email: ${brokerInfo?.email}`}
        </Typography>
        {brokerInfo?.phone && (
          <Typography
            variant="h6"
            sx={{
              color: "#002152",
              fontWeight: "400",
              fontSize: "16px",
              lineHeight: "22px",
              pl: 0.5,
              mt: 1,
            }}
          >
            {`Phone: ${brokerInfo?.phone}`}
          </Typography>
        )}
        <Typography
          variant="h6"
          sx={{
            color: "#002152",
            fontWeight: "700",
            fontSize: "16px",
            lineHeight: "22px",
            pl: 0.5,
            mt: 3,
          }}
        >
          {t["Address"]}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "#002152",
            fontWeight: "400",
            fontSize: "16px",
            lineHeight: "22px",
            pl: 0.5,
            mt: 1,
          }}
        >
          {brokerInfo?.address?.address}
        </Typography>
      </Grid>
      <Grid container spacing={1} sx={{ px: 1.5, mt: 2 }}>
        <Grid item xs={12} sm={12} md={12} lg={6}>
          <Button
            fullWidth
            onClick={() => handleFailBroker(brokerInfo?.id)}
            sx={{
              background: "#ffffff",
              color: "#F44336",
              fontWeight: "600",
              fontSize: "14px",
              lineHeight: "18px",
              textTransform: "none",
              mb: 2,
              "&:hover": {
                background: "#ffffff",
                color: "#F44336",
              },
            }}
          >
            Excluir
          </Button>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6}>
          <Button
            onClick={() => handleStatusBroker(brokerInfo?.id)}
            fullWidth
            sx={{
              background: "#34BE84",
              color: "#ffffff",
              fontWeight: "600",
              fontSize: "14px",
              lineHeight: "18px",
              textTransform: "none",

              "&:hover": {
                background: "#34BE84",
                color: "#ffffff",
              },
            }}
          >
            {t["Approve Registration"]}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <Box sx={{ background: "#ffffff", borderRadius: "8px" }}>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{ px: 1.5, py: 1 }}
      >
        <Box>
          {brokerInfo?.attachments[0]?.file_path ? (
            <Image
              loader={myLoader}
              src={`${brokerInfo?.attachments[0]?.file_path}`}
              alt="brokerImahe"
              height={70}
              width={70}
              style={{ borderRadius: "50px" }}
            />
          ) : (
            <Avatar />
          )}
        </Box>
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{ px: 1.5, py: 1 }}
      >
        <LightTooltip title={brokerInfo?.name}>
        <Typography
          variant="h6"
          sx={{
            color: "#002152",
            fontWeight: "700",
            fontSize: "16px",
            lineHeight: "22px",
            pl: 0.5,
          }}
        >
            {brokerInfo?.name?.length > 23
                ? `${brokerInfo?.name?.slice(0, 23)}..`
                : `${brokerInfo?.name}`}
        </Typography>
        </LightTooltip>
        <Button
          sx={{
            display: "flex",
            padding: 0,
            textTransform: "none",
            mt: 2,
            "&:hover": {
              background: "transparent",
            },
          }}
        >
          <AssignmentOutlinedIcon sx={{ color: "#6C7A84" }} />
          <Typography
            variant="h6"
            sx={{
              color: "#6C7A84",
              fontWeight: "400",
              fontSize: "16px",
              lineHeight: "22px",
            }}
          >
            {`CRECI ${brokerInfo?.additional_info?.creci_number}`}
          </Typography>
        </Button>
        <Button
          sx={{
            display: "flex",
            padding: 0,
            textTransform: "none",
            mt: 2,
            "&:hover": {
              background: "transparent",
            },
          }}
        >
          <EmailOutlinedIcon sx={{ color: "#6C7A84" }} />

          <LightTooltip title={brokerInfo?.email}>
            <Typography
              variant="h6"
              sx={{
                color: "#6C7A84",
                fontWeight: "400",
                fontSize: "16px",
                lineHeight: "22px",
              }}
            >
              {brokerInfo?.email?.length > 23
                ? `${brokerInfo?.email?.slice(0, 23)}..`
                : `${brokerInfo?.email}`}
            </Typography>
          </LightTooltip>
        </Button>
        <Button
          sx={{
            display: "flex",
            padding: 0,
            textTransform: "none",
            mt: 2,
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
              fontSize: "16px",
              lineHeight: "22px",
            }}
          >
            {brokerInfo?.phone
              ? brokerInfo?.phone
              : " -- -- -- -- -- -- -- -- --"}
          </Typography>
        </Button>
      </Grid>
      <Box sx={{ px: 1.5, mt: 2 }}>
        <Button
          onClick={() => handleStatusBroker(brokerInfo?.id)}
          fullWidth
          sx={{
            background: "#34BE84",
            color: "#ffffff",
            fontWeight: "600",
            fontSize: "14px",
            lineHeight: "18px",
            textTransform: "none",

            "&:hover": {
              background: "#34BE84",
              color: "#ffffff",
            },
          }}
        >
          {t["Approve Registration"]}
        </Button>
      </Box>
      <Box sx={{ px: 1.5, mt: 2 }}>
        <Button
          fullWidth
          onClick={toggleDrawer("right", true)}
          sx={{
            background: "#DBE1E5",
            color: "#002152",
            fontWeight: "600",
            fontSize: "14px",
            lineHeight: "18px",
            textTransform: "none",

            "&:hover": {
              background: "#DBE1E5",
              color: "#002152",
            },
          }}
        >
          {t["See all data"]}
        </Button>
        <SwipeableDrawer
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
          onOpen={toggleDrawer("right", true)}
        >
          {list("right")}
        </SwipeableDrawer>
      </Box>
      <Box sx={{ px: 1.5, mt: 2 }}>
        <Button
          fullWidth
          onClick={() => handleFailBroker(brokerInfo?.id)}
          sx={{
            background: "#ffffff",
            color: "#F44336",
            fontWeight: "600",
            fontSize: "14px",
            lineHeight: "18px",
            textTransform: "none",
            mb: 2,
            "&:hover": {
              background: "#ffffff",
              color: "#F44336",
            },
          }}
        >
          Excluir
        </Button>
      </Box>
    </Box>
  );
}

export default TabpendantCard;
