import React from "react";
import {
  Box,
  Grid,
  Typography,
  Container,
  ImageList,
  ImageListItem,
  Button,
} from "@mui/material";
import Image from "next/image";
import smallHome from "../../../../public/Images/Rectangle 1815.png";
import { _baseURL, _imageURL } from "../../../../consts";

function SlideImage({ Images, setSelectImage }) {
  const handleImageSelect = (data) => {
    setSelectImage(data?.file_path);
  };
  const myLoader = ({ src }) => {
    return `${_imageURL}/${src}`;
  };
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      {Images?.map((data, index) => (
        <Box sx={{ mb: 2 }} key={index} onClick={() => handleImageSelect(data)}>
          <Image
            loader={myLoader}
            src={`${data.file_path}`}
            width={100}
            height={100}
            alt="image"
          />
        </Box>
      ))}
      {/* <Box sx={{ mb: 2 }}>
        <Image src={smallHome} alt="home" />
      </Box>
      <Box sx={{ mb: 2 }}>
        <Image src={smallHome} alt="home" />
      </Box>
      <Box sx={{ mb: 2 }}>
        <Image src={smallHome} alt="home" />
      </Box> */}
    </Grid>
  );
}

export default SlideImage;
