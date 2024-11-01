import { Button } from "@mui/material";
import React from "react";

function BaseButton({
  name,
  margin,
  padding,
  shape,
  width,
  fontSize,
  borderRadius,
  handleFunction,
}) {
  return (
    <Button
      sx={{
        background: `${shape ? "#ffffff" : "#0362F0"}`,
        boxShadow: "0px 4px 24px rgba(69, 38, 177, 0.3)",
        borderRadius: `${borderRadius ? borderRadius : "4px"}`,
        color: `${shape ? "#1A1859" : "#ffffff"}`,
        fontSize: fontSize,
        fontWeight: "600",
        textTransform: "none",
        margin: margin,
        padding: padding,
        width: width,
        "&:hover": {
          background: `${shape ? "#ffffff" : "#0362F0"}`,
          boxShadow: "0px 4px 24px rgba(69, 38, 177, 0.3)",
          borderRadius: `${borderRadius ? borderRadius : "4px"}`,
          color: `${shape ? "#1A1859" : "#ffffff"}`,
          fontSize: fontSize,
          fontWeight: "600",
          textTransform: "none",
          margin: margin,
          padding: padding,
          width: width,
        },
      }}
      onClick={handleFunction}
    >
      {name}
    </Button>
  );
}

export default BaseButton;
