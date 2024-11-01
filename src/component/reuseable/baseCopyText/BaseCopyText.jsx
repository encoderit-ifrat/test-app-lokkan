import React from "react";
import { IconButton } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text).then(
    () => {
      console.log("Text copied to clipboard!");
    },
    (err) => {
      console.error("Failed to copy: ", err);
    }
  );
};
const BaseCopyText = ({ text }) => {
  return (
    <IconButton
      sx={{
        borderRadius: 11111,
        width: 40,
        height: 40,
        backgroundColor: "#9c9c9c",
        color: "white",
        "&:hover": {
          backgroundColor: "#ababab",
        },
      }}
      onClick={copyToClipboard(text)}
    >
      <ContentCopyIcon sx={{ height: 20 }} />
    </IconButton>
  );
};

export default BaseCopyText;
