import { LinearProgress, Stack, Typography } from "@mui/material";
import React from "react";

const BaseLinearRating = ({ count, percentage }) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={2}
      sx={{
        color: "#6C7A84",
        size: "12px",
        fontWeight: 400,
        width: "100%",
      }}
    >
      <Typography>{count}</Typography>
      <LinearProgress
        value={percentage}
        sx={{
          height: "15px",
          backgroundColor: "#EEEEEE",
          borderRadius: "3px",
          width: "100%",
          "& .MuiLinearProgress-bar": {
            backgroundColor: "#FFAB00", // Change to your desired color
          },
        }}
        variant="determinate"
      />
      <Typography>{percentage.toFixed(2)}%</Typography>
    </Stack>
  );
};

export default BaseLinearRating;
