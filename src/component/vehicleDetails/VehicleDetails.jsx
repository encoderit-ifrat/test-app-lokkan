import React, { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const VehicleDetails = ({ car }) => {
  console.log({ car });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % car?.media?.length);
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, [car?.media?.length]);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % car?.media?.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? car?.media?.length - 1 : prevIndex - 1
    );
  };
  const myLoader = ({ src }) => {
    return `${src}`;
  };

  return (
    <Box sx={{ mb: 4, mt: 2 }}>
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Typography
          variant="p"
          sx={{
            fontWeight: "bold",
            color: "#3f51b5",
            mb: 1,
            textTransform: "none",
            letterSpacing: "0.1rem",
          }}
        >
          {t["Brand"]}: {car?.brand}
        </Typography>
        <br />
        <Typography
          variant="p"
          sx={{
            fontWeight: "bold",
            color: "#3f51b5",
            mb: 1,
            textTransform: "none",
            letterSpacing: "0.1rem",
          }}
        >
          {t["Model"]}: {car?.model}
        </Typography>
        <br />

        <Typography
          variant="p"
          sx={{
            fontWeight: "bold",
            color: "#3f51b5",
            mb: 1,
            textTransform: "none",
            letterSpacing: "0.1rem",
          }}
        >
          {t["Year"]}: {car?.year}
        </Typography>
      </Box>
      {car?.media?.length > 0 && (
        <Box
          position="relative"
          sx={{ width: "100%", height: "300px", overflow: "hidden" }}
        >
          <Box position="relative" sx={{ width: "100%", height: "100%" }}>
            <Image
              loader={myLoader}
              src={car?.media[currentImageIndex]?.media_url}
              alt={`${car?.brand} ${car?.model}`}
              layout="fill"
              objectFit="cover"
              quality={75}
              priority
            />
          </Box>
          <Button
            onClick={handlePrevImage}
            sx={{
              position: "absolute",
              top: "50%",
              left: 0,
              transform: "translateY(-50%)",
              color: "white",
              backgroundColor: "#1976d2", // Blue background
              "&:hover": { backgroundColor: "#1565c0" }, // Darker blue on hover
              zIndex: 1,
              minWidth: "40px",
              minHeight: "40px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ArrowBackIosIcon />
          </Button>
          <Button
            onClick={handleNextImage}
            sx={{
              position: "absolute",
              top: "50%",
              right: 0,
              transform: "translateY(-50%)",
              color: "white",
              backgroundColor: "#1976d2", // Blue background
              "&:hover": { backgroundColor: "#1565c0" }, // Darker blue on hover
              zIndex: 1,
              minWidth: "40px",
              minHeight: "40px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ArrowForwardIosIcon />
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default VehicleDetails;
