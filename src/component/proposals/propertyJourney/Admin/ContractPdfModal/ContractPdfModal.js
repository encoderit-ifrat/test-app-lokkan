import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Switch,
  TextField,
  TextareaAutosize,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logoIcon from "../../../../../../public/Images/logo.png";
import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import pdfImage from "../../../../../../public/Images/pdfImage.png";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import dynamic from "next/dynamic";
import BaseTextField from "../../../../reuseable/baseTextField/BaseTextField";
import { useDispatch, useSelector } from "react-redux";
import {
  findContractDetailsData,
  signatureAddData,
  signatureUpdateData,
} from "../../../../../redux/contractDetails/actions";
import { contractDownloadApi, contractSignApi } from "../../../../../api";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useSession } from "next-auth/react";
import en from "locales/en";
import pt from "locales/pt";
import BaseCloseButton from "@/component/reuseable/baseCloseButton/BaseCloseButton";
const PDFViewer = dynamic(
  () => import("../../../../reuseable/PDFComponent/pdf-viewer"),
  {
    ssr: false,
  }
);
const drawerWidth = 300;

const validationSchema = Yup.object().shape({
  name: Yup.string().required("nome é obrigatório"),
  details: Yup.string().required("e-mail é obrigatório"),
});

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,

    padding: theme.spacing(3),

    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),

      marginRight: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  // top:{xs:"80%"},
  transform: "translate(-50%, -50%)",
  width: { xs: "95%", sm: "95%", md: "95%", lg: "90%", xl: "75%" },
  bgcolor: "#ffffff",
  // border: "2px solid #000",
  boxShadow: "none",
  borderRadius: "4px",
  maxHeight: "90vh",
  // overflowY: "scroll",
  //   px: 0,
  //   py: 1,
};

