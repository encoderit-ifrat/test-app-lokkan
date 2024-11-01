import {
  Box,
  Button,
  CircularProgress,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import rentImage from "../../../../public/Images/rentImage.png";
import Image from "next/image";
import Link from "next/link";
import { _baseURL, _imageURL } from "../../../../consts";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { ChangePropertyStatus } from "../../../redux/propertyStatus/actions";
import { findPropertyData } from "../../../redux/property/actions";
import en from "locales/en";
import pt from "locales/pt";
import { useMutation } from "@tanstack/react-query";
import { usePropertyStatusUpdateMutation } from "@/queries/usePropertyStatusUpdateMutation";
import { formatBrazilianCurrency } from "@/utils/useUtilities";
import { useRouter } from "next/router";

const omitEmpties = (obj) => {
  return Object.entries(obj).reduce((carry, [key, value]) => {
    if (![null, undefined, ""].includes(value)) {
      carry[key] = value;
    }
    return carry;
  }, {});
};

function NewRegistrationCard({
  propertyData,
  newProperty,
  languageName,
  loadingRefetch,
  page,
  refetch,
}) {
  const t = languageName === "en" ? en : pt;
  const [progress, setProgress] = React.useState(87);
  const dispatch = useDispatch();
  const [approveid, setApproveId] = useState("");
  const [rejectid, setRejectId] = useState("");
  const router = useRouter();

  const mutation = usePropertyStatusUpdateMutation(page);

  const handleReject = (id) => {
    const body = {
      property_id: id,
      status: "rejected",
    };
    mutation.mutate(body, {
      onError(error) {
        console.log(error);
      },
      onSuccess: async (data) => {
        await refetch();
        await loadingRefetch();
      },
    });
  };

  const handleApprove = (id) => {
    const body = {
      property_id: id,
      status: "approved",
    };
    mutation.mutate(body, {
      onError(error) {
        console.log(error);
      },
      onSuccess: async (data) => {
        await refetch();
        await loadingRefetch();
      },
    });
    // setApproveId(id);
    // dispatch(findPropertyData({ status: "new", page: 1, per_page: 9 }));
  };

  // const rejectLoading = useSelector(
  //   (state) => state?.propertyStatus?.rejectLoading
  // );

  // // const approveLoading = useSelector(
  // //   (state) => state?.propertyStatus?.approveLoading
  // // );

  const myLoader = ({ src }) => {
    return `${_imageURL}/${src}`;
  };

  return (
    <Box
      sx={{
        background: "#ffffff",
        boxShadow: "0px 4px 8px rgba(0, 33, 82, 0.08)",
        borderRadius: { xs: 0, sm: 0, md: 0, lg: "8px", xl: "8px" },
        mt: 1,
      }}
    >
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={4}
          xl={4}
          className="rentImageCard"
        >
          {/* <Box>
            <Image src={rentImage} layout="responsive" alt="rent" />
          </Box> */}
          <Link
            href={`/visualizacao-da-propriedade/${propertyData?.id}/${propertyData?.property_title}`}
            as={`/visualizacao-da-propriedade/${propertyData?.id}/${propertyData?.property_title}`}
          >
            <Box
              style={{
                width: "100%",
                height: "100%",
                position: "relative",
                //   display: { lg: "inline" },
              }}
            >
              <Image
                alt="rent"
                loader={myLoader}
                src={`${propertyData?.attachments[0]?.file_path}`}
                layout="fill"
                objectFit="cover"
                style={{ borderRadius: "8px 0 0 8px" }}
              />
            </Box>
          </Link>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          className="rentImageCard"
          sx={{
            display: {
              xs: "inline",
              sm: "inline",
              md: "inline",
              lg: "none",
            },
            ml: 2,
          }}
        >
          {/* <Box>
            <Image src={rentImage} layout="responsive" alt="rent" />
          </Box> */}
          <Box>
            <Image
              alt="rent"
              loader={myLoader}
              src={`${propertyData?.attachments[0]?.file_path}`}
              height={200}
              width={500}
              //   style={{ borderRadius: "8px 0 0 8px" }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
          <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{ p: { xs: 2, sm: 2, md: 2, lg: 0 } }}
          >
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Box>
                <Button
                  sx={{
                    textTransform: "none",
                    background: "rgba(116, 80, 240, 0.2)",
                    borderRadius: "2px",
                    padding: "2px 8px",
                    color: "#7450F0",
                    fontSize: "14px",
                    lineHeight: "18px",
                    fontWeight: "400",
                  }}
                >
                  {t[propertyData?.ad_type]}
                </Button>
                {propertyData?.status === "approved" && (
                  <Button
                    sx={{
                      textTransform: "none",
                      background: "#DDF8ED",
                      borderRadius: "2px",
                      padding: "2px 8px",
                      color: "#229464",
                      fontSize: "14px",
                      lineHeight: "18px",
                      fontWeight: "400",
                      ml: "3px",
                    }}
                  >
                    {t["published"]}
                  </Button>
                )}
              </Box>
              <Box
                sx={{
                  ml: { xs: 0, sm: 0, md: 0, lg: 1, xl: 3, xxl: 8 },
                }}
              >
                <Typography
                  variant="p"
                  sx={{
                    fontSize: "14px",
                    lineHeight: "18px",
                    fontWeight: "400",
                    color: "#9FAAB1",
                  }}
                >
                  {`${propertyData?.form_fill_up_progress}%`}
                </Typography>
              </Box>
              <Box sx={{ width: "20%", mr: 1, mt: "1.5vh", ml: 1 }}>
                <LinearProgress
                  sx={{
                    "& .MuiLinearProgress-barColorPrimary": {
                      backgroundColor: "#34BE84",
                      borderRadius: "10px",
                    },
                    backgroundColor: "#f5f5f5",
                    borderRadius: "10px",
                    // "& .MuiLinearProgress-colorPrimary": {
                    //   backgroundColor: "#F5F5F5",
                    // },
                  }}
                  variant="determinate"
                  value={propertyData?.form_fill_up_progress}
                />
              </Box>
            </Grid>
            <Typography
              variant="p"
              sx={{
                color: "#002152",
                fontSize: "24px",
                lineHeight: "32px",
                fontWeight: "700",
                mt: 1,
              }}
            >
              {propertyData?.property_title.length > 20
                ? `${propertyData?.property_title.slice(0, 20)}...`
                : propertyData?.property_title}
            </Typography>
            <Typography
              variant="p"
              sx={{
                fontSize: "16px",
                fontWeight: "600",
                color: "#0E97F7",
                mt: 1,
              }}
            >
              {formatBrazilianCurrency(propertyData?.brl_rent)}
            </Typography>
            <Typography
              variant="p"
              sx={{
                color: " #9FAAB1",
                fontSize: "16px",
                lineHeight: "24px",
                fontWeight: "400",
                mt: 1,
                mr: 0.5,
              }}
            >
              {propertyData?.address?.address}
            </Typography>
            <Typography
              variant="p"
              sx={{
                color: " #9FAAB1",
                fontSize: "16px",
                lineHeight: "24px",
                fontWeight: "400",
                mt: 0.5,
              }}
            >
              {`${t["created on"]}: ${dayjs(propertyData?.created_at).format(
                "DD/MM/YYYY"
              )}`}
            </Typography>
            <Box sx={{ mt: 1, mb: { xs: 0, sm: 0, md: 0, lg: 2, xl: 2 } }}>
              <Button
                onClick={() => handleReject(propertyData.id)}
                variant="outlined"
                sx={{
                  borderColor: "#F44336",
                  color: "#F44336",
                  fontSize: "14px",
                  lineHeight: "18px",
                  fontWeight: "600",

                  borderRadius: "4px",

                  textTransform: "none",
                  "&:hover": {
                    borderColor: "#F44336",
                    color: "#F44336",
                    fontSize: "14px",
                    lineHeight: "18px",
                    fontWeight: "600",

                    borderRadius: "4px",

                    textTransform: "none",
                  },
                }}
              >
                {mutation?.isLoading ? (
                  <CircularProgress size={22} color="inherit" />
                ) : (
                  t["reject"]
                )}
              </Button>
              <Button
                variant="contained"
                sx={{
                  fontSize: "14px",
                  lineHeight: "18px",
                  fontWeight: "600",

                  borderRadius: "4px",
                  //   padding: "8px 20px",
                  textTransform: "none",
                  ml: 1,
                  mr: 1,
                  "&:hover": {
                    fontSize: "14px",
                    lineHeight: "18px",
                    fontWeight: "600",

                    borderRadius: "4px",
                    //   padding: "8px 20px",
                    textTransform: "none",
                    ml: 1,
                    mr: 1,
                  },
                }}
                onClick={() => {
                  if (propertyData?.id) {
                    router.push({
                      pathname: "/my-properties/new-property",
                      query: omitEmpties({
                        property_id: propertyData?.id,
                      }),
                    });
                  } else {
                    return;
                  }
                }}
              >
                {t["edit"]}
              </Button>
              <Button
                onClick={() => handleApprove(propertyData.id)}
                variant="contained"
                color="success"
                sx={{
                  fontSize: "14px",
                  lineHeight: "18px",
                  fontWeight: "600",

                  borderRadius: "4px",
                  //   padding: "8px 20px",
                  textTransform: "none",
                  mt: { xs: 0, sm: 0, md: 0, lg: 1, xl: 0 },
                  "&:hover": {
                    fontSize: "14px",
                    lineHeight: "18px",
                    fontWeight: "600",

                    borderRadius: "4px",
                    //   padding: "8px 20px",
                    textTransform: "none",
                    mt: { xs: 0, sm: 0, md: 0, lg: 1, xl: 0 },
                  },
                }}
              >
                {mutation?.isLoading ? (
                  <CircularProgress size={22} color="inherit" />
                ) : (
                  t["approve"]
                )}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default NewRegistrationCard;
