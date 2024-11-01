import dynamic from "next/dynamic";
const Navbar = dynamic(() => import("@/component/shared/Navbar/Navbar"), {
  ssr: false,
});
const Footer = dynamic(() => import("@/component/shared/Footer/Footer"), {
  ssr: false,
});
import Head from "next/head";
import {
  Box,
  Grid,
  Typography,
  ImageList,
  ImageListItem,
  Button,
  Tooltip,
  Stack,
  Container,
} from "@mui/material";

import orionImage from "../../public/Images/orion_view.svg";
import Image from "next/image";

const AmountView = dynamic(() =>
  import("@/component/PropertyView/amount/AmountView")
);
const Features = dynamic(() =>
  import("@/component/PropertyView/feature/Features")
);
const AboutProperty = dynamic(() =>
  import("@/component/PropertyView/AboutProperty/AboutProperty")
);
const Negotiate = dynamic(() =>
  import("@/component/PropertyView/Negotiate/Negotiate")
);
const HouseCard = dynamic(
  () => import("@/component/reuseable/HouseCard/HouseCard"),
  {
    ssr: false,
  }
);
const SliderView = dynamic(
  () => import("@/component/PropertyView/slider/SliderView"),
  {
    ssr: false,
  }
);
const SliderViewMobile = dynamic(
  () => import("@/component/PropertyView/SliderViewMobile/SliderViewMobile"),
  {
    ssr: false,
  }
);
const BaseModal = dynamic(() =>
  import("@/component/reuseable/baseModal/BaseModal")
);
const ProposalModal = dynamic(() =>
  import("@/component/PropertyView/ProposalStepperComponent/ProposalModal")
);
import { useMemo, useRef, useState } from "react";
import { useEffect } from "react";
import Link from "next/link";
import { Link as ScrollLink } from "react-scroll";
import en from "locales/en";
import pt from "locales/pt";
import { useRouter } from "next/router";
import { _imageURL } from "consts";
import { stripHtmlTags } from "@/utils/stripHtmlTags";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
const BaseShareButton = dynamic(
  () => import("@/component/reuseable/baseShareButton/BaseShareButton"),
  {
    ssr: false,
  }
);
import BaseWhatsappButton from "@/component/reuseable/baseWhatsappButton/BaseWhatsappButton";
import { ScrollElement } from "react-scroll";
const BaseFavoriteButton = dynamic(
  () => import("@/component/reuseable/baseFavoriteButton/BaseFavoriteButton"),
  {
    ssr: false,
  }
);

