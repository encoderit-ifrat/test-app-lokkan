import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Snackbar,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import loginImage from "../../../../public/Images/login.png";
import React from "react";
import SetCookie from "@/hooks/setCookie";
import { _baseURL } from "consts";

import Image from "next/image";
import BaseButton from "../../reuseable/button/BaseButton";
import Link from "next/link";
import { useState } from "react";
import BaseTextField from "../../reuseable/baseTextField/BaseTextField";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import NoEncryptionOutlinedIcon from "@mui/icons-material/NoEncryptionOutlined";
import axios from "axios";
import { signIn } from "next-auth/react";
import { apiInstance, loginApi, userDetailsApi } from "../../../api";
import { useRouter } from "next/router";
import BaseModal from "../../reuseable/baseModal/BaseModal";
import ForgotPasswordModal from "../../forgotPassword/ForgotPasswordModal";
import en from "locales/en";
import pt from "locales/pt";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
// import Typography from "@mui/material/Typography";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import Cookies from "js-cookie";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BaseCloseButton from "@/component/reuseable/baseCloseButton/BaseCloseButton";
import toast from "react-hot-toast";

function LoginModal({ handleLoginClose, myValue }) {
  const t = myValue === "en" ? en : pt;

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required(t["Email is required"])
      .matches(/.+@.+\.[A-Za-z]+$/, t["Email is invalid"]),
    password: Yup.string()
      .required(t["Password is required"])
      .min(6, t["Password must be at least 6 characters"])
      .max(40, t["Password must not exceed 40 characters"]),
  });
  const [validEmail, setValidEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const handleClickShowPassword = () => {
    setShowPass(!showPass);
  };
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [message, setMessage] = useState("");

  const [forgotOpen, setForgotOpen] = useState(false);
  const handleForgotOpen = () => setForgotOpen(true);
  const handleForgotClose = () => setForgotOpen(false);

  const handleClickSnackbar = () => {
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const {
    register,
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const [expanded, setExpanded] = useState(false);
  const handleChangeAccordion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const handleSocialLogin = (provider) => {
    window.location.replace(`${_baseURL}/api/redirect/${provider}`);
  };
  const onSubmit = async (data) => {
    setLoading(true);
    const [errorToken, responseToken] = await loginApi(data);
    if (!errorToken) {
      if (responseToken?.data?.data?.additional_info) {
        localStorage.setItem("token", responseToken?.data?.data?.token);
        apiInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${responseToken?.data?.data?.token}`;
        const [error, response] = await userDetailsApi();
        setLoading(false);

        if (!error) {
          signIn("credentials", {
            userId: response?.data?.user?.id,
            userEmail: response?.data?.user?.email,
            name: response?.data?.user?.name,
            phone: response?.data?.user?.phone,
            status: response?.data?.user?.status,
            role: response?.data?.user?.roles[0]?.slug,
            roleId: response?.data?.user?.roles[0]?.id,
            userImage: response?.data?.user?.attachments[0]?.file_path,
            wishList: response?.data?.wishlists,
            callbackUrl: response?.data?.user?.roles[0]?.slug === "car_company" ? "/faq" :  "/my-properties",
          });
        }
      } else {
        toast.error("Você precisa preencher as informações adicionais!");
        setLoading(false);
        handleLoginClose();
        const user = responseToken?.data?.data?.user;
        if (user) {
            const { id, roles = [], name } = user;
            const userRole = roles[0]?.id === 3 ? "owner" :
                             roles[0]?.id === 2 ? "broker" :
                             "buyer";
    
            localStorage.setItem("registration_id", id || "");
            localStorage.setItem("user_role", userRole);
            localStorage.setItem("Reg_user_name", name || "");
        } else {
            // Handle case where user data is not available
            console.error("Dados do usuário estão faltando na resposta");
        }
        router.replace({
            pathname: "/other-information",
        });
      }
    } else {
      handleClickSnackbar();
      setLoading(false);
      setMessage("E-mail ou senha são inválidos");
    }
  };

  const allValues = watch();

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        // top:{xs:"80%"},
        transform: "translate(-50%, -50%)",
        // width: { xs: "80%", sm: "80%", md: "60%", lg: "35%", xl: "25%" },
        // m: 1,
        width: "100%",
        maxWidth: { xs: "350px", sm: "450px", md: "500px", lg: "550px" },
        bgcolor: "#ffffff",
        // border: "2px solid #000",
        boxShadow: "none",
        borderRadius: "12px",
        maxHeight: "85vh",
        overflowY: "scroll",
        px: 0,
        pt: 4,
        pb: 6,
        position: "relative",
      }}
    >
      <BaseCloseButton handleClose={handleLoginClose} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ px: 3 }}
        >
          <Typography
            variant="p"
            sx={{
              fontSize: "18px",
              fontWeight: "700",
              lineHeight: "22px",
              color: "#1A1859",
            }}
          >
            {t["Already have registration?"]}
          </Typography>

          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{ mt: 3, mb: 1 }}
          >
            <Typography
              variant="p"
              sx={{
                color: "#253858",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "16px",
              }}
            >
              {t["Email"]}
            </Typography>
          </Grid>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <BaseTextField
                size={"small"}
                placeholder={"Email"}
                onChange={(e) => {
                  if (/.+@.+\.[A-Za-z]+$/.test(e.target.value)) {
                    setValidEmail(false);
                  } else {
                    setValidEmail(true);
                  }
                  field.onChange(e.target.value);
                }}
                name={"email"}
                // value={field.value}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: `${validEmail ? "#dc2626" : ""}`,
                    },
                  },

                  // "& label.Mui-focused": {
                  //   color: borderColor,
                  // },
                }}
                error={errors.email ? true : false}
              />
            )}
          />
          <Typography variant="inherit" color="textSecondary">
            {errors.email?.message}
          </Typography>

          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{ mt: 3, mb: 1 }}
          >
            <Typography
              variant="p"
              sx={{
                color: "#253858",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "16px",
              }}
            >
              {t["Password"]}
            </Typography>
          </Grid>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <BaseTextField
                size={"small"}
                placeholder={t["Password"]}
                type={showPass ? "text" : "password"}
                name={"password"}
                // {...field}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                // value={field.value}
                error={errors.password ? true : false}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      sx={{ cursor: "pointer" }}
                      position="end"
                      onClick={handleClickShowPassword}
                    >
                      {showPass ? (
                        <NoEncryptionOutlinedIcon />
                      ) : (
                        <LockOutlinedIcon />
                      )}
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
          <Typography variant="inherit" color="textSecondary">
            {errors.password?.message}
          </Typography>

          {/* <Link href="/my-properties">
            <a
              style={{
                textDecoration: "none",
                listStyle: "none",
                width: "100%",
              }}
            > */}
          <Button
            type="submit"
            fullWidth
            sx={{
              background:
                "linear-gradient(270deg, #1DEECB 1.2%, #00C1B4 98.7%)",
              boxShadow: "0px 4px 34px rgba(0, 0, 0, 0.08)",
              borderRadius: "4px",
              color: "#ffffff",
              fontSize: "16px",
              lineHeight: "22px",
              fontWeight: "600",
              mt: 3,
              textTransform: "none",
            }}
          >
            {loading && <CircularProgress size={22} color="inherit" />}
            {!loading && t["To enter"]}
          </Button>
          {/* </a>
          </Link> */}

          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="flex-start"
            sx={{ my: 1 }}
            onClick={handleForgotOpen}
          >
            <Typography
              variant="p"
              sx={{
                color: "#0E97F7",
                fontSize: "12px",
                fontWeight: "600",
                lineHeight: "16px",
                cursor: "pointer",
              }}
            >
              {t["I forgot the password"]}
            </Typography>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{ mt: 3, mb: 1 }}
          >
            <Button
              sx={{
                display: "flex",
                background: "#DC4C3F",
                borderRadius: "4px",
                textTransform: "none",
                px: 2,
                py: 1,
                width: "100%",
                "&:hover": {
                  background: "#DC4C3F",
                  borderRadius: "4px",
                  textTransform: "none",
                  px: 2,
                  py: 1,
                  width: "100%",
                },
              }}
              onClick={() => handleSocialLogin("google")}
            >
              <GoogleIcon sx={{ color: "#ffffff" }} />
              <Typography
                sx={{
                  color: "#ffffff",
                  fontSize: {
                    xs: "12px",
                    sm: "12px",
                    md: "12px",
                    lg: "12px",
                    xl: "12px",
                    xxl: "14px",
                  },
                  lineHeight: "17px",
                  fontWeight: "400",
                }}
              >
                Login with Gmail
              </Typography>
            </Button>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{ mt: 3, mb: 1 }}
          >
            <Button
              sx={{
                display: "flex",
                background: "#4469B0",
                borderRadius: "4px",
                textTransform: "none",
                px: 2,
                py: 1,
                width: "100%",
                "&:hover": {
                  background: "#4469B0",
                  borderRadius: "4px",
                  textTransform: "none",
                  px: 2,
                  py: 1,
                  width: "100%",
                },
              }}
              onClick={() => handleSocialLogin("facebook")}
            >
              <FacebookOutlinedIcon sx={{ color: "#ffffff" }} />
              <Typography
                sx={{
                  color: "#ffffff",
                  fontSize: {
                    xs: "12px",
                    sm: "12px",
                    md: "12px",
                    lg: "12px",
                    xl: "12px",
                    xxl: "14px",
                  },
                  lineHeight: "17px",
                  fontWeight: "400",
                }}
              >
                Login with Facebook
              </Typography>
            </Button>
          </Grid>
        </Grid>
        {/* <Box sx={{ borderTop: "2px dashed #D3D3DF", mt: 3 }} /> */}
        {/* <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChangeAccordion("panel1")}
          sx={{
            border: 'none',
            boxShadow: 'none',
            outline: 'none',
            margin: '0',
            '&:before': { display: 'none' },
            '&.MuiAccordion-root': { margin: '0' },
          }}
        >
          <AccordionSummary
            // expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            sx={{
              borderBottom: 'none',
              boxShadow: 'none',
              outline: 'none',
              margin: '0',
            }}
          >
            <Button
              sx={{
                display: 'flex',
                background: '#DC4C3F',
                borderRadius: '4px',
                textTransform: 'none',
                px: 2,
                py: 1,
                width: '100%',
                '&:hover': {
                  background: '#DC4C3F',
                  borderRadius: '4px',
                  textTransform: 'none',
                  px: 2,
                  py: 1,
                  width: '100%',
                },
              }}
            >
              <GoogleIcon sx={{ color: '#ffffff' }} />
              <Typography
                sx={{
                  color: '#ffffff',
                  fontSize: {
                    xs: '12px',
                    sm: '12px',
                    md: '12px',
                    lg: '12px',
                    xl: '12px',
                    xxl: '14px',
                  },
                  lineHeight: '17px',
                  fontWeight: '400',
                }}
              >
                Login with Gmail
              </Typography>
            </Button>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              borderTop: 'none',
              boxShadow: 'none',
              outline: 'none',
              margin: '0',
            }}
          >
            <Stack direction={"row"} alignItems={"center"} spacing={2}>
              <Button
                fullWidth
                sx={{
                  display: "flex",
                  border: "1px solid #DC4C3F",

                  borderRadius: "4px",
                  textTransform: "none",

                  height: "40px",
                }}
                onClick={() => handleSocialLogin("google", "broker")}
              >
                <Typography
                  sx={{
                    color: "#DC4C3F",

                    fontWeight: "600",
                  }}
                >
                  Broker
                </Typography>
              </Button>
              <Button
                fullWidth
                sx={{
                  display: "flex",
                  border: "1px solid #DC4C3F",
                  borderRadius: "4px",
                  textTransform: "none",

                  height: "40px",
                }}
                onClick={() => handleSocialLogin("google", "owner")}
              >
                <Typography
                  sx={{
                    color: "#DC4C3F",

                    fontWeight: "600",
                  }}
                >
                  Owner
                </Typography>
              </Button>
              <Button
                fullWidth
                sx={{
                  display: "flex",
                  border: "1px solid #DC4C3F",
                  borderRadius: "4px",
                  textTransform: "none",

                  height: "40px",
                }}
                onClick={() => handleSocialLogin("google", "buyer")}
              >
                <Typography
                  sx={{
                    color: "#DC4C3F",

                    fontWeight: "600",
                  }}
                >
                  Buyer
                </Typography>
              </Button>
            </Stack>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'panel2'}
          onChange={handleChangeAccordion('panel2')}
          sx={{
            border: 'none',
            boxShadow: 'none',
            outline: 'none',
            '&:before': { display: 'none' },
          }}
        >
          <AccordionSummary
            aria-controls="panel2bh-content"
            id="panel2bh-header"
            sx={{
              borderBottom: 'none',
              boxShadow: 'none',
              outline: 'none',
            }}
          >
            <Button
              sx={{
                display: 'flex',
                background: '#4469B0',
                borderRadius: '4px',
                textTransform: 'none',
                px: 2,
                py: 1,
                width: '100%',
                '&:hover': {
                  background: '#4469B0',
                  borderRadius: '4px',
                  textTransform: 'none',
                  px: 2,
                  py: 1,
                  width: '100%',
                },
              }}
              // onClick={() => handleSocialLogin("facebook")}
            >
              <FacebookOutlinedIcon sx={{ color: '#ffffff' }} />
              <Typography
                sx={{
                  color: '#ffffff',
                  fontSize: {
                    xs: '12px',
                    sm: '12px',
                    md: '12px',
                    lg: '12px',
                    xl: '12px',
                    xxl: '14px',
                  },
                  lineHeight: '17px',
                  fontWeight: '400',
                }}
              >
                Login with Facebook
              </Typography>
            </Button>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              borderTop: 'none',
              boxShadow: 'none',
              outline: 'none',
            }}
          >
            <Stack direction={"row"} alignItems={"center"} spacing={2}>
              <Button
                fullWidth
                sx={{
                  display: "flex",
                  border: "1px solid #4469B0",

                  borderRadius: "4px",
                  textTransform: "none",

                  height: "40px",
                }}
                onClick={() => handleSocialLogin("facebook", "broker")}
              >
                <Typography
                  sx={{
                    color: "#4469B0",

                    fontWeight: "600",
                  }}
                >
                  Broker
                </Typography>
              </Button>
              <Button
                fullWidth
                sx={{
                  display: "flex",
                  border: "1px solid #4469B0",
                  borderRadius: "4px",
                  textTransform: "none",

                  height: "40px",
                }}
                onClick={() => handleSocialLogin("facebook", "owner")}
              >
                <Typography
                  sx={{
                    color: "#4469B0",

                    fontWeight: "600",
                  }}
                >
                  Owner
                </Typography>
              </Button>
              <Button
                fullWidth
                sx={{
                  display: "flex",
                  border: "1px solid #4469B0",
                  borderRadius: "4px",
                  textTransform: "none",

                  height: "40px",
                }}
                onClick={() => handleSocialLogin("facebook", "buyer")}
              >
                <Typography
                  sx={{
                    color: "#4469B0",

                    fontWeight: "600",
                  }}
                >
                  Buyer
                </Typography>
              </Button>
            </Stack>
          </AccordionDetails>
        </Accordion> */}
      </form>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        key={"top"}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
      <BaseModal isShowing={forgotOpen} isClose={handleForgotClose}>
        <Tooltip title="Something">
          <>
            <ForgotPasswordModal
              handleForgotClose={handleForgotClose}
              myValue={myValue}
            />
          </>
        </Tooltip>
      </BaseModal>
    </Box>
  );
}

export default LoginModal;
