import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import blogUpper from "../../../../public/Images/blogUpper.png";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import Image from "next/image";
import Link from "next/link";

function BlogCardUpper() {
  return (
    <Link href="/category">
      <Grid
        container
        spacing={1}
        sx={{
          background: "#ffffff",
          boxShadow: "0px 4px 34px rgba(0, 0, 0, 0.08)",
          borderRadius: "8px",
          cursor: "pointer",
          display: {
            xs: "none",
            sm: "none",
            md: "none",
            lg: "inline-flex",
          },
          width: {
            xs: "100%",
            sm: "100%",
            md: "100%",
            lg: "120%",
            xl: "100%",
          },
        }}
      >
        <Grid item xs={4}>
          <Box sx={{ height: "50%" }}>
            <Image src={blogUpper} alt="blog" />
          </Box>
        </Grid>
        <Grid item xs={8} sx={{ mt: 4 }}>
          <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Typography
              variant="p"
              sx={{ fontSize: "12px", fontWeight: "400", color: "#7450F0" }}
            >
              Category
            </Typography>
            <Typography
              variant="p"
              sx={{ fontSize: "32px", fontWeight: "800", color: "#1A1859" }}
            >
              Lorem ipsum dolor amet
            </Typography>
            <Typography
              variant="p"
              sx={{
                fontSize: "16px",
                fontWeight: "400",
                color: "#7C7C99",
                lineHeight: "28px",
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do{" "}
              <br />
              eiusmod tempor incididunt ut labore et dolore magna adipiscing
              elit, <br />
              sed do eiusmod tempor incididunt ut labore et dolore magna <br />
            </Typography>
            <Button
              sx={{
                display: "flex",
                mt: 2,
                color: "#0E97F7",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "17px",
                textTransform: "none",
                ml: 0,
                p: 0,
              }}
            >
              <Typography variant="p">see article</Typography>
              <ArrowForwardOutlinedIcon />
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Link>
  );
}

export default BlogCardUpper;
