import useWindowDimensions from "@/hooks/useCurrentDisplaySize";
import { Box } from "@mui/material";
import { _imageURL } from "consts";
import Image from "next/image";
import React, { useState } from "react";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";

const ImageCarousel = ({ imageUrls, imagesPerSlide }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const totalSlides = Math.ceil(imageUrls.length / imagesPerSlide);

  const onPrevClick = () => {
    setCurrentSlideIndex(
      (prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides
    );
  };

  const onNextClick = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  const myLoader = ({ src }) => {
    return `${_imageURL}/${src}`;
  };

  // const { width, height } = useWindowDimensions();

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      {/* Image grid */}
      <Box
        sx={{
          display: "flex",
          gap: 1,
          position: "relative",
          width: "100%",
          height: "100%",
          backgroundColor: "#B4B4B8",
        }}
      >
        {imageUrls
          .slice(
            currentSlideIndex * imagesPerSlide,
            (currentSlideIndex + 1) * imagesPerSlide
          )
          .map((imageUrl, index) => (
            <Image
              key={index}
              className="carousel-image"
              loader={myLoader}
              src={imageUrl}
              // width="100%"
              // height="100%"
              alt={`image_${index}`}
              layout={"fill"}
              // layout={"responsive"}
              objectFit="contain"
            />
          ))}
      </Box>

      <Box
        style={{
          display: "flex",
          position: "absolute",
          bottom: "50px",
          right: "50px",
        }}
      >
        <button
          style={{
            background: "#F2F5F6",
            borderRadius: "1111px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px",
            cursor: "pointer",
            border: "none",
          }}
          onClick={onPrevClick}
        >
          <ArrowBackIosOutlinedIcon
            sx={{
              color: "grey",
              fontSize: "16px",
            }}
          />
        </button>
        <button
          style={{
            background: "#0362F0",
            borderRadius: "1111px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px",
            cursor: "pointer",
            border: "none",
            marginLeft: "10px",
          }}
          onClick={onNextClick}
        >
          <ArrowForwardIosOutlinedIcon
            sx={{
              color: "#ffffff",
              fontSize: "16px",
            }}
          />
        </button>
      </Box>
    </div>
  );
};

export default ImageCarousel;
