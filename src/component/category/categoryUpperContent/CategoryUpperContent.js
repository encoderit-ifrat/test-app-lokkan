import { AccountCircle } from "@mui/icons-material";
import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";

function CategoryUpperContent() {
  return (
    <Box
      sx={{
        px: 2,
        py: 5,
        background: "#ffffff",
        boxShadow: "0px 4px 34px rgba(0, 0, 0, 0.08)",
        borderRadius: "8px",
      }}
    >
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Typography
          variant="p"
          sx={{
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "28px",
            color: "#7450F0",
          }}
        >
          Category
        </Typography>
        <Typography
          variant="p"
          sx={{
            mt: 2,
            fontSize: "32px",
            fontWeight: "800",
            lineHeight: "38px",
            color: "#1A1859",
          }}
        >
          Lorem ipsum dolor amet, consectur elit sed elmond
        </Typography>
        <Button sx={{ display: "flex", padding: 0, mt: 2 }}>
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

        <Typography
          variant="p"
          sx={{
            mt: 3,
            fontSize: "16px",
            fontWeight: "400",
            lineHeight: "26px",
          }}
        >
          On August 6, 2018, we shared this photo on Instagram to celebrate
          FullStorys 100th employee. Today, just over a year later, we are
          almost 225 strong. Crazy. &#55358&#56623 &quot;This morning our 100th
          employee walked through our doors!&quot; via Instagram.
          <br />
          <br />
          <br />
          And we have no plans to stop. We want to change the world of digital
          experience and — to do that — we need customer experience enthusiasts
          and software geeks, including a team of talented sellers.
          <br />
          <br />
          <br />
          To lead this stellar sales team, we knew we needed to bring in a
          seasoned sales leader who shared our mission to make the web a better
          place, brought an analytical approach to scaling sales teams, and had
          a track record to back it up. Enter Jamie Garverick, Head of Sales at
          FullStory.
          <br />
          <br />
          <br />
          We sat down with Jamie to talk about what brought him to FullStory and
          his plan to shape our sales team. Heres what he had to say. What Are
          Your Career Highlights?
        </Typography>
        <Typography
          variant="p"
          sx={{ mt: 2, color: "#1A1859", fontSize: "24px", fontWeight: "700" }}
        >
          Jamie Garverick, Head of Sales at FullStory
        </Typography>
        <Typography
          variant="p"
          sx={{
            mt: 3,
            fontSize: "16px",
            fontWeight: "400",
            lineHeight: "26px",
          }}
        >
          My career highlights include being part of the growth at
          CallidusCloud, which sold to SAP for $2.5B. In the 15 years I spent
          there, I helped grow a sales team from 30 people to over 100 and
          quintupled our annual recurring revenue (ARR). One of the best parts
          of that experience was the opportunity afforded me to build strong
          relationships with amazing and talented folks. What Drew You to
          FullStory?
          <br />
          <br />
          <br />
          Many things attracted me to FullStory. At the top of the list were the
          people. I could tell from the start that FullStory is a group of
          talented, principled, and hard-working individuals. I am excited to be
          working with such a great team.
          <br />
          <br />
          <br />
          Next, is the opportunity FullStory has in the market. We are at the
          culmination of two major trends: First, increasing growth in the
          number of companies spending money on customer digital experience and
          second, the growth in time spent online. I am thrilled to position
          FullStory as the defacto market leader.
        </Typography>
      </Grid>
    </Box>
  );
}

export default CategoryUpperContent;
