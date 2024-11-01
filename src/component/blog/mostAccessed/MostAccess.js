import { Box, Divider, Grid, Typography } from "@mui/material";
import React from "react";

function MostAccess() {
  return (
    <Box>
      <Typography
        variant="p"
        sx={{
          fontSize: "12px",
          fontWeight: "400",
          lineHeight: "28px",
          color: "#7450F0",
        }}
      >
        Most Accessed
      </Typography>

      {[0, 1, 2, 3].map((data, index) => (
        <Box key={index} sx={{ mt: 1 }}>
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
                fontWeight: "700",
                lineHeight: "17px",
                color: "#1A1859",
              }}
            >
              Lorem Ipsum dolor amet
            </Typography>
            <Typography
              variant="p"
              sx={{
                fontSize: "12px",
                fontWeight: "400",
                lineHeight: "20px",
                color: "#7C7C99",
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipi...
            </Typography>
          </Grid>
          <Box sx={{ pr: 5 }}>
            <Divider />
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default MostAccess;
