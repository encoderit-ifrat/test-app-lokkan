import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Grid,
  Typography,
  Box,
  TextField,
  Stack,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import negotiateImage from "../../../../public/Images/negotiate.png";
import Image from "next/image";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { CalendarPicker } from "@mui/x-date-pickers/CalendarPicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import BaseModal from "../../reuseable/baseModal/BaseModal";
import ScheduleModal from "../scheduleModal/ScheduleModal";
import BaseTextField from "../../reuseable/baseTextField/BaseTextField";
import { useSession, signIn, signOut } from "next-auth/react";
import BaseTextArea from "../../reuseable/baseTextArea/BaseTextArea";
import { addDays, formatISO } from "date-fns";
import { DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import { Controller } from "react-hook-form";
import { createScheduleApi } from "../../../api";
import { ptBR } from "date-fns/locale";
import en from "locales/en";
import pt from "locales/pt";
import { Router, useRouter } from "next/router";
import BaseWhatsappButton from "@/component/reuseable/baseWhatsappButton/BaseWhatsappButton";
import BaseValueField from "@/component/reuseable/baseValueField/BaseValueFiled";
import { formatBrCurrency } from "@/utils/formatBrCurrency";
import { reverseBrCurrencyFormat } from "@/utils/reverseBrCurrencyFormat";
import { formatBrazilianCurrency } from "@/utils/useUtilities";
import { Element } from "react-scroll";
import toast from "react-hot-toast";
import { isValidDate } from "@/utils/dateValidate";

function Negotiate({
  handleProposalOpen,
  negotiate,
  schedule,
  setNegotiate,
  setSchedule,
  singlePropertyData,
  handleLoginOpen,
  singlePropertyId,
  content,
  languageName,
}) {
  // const [date, setDate] = React.useState(dayjs("2022-04-07"));
  const t = languageName === "en" ? en : pt;
 
  const [value, setValue] = React.useState(new Date(dayjs().add(6, 'hour').toDate()));



  const router = useRouter();

  const [brlValue, setBrlValue] = useState("");
  const [condition, setCondition] = useState("");
  const [conditionField, setConditionField] = useState(false);
  const { data: session } = useSession();
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // const handleOpen = () => {
  //   setScheduleModalOpen(true);
  // };
  const handleClose = () => setScheduleModalOpen(false);

  const handleToSchedule = async () => {
    if(isValidDate(dayjs(value).format("DD-MM-YYYY"))){
    setLoading(true);
    const dateString = dayjs(value, "YYYY-MM-DD+h:mm").format("YYYY-MM-DD");
    const timeString = dayjs(value, "YYYY-MM-DD+h:mm").format("HH:mm");
    const allData = {
      date: dateString,
      time: timeString,
      buyer_id: session?.user?.userId,
      property_id: singlePropertyId,
    };

    const [error, response] = await createScheduleApi(allData);
    setLoading(false);
    if (!error) {
      setScheduleModalOpen(true);
    } else {
      const errors = error?.response?.data?.errors ?? {};
      toast.error('Há algo errado. verifique seu back-end')
    }
  }
  else{
    toast.error('A data da programação é inválida')
  }
  };

  const handleProposal = useCallback(() => {
    if (brlValue) {
      // !session
      //   ? router.replace({
      //       pathname: "/registration",
      //       query: {
      //         user_type: "buyer",
      //         brl_value: reverseBrCurrencyFormat(brlValue),
      //         property_id: singlePropertyId,
      //         type: "proposal",
      //       },
      //     })
      //   :
      handleProposalOpen();
    }
  }, [handleProposalOpen, brlValue]);

  const handleSchedule = useCallback(() => {
    const dateString = dayjs(value, "YYYY-MM-DD+h:mm").format("YYYY-MM-DD");
    const timeString = dayjs(value, "YYYY-MM-DD+h:mm").format("HH:mm");
    !session
      ? router.replace({
          pathname: "/registration",
          query: {
            user_type: "buyer",
            date: dateString,
            time: timeString,
            property_id: singlePropertyId,
            type: "schedule",
          },
        })
      : handleToSchedule();
  }, [session, router, value]);

  const [error, setError] = useState('');


  return (
    <Box
      sx={{
        backgroundColor: "#ffffff",
        border: "1px solid #F9F9FB",
        boxShadow: "0px 4px 34px rgba(0, 0, 0, 0.08)",
        borderRadius: "8px",
        py: 2,
      }}
    >
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ px: 4, py: 1 }}
      >
        <Typography
          variant="p"
          sx={{ fontSize: "14px", fontWeight: "400", color: "#1A1859" }}
        >
          {t["Value"]}
        </Typography>
        <Typography
          variant="p"
          sx={{ fontSize: "14px", fontWeight: "700", color: "#1A1859" }}
        >
          {formatBrazilianCurrency(singlePropertyData?.property?.brl_rent)}
        </Typography>
      </Grid>
      <Box sx={{ borderBottom: "1px dashed #D3D3DF" }}></Box>
      {singlePropertyData?.property?.condominium && (
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ px: 4, py: 1 }}
        >
          <Typography
            variant="p"
            sx={{ fontSize: "14px", fontWeight: "400", color: "#1A1859" }}
          >
            {t["Condominium"]}
          </Typography>

          <Typography
            variant="p"
            sx={{ fontSize: "14px", fontWeight: "700", color: "#1A1859" }}
          >
            {formatBrazilianCurrency(singlePropertyData?.property?.condominium)}
          </Typography>
        </Grid>
      )}
      <Box sx={{ borderBottom: "1px dashed #D3D3DF" }}></Box>
      {singlePropertyData?.property?.brl_iptu && (
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ px: 4, py: 1 }}
        >
          <Typography
            variant="p"
            sx={{ fontSize: "14px", fontWeight: "400", color: "#1A1859" }}
          >
            IPTU
          </Typography>
          <Typography
            variant="p"
            sx={{ fontSize: "14px", fontWeight: "700", color: "#1A1859" }}
          >
            {formatBrazilianCurrency(singlePropertyData?.property?.brl_iptu)}
          </Typography>
        </Grid>
      )}
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ mt: 1, px: 4 }}
        gap={1}
      >
        <BaseWhatsappButton content={content} />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            px: 4,
            fontSize: "16px",
            fontWeight: "600",
            textTransform: "none",
            background: "#0E97F7",
            borderRadius: "4px",
            // mb: 2,
            "&:hover": {
              fontSize: "16px",
              fontWeight: "600",
              textTransform: "none",
              background: "#0E97F7",
              borderRadius: "4px",
              px: 4,
            },
          }}
          onClick={() => {
            setNegotiate(true);
            setSchedule(false);
          }}
        >
          {t["Negotiate"]}
        </Button>
        {negotiate && (
          <Box
            sx={{
              mt: 3,
              boxSizing: "border-box",
              backgroundColor: "#F9F9FB",
              border: "1px solid #D3D3DF",
              height: "30vh",
              width: "100%",
              borderRadius: "4px",
            }}
          >
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
              sx={{ mt: 2 }}
            >
              <Image src={negotiateImage} alt="negotiate" />
              <Box
                sx={{
                  background: "#3E50D8",
                  borderRadius: "0 20px 20px 20px",
                  py: 1,
                  px: 2,
                  width: "70%",
                }}
              >
                <Typography
                  variant="p"
                  sx={{
                    fontSize: "14px",
                    fontWeight: "400",
                    lineHeight: "18px",
                    color: "#ffffff",
                  }}
                >
                  {t["There is no proposal or schedule yet"]}
                </Typography>
              </Box>
            </Grid>
          </Box>
        )}
      </Grid>
      {negotiate && (
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          sx={{ px: 4, py: 1 }}
        >
          <Typography
            variant="p"
            sx={{
              fontSize: "12px",
              fontWeight: "400",
              lineHeight: "32px",
            }}
          >
            {t["Proposal"]}
          </Typography>
          <BaseValueField
            size={"small"}
            type={"number"}
            placeholder={"R$"}
            value={brlValue}
            onChange={(e) => {
              const value = e.target.value;
              setBrlValue(value);
              localStorage.setItem("brl", value);
            }}
          />
          <Button
            onClick={() => setConditionField(true)}
            fullWidth
            variant="outlined"
            sx={{ textTransform: "none", mt: 1 }}
          >
            {t["Include Condition"]}
          </Button>
          {conditionField && (
            <BaseTextArea
              minRows={3}
              onChange={(e) => {
                setCondition(e.target.value);
                localStorage.setItem("condition", e.target.value);
              }}
              style={{
                marginTop: "1vh",
                width: "100%",
                // margin: "2vh 0",
                color: "rgba(0, 0, 0, 0.87)",
                fontSize: "17px",
                outlineColor: "#1976d2",
                border: `1px solid silver`,
                borderRadius: "5px",
                padding: "0.4vh 1.4vh",
              }}
              value={condition}
              placeholder={"condição"}
            />
          )}

          <Button
            disabled={
              session?.user?.role === "broker" || session?.user?.role === "construction_company" ||
              session?.user?.role === "owner"
            }
            fullWidth
            sx={{
              background: "#00C1B4",
              boxShadow: "0px 4px 34px rgba(0, 0, 0, 0.08)",
              borderRadius: "4px",
              color: "#ffffff",
              fontSize: "16px",
              lineHeight: "22px",
              fontWeight: "600",
              mt: 1,
              textTransform: "none",

              py: 1,
              "&:hover": {
                background: "#00C1B4",
                boxShadow: "0px 4px 34px rgba(0, 0, 0, 0.08)",
                borderRadius: "4px",
                color: "#ffffff",
                fontSize: "16px",
                lineHeight: "22px",
                fontWeight: "600",
                mt: 1,
                textTransform: "none",

                py: 1,
              },
            }}
            onClick={handleProposal}
          >
            {t["Submit proposal"]}
          </Button>
        </Grid>
      )}
      <Box sx={{ border: "1px dashed #D3D3DF", mt: 1 }}></Box>
      <Element name="schedule_visit">
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ px: 4, py: 1 }}
        >
          <Button
            disabled={
              session?.user?.role === "broker" || session?.user?.role === "construction_company" ||
              session?.user?.role === "owner"
            }
            variant="contained"
            color="secondary"
            fullWidth
            sx={{
              mt: 1,
              px: 4,
              fontSize: "16px",
              fontWeight: "600",
              textTransform: "none",
              background: "#7450F0",
              borderRadius: "4px",
              // mb: 2,
              "&:hover": {
                fontSize: "16px",
                fontWeight: "600",
                textTransform: "none",
                background: "#7450F0",
                borderRadius: "4px",
                px: 4,
              },
            }}
            onClick={() => {
              setNegotiate(false);
              setSchedule(true);
            }}
          >
            {t["Schedule visit"]}
          </Button>
        </Grid>
      </Element>
      {schedule && (
        <Box sx={{ mt: 1 }}>
          <Box
            sx={{
              border: "1px solid #D3D3DF",
              background: "#F9F9FB",
              borderRadius: "4px",
              mx: 4,
            }}
          >
            <LocalizationProvider locale={ptBR} dateAdapter={AdapterDateFns}>
              <Stack spacing={3}>
                <DateTimePicker
                  inputFormat="dd/MM/yyyy hh:mm a"
                  value={value}
                  onChange={(val) => {
                    if (val < new Date()) {
                      setError('A data e a hora selecionadas não podem estar no passado');
                    } else {
                      setError('');
                      setValue(val);
                    }
                  }}
                 
                  minDateTime={new Date()}
              
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      variant="outlined"
                      error={!!error}
                      helperText={error}
                      InputProps={{
                        ...params.InputProps,
                      }}
                    />
                  )}
                />
              </Stack>
            </LocalizationProvider>
          </Box>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ px: 4, py: 1 }}
          >
            <Button
              onClick={handleSchedule}
              variant="contained"
              color="secondary"
              fullWidth
              sx={{
                mt: 1,

                fontSize: "16px",
                fontWeight: "600",
                textTransform: "none",
                background: "#00C1B4",
                borderRadius: "4px",
                "&: hover": {
                  background: "#00C1B4",
                  borderRadius: "4px",
                  fontSize: "16px",
                  fontWeight: "600",
                },
              }}
            >
              {loading && <CircularProgress size={22} color="inherit" />}
              {!loading && t["To schedule"]}
            </Button>
          </Grid>
        </Box>
      )}
      <BaseModal isShowing={scheduleModalOpen} isClose={handleClose}>
        <Tooltip title="Something">
          <>
            <ScheduleModal
              languageName={languageName}
              handleClose={handleClose}
            />
          </>
        </Tooltip>
      </BaseModal>
    </Box>
  );
}

export default Negotiate;
