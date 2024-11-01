import {
  Autocomplete,
  Box,
  Button,
  Grid,
  LinearProgress,
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
import { serialize } from "object-to-formdata";
import { useUploadImagesMutation } from "@/queries/useUploadImagesMutation";
import { apiInstance } from "@/api";
import toast from "react-hot-toast";

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
  width: "100%",
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

function BaseMultipleImagePicker({
  files,
  setFiles,
  languageName,
  isUploading,
  setIsUploading,
  setFileResponse,
}) {
  const router = useRouter();

  const t = languageName === "en" ? en : pt;

  const [uploadProgress, setUploadProgress] = useState(0);
  const onDrop = (acceptedFiles) => {
    if (files.length + acceptedFiles.length > 4) {
      toast.error("São permitidas no máximo 4 imagens."); // Display error message
      return;
    }
    acceptedFiles.map((file) =>
      Object.assign(file, { preview: URL.createObjectURL(file) })
    );

    const allFiles = [...files, ...acceptedFiles];
    setFiles(allFiles);

    const data = {
      files: allFiles,
      path: "/car-images",
    };

    console.log({ data });
    const body = serialize(data);

    uploadFiles(body); // Call the upload function
  };

  const uploadFiles = (body) => {
    setIsUploading(true); // Disable buttons
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${_baseURL}/api/upload-file`);

    // Track the upload progress
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = Math.round((event.loaded / event.total) * 100);
        setUploadProgress(percentComplete); // Update progress
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        const serverResponse = JSON.parse(xhr.responseText); // Parse the response text
        console.log({ serverResponse });
        setFileResponse(serverResponse?.data);
        console.log("Files uploaded successfully");
      } else {
        console.error("Upload failed");
      }
      setUploadProgress(0); // Reset progress after upload
      setIsUploading(false); // Enable buttons
    };

    xhr.onerror = () => {
      console.error("An error occurred during the upload.");
      setUploadProgress(0); // Reset progress on error
      setIsUploading(false); // Enable buttons
    };

    xhr.send(body); // Start the upload
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
    const data = {
      files: filterItem,
      path: "/car-images",
    };

    console.log({ data });
    const body = serialize(data);

    uploadFiles(body); // Call the upload function
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

  return (
    <Box sx={{ mt: 4 }}>
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
          Imagens e vídeos do veículo:
        </Typography>
      </Box>

      <Box>
        {uploadProgress > 0 && (
          <LinearProgress
            variant="determinate"
            value={uploadProgress}
            // style={{ position: "absolute", top: 0, left: 0, right: 0 }}
          />
        )}
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
          disabled={isUploading}
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
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default BaseMultipleImagePicker;
