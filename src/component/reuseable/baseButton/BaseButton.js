import { Button } from "@mui/material";
const BaseButton = ({
  children,
  type = "button",
  variant = "",
  color = "",
  sx = "primary",
  custom_sx = "",
  fullWidth = false,
  disabled = false,
  handleFunction,
}) => {
  const buttonStyle = {
    primary: {
      textTransform: "none",
      background: "#0362F0",
      borderRadius: "4px",
      color: "#ffffff",
      fontSize: "16px",
      fontWeight: "600",
      px: 4,
      py: 1,

      "&:hover": {
        background: "#0362F0",
        borderRadius: "4px",
        color: "#ffffff",
      },
    },
    secondary: {
      background: "#7450F0",
      borderRadius: "4px",
      px: 2,
      py: 1,
      color: "#ffffff",
      fontSize: "16px",
      fontWeight: "600",
      lineHeight: "22px",
      textTransform: "none",
      boxShadow: "0px 4px 8px rgba(81, 51, 182, 0.32)",
      "&:hover": {
        background: "#7450F0",
        borderRadius: "4px",
        px: 2,
        py: 1,
        color: "#ffffff",
        fontSize: "16px",
        fontWeight: "600",
        lineHeight: "22px",
        textTransform: "none",
        boxShadow: "0px 4px 8px rgba(81, 51, 182, 0.32)",
      },
    },
    outlined: {
      mr: 1,
      border: "1px solid #002152",
      borderRadius: "4px",
      px: 2,
      py: 1,
      color: "#002152",
      fontSize: "16px",
      fontWeight: "600",
      lineHeight: "22px",
      textTransform: "none",
    },
    success: {
      background: "#00C1B4",
      boxShadow: "0px 4px 34px rgba(0, 0, 0, 0.08)",
      borderRadius: "4px",
      color: "#ffffff",
      fontSize: "16px",
      lineHeight: "22px",
      fontWeight: "600",
      textTransform: "none",
      py: 1,
      "&:hover": {
        background: "#00C1B4",
        boxShadow: "0px 4px 34px rgba(0, 0, 0, 0.08)",
        borderRadius: "4px",
        color: "#ffffff",
        fontSize: "16px",
        lineHeight: "22px",
        fontWeight: "600",
        // mt: 3,
        textTransform: "none",
        py: 1,
      },
    },
    error: {
      fontSize: "16px",
      lineHeight: "22px",
      fontWeight: "600",
      textTransform: "none",
      py: 1,
    },
    mute: {
      background: "#ffffff",
      px: 2,
      py: 1,
      color: "#4B4B66",
      fontSize: "16px",
      fontWeight: "600",
      lineHeight: "22px",
      textTransform: "none",
    },
  };
  return (
    <Button
      type={type}
      variant={variant && variant}
      color={color && color}
      disabled={disabled}
      fullWidth={fullWidth}
      sx={custom_sx || buttonStyle[sx]}
      onClick={handleFunction}
    >
      {children}
    </Button>
  );
};

export default BaseButton;
// error, outlined, contained
