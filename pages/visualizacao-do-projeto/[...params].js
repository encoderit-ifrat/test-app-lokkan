import dynamic from "next/dynamic";
const Navbar = dynamic(() => import("@/component/shared/Navbar/Navbar"), {
  ssr: false,
});
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import Head from "next/head";
import {
  Box,
  Grid,
  Typography,
  Container,
  ImageList,
  ImageListItem,
  Button,
  Stack,
} from "@mui/material";
import orionImage from "../../public/Images/orion_view.svg";
import Image from "next/image";
const HouseCard = dynamic(
  () => import("@/component/reuseable/HouseCard/HouseCard"),
  {
    ssr: false,
  }
);
const Footer = dynamic(() => import("@/component/shared/Footer/Footer"), {
  ssr: false,
});
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
import { useEffect, useMemo, useState } from "react";
import en from "locales/en";
import pt from "locales/pt";
import Link from "next/link";
import { _imageURL } from "consts";
import { useRouter } from "next/router";
import { stripHtmlTags } from "@/utils/stripHtmlTags";
const BaseShareButton = dynamic(
  () => import("@/component/reuseable/baseShareButton/BaseShareButton"),
  {
    ssr: false,
  }
);
const AboutProperty = dynamic(
  () => import("@/component/PropertyView/AboutProperty/AboutProperty"),
  {
    ssr: false,
  }
);
const BaseFavoriteButton = dynamic(
  () => import("@/component/reuseable/baseFavoriteButton/BaseFavoriteButton"),
  {
    ssr: false,
  }
);

