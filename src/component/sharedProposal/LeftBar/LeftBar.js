import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import AppsIcon from "@mui/icons-material/Apps";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import Image from "next/image";
import Link from "next/link";
import { Avatar, Grid, ListItemButton, Stack, Typography } from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import InputOutlinedIcon from "@mui/icons-material/InputOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import PaidIcon from "@mui/icons-material/Paid";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import { useRouter } from "next/router";
import logo from "../../../../public/Images/logo.png";
import person from "../../../../public/Images/person.png";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

import { useSession, signIn, signOut } from "next-auth/react";
import pt from "locales/pt";
import en from "locales/en";
import { _imageURL } from "consts";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import useCurrentUser from "@/hooks/useCurrentUser";
import { clearAllCookies } from "@/utils/clearCookies";
function LeftBar(props) {
  const router = useRouter();
  // const { data: session } = useSession();
  const currentUser = useCurrentUser();

  const myLoader = ({ src }) => {
    return `${_imageURL}/${src}`;
  };

  const {
    handleDrawerToggle,
    mobileOpen,
    drawerWidth,
    isDarkModeClose,
    languageName,
  } = props;
  const { window } = props;
  const t = languageName === "en" ? en : pt;
  const theme = createTheme({
    typography: {
      fontFamily: ["Lato", "Inter", "sans-serif"].join(","),
    },
  });

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    clearAllCookies();
    signOut({
      callbackUrl: "/",
    });
  };

  const Tab = [
    {
      icon: <CampaignOutlinedIcon />,
      label: t["Properties"],
      route: "my-properties",
      visible: ["admin", "broker", "buyer", "owner", "construction_company"],
    },
    {
      icon: <ArticleOutlinedIcon />,
      label: t["Proposals"],
      route: "proposals",
      visible: ["admin", "broker", "buyer", "owner", "construction_company"],
    },
    {
      icon: <StarBorderOutlinedIcon />,
      label: t["Schedules"],
      route: "schedules",
      visible: ["admin", "broker", "buyer", "owner", "construction_company"],
    },
    {
      icon: <PersonOutlineOutlinedIcon />,
      label: t["Brokers"],
      route: "brokers",
      visible: ["admin", "broker", "buyer", "owner", "construction_company"],
    },
    {
      icon: <AddBusinessIcon />,
      label: t["Add company"],
      route: "add-company",
      visible: ["admin"],
    },
    {
      icon: <PaidIcon />,
      label: t["Financial"],
      route: "financial",
      visible: ["admin", "broker", "buyer", "owner", "construction_company"],
    },
    {
      icon: <HelpOutlineOutlinedIcon />,
      label: "Perguntas frequentes",
      route: "faq",
      visible: [
        "admin",
        "broker",
        "buyer",
        "owner",
        "construction_company",
        "car_company",
      ],
    },
    {
      icon: <InputOutlinedIcon />,
      label: t["Leave"],
      route: "",
      visible: [
        "admin",
        "broker",
        "buyer",
        "owner",
        "construction_company",
        "car_company",
      ],
    },
  ];

  const data = currentUser?.roles
    ? Tab?.filter((item) =>
        item?.visible?.includes(currentUser?.roles[0]?.slug)
      )
    : [];

  // const [selectedLabel, setSelectedLabel] = useState("properties");
  // console.log(selectedLabel);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // useEffect(() => {
  //   const name = router.pathname.split("/")[1];
  //   setSelectedLabel(name);
  //   console.log({ name });
  // }, [router.isReady, router.pathname]);

  // const handleListItemClick = (index, leftData) => {
  //   // const name = router.pathname.split("/")[1];
  //   setSelectedLabel(leftData.route);
  //   setSelectedIndex(index);
  //   // console.log({ name });
  // };

  const [selectedLabel, setSelectedLabel] = React.useState("");

  useEffect(() => {
    const name = router.pathname.split("/")[1];
    setSelectedLabel(name);
  }, [router.pathname]);

  const handleListItemClick = (index, leftData) => {
    setSelectedIndex(index);
    router.push(`/${leftData.route}`);
  };

  const drawer = (
    <ThemeProvider theme={theme}>
      <Grid
        sx={{
          backgroundColor: `#FFFFFF`,
          boxShadow: "0px 4px 8px rgba(0, 33, 82, 0.08)",
          height: "100%",
        }}
      >
        <Box sx={{ pt: 2 }}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Link href="/">
              <a
                style={{
                  textDecoration: "none",
                  listStyle: "none",
                }}
              >
                <Box sx={{ cursor: "pointer" }}>
                  <Image height={35} width={130} src={logo} alt="logo" />
                </Box>
              </a>
            </Link>
            <Box sx={{ mt: 2 }}>
              {currentUser?.attachments?.length > 0 ? (
                <Image
                  loader={myLoader}
                  height={70}
                  width={70}
                  style={{ borderRadius: "50px" }}
                  src={`${currentUser?.attachments[0]?.file_path}`}
                  alt="logo"
                  objectFit="cover"
                />
              ) : (
                <Avatar />
              )}
            </Box>
            <Link href="/profile">
              <a
                style={{
                  textDecoration: "none",
                  listStyle: "none",
                  backgroundColor: "#F2F5F6",
                  borderRadius: "4px",
                  padding: "4px 10px 4px 16px",
                  marginTop: "8px",
                }}
              >
                <Stack direction="row">
                  <Typography
                    variant="p"
                    sx={{
                      color: "#7450F0",
                      fontWeight: "600",
                      fontSize: "16px",
                      lineHeight: "22px",

                      textTransform: "capitalize",
                    }}
                  >
                    {currentUser?.name}
                  </Typography>
                  <ChevronRightIcon
                    sx={{
                      color: "#003357",
                    }}
                  />
                </Stack>
              </a>
            </Link>
            <Typography
              variant="p"
              sx={{
                color: "#9FAAB1",
                fontWeight: "400",
                fontSize: "12px",
                lineHeight: "18px",
                mt: 2,
              }}
            >
              {currentUser?.email}
            </Typography>
          </Grid>
        </Box>
        <List
          component="nav"
          aria-label="main mailbox folders"
          sx={{ height: "55%", mt: 3 }}
        >
          {data?.map((leftData, index) => (
            <Link key={index} href={`/${leftData?.route}`}>
              <ListItemButton
                // className="btn-leftbar"
                selected={selectedLabel === leftData.route}
                onClick={
                  index === data?.length - 1
                    ? handleLogout
                    : () => handleListItemClick(index, leftData)
                }
                to={`/${leftData?.route}`}
                sx={{
                  marginLeft: 2,
                  mt: 1,

                  "&:hover": {
                    borderRight: "3px solid #7450F0",
                  },
                  "&.MuiListItemButton-root.Mui-selected": {
                    borderRight: "3px solid #7450F0",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: `${
                      selectedLabel === leftData.route ? "#7450F0" : "#9FAAB1"
                    }`,
                    minWidth: 0,
                    paddingRight: 1,
                  }}
                >
                  {leftData.icon}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      variant="p"
                      sx={{
                        listStyle: "none",
                        textDecoration: "none",
                        margin: 0,
                        padding: 0,
                        fontWeight: `${
                          selectedLabel === leftData.route ? "600" : "400"
                        }`,
                        fontSize: "16px",
                        color: `${
                          selectedLabel === leftData.route
                            ? "#7450F0"
                            : "#9FAAB1"
                        }`,
                        lineHeight: "22px",
                      }}
                    >
                      {leftData.label}
                    </Typography>
                  }
                  sx={{ color: "#FFFFFF" }}
                />
              </ListItemButton>
            </Link>
          ))}
        </List>
      </Grid>
    </ThemeProvider>
  );
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </>
  );
}

LeftBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default LeftBar;
