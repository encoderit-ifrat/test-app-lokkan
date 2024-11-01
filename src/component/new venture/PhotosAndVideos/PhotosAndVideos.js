import {
  Autocomplete,
  Box,
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useEffect } from "react";
import orionImage from "../../../../public/Images/orion.png";
import { useDropzone } from "react-dropzone";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useState } from "react";
import { useMemo } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import BaseTextField from "../../reuseable/baseTextField/BaseTextField";
import BaseAutocomplete from "../../reuseable/baseAutocomplete/BaseAutocomplete";
import { Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { GetPhotoTypeData } from "../../../redux/photo/actions";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { _baseURL, _imageURL } from "../../../../consts";
import { useRouter } from "next/router";
import en from "locales/en";
import pt from "locales/pt";
import { useSession } from "next-auth/react";
import { getVideoIdFromLink } from "@/utils/getVideoIdFromLink";
import BaseButton from "@/component/reuseable/baseButton/BaseButton";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "50px",
  borderWidth: 2,
  borderRadius: "4px",
  borderColor: "#DBE1E5",
  borderStyle: "dashed",
  backgroundColor: "#F2F5F6",

  color: "#c4c4c4",
  outline: "none",
  transition: "border .24s ease-in-out",
  width: "70%",
  marginTop: "2vh",
};

const activeStyle = {
  borderColor: "#f2f",
};

const acceptStyle = {
  borderColor: "#f8f",
};

const rejectStyle = {
  borderColor: "#f2f",
};

