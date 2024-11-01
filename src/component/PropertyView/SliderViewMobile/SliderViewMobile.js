import { Container, Stack } from "@mui/material";
import React from "react";
import dynamic from "next/dynamic";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PhoneIcon from "@mui/icons-material/Phone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import AutoAwesomeMotionOutlinedIcon from "@mui/icons-material/AutoAwesomeMotionOutlined";
import RedoOutlinedIcon from "@mui/icons-material/RedoOutlined";
import CabinOutlinedIcon from "@mui/icons-material/CabinOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import SignpostOutlinedIcon from "@mui/icons-material/SignpostOutlined";
import BaseGoogleMap from "../../IAmOwner/map/BaseGoogleMap";
import { Grid } from "@mui/material";
import { _baseURL, _imageURL } from "../../../../consts";
import BaseStreetView from "../../reuseable/baseStreetView/BaseStreetView";
import PropTypes from "prop-types";
import OndemandVideoOutlinedIcon from "@mui/icons-material/OndemandVideoOutlined";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import en from "locales/en";
import pt from "locales/pt";
import Image from "next/image";
import VideoCarousel from "../VideoCarousel/VideoCarousel";
import { getVideoIdFromLink } from "@/utils/getVideoIdFromLink";
import Slider from "react-slick";
const BaseShareButton = dynamic(
  () => import("@/component/reuseable/baseShareButton/BaseShareButton"),
  {
    ssr: false,
  }
);
import BaseFavoriteButton from "@/component/reuseable/baseFavoriteButton/BaseFavoriteButton";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography component={"span"} variant={"body2"}>
            {children}
          </Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

function SliderViewMobile({
  sideTabValue,
  setSideTabValue,
  selectImage,
  addressData,
  videos,
  languageName,
  images,
  singlePropertyData,
  shareUrl,
}) {
  const imageUrls = images?.map((data) => {
    return data?.file_path;
  });
  const t = languageName === "en" ? en : pt;

  const [value, setValue] = React.useState(0);

  const videoIds = videos?.map((data) => {
    console.log({ data });
    const videoId = getVideoIdFromLink(data?.file_path);
    return videoId;
  });

  //   function get_url_extension( selectImage ) {
  //     return selectImage.split(/[#?]/)[0].split('.').pop().trim();
  // }

  const handleChange = (event, newValue) => {
    setValue(+newValue);
  };

  const markersData = {
    properties: {
      data: [
        {
          id: 1,
          address: {
            latitude: +addressData?.latitude,
            longitude: addressData?.longitude,
          },
        },
      ],
    },
  };

  const config = {
    autoLoad: true,
  };
  const style = {
    width: "850px",
    height: "450px",
    // background: "#000000",
  };

  const handleTabClick = (data) => {
    setSideTabValue(data);
  };

  const myLoader = ({ src }) => {
    return `${_imageURL}/${src}`;
  };
  const sliderSettings = {
    dots: false,
    lazyLoad: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
  };
  return (
    <Container maxWidth="sm" sx={{ p: 0, position: "relative" }}>
      <Stack
        direction="row"
        spacing={1}
        sx={{
          display: {
            xs: "flex",
            md: "none",
          },
          position: "absolute",
          top: 60,
          right: "20px",
          zIndex: 2,
        }}
      >
        <BaseShareButton bg base_url={shareUrl} />
        <BaseFavoriteButton
          // handleLoginOpen={handleLoginOpen}
          bg
          itemID={singlePropertyData?.property?.id}
        />
      </Stack>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="icon label tabs example"
        variant="scrollable"
      >
        <Tab
          sx={{ minWidth: "60px" }}
          onClick={() => handleTabClick("photos")}
          icon={<AutoAwesomeMotionOutlinedIcon />}
        />

        <Tab
          sx={{ minWidth: "60px" }}
          icon={<CabinOutlinedIcon />}
          onClick={() => handleTabClick("condominium")}
        />
        <Tab
          sx={{ minWidth: "60px" }}
          icon={<MapOutlinedIcon />}
          onClick={() => handleTabClick("location")}
        />
        <Tab
          sx={{ minWidth: "60px" }}
          icon={<SignpostOutlinedIcon />}
          onClick={() => handleTabClick("street_view")}
        />
        <Tab
          sx={{ minWidth: "60px" }}
          icon={<OndemandVideoOutlinedIcon />}
          onClick={() => handleTabClick("videos")}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        {selectImage != null ? (
          <Box>
            <Slider {...sliderSettings}>
              {imageUrls.map((image, index) => (
                <Box
                  sx={{
                    background: "#f1f1f1",
                    aspectRatio: "1 / 1",
                  }}
                  key={index}
                >
                  <Image
                    loader={myLoader}
                    src={image}
                    alt="home"
                    width={"100%"}
                    height={"100%"}
                    layout="responsive"
                    objectFit="cover"
                  />
                </Box>
              ))}
            </Slider>
          </Box>
        ) : (
          <Box
            sx={{
              background: "#f1f1f1",
              aspectRatio: "1 / 1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="p"
              sx={{
                color: " #7450F0",
                fontWeight: "600",
                fontSize: "20px",
              }}
            >
              nenhuma imagem encontrada
            </Typography>
          </Box>
        )}
      </TabPanel>

      <TabPanel value={value} index={1}>
        {selectImage != null ? (
          <Box
            sx={{
              background: "#f1f1f1",
              aspectRatio: "1 / 1",
            }}
          >
            <Image
              loader={myLoader}
              src={`${selectImage}`}
              alt="home"
              width={"100%"}
              height={"100%"}
              layout="responsive"
              objectFit="cover"
            />
          </Box>
        ) : (
          <Box
            sx={{
              background: "#f1f1f1",
              aspectRatio: "1 / 1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="p"
              sx={{
                color: " #7450F0",
                fontWeight: "600",
                fontSize: "20px",
              }}
            >
              nenhuma imagem encontrada
            </Typography>
          </Box>
        )}
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Box sx={{ background: "#f1f1f1", aspectRatio: "1 / 1" }}>
          <BaseGoogleMap markersData={markersData} height={352} />
        </Box>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Box sx={{ background: "#f1f1f1", aspectRatio: "1 / 1" }}>
          <BaseStreetView addressData={addressData} widthDevice={"mobile"} />
        </Box>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Box sx={{ background: "#f1f1f1", aspectRatio: "1 / 1" }}>
          <VideoCarousel
            videoLinks={videoIds}
            widthDevice={"mobile"}
            // height={352}
          />
        </Box>
      </TabPanel>
    </Container>
  );
}

export default SliderViewMobile;
