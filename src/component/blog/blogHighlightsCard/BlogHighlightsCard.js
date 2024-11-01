import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import React from "react";
import highlightImage from "../../../../public/Images/highlightImage.png";
import Image from "next/image";
import { AccountCircle } from "@mui/icons-material";
import Link from "next/link";

function BlogHighlightsCard() {
  return (
    <Link href="/category">
      <Box
        sx={{
          background: "#ffffff",
          boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.08)",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Image src={highlightImage} layout="responsive" alt="house" />
        </Box>
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          sx={{ px: 2, pt: 2, pb: 4 }}
        >
          <Typography
            variant="p"
            sx={{ color: "#7450F0", fontSize: "12px", fontWeight: 400 }}
          >
            Category
          </Typography>
          <Typography
            variant="p"
            sx={{
              fontSize: "18px",
              fontWeight: "700",
              lineHeight: "22px",
              color: "#1A1859",
            }}
          >
            Lorem Ipsum dolor amet
          </Typography>
          <Typography
            variant="p"
            sx={{
              fontSize: "16px",
              fontWeight: "400",
              lineHeight: "28px",
              color: " #7C7C99",
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna...
          </Typography>
          <Button sx={{ display: "flex", padding: 0 }}>
            <AccountCircle />

            <Typography
              variant="p"
              sx={{
                fontSize: "12px",
                fontWeight: "400",
                lineHeight: "20px",
                color: "#7C7C99",
                textTransform: "none",
              }}
            >
              Author&apos;s name - 09/12/2019
            </Typography>
          </Button>
        </Grid>
      </Box>
    </Link>
  );
}

export default BlogHighlightsCard;
