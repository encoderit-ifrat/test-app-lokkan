import { Button } from "@mui/material";
import React from "react";

function BaseHomeButton({
  name,
  margin,
  padding,
  shape,
  width,
  fontSize,
  borderRadius,
  background,
  color,
  handleFunction,
}) {
  return (
    <Button
      sx={{
        background: background,
        // boxShadow: "0px 4px 24px rgba(69, 38, 177, 0.3)",
        // borderRadius: `${borderRadius ? borderRadius : "4px"}`,
        color: color,
        fontSize: fontSize,
        fontWeight: "600",
        textTransform: "none",
        margin: margin,
        padding: padding,
        width: width,
        "&:hover": {
          background: background,
          borderRadius: `${borderRadius ? borderRadius : "4px"}`,
          color: color,
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

export default BaseHomeButton;
