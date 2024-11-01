import { Box, Button, Grid, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import smallCardImage from "../../../../public/Images/smallBlogCard.png";
import { AccountCircle } from "@mui/icons-material";
import Link from "next/link";

function SmallBlogCard() {
  return (
    <Link href="/category">
      <Box
        sx={{
          background: "#ffffff",
          boxShadow: "0px 2px 12px rgba(0, 0, 0, 0.08)",
          borderRadius: "8px",
          mb: 2,
          width: { xs: "99%", sm: "97%", md: "100%" },
          cursor: "pointer",
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={5}>
            <Box sx={{ ml: { xs: 0, sm: 1, md: 1, lg: 1, xl: 1 } }}>
              <Image height={200} src={smallCardImage} alt="smallBlogCard" />
            </Box>
          </Grid>
          <Grid item xs={7}>
            <Grid
              container
              direction="column"
              sx={{ height: "18vh" }}
              justifyContent={{
                xs: "start",
                sm: "start",
                md: "center",
              }}
              alignItems="flex-start"
            >
              <Typography
                variant="p"
                sx={{
                  color: "#7450F0",
                  fontSize: "10px",
                  fontWeight: "400",
                  lineHeight: "12px",
                }}
              >
                Category
              </Typography>
              <Typography
                variant="p"
                sx={{
                  color: "#1A1859",
                  fontSize: "16px",
                  fontWeight: "700",
                  lineHeight: "19px",
                }}
              >
                Lorem Ipsum dolor amet
              </Typography>
              <Typography
                variant="p"
                sx={{
                  color: "#7C7C99",
                  fontSize: { xs: "10px", sm: "10px", md: "12px" },
                  fontWeight: "400",
                  lineHeight: "18px",
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
                    fontSize: "10px",
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
          </Grid>
        </Grid>
      </Box>
    </Link>
  );
}

export default SmallBlogCard;
