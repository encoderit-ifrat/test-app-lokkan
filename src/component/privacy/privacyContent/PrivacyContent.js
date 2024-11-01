import { AccountCircle } from "@mui/icons-material";
import { Box, Button, Grid, Link, Typography } from "@mui/material";
import React from "react";

function PrivacyContent({ name, contents = [], children }) {
  return (
    <Box
      sx={{
        px: { xs: 0, sm: 0, md: 2, lg: 2, xl: 2 },
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
        sx={{ px: 6 }}
      >
        <Typography
          variant="p"
          sx={{
            fontSize: "32px",
            fontWeight: "800",
            lineHeight: "38px",
            color: "#1A1859",
          }}
        >
          {name}
        </Typography>
        {/* <Typography
          variant="p"
          sx={{
            mt: 2,
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "20px",
            color: "#7C7C99",
          }}
        >
          Date of last change: 06/24/2022
        </Typography> */}
        {contents.map((data) => (
          <>
            <Typography
              variant="p"
              sx={{
                mt: 3,
                fontSize: "24px",
                fontWeight: "800",
                lineHeight: "26px",
                color: "#1A1859",
                textTransform: "none",
              }}
            >
              {/* 1. Introduction */}
              {data.title}
            </Typography>

            <Typography
              variant="p"
              sx={{
                mt: 2,
                fontSize: "16px",
                fontWeight: "400",
                lineHeight: "26px",
              }}
            >
              {/* <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mi iaculis
            just, egestas ultrices leo. Et arcu lacus, diam tellus. Mattis
            aliquet risus ipsum leo. Tempus ut habitant massa, nisl blandit
            auctor elementum. Interdum id massa nec amet odio pretium tempus dui
            pulvinar. Phasellus faucibus odio lacus, amet, just. Sollicitudin
            nisi lorem et lobortis enim est ultrices id sit. Ultrices integer
            proin sit risus.
            <br />
            <br />
            Montes, eget nisl ipsum nisl in nibh pulvinar laoreet. Vestibulum,
            ac, orci risus neque venenatis. Aliquam, egestas ornare felis luctus
            malesuada placerat. Dui tincidunt feugiat lorem eu. Ut urna nulla
            auctor elementum sed amet. Leo convallis nunc et feugiat molestie
            duis. Vestibulum facilisis tristique metus, diam mattis. Amet,
            turpis imperdiet nibh sollicitudin massa felis mattis. Egestas
            nullam magna volutpat non, auctor integer. Me, dolor a et vivera
            turpis proin. Mi, lacus arcu etiam nam dolor. Rhoncus vitae quam in
            magna eu nibh. Vestibulum, laoreet quam aenean porttitor facilisi id
            gravida facilisis. In venenatis volutpat quisque faucibus amet eu
            sed ac eget. Quis arcu, aliquam placerat est amet massa pellentesque
            enim. Nisl ipsum tortor semper arcu ut. Venenatis diam malesuada
            neque leo non sagittis, aliquet imperdiet. Pellentesque non odio
            turpis urna, felis, et. Proin eu etiam eu, turpis dignissim.
            Facilisis lacinia lectus ultricies facilisis quam commodo facilisis.
            Dolor qui turpis sodales proin dictum. Condimentum magna tempus
            vitae non nulla at et vivera scelerisque. Vivamus consequat massa
            consectetur at purus. In lacus, interdum orci, consectetur nibh sit.
            A mauris porttitor mi venenatis a neque, pellentesque sed semper.
            Sit sit turpis nisi cras amet dui. Tortor time, eros, even quisque
            ultrices sed lacus, quis netus.
          </p> */}
              {data.description}
            </Typography>
          </>
        ))}
        {children}
      </Grid>
    </Box>
  );
}

export default PrivacyContent;
