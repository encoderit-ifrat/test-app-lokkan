import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Switch,
  TextareaAutosize,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import logoIcon from "../../../../../../public/Images/logo.png";
import { styled, useTheme } from "@mui/material/styles";
import pt from "locales/pt";
import en from "locales/en";
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
import analiseImage from "../../../../../../public/Images/analise.png";
import pdfImage from "../../../../../../public/Images/pdfImage.png";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import dynamic from "next/dynamic";
import { getViewCertificateData } from "../../../../../redux/viewCertificate/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { certificateDownloadApi } from "@/api";
import BaseCloseButton from "@/component/reuseable/baseCloseButton/BaseCloseButton";
const PDFViewer = dynamic(
  () => import("../../../../reuseable/PDFComponent/pdf-viewer"),
  {
    ssr: false,
  }
);
const drawerWidth = 0;

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
  width: { xs: "95%", sm: "95%", md: "95%", lg: "70%", xl: "70%" },
  bgcolor: "#ffffff",
  // border: "2px solid #000",
  boxShadow: "none",
  borderRadius: "4px",
  maxHeight: "90vh",
  // overflowY: "scroll",
  //   px: 0,
  //   py: 1,
};

function DigitalNotaryPdfModal({
  handleClose,
  handlePdfOpen,
  handleNext,
  singlePropertyData,
  certificateData,
}) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getViewCertificateData(
        +singlePropertyData?.contract?.id,
        certificateData?.tag?.id || certificateData?.certificate_type_id
      )
    );
  }, [dispatch, singlePropertyData, certificateData]);

  const viewData = useSelector(
    (state) => state?.viewCertificate?.viewCertificateData
  );

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const t = pt;

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
            <Box>
              <Image src={logoIcon} height={25} width={110} alt="logo" />
            </Box>

            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
            >
              <Button
                onClick={() =>
                  certificateDownloadApi(
                    singlePropertyData?.contract?.id,
                    certificateData?.certificate_type_id
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
                  paddingX: 4,
                  paddingY: 0.6,
                  mr:4,
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
          </Toolbar>
        </AppBar>
        <Main open={open}>
          <DrawerHeader />
          <PDFViewer contractDetailsInfo={viewData} />
        </Main>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 0,
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
                Details
              </Typography>
              <BaseCloseButton />
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
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
              mx: 2,
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
              Contratos honorários lorem ipsum dolor amet.pdf
            </Typography>
          </Button>

          <Divider />
          <Box sx={{ mx: 2, my: 1, background: "#E6F0FF" }}>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              sx={{ height: "10vh", px: 1 }}
            >
              <Image src={analiseImage} alt="analise" />
              <Typography
                variant="p"
                sx={{
                  color: "#1A1859",
                  fontSize: "14px",
                  lineHeight: "22px",
                  fontWeight: "400",
                  ml: 0.5,
                }}
              >
                6 items to review
              </Typography>
            </Grid>
          </Box>
          {[0, 1, 2].map((data, index) => (
            <Box key={index} sx={{ mx: 2, my: 1 }}>
              <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <Button
                  sx={{
                    display: "flex",
                    textTransform: "none",
                    py: 0.5,
                    px: 0.5,
                    mt: 0,
                    mb: 0,
                    background: "#FFF7E6",
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
                    page 2
                  </Typography>
                </Button>
                <Typography
                  variant="p"
                  sx={{
                    color: "#6C7A84",
                    fontSize: "16px",
                    fontWeight: "400",
                    lineHeight: "22px",
                  }}
                >
                  (...) Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Viverra.
                </Typography>
              </Grid>
              <Divider />
            </Box>
          ))}
          <Box sx={{ px: 2 }}>
            <Button
              fullWidth
              onClick={handleNext}
              sx={{
                mt: 1.5,
                background: "#34BE84",
                borderRadius: "4px",
                color: "#ffffff",
                textTransform: "none",
                fontSize: "16px",
                lineHeight: "22px",
                fontWeight: "600",

                "&:hover": {
                  background: "#34BE84",
                  borderRadius: "4px",
                  color: "#ffffff",
                  textTransform: "none",
                  fontSize: "16px",
                  lineHeight: "22px",
                  fontWeight: "600",
                },
              }}
            >
              {t["Validate documents"]}
            </Button>
          </Box>
        </Drawer>
      </Box>
    </Box>
  );
}

export default DigitalNotaryPdfModal;
