import React, { useContext } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import NavBar from "../NavBar/NavBar";
import LeftBar from "../LeftBar/LeftBar";
// import { ThemeContext } from '../../../context/ThemeContextProvider/ThemeContextProvider';

const drawerWidth = 200;

const ResponsiveDrawer = ({ languageName }) => {
  // const {isDarkModeClose,handleTheme} = props;
  // const [darkMode, handleTheme] = useContext(ThemeContext);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  // console.log(mobileOpen)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div>
      <NavBar
        handleDrawerToggle={handleDrawerToggle}
        drawerWidth={drawerWidth}
      />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <LeftBar
          handleDrawerToggle={handleDrawerToggle}
          mobileOpen={mobileOpen}
          drawerWidth={drawerWidth}
          languageName={languageName}
        />
      </Box>
    </div>
  );
};

export default ResponsiveDrawer;