export default function PropertyView({
  loginOpen,
  setLoginOpen,
  handleLoginOpen,
  handleLoginClose,
  singlePropertyData,
  propertyDescription,
}) {
  const [myValue, setMyValue] = useState("pt");
  const router = useRouter();

  console.log({ singlePropertyData });

  const t = myValue === "en" ? en : pt;
  //add_proposal_modal
  const [proposalOpen, setProposalOpen] = useState(false);
  const handleProposalOpen = () => setProposalOpen(true);
  const handleProposalClose = () => setProposalOpen(false);

  const [negotiate, setNegotiate] = useState(true);
  const [schedule, setSchedule] = useState(false);

  const [sideTabValue, setSideTabValue] = useState("photos");

  const Images = useMemo(() => {
    const regexPatternThreeSixtyImages = /^[a-zA-Z_]+_vision_360$/;
    return singlePropertyData?.property?.attachments?.filter((data) => {
      return sideTabValue === "vision_360"
        ? regexPatternThreeSixtyImages.test(data?.title)
        : sideTabValue === "photos"
        ? data?.title === "photo"
        : sideTabValue === "condominium"
        ? data?.title === "condominium"
        : sideTabValue === "videos"
        ? !data?.title
        : null;
    });
  }, [singlePropertyData, sideTabValue]);

  const seoImage = useMemo(() => {
    return singlePropertyData?.property?.attachments?.find(
      (data) => data?.title === "cover_photo"
    );
  }, [singlePropertyData]);

  const Videos = useMemo(() => {
    if (sideTabValue === "videos") {
      return singlePropertyData?.property?.attachments?.filter((data) => {
        return data?.file_type === "url";
      });
    } else {
      return;
    }
  }, [sideTabValue, singlePropertyData]);

  console.log({ sideTabValue });

  console.log("🟥 ~ Images:", Images);
  const [selectImage, setSelectImage] = useState(() =>
    Images == undefined ? null : Images[0]?.file_path
  );
  // const [selectImage, setSelectImage] = useState(null);

  useEffect(() => {
    if (Images.length > 0) {
      setSelectImage(Images[0]?.file_path);
    } else {
      setSelectImage(Images[0]?.lofi);
    }
  }, [Images]);

  console.log({ selectImage });

  const goBack = () => {
    router.back();
  };

  console.log("🟥 ~ singlePropertyData:", singlePropertyData);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Function to update the scroll position
  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
    // Call your custom function here
    console.log("Scroll position:", position);
  };

  // useEffect to add the scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div>
      <Head>
        <title>{`${singlePropertyData?.property?.property_title} - Lokkan`}</title>
        <link rel="icon" href="/negotiate.png" />
        <meta name="description" content={`${propertyDescription}`} />
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta
          property="og:url"
          content={`https://www.lokkan.com.br/visualizacao-da-propriedade/${singlePropertyData?.property?.id}`}
        />
        <meta
          property="og:title"
          content={`${singlePropertyData?.property?.property_title}`}
        />
        <meta property="og:description" content={`${propertyDescription}`} />
        <meta
          property="og:image"
          content={`${_imageURL}/${seoImage?.file_path}`}
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:secure_url"
          content={`${_imageURL}/${seoImage?.file_path}`}
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`${singlePropertyData?.property?.property_title}`}
        />
        <meta name="twitter:description" content={`${propertyDescription}`} />
        <meta
          name="twitter:image"
          content={`${_imageURL}/${seoImage?.file_path}`}
        />

        <link rel="prefetch" href={`${_imageURL}/${seoImage?.file_path}`} />
      </Head>

      <main className="section">
        <Navbar
          shape={false}
          paddingY={"1vh"}
          loginOpen={loginOpen}
          setLoginOpen={setLoginOpen}
          handleLoginClose={handleLoginClose}
          handleLoginOpen={handleLoginOpen}
          languageName={"pt"}
          setMyValue={setMyValue}
          myValue={myValue}
          colorLogo={true}
        />
        <Container maxWidth="xxl">
          <Stack
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },
            }}
          >
            <Button
              color="inherit"
              // disabled={activeStep === 0}
              onClick={goBack}
              sx={{
                mr: 1,
                border: "1px solid #38bdf8",
                borderRadius: "4px",
                px: 2,
                py: 1,
                my: 1,
                color: "#38bdf8",
                fontSize: "16px",
                fontWeight: "600",
                lineHeight: "22px",
                textTransform: "none",
                width: "fit-content",
                ml: "auto",
              }}
            >
              {t["come back"]}
            </Button>
          </Stack>

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 2 }}
          >
            <Stack
              direction={"row"}
              // justifyContent={"center"}
              alignItems="center"
              spacing={2}
            >
              <Box
                sx={{
                  width: { xs: 25, lg: 40 },
                  minWidth: 25,
                  // height: { xs: 30, lg: 40 },
                  // bgcolor: "red",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Image
                  src={orionImage}
                  alt="orionImage"
                  width={"100%"}
                  height={"100%"}
                  // style={{ flexShrink: 0 }}
                />
              </Box>
              <Box
              // sx={{
              //   width: { xs: 25, lg: 40 },
              //   minWidth: 25,
              //   // height: { xs: 30, lg: 40 },
              //   // bgcolor: "red",
              //   display: "flex",
              //   justifyContent: "center",
              // }}
              >
                <Typography
                  sx={{
                    fontSize: {
                      xs: "20px",
                      sm: "22px",
                      md: "26px",
                      lg: "28px",
                    },
                    // bgcolor: "red",
                    fontWeight: 700,
                    lineHeight: "normal",
                    color: "#1A1859",
                    wordWrap: "break-word",
                    wordBreak: "break-all",
                    overflowWrap: "break-word",
                    overflow: "hidden",
                    textAlign: "left",
                    pb: 1,
                  }}
                >
                  {`${
                    singlePropertyData?.property?.property_title ||
                    "No title found"
                  }`}
                </Typography>
              </Box>
            </Stack>

            <Stack
              direction="row"
              spacing={1}
              sx={{
                display: {
                  xs: "none",
                  md: "flex",
                },
              }}
            >
              <BaseShareButton
                base_url={`https://www.lokkan.com.br/visualizacao-da-propriedade/${singlePropertyData?.property?.id}`}
              />
              <BaseFavoriteButton
                handleLoginOpen={handleLoginOpen}
                itemID={singlePropertyData?.property?.id}
              />
            </Stack>
          </Stack>
        </Container>
        <Box
          sx={{
            mx: { lg: 3, xl: 3 },
            position: "relative",
          }}
        >
          <Button
            color="inherit"
            // disabled={activeStep === 0}
            startIcon={<KeyboardBackspaceIcon />}
            onClick={goBack}
            variant="contained"
            disableElevation
            sx={{
              position: "absolute",
              borderRadius: 1111,
              top: 60,
              left: { xs: 10, sm: 90 },
              mr: 1,
              zIndex: 2,
              // border: "1px solid #878787",
              // borderRadius: "4px",
              px: 2,
              py: 1,

              background: "#fff",
              color: "#878787",
              fontSize: "16px",
              fontWeight: "600",
              lineHeight: "22px",
              textTransform: "none",
              width: "fit-content",

              // ml: "auto",
              display: {
                xs: "flex",
                md: "none",
              },
            }}
          >
            {t["come back"]}
          </Button>
          <Grid
            container
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
            <Grid item xs={12}>
              <SliderViewMobile
                sideTabValue={sideTabValue}
                setSideTabValue={setSideTabValue}
                videos={Videos}
                selectImage={selectImage}
                singlePropertyData={singlePropertyData}
                addressData={singlePropertyData?.property?.address}
                languageName={myValue.toString()}
                images={Images}
                shareUrl={`https://www.lokkan.com.br/visualizacao-da-propriedade/${singlePropertyData?.property?.id}`}
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid
              item
              xs={12}
              sx={{
                display: {
                  xs: "none",
                  sm: "none",
                  md: "inline",
                  lg: "inline",
                  xl: "inline",
                },
              }}
            >
              <SliderView
                sideTabValue={sideTabValue}
                setSideTabValue={setSideTabValue}
                selectImage={selectImage}
                addressData={singlePropertyData?.property?.address}
                languageName={myValue.toString()}
                videos={Videos}
                images={Images}
                others={true}
              />
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ mx: { lg: 3, xl: 3 }, mt: { lg: 3 } }}>
          <Grid
            container
            direction="row"
            alignItems="center"
            sx={{
              background: "#0E97F7",

              px: { xs: 2, sm: 2, md: 2, lg: 2, xl: 20 },
              py: 3,
            }}
          >
            <AmountView
              negotiate={negotiate}
              setNegotiate={setNegotiate}
              schedule={schedule}
              setSchedule={setSchedule}
              singlePropertyData={singlePropertyData}
              handleProposalOpen={handleProposalOpen}
              languageName={myValue.toString()}
              content={`Immóvel nome :  ${singlePropertyData?.property?.property_title}, Código : ${singlePropertyData?.property?.id}`}
            />
          </Grid>
        </Box>
        <Box sx={{ mx: { lg: 3 }, mt: { lg: 4 } }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={9} xl={9}>
              <Box
                // component="div"
                sx={{
                  p: 3,
                  backgroundColor: "#f9f9fb",
                  fontSize: 18,
                  wordWrap: "break-word",
                  wordBreak: "break-all",
                  overflowWrap: "break-word",
                  overflow: "hidden",
                }}
                dangerouslySetInnerHTML={{
                  __html: singlePropertyData?.property?.property_description,
                }}
              ></Box>
              {(+singlePropertyData?.property?.no_of_rooms > 0 ||
                +singlePropertyData?.property?.property_area > 0 ||
                +singlePropertyData?.property?.no_of_bathrooms > 0 ||
                +singlePropertyData?.property?.no_of_parking_spaces > 0) && (
                <Features
                  singlePropertyData={singlePropertyData}
                  languageName={myValue.toString()}
                />
              )}

              {Object.keys(singlePropertyData?.propertyFeatures).map(
                (key, index) => (
                  <AboutProperty
                  languageName={myValue.toString()}
                    key={index}
                    name={key}
                    array={singlePropertyData?.propertyFeatures[key]}
                  />
                )
              )}
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
              <Negotiate
                negotiate={negotiate}
                setNegotiate={setNegotiate}
                schedule={schedule}
                setSchedule={setSchedule}
                handleProposalOpen={handleProposalOpen}
                singlePropertyData={singlePropertyData}
                handleLoginOpen={handleLoginOpen}
                singlePropertyId={singlePropertyData?.property?.id}
                languageName={myValue.toString()}
                content={`Immóvel nome :  ${singlePropertyData?.property?.property_title}, Código : ${singlePropertyData?.property?.id}`}
              />
            </Grid>
          </Grid>
        </Box>
        <Box>
          <ImageList
            cols={5}
            sx={{
              gridAutoFlow: "column",
              gridTemplateColumns:
                "repeat(auto-fill,minmax(140px,1fr)) !important",
              gridAutoColumns: "minmax(140px, 1fr)",
              pl: 3,
              pb: 4,
            }}
          >
            {singlePropertyData?.similarProperties?.map((stateInfo, index) => (
              <Link
                key={stateInfo.id}
                href={`/visualizacao-da-propriedade/${stateInfo.id}/${stateInfo?.property_title}`}
                as={`/visualizacao-da-propriedade/${stateInfo.id}/${stateInfo?.property_title}`}
              >
                <ImageListItem
                  key={index}
                  cols={2}
                  sx={{
                    width: {
                      xl: "100%",
                      lg: "90%",
                      md: "70%",
                      sm: "90%",
                      xs: "90%",
                    },
                  }}
                >
                  <HouseCard
                    shadow={"0px 4px 18px rgba(0, 0, 0, 0.1)"}
                    propertyInfo={stateInfo}
                  />
                </ImageListItem>
              </Link>
            ))}
          </ImageList>
        </Box>
        <Box
          sx={{
            pb: {
              xs: "50px",
              md: 0,
            },
          }}
        >
          <Footer />
        </Box>

        <BaseModal isShowing={proposalOpen} isClose={handleProposalClose}>
          <Tooltip title="Something">
            <>
              <ProposalModal
                handleProposalClose={handleProposalClose}
                singlePropertyId={singlePropertyData?.property?.id}
                languageName={myValue.toString()}
              />
            </>
          </Tooltip>
        </BaseModal>
      </main>
      <Grid
        item
        sx={{
          display: {
            xs: "block",
            sm: "none",
          },
          position: "fixed",
          bottom: 0,
          left: 0,
          backgroundColor: "#fff",
          zIndex: 1000,
          width: "100%",
          p: 3,
        }}
        sm={6}
        md={6}
        xl={3}
        lg={3}
      >
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          sx={{
            width: "fit-content",
            mx: "auto",
            zIndex: 111,
          }}
          gap={2}
        >
          <BaseWhatsappButton
            content={`Immóvel nome :  ${singlePropertyData?.property?.property_title}, Código : ${singlePropertyData?.property?.id}`}
          />
          {/* <Button
            variant="contained"
            color="primary"
            sx={{
              px: 4,
              fontSize: "16px",
              fontWeight: "600",
              textTransform: "none",
              minWidth: "250px",
              background: "#0E97F7",
              borderRadius: "4px",

              "&: hover": {
                px: 4,
                fontSize: "16px",
                fontWeight: "600",
                textTransform: "none",
                minWidth: "250px",
                background: "#0E97F7",
                borderRadius: "4px",
              },
            }}
            onClick={() => {
              setNegotiate(true);
              setSchedule(false);
            }}
          >
            {t["Negotiate"]}
          </Button> */}
          <ScrollLink to="schedule_visit" smooth={true} duration={500}>
            <Button
              variant="contained"
              color="secondary"
              sx={{
                px: 4,
                fontSize: "16px",
                fontWeight: "600",
                textTransform: "none",
                minWidth: "250px",
                background: "#7450F0",
                borderRadius: "4px",
                "&: hover": {
                  px: 4,
                  fontSize: "16px",
                  fontWeight: "600",
                  textTransform: "none",
                  minWidth: "250px",
                  background: "#7450F0",
                  borderRadius: "4px",
                },
              }}
              onClick={() => {
                setSchedule(true);
                setNegotiate(false);
                // if (window.scrollY < 2700) {
                //   window.scrollBy({ top: 4000, left: 0, behavior: "smooth" });
                // }
              }}
            >
              {t["Schedule visit"]}
            </Button>
          </ScrollLink>
        </Grid>
      </Grid>
    </div>
  );
}
49;

export async function getServerSideProps(context) {
  const { params } = context.query;
  const [id] = params || [];
  const base_url = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${base_url}/api/property/show/${id}`);
  const singlePropertyData = await res.json();

  const cookies = context.req.cookies["language"];

  console.log("single", singlePropertyData);
  return {
    props: {
      singlePropertyData: singlePropertyData,
      propertyDescription: stripHtmlTags(
        singlePropertyData?.property?.property_description
      ),
    },
  };
}