export default function ProjectView({
  loginOpen,
  setLoginOpen,
  handleLoginOpen,
  handleLoginClose,
  singleProjectData,
  projectDescription,
  language,
}) {
  const router = useRouter();
  const { query } = router;
  const { params } = query;
  const [id] = params || [];
  const [myValue, setMyValue] = useState(language || "pt");

  const t = myValue === "en" ? en : pt;
  const [sideTabValue, setSideTabValue] = useState("photos");

  const seoImage = useMemo(() => {
    return singleProjectData?.project?.attachments?.find(
      (data) => data?.title === "cover_photo"
    );
  }, [singleProjectData]);

  const Images = useMemo(() => {
    const regexPatternThreeSixtyImages = /^[a-zA-Z_]+_vision_360$/;
    return singleProjectData?.project?.attachments?.filter((data) => {
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
  }, [singleProjectData, sideTabValue]);

  const Videos = useMemo(() => {
    if (sideTabValue === "videos") {
      return singleProjectData?.project?.attachments?.filter((data) => {
        return data?.file_type === "url";
      });
    } else {
      return;
    }
  }, [sideTabValue, singleProjectData]);

  const [selectImage, setSelectImage] = useState(() => Images?.[0]?.file_path);

  useEffect(() => {
    if (Images?.length > 0) {
      setSelectImage(Images?.[0]?.file_path);
    } else {
      setSelectImage(Images?.[0]?.lofi);
    }
  }, [Images]);

  const goBack = () => {
    router.back();
  };

  console.log({ singleProjectData });
  console.log({ seoImage });

  const handleDownload = (file_path) => {
    const filePath = `${_imageURL}/${file_path}`;

    const newTab = window.open(filePath, "_blank");

    // Check if the tab was successfully opened
    if (newTab) {
      // Optionally trigger the download in the new tab
      newTab.onload = () => {
        const link = newTab.document.createElement("a");
        link.href = filePath;
        link.download = filePath.split("/").pop();
        newTab.document.body.appendChild(link);
        link.click();
        newTab.document.body.removeChild(link);
        newTab.close(); // Close the new tab after download if desired
      };
    } else {
      alert("Please allow popups for this website");
    }
  };

  return (
    <div>
      <Head>
        <title>{`${singleProjectData?.project?.name} - Lokkan`}</title>
        <link rel="icon" href="/negotiate.png" />
        <meta name="description" content={`${projectDescription}`} />
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta
          property="og:url"
          content={`https://www.lokkan.com.br/visualizacao-do-projeto/${singleProjectData?.project?.id}`}
        />
        <meta
          property="og:title"
          content={`${singleProjectData?.project?.name}`}
        />
        <meta property="og:description" content={`${projectDescription}`} />
        <meta
          property="og:image"
          content={`${_imageURL}/${seoImage?.file_path}`}
        />
        <meta
          property="og:image:secure_url"
          content={`${_imageURL}/${seoImage?.file_path}`}
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`${singleProjectData?.project?.name}`}
        />
        <meta name="twitter:description" content={`${projectDescription}`} />
        <meta
          name="twitter:image"
          content={`${_imageURL}/${seoImage?.file_path}`}
        />

        <link rel="prefetch" href={`${_imageURL}/${seoImage?.file_path}`} />
      </Head>

      <main>
        <Navbar
          shape={false}
          paddingY={"1vh"}
          loginOpen={loginOpen}
          setLoginOpen={setLoginOpen}
          handleLoginClose={handleLoginClose}
          handleLoginOpen={handleLoginOpen}
          languageName={language}
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
                  {`${singleProjectData?.project?.name || "No title found"}`}
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
                base_url={`https://www.lokkan.com.br/visualizacao-do-projeto/${singleProjectData?.project?.id}`}
              />
              <BaseFavoriteButton
                handleLoginOpen={handleLoginOpen}
                itemID={id}
                type="project"
              />
            </Stack>
          </Stack>
        </Container>
        <Box sx={{ ml: 3 }}>
          {/* <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="flex-start"
            sx={{
              display: {
                xs: "none",
                lg: "flex",
              },
            }}
          >
            <Button
              color="inherit"
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
              }}
            >
              {t["come back"]}
            </Button>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Button
              sx={{
                display: "flex",
                gap: 1,
                color: "#1A1859",
              }}
            >
              <Image
                src={orionImage}
                alt="orionImage"
                // width={24}
                // height={24}
                // style={{ flexShrink: 0 }}
              />

              <Typography
                variant="p"
                sx={{
                  fontSize: { xs: "17px", sm: "17px", md: "17px", lg: "24px" },
                  fontWeight: 700,
                  color: "#1A1859",
                  wordWrap: "break-word",
                  wordBreak: "break-all",
                  overflowWrap: "break-word",
                  overflow: "hidden",
                  textAlign: "left",
                }}
              >
                {`${singleProjectData?.project?.name || "No title found"}`}
              </Typography>
            </Button>
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
                base_url={`https://www.lokkan.site/visualizacao-do-projeto/${id}`}
              />

              <BaseFavoriteButton
                handleLoginOpen={handleLoginOpen}
                itemID={id}
                type="project"
              />
            </Stack>
          </Grid> */}
        </Box>
        <Box
          sx={{
            // ml: { xs: 1, sm: 3, md: 3, lg: 3, xl: 3 },
            // mr: { xs: 1, sm: 3, md: 3, lg: 3, xl: 3 },
            // my: 4,
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
                // lg: "none",
                // xl: "none",
              },
            }}
          >
            <Grid item xs={12}>
              <SliderViewMobile
                sideTabValue={sideTabValue}
                setSideTabValue={setSideTabValue}
                selectImage={selectImage}
                videos={Videos}
                languageName={myValue.toString()}
                images={Images}
                shareUrl={`https://www.lokkan.com.br/visualizacao-do-projeto/${singleProjectData?.project?.id}`}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sx={{
                display: {
                  xs: "none",
                  sm: "none",
                  md: "inline",
                  // lg: "inline",
                  // xl: "inline",
                },
              }}
            >
              <SliderView
                sideTabValue={sideTabValue}
                setSideTabValue={setSideTabValue}
                selectImage={selectImage}
                addressData={singleProjectData?.project?.address}
                languageName={myValue.toString()}
                videos={Videos}
                images={Images}
                others={true}
              />
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            mx: { lg: 3 },
            mt: { lg: 3 },
            // border: "1px solid red",
            background: "linear-gradient(90deg, #20BAF6 0%, #7450F0 100%);",
          }}
        >
          <Container maxWidth="xxl">
            <Grid
              container
              spacing={2}
              sx={{
                py: 2,
              }}
            >
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#FFFFFF",
                    fontWeight: "800",
                    fontSize: "32px",
                    lineHeight: "38px",
                  }}
                >
                  {singleProjectData?.project?.name}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#FFFFFF",
                    fontWeight: "500",
                    fontSize: "20px",
                    lineHeight: "28px",
                    mt: 2,
                  }}
                >
                  📍
                  {`${singleProjectData?.project?.address?.address}, ${singleProjectData?.project?.address?.city}, ${singleProjectData?.project?.address?.state?.name}`}
                </Typography>

                <Typography
                  component="div"
                  align="left"
                  sx={{
                    color: "#FFFFFF",
                    fontWeight: "500",
                    fontSize: "20px",
                    lineHeight: "28px",
                    mt: 2,
                  }}
                  dangerouslySetInnerHTML={{
                    __html: singleProjectData?.project?.description,
                  }}
                ></Typography>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Box sx={{ mx: { lg: 3 } }}>
          <Grid item xs={12} sm={12} md={12} lg={9} xl={9}>
            {Object.keys(singleProjectData?.projectFeatures || {})?.map(
              (key, index) => (
                <AboutProperty
                  key={index}
                  name={key}
                  array={singleProjectData?.projectFeatures[key]}
                />
              )
            )}
          </Grid>
        </Box>
        {singleProjectData?.project?.documents?.length > 0 && (
          <Box sx={{ mx: { lg: 3 } }}>
            <Box sx={{ background: "#F9F9FB", px: 3, py: 2, mt: { lg: 2 } }}>
              <Typography
                variant="p"
                sx={{
                  color: "#1A1859",
                  fontWeight: "700",
                  fontSize: "18px",
                  textTransform: "capitalize",
                }}
              >
                Documentos
              </Typography>

              <Grid container spacing={1} sx={{ mt: 1 }}>
                {singleProjectData?.project?.documents?.map((file, index) => (
                  <Grid item xs={12} sm={12} md={4} lg={3} xl={3} key={index}>
                    <Box
                      sx={{
                        p: 2,
                        boxSizing: "border-box",
                        border: "1px solid #DBE1E5",
                        borderRadius: "6px",
                      }}
                    >
                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="flex-start"
                      >
                        <CloudDownloadOutlinedIcon
                          sx={{
                            background: "#F44336",
                            color: "#ffffff",
                            borderRadius: "50%",
                            height: "3vh",
                            width: "3vh",
                            paddingY: "3px",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            handleDownload(file?.attachments[0]?.file_path)
                          }
                        />
                      </Grid>

                      <Typography
                        variant="p"
                        sx={{ color: "#38bdf8", fontWeight: "600" }}
                      >
                        {file?.name?.slice(0, 15) || file?.title?.slice(0, 15)}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        )}

        {singleProjectData?.propject_wise_properties.length > 0 && (
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
              {singleProjectData?.propject_wise_properties?.map(
                (data, index) => (
                  <Link
                    key={data.id}
                    href={`/visualizacao-da-propriedade/${data.id}/${data?.property_title}`}
                    as={`/visualizacao-da-propriedade/${data.id}/${data?.property_title}`}
                  >
                    <ImageListItem
                      key={index}
                      cols={2}
                      sx={{
                        width: {
                          xl: "90%",
                          lg: "90%",
                          md: "70%",
                          sm: "90%",
                          xs: "90%",
                        },
                      }}
                    >
                      <HouseCard
                        propertyInfo={data}
                        shadow={"0px 4px 18px rgba(0, 0, 0, 0.1)"}
                      />
                    </ImageListItem>
                  </Link>
                )
              )}
            </ImageList>
          </Box>
        )}

        <Footer />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { params } = context.query;
  const [id] = params || [];
  const base_url = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${base_url}/api/project/show/${id}`);
  const singleProjectData = await res.json();

  const cookies = context.req.cookies["language"];

  return {
    props: {
      singleProjectData: singleProjectData,
      language: cookies,
      projectDescription: stripHtmlTags(
        singleProjectData?.project?.description
      ),
    },
  };
}
