import React from "react";
import { Button, Typography } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const BaseWhatsappButton = ({ content }) => {
  const number = "5511911280640";
  const message = content;

  // Encode the message for URL
  const encodedMessage = encodeURIComponent(message);
  return (
    <Button
      variant="contained"
      color="primary"
      href={`https://api.whatsapp.com/send?phone=${number}&text=${encodedMessage}`}
      target="_blank"
      fullWidth
      sx={{
        px: 4,
        py: 1,
        fontSize: "16px",
        fontWeight: "600",
        textTransform: "none",
        minWidth: "195px",
        background: "#1bd741",
        borderRadius: "4px",
        "&: hover": {
          px: 4,
          fontSize: "16px",
          fontWeight: "600",
          textTransform: "none",
          minWidth: "195px",
          background: "#1bd741",
          borderRadius: "4px",
        },
      }}
    >
      <WhatsAppIcon />
      <Typography
        sx={{
          color: "#ffffff",
          fontSize: "16px",
          fontWeight: "600",
          ml: 1,
        }}
      >
        Whatsapp
      </Typography>
    </Button>
  );
};

export default BaseWhatsappButton;
