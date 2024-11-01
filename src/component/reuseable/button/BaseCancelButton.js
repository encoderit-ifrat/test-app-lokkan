import { Button } from "@mui/material";
import en from "locales/en";
import pt from "locales/pt";
const BaseCancelButton = (
  language = "pt",
  reset,
  replace,
  fullWidth = false
) => {
  const t = language === "en" ? en : pt;
  return (
    <Button
      type="button"
      variant="outlined"
      fullWidth={fullWidth}
      color="error"
      sx={{
        fontSize: "16px",
        lineHeight: "22px",
        fontWeight: "600",
        textTransform: "none",
        py: 1,
        mr: 1,
      }}
      onClick={() => {
        reset();
        replace();
      }}
    >
      {t["Cancel"]}
    </Button>
  );
};

export default BaseCancelButton;
