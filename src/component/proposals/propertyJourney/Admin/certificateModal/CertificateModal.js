import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import React from "react";
import handshake from "../../../../../../public/Images/handshake.png";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import certificate from "../../../../../../public/Images/certificate.png";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import { useState } from "react";
import { useMemo } from "react";
import { serialize } from "object-to-formdata";
import { useForm } from "react-hook-form";
import { certificateUploadApi } from "../../../../../api";
import { useDispatch } from "react-redux";
import { findRequireCertificateData } from "../../../../../redux/requireCertificate/actions";
import BaseTextArea from "@/component/reuseable/baseTextArea/BaseTextArea";
import en from "locales/en";
import pt from "locales/pt";
import toast from "react-hot-toast";

const baseStyle = {
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
  width: "90%",

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

function CertificateModal({
  handleClose,
  certificateData,
  singlePropertyData,
  uploadCount,
  languageName,
}) {
  const t = languageName === "en" ? en : pt;
  const dispatch = useDispatch();
  const styleModal = {
    position: "absolute",
    top: "50%",
    left: "50%",
    // top:{xs:"80%"},
    transform: "translate(-50%, -50%)",
    width: { xs: "70%", sm: "70%", md: "70%", lg: "35%", xl: "35%" },
    bgcolor: "#ffffff",
    // border: "2px solid #000",
    boxShadow: "none",
    borderRadius: "12px",
    overflowY: "scroll",
    px: 1,
    py: 2,
  };
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);

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
      "application/pdf": [],
    },
  });

  const handleDelete = (index) => {
    const filterItem = files.filter((file, fileIndex) => fileIndex !== index);
    setFiles(filterItem);
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

  const {
    setError,
    formState: { errors },
  } = useForm();

  const omitEmpties = (obj) => {
    return Object.entries(obj).reduce((carry, [key, value]) => {
      if (![null, undefined, "", []].includes(value)) {
        carry[key] = value;
      }
      return carry;
    }, {});
  };

  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    setLoading(true);

    const requireData = omitEmpties({
      contract_id: +singlePropertyData?.contract?.id,
      certificate_file: files[files.length - 1],
      certificate_type_id: certificateData?.tag?.id,
      remarks: comment,
      send_email: +uploadCount + 1 === 10 ? 1 : 0,
    });

    const formData = serialize(requireData, { indices: true });
    const [error, response] = await certificateUploadApi(formData);
    setLoading(false);
    if (!error) {
      dispatch(findRequireCertificateData(+singlePropertyData?.contract?.id));

      handleClose();
      // setSentModalOpen(true);
    } else {
      toast.error("O documento certificado é obrigatório");
    }
  };
  return (
    <Box sx={styleModal}>
      <Box sx={{ width: "100%" }}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{
            height: {
              xs: "50vh",
              sm: "50vh",
              md: "50vh",
              lg: "60vh",
              xl: "50vh",
            },
          }}
        >
          <Box>
            <Image src={certificate} alt="certificate" />
          </Box>
          <Box sx={{ pl: { xs: 2, sm: 2, md: 2, lg: 2, xl: 4 } }}>
            <Typography
              variant="p"
              sx={{
                color: "#002152",
                fontSize: "24px",
                fontWeight: "700",
                lineHeight: "32px",
                textAlign: "center",
                mt: 2,
              }}
            >
              {certificateData?.tag?.name}
            </Typography>
          </Box>
          <Box {...getRootProps({ style })}>
            <input {...getInputProps()} />
            {/* <Typography
              variant="p"
              sx={{
                color: "#6C7A84",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "18px",
                mt: 1,
              }}
            >
              Drag and drop here
            </Typography> */}
            {/* <Typography
              variant="p"
              sx={{
                color: "#6C7A84",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "18px",
                mt: 1,
              }}
            >
              or
            </Typography> */}
            <FolderOutlinedIcon />
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
              {t["select document"]}
            </Button>
          </Box>
          <Typography
            variant="inherit"
            color="textSecondary"
            sx={{ color: "#b91c1c", mt: 0.5 }}
          >
            {errors?.certificate_file?.message}
          </Typography>
        </Grid>
      </Box>
      {files?.length > 0 && (
        <Grid sx={{ px: 10, mb: 2 }}>
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
                }}
                onClick={() => handleDelete(files.length - 1)}
              />
            </Grid>
            {/* <InsertDriveFileOutlinedIcon/> */}
            <Typography
              variant="p"
              sx={{ color: "#38bdf8", fontWeight: "600" }}
            >
              {files[files.length - 1]?.name?.slice(0, 20)}
            </Typography>
          </Box>
        </Grid>
      )}
      {/* <Box sx={{ px: 3 }}>
        <Typography
          variant="p"
          sx={{
            color: "#002152",
            fontSize: "16px",
            lineHeight: "22px",
            fontWeight: "400",
          }}
        >
          Comments:
        </Typography>
        <TextareaAutosize
          aria-label="minimum height"
          minRows={4}
          //   placeholder="Observation"
          //   value={field.value}
          style={{
            marginTop: "0.5vh",
            width: "100%",
            // margin: "2vh 0",
            color: "rgba(0, 0, 0, 0.87)",
            fontSize: "17px",
            outlineColor: "#1976d2",
            border: `1px solid silver`,
            borderRadius: "5px",
            padding: "0.4vh 1.4vh",
          }}
        />
      </Box> */}
      <Box sx={{ mx: 4 }}>
        <BaseTextArea
          minRows={3}
          onChange={(e) => {
            // field.onChange(e.target.value);
            setComment(e.target.value);
          }}
          name={"remarks"}
          style={{
            // marginTop: "1vh",
            width: "100%",
            // margin: "2vh 0",
            color: "rgba(0, 0, 0, 0.87)",
            fontSize: "17px",
            outlineColor: "#1976d2",
            border: `1px solid silver`,
            borderRadius: "5px",
            padding: "0.4vh 1.4vh",
          }}
          placeholder={t["Comment"]}
        />
      </Box>
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="flex-end"
        sx={{ mt: { xs: 2, sm: 2, md: 2, lg: 0, xl: 2 }, px: 3, pb: 3 }}
      >
        <Button
          variant="outlined"
          sx={{
            borderColor: "#002152",
            fontSize: "16px",
            fontWeight: "600",
            color: "#002152",
            textTransform: "none",
            paddingX: 4,
            paddingY: 0.6,
            mr: 1,
            "&:hover": {
              borderColor: "#002152",
              fontSize: "16px",
              fontWeight: "600",
              color: "#002152",
              textTransform: "none",
              paddingX: 4,
              paddingY: 0.6,
              mr: 1,
            },
          }}
          onClick={handleClose}
        >
          {t["Cancel"]}
        </Button>
        <Button
          onClick={handleSubmit}
          variant="outlined"
          sx={{
            background: "#34BE84",
            boxShadow: "0px 4px 8px rgba(34, 148, 100, 0.32)",
            borderRadius: "4px",
            fontSize: "16px",
            fontWeight: "600",
            lineHeight: "22px",
            textTransform: "none",
            color: "#ffffff",
            paddingX: 4,
            paddingY: 1,
            "&:hover": {
              background: "#34BE84",
              boxShadow: "0px 4px 8px rgba(34, 148, 100, 0.32)",
              borderRadius: "4px",
              fontSize: "16px",
              fontWeight: "600",
              lineHeight: "22px",
              textTransform: "none",
              color: "#ffffff",
              paddingX: 4,
              paddingY: 1,
            },
          }}
        >
          {loading && <CircularProgress size={22} color="inherit" />}
          {!loading && t["To send"]}
        </Button>
      </Grid>
    </Box>
  );
}

export default CertificateModal;
