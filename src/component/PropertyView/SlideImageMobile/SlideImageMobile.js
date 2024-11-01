import { Box, Grid } from "@mui/material";
import { _imageURL } from "consts";
import Image from "next/image";
import React from "react";

function SlideImageMobile({ Images, setSelectImage }) {
  const handleImageSelect = (data) => {
    setSelectImage(data?.file_path);
  };
  const myLoader = ({ src }) => {
    return `${_imageURL}/${src}`;
  };
  return (
    <Grid container spacing={1}>
      {Images?.map((data, index) => (
        <Grid
          item
          key={index}
          xs={3}
          sx={{
            display: {
              xs: "inline",
              sm: "inline",
              md: "none",
              lg: "none",
              xl: "none",
            },
          }}
        >
          <Box
            // sx={{ mb: 2 }}
            // key={index}
            onClick={() => handleImageSelect(data)}
          >
            <Image
              loader={myLoader}
              src={`${data.file_path}`}
              width={100}
              height={100}
              alt="image"
            />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}

export default SlideImageMobile;