function PhotosAndVideos({
  control,
  errors,
  files,
  setFiles,
  videoFiles,
  setVideoFiles,
  setDeletedContent,
  deletedContent,
  imageError,
  imageErrorMessage,
  fields,
  append,
  remove,
  allValues,
  languageName,
  handleNext,
  handleBack,
  reset,
  replace,
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: session } = useSession();
  const t = languageName === "en" ? en : pt;
  useEffect(() => {
    dispatch(GetPhotoTypeData("property"));
  }, [dispatch]);

  const photoType = useSelector((state) => state.photoType.photoTypeData);

  const onDrop = (acceptedFiles) => {
    acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );

    const allFiles = [...files, ...acceptedFiles]; //save all files here

    setFiles(allFiles);
  };
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
  });

  const handleDelete = (index, file) => {
    const filterItem = files.filter((file, fileIndex) => fileIndex !== index);
    setFiles(filterItem);
    if (file?.id) {
      setDeletedContent((prevData) => [...prevData, file?.id]);
    }
  };
  const handleDeleteVideo = (index, file) => {
    const filterItem = videoFiles.filter(
      (file, fileIndex) => fileIndex !== index
    );
    setVideoFiles(filterItem);
    if (file?.id) {
      setDeletedContent((prevData) => [...prevData, file?.id]);
    }
  };

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  const myLoader = ({ src }) => {
    return `${_imageURL}/${src}`;
  };

  const ThumbnailLoader = ({ src }) => {
    const match = src.match(/[?&]v=([^&]+)/);
    const videoId = match ? match[1] : null;

    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  };

  const [disableBtn, setDisableBtn] = useState(true);
  useEffect(() => {
    if (files?.length > 0) {
      setDisableBtn(false);
    }
    if (files?.length < 1) {
      setDisableBtn(true);
    }
  }, [files]);

  console.log({ videoFiles });

  return (
    <Box sx={{ mt: 4 }}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Image height={40} width={40} src={orionImage} alt="orion" />
          <Typography
            variant="p"
            sx={{
              color: "#002152",
              fontSize: "24px",
              fontWeight: "700",
              lineHeight: "32px",
              ml: 1,
            }}
          >
            {t["Photos and videos"]}
          </Typography>
        </Stack>
        <BaseButton
          color="error"
          sx="error"
          variant="outlined"
          handleFunction={() => {
            router.back();
          }}
        >
          {t["Cancel"]}
        </BaseButton>
      </Grid>
      <Box sx={{ mt: 3 }}>
        <Typography
          variant="p"
          sx={{
            color: "#002152",
            fontSize: "16px",
            fontWeight: "400",
            lineHeight: "22px",
          }}
        >
          {`${t["Images of the property"]}:`}
        </Typography>
      </Box>

      <Box {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <Typography
          variant="p"
          sx={{
            color: "#6C7A84",
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "18px",
            mt: 1,
          }}
        >
          {t["drag and drop images here"]}
        </Typography>
        <Typography
          variant="p"
          sx={{
            color: "#6C7A84",
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "18px",
            mt: 1,
          }}
        >
          {t["or"]}
        </Typography>
        <Button
          variant="contained"
          sx={{
            textTransform: "none",
            mt: 1,
            background: "#0362F0",
            color: "#ffffff",
            fontSize: "14px",
            fontWeight: "600",
            lineHeight: "18px",
          }}
        >
          {t["select images"]}
        </Button>
        <Typography
          variant="inherit"
          color="textSecondary"
          sx={{ color: "#b91c1c" }}
        >
          {errors?.images?.message}
        </Typography>
      </Box>

      {files?.length > 0 && (
        <Grid container spacing={1} sx={{ mt: 3 }}>
          {files?.map((file, index) => (
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
                  <DeleteOutlineOutlinedIcon
                    sx={{
                      background: "#F44336",
                      color: "#ffffff",
                      borderRadius: "50%",
                      height: "3vh",
                      width: "3vh",
                      paddingY: "3px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleDelete(index, file)}
                  />
                </Grid>
                <Image
                  loader={myLoader}
                  src={file?.preview || file?.file_path}
                  height={70}
                  width={100}
                  // layout="responsive"
                  alt="file"
                />
                <Box>
                  <Typography
                    variant="p"
                    sx={{
                      color: "#002152",
                      fontSize: "12px",
                      lineHeight: "32px",
                      fontWeight: "700",
                      mt: 1,
                    }}
                  >
                    {file?.name?.length > 10
                      ? `${file?.name.slice(0, 10)}.${file?.type?.slice(6)}`
                      : file?.name}
                  </Typography>
                </Box>
                <Controller
                  name={`title_${index}`}
                  control={control}
                  defaultValue={photoType[0] || file.photo_type}
                  render={({ field }) => (
                    <BaseAutocomplete
                      //   sx={{ margin: "0.6vh 0" }}
                      options={photoType || []}
                      getOptionLabel={(option) => t[option.name] || ""}
                      sx={{ mt: 2 }}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                      }
                      size={"small"}
                      placeholder={t["Convenient"]}
                      onChange={(e, v, r, d) => field.onChange(v)}
                      value={field.value}
                    />
                  )}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      )}

      <Box sx={{ mt: 5 }}>
        <Typography
          variant="p"
          sx={{
            color: "#002152",
            fontSize: "16px",
            fontWeight: "400",
            lineHeight: "22px",
          }}
        >
          {`${t["videos of the property"]}:`}
        </Typography>
      </Box>

      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{ mt: 1 }}
      >
        <Controller
          name={`videos_url`}
          control={control}
          defaultValue={""}
          render={({ field }) => (
            <BaseTextField
              sx={{
                width: "50%",

                "& .MuiOutlinedInput-root": {
                  // - The Input-root, inside the TextField-root
                  "& fieldset": {
                    borderRadius: "4px 0px 0px 4px", // - The <fieldset> inside the Input-root
                    // - Set the Input border
                  },
                },
              }}
              size={"medium"}
              placeholder={t["paste the url of the video"]}
              onChange={field.onChange}
              value={field.value}
            />
          )}
        />

        <Button
          sx={{
            backgroundColor: "#DBE1E5",
            py: 2,
            borderRadius: "0px 4px 4px 0px",
            "&:hover": {
              backgroundColor: "#DBE1E5",
              py: 2,
              borderRadius: "0px 4px 4px 0px",
            },
          }}
          onClick={() => {
            if (!allValues.videos_url) {
              return;
            }
            setVideoFiles([...videoFiles, { url: allValues.videos_url }]);
          }}
        >
          <AddOutlinedIcon sx={{ color: "#002152" }} />
        </Button>
      </Grid>
      {videoFiles?.length > 0 && (
        <Grid container spacing={1} sx={{ mt: 3 }}>
          {videoFiles?.map((file, index) => (
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
                  <DeleteOutlineOutlinedIcon
                    sx={{
                      background: "#F44336",
                      color: "#ffffff",
                      borderRadius: "50%",
                      height: "3vh",
                      width: "3vh",
                      paddingY: "3px",
                      mb: 0.5,
                      cursor: "pointer",
                    }}
                    onClick={() => handleDeleteVideo(index, file)}
                  />
                </Grid>
                <iframe
                  title="YouTube Video"
                  // width={widthDevice === "mobile" ? `100%` : `${width - 300}px`}
                  // height="500"
                  height={150}
                  width={200}
                  src={`https://www.youtube.com/embed/${getVideoIdFromLink(
                    file?.url
                  )}?autoplay=1`}
                  frameBorder="0"
                  allowfullscreen
                  // onEnd={onVideoEnd}
                ></iframe>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}

      {/* {session?.user?.role !== "owner" ? (
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          sx={{ mt: 2, mb: 2 }}
        >
          <Button
            color="inherit"
            onClick={handleBack}
            // disabled={activeStep === 0}
            sx={{
              mr: 1,
              border: "1px solid #002152",
              borderRadius: "4px",
              px: 2,
              py: 1,
              color: "#002152",
              fontSize: "16px",
              fontWeight: "600",
              lineHeight: "22px",
              textTransform: "none",
            }}
          >
            {t["come back"]}
          </Button>

          <Button
            onClick={handleNext}
            disabled={disableBtn}
            sx={{
              background: "#7450F0",
              borderRadius: "4px",
              px: 2,
              py: 1,
              color: "#ffffff",
              fontSize: "16px",
              fontWeight: "600",
              lineHeight: "22px",
              textTransform: "none",
              boxShadow: "0px 4px 8px rgba(81, 51, 182, 0.32)",
              "&:hover": {
                background: "#7450F0",
                borderRadius: "4px",
                px: 2,
                py: 1,
                color: "#ffffff",
                fontSize: "16px",
                fontWeight: "600",
                lineHeight: "22px",
                textTransform: "none",
                boxShadow: "0px 4px 8px rgba(81, 51, 182, 0.32)",
              },
            }}
          >
            {t["Next"]}
          </Button>
        </Grid>
      ) : (
        ""
      )} */}
    </Box>
  );
}

export default PhotosAndVideos;
