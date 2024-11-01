import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  TextareaAutosize,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import notaryImage from "../../../../../../public/Images/notary_submission.png";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useState } from "react";
import { useMemo } from "react";
import BaseModal from "../../../../reuseable/baseModal/BaseModal";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import DigitalNotaryDocumentSentModal from "../DigitalNotaryDocumentSentModal/DigitalNotaryDocumentSentModal";
import BaseTextField from "../../../../reuseable/baseTextField/BaseTextField";
import { DocumentSentApi } from "../../../../../api";

// const validationSchema = Yup.object().shape({
// 	protocol_no: Yup.string().required('Protocol no is required'),
// 	phone: Yup.string().required('Phone is required'),
// 	registration_no: Yup.string().required('Registration no is required'),
// 	return_period: Yup.string().required('Return period is required'),
// })

function DigitalNotaryModal({ handleClose, handleNext, singlePropertyData }) {
  const styleModal = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "70%", sm: "70%", md: "70%", lg: "35%", xl: "30%" },
    bgcolor: "#ffffff",
    boxShadow: "none",
    borderRadius: "12px",
    overflowY: "scroll",
    px: 1,
    py: 2,
  };

  //   const {
  //     register,
  //     watch,
  //     control,
  //     setError,
  //     handleSubmit,
  //     formState: { errors },
  //   } = useForm({
  //     resolver: yupResolver(validationSchema),
  //   });

  const [loading, setLoading] = useState("");

  //Notary_sent_modal_open
  const [digitalNotarySentModalOpen, setDigitalNotarySentModalOpen] =
    React.useState(false);
  const handleSentModalOpen = () => setDigitalNotarySentModalOpen(true);
  const handleSentModalClose = () => setDigitalNotarySentModalOpen(false);

  const onSubmit = async () => {
    setLoading(true);

    const requireData = {
      //   ...data,
      contract_id: +singlePropertyData?.contract?.id,
    };
    const [error, response] = await DocumentSentApi(requireData);
    setLoading(false);
    if (!error) {
      setDigitalNotarySentModalOpen(true);
    } else {
      const errors = error?.response?.data?.errors ?? {};
      //   Object.entries(errors).forEach(([name, messages]) => {
      //     setError(name, { type: "manual", message: messages[0] });
      //   });
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
              xs: "40vh",
              sm: "40vh",
              md: "40vh",
              lg: "40vh",
              xl: "30vh",
            },
          }}
        >
          <Box>
            <Image src={notaryImage} alt="notaryImage" />
          </Box>
        </Grid>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ ml: 2 }}
        >
          <Box sx={{ px: { xs: 2, sm: 2, md: 2, lg: 0 } }}>
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
              confirma envio dos documentos para o cartório registro de imóveis
              ?
            </Typography>
          </Box>
        </Grid>
        <Grid container spacing={2} sx={{ mt: 1, mb: 1 }}>
          <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
            <Button
              onClick={handleClose}
              fullWidth
              sx={{
                background: "#DBE1E5",
                borderRadius: "4px",
                color: "#1A1859",
                fontSize: "16px",
                lineHeight: "22px",
                fontWeight: "22px",
                textTransform: "none",
                "&:hover": {
                  background: "#DBE1E5",
                  borderRadius: "4px",
                  color: "#1A1859",
                  fontSize: "16px",
                  lineHeight: "22px",
                  fontWeight: "22px",
                },
              }}
            >
              cancelar
            </Button>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
            <Button
              onClick={onSubmit}
              type="submit"
              fullWidth
              // onClick={handleSentModalOpen}
              sx={{
                background: " #34BE84",
                borderRadius: "4px",
                color: "#ffffff",
                fontSize: "16px",
                lineHeight: "22px",
                fontWeight: "22px",
                textTransform: "none",
                "&:hover": {
                  background: " #34BE84",
                  borderRadius: "4px",
                  color: "#ffffff",
                  fontSize: "16px",
                  lineHeight: "22px",
                  fontWeight: "22px",
                },
              }}
            >
              {loading && <CircularProgress size={22} color="inherit" />}
              {!loading && "enviar"}
            </Button>
          </Grid>
        </Grid>
      </Box>
      <BaseModal
        isShowing={digitalNotarySentModalOpen}
        isClose={handleSentModalClose}
      >
        <Tooltip title="Something">
          <>
            <DigitalNotaryDocumentSentModal
              handleSentModalClose={handleSentModalClose}
              handleClose={handleClose}
              handleNext={handleNext}
            />
          </>
        </Tooltip>
      </BaseModal>
    </Box>
  );
}

export default DigitalNotaryModal;
