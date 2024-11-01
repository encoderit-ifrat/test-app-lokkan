import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import logoIcon from "../../../../public/Images/branca-op1.png";
import logoIconColored from "../../../../public/Images/logo.png";
import Image from "next/image";
import BaseButton from "../../reuseable/button/BaseButton";
import BaseModal from "../../reuseable/baseModal/BaseModal";
import LoginModal from "../../login/loginModal/LoginModal";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { FormControl, InputLabel, Popover, Select } from "@mui/material";
import en from "../../../../locales/en";
import pt from "../../../../locales/pt";
import { languageChangeApi } from "@/api";
import { clearAllCookies } from "@/utils/clearCookies";
import useCurrentUser from "@/hooks/useCurrentUser";

function Navbar({
  shape,
  paddingY,
  loginOpen,
  setLoginOpen,
  handleLoginOpen,
  handleLoginClose,
  language,
  languageName,
  setMyValue,
  myValue,
  colorLogo,
}) {
  const { data: session } = useSession();
  const currentUser = useCurrentUser();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    clearAllCookies();
    signOut();
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const locale = myValue.toString();

  const t = locale === "en" ? en : pt;

  const pagesData = [
    { name: "Quero comprar", page: "buscar-imoveis" },
    { name: t["I am broker"], page: "cadastro-de-corretor" },
    { name: t["I am owner"], page: "cadastro-de-proprietario" },
  ];

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "transparent",
        color: "#1A1859",
        boxShadow: "none",
        // paddingRight: 10,

        paddingY: paddingY,
      }}
    >
      <Container maxWidth="xxl">
        <Toolbar disableGutters>
          <Link href="/">
            <a
              style={{
                textDecoration: "none",
                listStyle: "none",
              }}
            >
              <Box
                sx={{
                  display: { xs: "none", md: "none", lg: "flex" },
                  cursor: "pointer",
                }}
              >
                <Image
                  src={colorLogo ? logoIconColored : logoIcon}
                  height={35}
                  width={150}
                  alt="logo"
                />
              </Box>
            </a>
          </Link>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "flex", lg: "none" },
              mr: 1,
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "block", lg: "none" },
              }}
            >
              {pagesData?.map((data, index) => (
                <Link
                  href={{
                    pathname: `/${data.page}`,
                    query: data.page === "buscar-imoveis" && {
                      status: "approved",
                      page: 1,
                      per_page: 9,
                    },
                  }}
                  key={index}
                >
                  <a
                    style={{
                      textDecoration: "none",
                      listStyle: "none",
                      width: "100%",
                    }}
                  >
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center" sx={{ color: "#1A1859" }}>
                        {data?.name}
                      </Typography>
                    </MenuItem>
                  </a>
                </Link>
              ))}
              <BaseButton
                name={!session ? t["login"] : currentUser?.name}
                margin={"0 0 0 1vh"}
                handleFunction={!session ? handleLoginOpen : handleClick}
              />
            </Menu>
          </Box>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{
              display: { xs: "flex", md: "flex", lg: "none" },
              mr: 1,
            }}
          >
            <Link href="/">
              <a
                style={{
                  textDecoration: "none",
                  listStyle: "none",
                  cursor: "pointer",
                }}
              >
                <Image
                  src={colorLogo ? logoIconColored : logoIcon}
                  height={25}
                  width={100}
                  alt="logo"
                />
              </a>
            </Link>
          </Grid>

          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            sx={{
              display: { xs: "none", md: "none", lg: "flex" },
            }}
          >
            {pagesData?.map((data, index) => (
              <Link
                href={{
                  pathname: `/${data.page}`,
                  query: data.page === "buscar-imoveis" && {
                    status: "approved",
                    page: 1,
                    per_page: 9,
                  },
                }}
                key={index}
              >
                <a
                  style={{
                    textDecoration: "none",
                    listStyle: "none",
                  }}
                >
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      color: `${shape ? "#ffffff" : "#1A1859"}`,
                      display: "block",
                      textTransform: "none",
                      fontSize: "16px",
                      "&:hover": {
                        background: "transparent",
                      },
                    }}
                  >
                    {data?.name}
                  </Button>
                </a>
              </Link>
            ))}
            {session ? (
              <Button
                sx={{ display: "flex", textTransform: "none" }}
                onClick={handleClick}
              >
                {currentUser?.name && (
                  <React.Fragment>
                    <PersonOutlineOutlinedIcon
                      sx={{ color: `${colorLogo ? "#1A1859" : "#ffffff"}` }}
                    />
                    <Typography
                      variant="p"
                      sx={{
                        color: `${colorLogo ? "#1A1859" : "#ffffff"}`,
                        fontSize: "16px",
                      }}
                    >
                      {currentUser?.name}
                    </Typography>
                  </React.Fragment>
                )}
              </Button>
            ) : (
              <BaseButton
                name={t.login}
                handleFunction={!session ? handleLoginOpen : handleLogout}
                shape={shape}
                fontSize={"12px"}
              />
            )}
          </Grid>
          {language && (
            <Typography variant="p" sx={{ marginLeft: "3vh" }}>
              <FormControl fullWidth size="small" sx={{ display: "none" }}>
                <InputLabel id="demo-simple-select-label">Select</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={myValue}
                  sx={{
                    color: {
                      xs: "#334155",
                      sm: "#334155",
                      md: "#334155",
                      lg: "white",
                    },
                    ".MuiOutlinedInput-notchedOutline": {
                      borderColor: {
                        xs: "#334155",
                        sm: "#334155",
                        md: "#334155",
                        lg: "rgba(228, 219, 233, 0.25)",
                      },
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: {
                        xs: "#334155",
                        sm: "#334155",
                        md: "#334155",
                        lg: "rgba(228, 219, 233, 0.25)",
                      },
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: {
                        xs: "#334155",
                        sm: "#334155",
                        md: "#334155",
                        lg: "rgba(228, 219, 233, 0.25)",
                      },
                    },
                    ".MuiSvgIcon-root ": {
                      fill: {
                        xs: "#334155 !important",
                        sm: "#334155 !important",
                        md: "#334155 !important",
                        lg: "white !important",
                      },
                    },
                  }}
                  // value={locale}
                  onChange={(e) => {
                    setMyValue(e.target.value);
                    languageChangeApi(e.target.value);

                    // setCookie('language', e.target.value)
                    // Cookies.set('language', e.target.value)
                  }}
                  label="language"
                >
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="pt">Brazil</MenuItem>
                </Select>
              </FormControl>
            </Typography>
          )}
        </Toolbar>
        <BaseModal isShowing={loginOpen} isClose={handleLoginClose}>
          <Tooltip title="Something">
            <LoginModal handleLoginClose={handleLoginClose} myValue={myValue} />
          </Tooltip>
        </BaseModal>
      </Container>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography
          sx={{
            px: 2,
            py: 0.5,
            cursor: "pointer",
            "&:hover": {
              background: "#e0f2fe",
            },
          }}
          onClick={handleLogout}
        >
          {t["Log out"]}
        </Typography>
        <Link
          href={{
            pathname: "/my-properties",
            query: {
              page: 1,
              per_page: 9,
            },
          }}
        >
          <Typography
            sx={{
              px: 2,
              py: 0.5,
              cursor: "pointer",
              "&:hover": {
                background: "#e0f2fe",
              },
            }}
          >
            painel
          </Typography>
        </Link>
      </Popover>
    </AppBar>
  );
}
export default Navbar;