function ContractPdfModal({
  handleClose,
  handlePdfOpen,
  handleNext,
  singlePropertyData,
  languageName,
}) {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const t = languageName === "en" ? en : pt;
  useEffect(() => {
    dispatch(findContractDetailsData(+singlePropertyData?.contract?.id));
  }, [dispatch, singlePropertyData]);

  const contractDetailsInfo = useSelector(
    (state) => state?.contractDetails?.ContactDetailsData
  );

  console.log({ contractDetailsInfo });

  const {
    register,
    watch,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const signIds = contractDetailsInfo?.signatures || [];

  console.log({ signIds });

  const onSubmit = async (data) => {
    setLoading(true);
    dispatch(
      signatureAddData(
        {
          ...data,
          contract_id: +singlePropertyData?.contract?.id,
        },
        signIds
      )
    );
    setLoading(false);
  };

  const [switchLoading, setSwitchLoading] = useState(false);

  console.log({switchLoading})

  const handleSwitchChange = async (data) => {
    setSwitchLoading(true);
    const status = data?.is_signed ? 0 : 1;
    const bodyData = { contract_sign_id: data?.id, status: status };
    dispatch(signatureUpdateData(bodyData,setSwitchLoading));
    // const status = data?.is_signed === 0 ? 1 : 0;
    // const bodyData = { contract_sign_id: data?.id, status: status };
    // const [error, resp] = await contractSignApi(bodyData);
    // setSwitchLoading(false);
    // if (!error) {
    //   dispatch(findContractDetailsData(+singlePropertyData?.contract?.id));
    // }
  };

  return (
    <Box sx={style}>
      {/* <Box sx={{ background: "#ffffff", border: "1px solid #DBE1E5" }}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mt: 2, px: 2 }}
        >
          <Box>
            <Image src={logoIcon} height={25} width={110} alt="logo" />
          </Box>
          <Box>
            <Button
              variant="outlined"
              sx={{
                borderColor: "#002152",
                fontSize: "16px",
                fontWeight: "600",
                color: "#002152",
                textTransform: "none",
                paddingX: 4,
                paddingY: 0.6,
                mr: 3,
                "&:hover": {
                  borderColor: "#002152",
                  fontSize: "16px",
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
            <CloseIcon onClick={handleClose} />
          </Box>
        </Grid>
        <div>
          <PDFViewer />
        </div>
      </Box> */}
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            backgroundColor: "#ffffff",
            borderBottom: "1px solid #DBE1E5",
            boxShadow: "none",
          }}
          open={open}
        >
          <Toolbar>
            <Box
              sx={{
                display: {
                  xs: "none",
                  sm: "none",
                  md: "none",
                  lg: "inline",
                },
              }}
            >
              <Image src={logoIcon} height={25} width={110} alt="logo" />
            </Box>

            {/* <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerOpen}
              sx={{ ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton> */}

            {!open && (
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{
                  display: {
                    xs: "inline",
                    sm: "inline",
                    md: "inline",
                    lg: "none",
                  },
                }}
              >
                <Box sx={{ marginTop: 1, marginBottom: 1 }}>
                  <Image src={logoIcon} height={25} width={110} alt="logo" />
                  <BaseCloseButton handleClose={handleClose} />
                </Box>

                <Button
                  variant="outlined"
                  onClick={() =>
                    contractDownloadApi(singlePropertyData?.contract?.id)
                  }
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
                    Baixar
                </Button>
                <Button
                  onClick={handleDrawerOpen}
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
                    mb: 2,
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
            )}
          </Toolbar>
        </AppBar>
        <Main open={open}>
          <DrawerHeader />
          <PDFViewer contractDetailsInfo={contractDetailsInfo} />
        </Main>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
            },
          }}
          variant="persistent"
          anchor="right"
          open={open}
        >
          <DrawerHeader>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                display: {
                  xs: "inline",
                  sm: "inline",
                  md: "inline",
                  lg: "none",
                },
              }}
            >
              <Typography
                variant="p"
                sx={{
                  color: "#002152",
                  fontSize: "24px",
                  lineHeight: "32px",
                  fontWeight: "700",
                }}
              >
                {t["Details"]}
              </Typography>
              <BaseCloseButton />
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="space-around"
              alignItems="center"
            >
              <Button
                variant="outlined"
                onClick={() =>
                  contractDownloadApi(singlePropertyData?.contract?.id)
                }
                sx={{
                  borderColor: "#002152",
                  fontSize: "14px",
                  lineHeight: "18px",
                  fontWeight: "600",
                  color: "#002152",
                  textTransform: "none",
                  paddingX: 4,
                  paddingY: 0.6,
                  display: {
                    xs: "none",
                    sm: "none",
                    md: "none",
                    lg: "inline",
                  },
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
                  Baixar
              </Button>
              <BaseCloseButton handleClose={handleClose} />
            </Grid>
          </DrawerHeader>
          <Divider />
          <Button
            sx={{
              textTransform: "none",
              background: "#E0F2FE",
              borderRadius: "2px",

              color: "#0362F0",
              fontSize: "14px",
              lineHeight: "18px",
              fontWeight: "400",
              mt: 2,
              mb: 1,
              mx: 2,
              width: "50%",
              p: 0,
            }}
          >
            {t["waiting for signature"]}
          </Button>

          <Button
            sx={{
              // mx: 2,
              display: "flex",
              textAlign: "left",
              textTransform: "none",
              p: 0,
              mb: 2,
            }}
          >
            {/* <InsertDriveFileOutlinedIcon /> */}
            <Box>
              <Image src={pdfImage} alt="pdfImage" />
            </Box>
            <Typography
              variant="p"
              sx={{
                color: "#1A1859",
                fontSize: "16px",
                lineHeight: "16px",
                fontWeight: "400",
                ml: 0.5,
              }}
            >
              {contractDetailsInfo?.name?.slice(0, 25)}
            </Typography>
          </Button>

          <Divider />
          <Box sx={{ mx: 2, my: 1 }}>
            <Typography
              variant="p"
              sx={{
                color: "#000F1A",
                fontSize: "16px",
                lineHeight: "22px",
                fontWeight: "400",
              }}
            >
              {t["Include signers"]}:
            </Typography>
            {session?.user?.role === "admin" && (
              <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name="name"
                  control={control}
                  defaultValue={""}
                  render={({ field }) => (
                    <BaseTextField
                      size={"medium"}
                      placeholder={t["Name"]}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                      name={"name"}
                      value={field.value}
                    />
                  )}
                />
                <Typography
                  variant="inherit"
                  color="textSecondary"
                  sx={{ color: "#b91c1c", mt: 0.5 }}
                >
                  {errors.name?.message}
                </Typography>
                <Controller
                  name="details"
                  control={control}
                  defaultValue={""}
                  render={({ field }) => (
                    <BaseTextField
                      size={"medium"}
                      placeholder={t["Email"]}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                      name={"details"}
                      value={field.value}
                    />
                  )}
                />
                <Typography
                  variant="inherit"
                  color="textSecondary"
                  sx={{ color: "#b91c1c", mt: 0.5 }}
                >
                  {errors.details?.message}
                </Typography>
                <Button
                  fullWidth
                  // onClick={handleNext}
                  type="submit"
                  sx={{
                    mt: 1.5,
                    background: "#7450F0",
                    borderRadius: "4px",
                    color: "#ffffff",
                    textTransform: "none",
                    fontSize: "16px",
                    lineHeight: "22px",
                    fontWeight: "600",
                    "&:hover": {
                      background: "#7450F0",
                      borderRadius: "4px",
                      color: "#ffffff",
                      textTransform: "none",
                      fontSize: "16px",
                      lineHeight: "22px",
                      fontWeight: "600",
                    },
                  }}
                >
                  {loading && <CircularProgress size={22} color="inherit" />}
                  {!loading && "Add signatories"}
                </Button>
              </form>
            )}
            <Box>{switchLoading && <LinearProgress sx={{mt:2}} size={30} />}</Box>
            <Grid
              container
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
              sx={{ mt: 3 }}
            >
              {contractDetailsInfo?.signatures?.map((data, index) => (
                <Box key={index}>
                  <Typography
                    variant="h1"
                    sx={{
                      color: "#1A1859",
                      fontWeight: "400",
                      fontSize: "16px",
                      lineHeight: "22px",
                    }}
                  >
                    {data?.name}
                  </Typography>
                  <Typography
                    variant="h1"
                    sx={{
                      color: "#6C7A84",
                      fontWeight: "400",
                      fontSize: "16px",
                      lineHeight: "22px",
                    }}
                  >
                    {data?.details}
                  </Typography>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch
                          // defaultChecked
                          // disabled={
                          //   session?.user?.role === 'broker' ? true : false
                          // }
                          checked={data?.is_signed}
                          sx={{
                            "& .MuiSwitch-switchBase.Mui-checked": {
                              color: "#34BE84",
                            },
                            // "& ."
                          }}
                        />
                      }
                      label={data?.is_signed === 0 ? "Unsigned" : "signed"}
                      onChange={() => handleSwitchChange(data)}
                    />
                  </FormGroup>
                  <Divider />
                </Box>
              ))}
            </Grid>
          </Box>
        </Drawer>
      </Box>
    </Box>
  );
}

export default ContractPdfModal;
