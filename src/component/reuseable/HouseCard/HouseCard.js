import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import {
  Box,
  Grid,
  Typography,
  Container,
  IconButton,
  Stack,
  Button,
} from "@mui/material";
import houseImage from "../../../../public/Images/house.png";
import bed from "../../../../public/Images/bed.png";
import bath from "../../../../public/Images/bath.png";
import car from "../../../../public/Images/car.png";
import rule from "../../../../public/Images/rule.png";
import check from "../../../../public/Images/check.png";
import Image from "next/image";
const Footer = dynamic(() => import("@/component/shared/Footer/Footer"), {
  ssr: false,
});
import { _baseURL, _imageURL } from "../../../../consts";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import en from "locales/en";
import pt from "locales/pt";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";
import { MakeFavouriteApi, userDetailsApi } from "@/api";
import { formatBrazilianCurrency } from "@/utils/useUtilities";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import zIndex from "@mui/material/styles/zIndex";
function HouseCard({
  shadow,
  marginTop,
  propertyInfo,
  languageName,
  handleLoginOpen,
  imageSize,
}) {
  const t = languageName === "en" ? en : pt;
  const myLoader = ({ src }) => {
    console.log("🟥 ~ myLoader ~ src:", src);
    if (
      src ==
      "https://broadbits.com/wp-content/themes/ryse/assets/images/no-image/No-Image-Found-400x264.png"
    ) {
      return src;
    }
    return `${_imageURL}/${src}`;
  };

  console.log({ propertyInfo });

  const currentUser = useCurrentUser();

  const [favoriteList, setFavoriteList] = useState([]);

  useEffect(() => {
    if (currentUser?.wishList) {
      setFavoriteList(currentUser?.wishList.split(",").map(Number));
    }
  }, [currentUser]);

  // Function to toggle favorite status
  const toggleFavorite = (event, itemId) => {
    event.preventDefault();
    if (!currentUser?.id) {
      handleLoginOpen();
    } else {
      if (favoriteList?.includes(itemId)) {
        // Item is in favorite list, remove it
        setFavoriteList(favoriteList.filter((id) => id !== itemId));
        MakeFavouriteApi(itemId);
      } else {
        // Item is not in favorite list, add it
        setFavoriteList([...favoriteList, itemId]);
        MakeFavouriteApi(itemId);
      }
    }
  };
  const scrollContainerRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft < scrollWidth - clientWidth);
    }
  };

  useEffect(() => {
    checkScrollPosition();
    const handleScroll = () => checkScrollPosition();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const scrollLeft = (event) => {
    event.preventDefault();

    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = (event) => {
    event.preventDefault();
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };
  return (
    <Stack
      direction={"column"}
      sx={{
        backgroundColor: "#FFFFFF",
        borderRadius: "8px",
        pb: 3,
        boxShadow: shadow,
        marginTop: marginTop,
        cursor: "pointer",
        overflow: "hidden",
      }}
    >
      <Box sx={{ width: "100%", position: "relative" }}>
        <Image
          loader={myLoader}
          src={`${
            propertyInfo?.attachments?.find(
              (attachment) => attachment.title == "cover_photo"
            )?.file_path ||
            "https://broadbits.com/wp-content/themes/ryse/assets/images/no-image/No-Image-Found-400x264.png"
          }`}
          layout="responsive" // Automatically adjusts based on container
          width={imageSize?.width || 500}
          height={imageSize?.height || 400}
          alt="house"
        />
        <IconButton
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            zIndex: "1",
          }} // Position the favorite icon at the top right corner
          aria-label="favorite"
          color="primary" // Set the color of the icon
          onClick={(event) => toggleFavorite(event, propertyInfo?.id)} // Handle click event
        >
          <FavoriteIcon
            sx={{
              color: `${
                favoriteList?.includes(propertyInfo.id) ? "red" : "#ffffff"
              }`,
              // border: "2px solid black",
              // borderRadius: "500px",
              // p: 1,
              // width: "50px",
              // height: "50px",
            }}
          />
        </IconButton>
      </Box>
      <Stack
        container
        direction="column"
        justifyContent="space-between"
        alignItems="flex-start"
        sx={{ pl: 3, pt: 2 }}
      >
        <Box>
          <Typography
            variant="p"
            sx={{
              fontSize: "18px",
              fontWeight: "700",
              color: "#1A1859",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1,
              textOverflow: "ellipsis",
            }}
          >
            {propertyInfo?.property_title.length > 25
              ? `${propertyInfo?.property_title.slice(0, 25)}..`
              : propertyInfo?.property_title}
          </Typography>

          <Typography
            variant="p"
            sx={{ fontSize: "16px", fontWeight: "400", color: "#1A1859" }}
          >
            {`${propertyInfo?.address?.city},${propertyInfo?.address?.state?.name}`}
          </Typography>
        </Box>
        <Stack direction={"column"}>
          <Typography
            variant="p"
            sx={{
              fontSize: "12px",
              fontWeight: "400",
              color: "#7C7C99",
              pt: 2,
            }}
          >
            {`${t["sale value"]}:`}
          </Typography>
          <Typography
            variant="p"
            sx={{ fontSize: "24px", fontWeight: "800", color: "#0E97F7" }}
          >
            <span
              style={{
                fontSize: "16px",
                fontWeight: "400",
                color: "#0E97F7",
              }}
            >
              R$
            </span>
            {` ${formatBrazilianCurrency(propertyInfo?.brl_rent).slice(2)}`}
          </Typography>
        </Stack>
      </Stack>
      <Stack
        // container
        direction="row"
        // justifyContent="space-between"
        spacing={2}
        alignItems="center"
        sx={{
          mt: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            // paddingRight: "10px",
            position: "relative",
            // backgroundColor: "red",
            zIndex: 100,
            // mt: "auto",
          }}
        >
          {showLeftButton && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                zIndex: 111,
                bgcolor: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconButton
                variant="contained"
                size="small"
                onClick={(event) => scrollLeft(event)}
                sx={{
                  "&:hover": {
                    bgcolor: "white",
                  },
                }}
              >
                <ChevronLeftIcon />
              </IconButton>
            </Box>
          )}
          {showRightButton && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                bottom: 0,
                right: 0,
                zIndex: 111,
                bgcolor: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconButton
                variant="contained"
                size="small"
                onClick={(event) => scrollRight(event)}
                sx={{
                  "&:hover": {
                    bgcolor: "white",
                  },
                }}
              >
                <ChevronRightIcon />
              </IconButton>
            </Box>
          )}
          <Stack
            direction={"row"}
            ref={scrollContainerRef}
            sx={{
              display: "flex",
              overflowX: "auto",
              whiteSpace: "nowrap",
              px: 1,
            }}
            spacing={1}
          >
            {+propertyInfo?.land_area > 0 && (
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={1}
                sx={{
                  bgcolor: "#F6F5F5",
                  py: 1,
                  px: 2,
                  borderRadius: "5px",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.1em"
                  height="1.1em"
                  viewBox="0 0 32 32"
                >
                  <path
                    fill="#7C7C99"
                    d="m6.63 21.796l-5.122 5.12H27.25V1.177zM18.702 10.48a.47.47 0 0 1 .664 0l1.16 1.16a.466.466 0 1 1-.66.661l-1.164-1.16a.468.468 0 0 1 0-.662zm-1.6 1.604a.465.465 0 0 1 .66 0l2.157 2.154a.465.465 0 0 1 0 .66a.463.463 0 0 1-.663.003L17.1 12.748a.469.469 0 0 1 0-.663zm-1.605 1.6a.472.472 0 0 1 .664 0l1.16 1.162a.467.467 0 0 1-.33.8a.469.469 0 0 1-.333-.138l-1.16-1.16a.471.471 0 0 1 0-.665zm-1.6 1.604a.47.47 0 0 1 .663.002l1.158 1.16a.468.468 0 1 1-.664.662l-1.158-1.16a.47.47 0 0 1 0-.664zm-1.604 1.604a.467.467 0 0 1 .663 0l2.154 2.153a.47.47 0 1 1-.664.665l-2.153-2.155a.469.469 0 0 1 0-.663m-1.99 7.623a.468.468 0 0 1-.663.002l-2.154-2.153a.468.468 0 1 1 .662-.663l2.154 2.154a.465.465 0 0 1 0 .66zm.61-2.597a.476.476 0 0 1-.334.14a.46.46 0 0 1-.33-.138l-1.163-1.16a.464.464 0 0 1 0-.66a.467.467 0 0 1 .664-.004l1.162 1.162a.465.465 0 0 1 0 .66zm1.6-1.602a.465.465 0 0 1-.662 0l-1.16-1.16a.468.468 0 1 1 .664-.662l1.16 1.16a.47.47 0 0 1 0 .662zm9.737 1.6h-8.67l8.67-8.67zM22.13 10.7a.46.46 0 0 1-.33.138a.473.473 0 0 1-.334-.138l-1.16-1.16a.468.468 0 1 1 .662-.662l1.16 1.16c.184.183.185.48.002.662m2.596-.608a.469.469 0 0 1-.662-.001L21.91 7.938a.468.468 0 1 1 .664-.662l2.154 2.154c.183.183.18.48-.002.662"
                  ></path>
                </svg>
                <Typography
                  variant="p"
                  sx={{
                    fontSize: "14px",
                    fontWeight: "400",
                    color: "#7C7C99",
                  }}
                >
                  {`${propertyInfo?.land_area} m² of terra`}
                </Typography>
              </Stack>
            )}
            {+propertyInfo?.property_area > 0 && (
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={1}
                sx={{
                  bgcolor: "#F6F5F5",
                  py: 1,
                  px: 2,
                  borderRadius: "5px",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.1em"
                  height="1.1em"
                  viewBox="0 0 26 26"
                >
                  <path
                    fill="#7C7C99"
                    d="M19 .063a.8.8 0 0 0-.188.03a.8.8 0 0 0-.375.22L.313 18.438a.8.8 0 0 0 0 1.093l6.157 6.157a.8.8 0 0 0 .656.218a.8.8 0 0 0 .438-.218L25.688 7.563a.8.8 0 0 0 0-1.094L19.53.312a.8.8 0 0 0-.06-.062a.8.8 0 0 0-.032-.031a.8.8 0 0 0-.28-.125A.8.8 0 0 0 19 .062zm-.031 1.968l5 4.969L7 23.969L2 19l1.219-1.219l1.531 1.532a.8.8 0 0 0 .781.28a.8.8 0 0 0 .157-.062a.8.8 0 0 0 .062-.031a.8.8 0 0 0 .156-.094a.8.8 0 0 0 .032-.031a.8.8 0 0 0 .125-.125a.8.8 0 0 0-.188-1.063l-1.531-1.53l1-1l1.531 1.53a.8.8 0 0 0 .781.282a.8.8 0 0 0 .157-.063a.8.8 0 0 0 .062-.031a.8.8 0 0 0 .156-.094a.8.8 0 0 0 .031-.031a.8.8 0 0 0 .126-.125A.8.8 0 0 0 8 16.062l-1.531-1.53l1-1l2.906 2.937a.8.8 0 0 0 .188.156a.8.8 0 0 0 .062.031a.8.8 0 0 0 .156.063a.8.8 0 0 0 .063.031a.8.8 0 0 0 .312 0a.8.8 0 0 0 .156-.063a.8.8 0 0 0 .063-.03a.8.8 0 0 0 .156-.095a.8.8 0 0 0 .031-.03a.8.8 0 0 0 .126-.126a.8.8 0 0 0-.188-1.062l-2.906-2.938l.969-.969l1.53 1.5a.807.807 0 0 0 .813.22a.807.807 0 0 0 .406-.282a.807.807 0 0 0-.062-1.063l-1.531-1.53l.969-.97l1.53 1.5a.807.807 0 0 0 .813.22a.807.807 0 0 0 .406-.282a.807.807 0 0 0-.062-1.063l-1.531-1.53l.969-.97l2.937 2.907a.8.8 0 0 0 .406.25a.8.8 0 0 0 .063.031a.8.8 0 0 0 .312 0a.8.8 0 0 0 .157-.063a.8.8 0 0 0 .062-.03a.8.8 0 0 0 .156-.095a.8.8 0 0 0 .032-.03a.8.8 0 0 0 .125-.126a.8.8 0 0 0-.188-1.062l-2.938-2.906l1-1l1.532 1.53a.807.807 0 0 0 .75.22a.807.807 0 0 0 .156-.063a.807.807 0 0 0 .063-.031a.807.807 0 0 0 .125-.094a.807.807 0 0 0 .03-1.188l-1.53-1.5z"
                  ></path>
                </svg>
                <Typography
                  variant="p"
                  sx={{
                    fontSize: "14px",
                    fontWeight: "400",
                    color: "#7C7C99",
                  }}
                >
                  {`${propertyInfo?.property_area} m² of construção`}
                </Typography>
              </Stack>
            )}
            {+propertyInfo?.no_of_rooms > 0 && (
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={1}
                sx={{
                  bgcolor: "#F6F5F5",
                  py: 1,
                  px: 2,
                  borderRadius: "5px",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.1em"
                  height="1.1em"
                  viewBox="0 0 56 56"
                >
                  <path
                    fill="#7C7C99"
                    d="M1.902 46.723h1.3c1.136 0 1.878-.72 1.878-1.856v-3.294c.255.07.998.116 1.531.116h42.8c.534 0 1.254-.047 1.509-.116v3.294c0 1.137.742 1.856 1.879 1.856h1.322c1.137 0 1.879-.72 1.879-1.856V29.742c0-3.967-2.018-6.194-5.753-6.473V15.66c0-4.106-2.18-6.193-6.17-6.193H11.924c-3.967 0-6.17 2.087-6.17 6.193v7.61C2.017 23.547 0 25.774 0 29.741v15.125c0 1.137.742 1.856 1.902 1.856m9.674-27.583c0-2.041 1.136-3.178 3.224-3.178h7.772c2.064 0 3.224 1.137 3.224 3.178v4.106h-14.22Zm18.651 0c0-2.041 1.137-3.178 3.225-3.178H41.2c2.087 0 3.248 1.137 3.248 3.178v4.106h-14.22ZM4.64 38.302c-.464 0-.766-.325-.766-.859v-8.05c0-1.693 1.114-2.76 2.83-2.76H49.32c1.693 0 2.807 1.067 2.807 2.76v8.05c0 .534-.302.859-.742.859Z"
                  ></path>
                </svg>
                <Typography
                  variant="p"
                  sx={{
                    fontSize: "14px",
                    fontWeight: "400",
                    color: "#7C7C99",
                  }}
                >
                  {`${propertyInfo?.no_of_rooms} ${t["bedrooms"]}`}
                </Typography>
              </Stack>
            )}
            {+propertyInfo?.no_of_suites > 0 && (
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={1}
                sx={{
                  width: "100%",
                  minWidth: "170px",
                  bgcolor: "#F6F5F5",
                  py: 1,
                  px: 2,
                  borderRadius: "5px",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.1em"
                  height="1.1em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#7C7C99"
                    d="M7 12.5a3 3 0 1 0-3-3a3 3 0 0 0 3 3m0-4a1 1 0 1 1-1 1a1 1 0 0 1 1-1m13-2h-8a1 1 0 0 0-1 1v6H3v-8a1 1 0 0 0-2 0v13a1 1 0 0 0 2 0v-3h18v3a1 1 0 0 0 2 0v-9a3 3 0 0 0-3-3m1 7h-8v-5h7a1 1 0 0 1 1 1Z"
                  ></path>
                </svg>

                <Typography
                  variant="p"
                  sx={{
                    fontSize: "14px",
                    fontWeight: "400",
                    color: "#7C7C99",
                  }}
                >
                  {`${propertyInfo?.no_of_suites} ${t["suites"]}`}
                </Typography>
              </Stack>
            )}
            {+propertyInfo?.no_of_bathrooms > 0 && (
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={1}
                sx={{
                  width: "100%",
                  minWidth: "170px",
                  bgcolor: "#F6F5F5",
                  py: 1,
                  px: 2,
                  borderRadius: "5px",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.1em"
                  height="1.1em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="#7C7C99"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="m6 20l-1 1m13-1l1 1M3 12v1c0 3.3 0 4.95 1.025 5.975S6.7 20 10 20h4c3.3 0 4.95 0 5.975-1.025S21 16.3 21 13v-1M2 12h20M4 12V5.523a2.523 2.523 0 0 1 4.943-.715L9 5M8 6l2.5-2"
                    color="currentColor"
                  ></path>
                </svg>
                <Typography
                  variant="p"
                  sx={{
                    fontSize: "14px",
                    fontWeight: "400",
                    color: "#7C7C99",
                  }}
                >
                  {`${propertyInfo?.no_of_bathrooms} ${t["bathrooms"]}`}
                </Typography>
              </Stack>
            )}
            {+propertyInfo?.no_of_parking_spaces > 0 && (
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={1}
                sx={{
                  bgcolor: "#F6F5F5",
                  py: 1,
                  px: 2,
                  borderRadius: "5px",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.1em"
                  height="1.1em"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill="#7C7C99"
                    d="M14 1.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5H17v11.5a.5.5 0 0 1-1 0V7h-1.5a.5.5 0 0 1-.5-.5zM13 3H6.14a2.5 2.5 0 0 0-2.452 2.01L3.49 6h-.74a.75.75 0 0 0 0 1.5h.44l-.111.56A1.5 1.5 0 0 0 2 9.5v5A1.5 1.5 0 0 0 3.5 16H4v1a1 1 0 1 0 2 0v-1h8v1a1 1 0 0 0 1 1v-3H3.5a.5.5 0 0 1-.5-.5v-5a.5.5 0 0 1 .5-.5H15V8H4.11l.559-2.794A1.5 1.5 0 0 1 6.139 4H13zm2 9a1 1 0 1 0-2 0a1 1 0 0 0 2 0m-8 0a1 1 0 1 0-2 0a1 1 0 0 0 2 0"
                  ></path>
                </svg>
                <Typography
                  variant="p"
                  sx={{
                    fontSize: "14px",
                    fontWeight: "400",
                    color: "#7C7C99",
                  }}
                >
                  {`${propertyInfo?.no_of_parking_spaces} ${t["parking space"]}`}
                </Typography>
              </Stack>
            )}
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={1}
              sx={{
                width: "100%",
                minWidth: "170px",
                bgcolor: "#F6F5F5",
                py: 1,
                px: 2,
                borderRadius: "5px",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.1em"
                height="1.1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#7C7C99"
                  d="m10.6 16.2l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4zM5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm0-2h14V5H5zM5 5v14z"
                ></path>
              </svg>
              <Typography
                variant="p"
                sx={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#7C7C99",
                  ml: "0.5vh",
                }}
              >
                {`${t[propertyInfo?.property_type]}`}
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Stack>
  );
}

export default HouseCard;
