import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import Image from "next/image";
import proposeImage from "../../../../public/Images/proposal_modal.png";
import React, { Fragment, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import BaseTextField from "../../reuseable/baseTextField/BaseTextField";
import { createProposalApi, omitEmpties } from "../../../api";
import { useSession } from "next-auth/react";
import en from "locales/en";
import pt from "locales/pt";
import BaseValueField from "@/component/reuseable/baseValueField/BaseValueFiled";
import { reverseBrCurrencyFormat } from "@/utils/reverseBrCurrencyFormat";
import { useRouter } from "next/router";
import BaseMultipleImagePicker from "@/component/reuseable/baseMultipleImagePicker/BaseMultipleImagePicker";

const validationSchemaCash = Yup.object().shape({
  total_amount: Yup.string().required("valor é obrigatório"),
});

const validationSchemaInstallment = Yup.object().shape({
  total_amount: Yup.string().required("nome é obrigatório"),
  cash_amount: Yup.string().required("valor é obrigatório"),
  payment_per_installment: Yup.string().required("valor é obrigatório"),
  no_of_installment: Yup.number().required("valor é obrigatório"),
});

function ProposalStep({
  skipped,
  setSkipped,
  activeStep,
  setActiveStep,
  singlePropertyId,
  languageName,
}) {
  // const handleNext = () => {
  //   let newSkipped = skipped;
  //   if (isStepSkipped(activeStep)) {
  //     newSkipped = new Set(newSkipped.values());
  //     newSkipped.delete(activeStep);
  //   }

  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   setSkipped(newSkipped);
  // };

  const t = languageName === "en" ? en : pt;

  const { data: session } = useSession();

  const router = useRouter();
  const [files, setFiles] = useState([]);

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };
  const [isUploading, setIsUploading] = useState(false); // State to disable buttons
  const [cash, setCash] = useState(true);
  const [installment, setInstallment] = useState(false);
  const {
    register,
    watch,
    control,
    setError,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      cash ? validationSchemaCash : validationSchemaInstallment
    ),
  });

  const allValues = watch();

  const [loading, setLoading] = useState(false);
  const amount = localStorage.getItem("brl") || "";

  const [fileResponse, setFileResponse] = useState([]);

  const [vehicleAdd, setVehicleAdd] = useState(0);

  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (vehicleAdd === 1) {
      if (!allValues?.brand || !allValues?.model || !allValues?.year) {
        setDisabled(true);
      } else {
        setDisabled(false);
      }
    } else {
      setDisabled(false);
    }
  }, [allValues, vehicleAdd]);

  // useEffect(() => {
  //   amount && setValue("total_amount", amount);
  // }, [amount, setValue]);

  const onSubmit = async (data) => {
    const conditions = localStorage.getItem("condition") || null;
    data.total_amount = reverseBrCurrencyFormat(data.total_amount);
    data.cash_amount = reverseBrCurrencyFormat(data.cash_amount);
    data.payment_per_installment = reverseBrCurrencyFormat(
      data.payment_per_installment
    );
    setLoading(true);
    const allData = omitEmpties({
      ...data,
      user_id: session?.user?.userId,
      payment_type: (cash && "cash") || (installment && "installment"),
      property_id: singlePropertyId,
      proposal_type: "general",
      condition: conditions,
      observation: data?.observation,
      model: data?.model,
      year: data?.year,
      brand: data?.brand,
      images: fileResponse?.length > 0 ? fileResponse : null,
      include_vehicle: vehicleAdd,
    });

    if (!session) {
      localStorage.setItem("file_response", JSON.stringify(fileResponse));
      router.replace({
        pathname: "/registration",
        query: omitEmpties({
          user_type: "buyer",
          brl_value: data.total_amount,
          property_id: singlePropertyId,
          type: "proposal",
          payment_type: (cash && "cash") || (installment && "installment"),
          cash_amount: data?.cash_amount,
          payment_per_installment: data?.payment_per_installment,
          no_of_installment: data?.no_of_installment,
          observation: data?.observation,
          brand: data?.brand,
          model: data?.model,
          year: data?.year,
          include_vehicle: vehicleAdd,
        }),
      });
    } else {
      const [error, response] = await createProposalApi(allData);
      setLoading(false);
      if (!error) {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
          newSkipped = new Set(newSkipped.values());
          newSkipped.delete(activeStep);
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
        localStorage.removeItem("brl");
        localStorage.removeItem("condition");
      } else {
        const errors = error?.response?.data?.errors ?? {};

        Object.entries(errors).forEach(([name, messages]) => {
          setError(name, { type: "manual", message: messages[0] });
        });
      }
    }
  };

  return (
    <Box sx={{ mt: 2, mb: 1 }}>
      <Button sx={{ display: "flex" }}>
        <Image src={proposeImage} alt="proposeImage" />

        <Typography
          variant="p"
          sx={{
            fontSize: "24px",
            fontWeight: 700,
            color: "#002152",

            textTransform: "none",
          }}
        >
          {t["proposal values"]}
        </Typography>
      </Button>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        sx={{ my: 2 }}
      >
        <Button
          sx={{
            textTransform: "none",
            padding: "3px 6px",
            backgroundColor: cash ? "#0362F0" : "#F2F5F6",
            color: cash ? "#ffffff" : "#002152",
            borderRadius: "56px",
            "&: hover": {
              padding: "3px 6px",
              backgroundColor: "#0362F0",
              color: "#ffffff",
              borderRadius: "56px",
            },
          }}
          onClick={() => {
            setInstallment(false);
            setCash(true);
          }}
        >
          {t["In Cash"]}
        </Button>
        <Button
          sx={{
            textTransform: "none",
            padding: "3px 6px",
            backgroundColor: installment ? "#0362F0" : "#F2F5F6",
            color: installment ? "#ffffff" : "#002152",
            borderRadius: "56px",
            ml: 1,
            "&: hover": {
              padding: "3px 6px",
              backgroundColor: "#0362F0",
              color: "#ffffff",
              borderRadius: "56px",
            },
          }}
          onClick={() => {
            setInstallment(true);
            setCash(false);
          }}
        >
          {t["Installments"]}
        </Button>
      </Grid>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <Controller
            name="total_amount"
            control={control}
            defaultValue={amount}
            render={({ field }) => (
              <BaseValueField
                size={"small"}
                placeholder={t["Total amount"]}
                variant={"outlined"}
                type={"number"}
                name={"total_amount"}
                value={field.value}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
              />
            )}
          />
          <Typography
            variant="inherit"
            color="textSecondary"
            sx={{ color: "#b91c1c" }}
          >
            {errors.total_amount?.message}
          </Typography>
          {installment && (
            <Box>
              <Controller
                name="cash_amount"
                control={control}
                render={({ field }) => (
                  <BaseValueField
                    size={"small"}
                    placeholder={t["Cash value"]}
                    type={"number"}
                    sx={{ mt: 2 }}
                    variant={"outlined"}
                    name={"cash_amount"}
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                  />
                )}
              />
              <Typography
                variant="inherit"
                color="textSecondary"
                sx={{ color: "#b91c1c" }}
              >
                {errors.cash_amount?.message}
              </Typography>
              <Controller
                name="payment_per_installment"
                control={control}
                render={({ field }) => (
                  <BaseValueField
                    size={"small"}
                    placeholder={t["Term value"]}
                    type={"number"}
                    sx={{ mt: 2 }}
                    variant={"outlined"}
                    name={"payment_per_installment"}
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                  />
                )}
              />
              <Typography
                variant="inherit"
                color="textSecondary"
                sx={{ color: "#b91c1c" }}
              >
                {errors.payment_per_installment?.message}
              </Typography>
              <Controller
                name="no_of_installment"
                control={control}
                render={({ field }) => (
                  <BaseTextField
                    size={"small"}
                    placeholder={t["Number of installments"]}
                    type={"number"}
                    sx={{ mt: 2 }}
                    variant={"outlined"}
                    name={"no_of_installment"}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                  />
                )}
              />
              <Typography
                variant="inherit"
                color="textSecondary"
                sx={{ color: "#b91c1c" }}
              >
                {errors.no_of_installment?.message}
              </Typography>
            </Box>
          )}

          <Controller
            name="observation"
            control={control}
            render={({ field }) => (
              <TextareaAutosize
                aria-label="minimum height"
                minRows={4}
                placeholder={t["Observation"]}
                value={field.value}
                name={"observation"}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                style={{
                  marginTop: "2vh",
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
            )}
          />
          <Divider sx={{ my: 2 }} />
          <Grid container>
            <Typography variant="p">
              Deseja incluir veículo como forma de pagamento?
            </Typography>
          </Grid>

          <Box sx={{ mt: 1 }}>
            <Grid container spacing={1}>
              {[
                { value: 1, slug: "Sim" },
                { value: 0, slug: "Não" },
              ].map((data, index) => (
                <Grid item xs={6} sm={6} md={6} lg={4} key={index}>
                  <Button
                    onClick={() => setVehicleAdd(data?.value)}
                    sx={{
                      width: "100%",
                      background:
                        vehicleAdd === data?.value ? "#0362F0" : "#F2F5F6",
                      borderRadius: "152px",
                      color: vehicleAdd === data?.value ? "#ffffff" : "#002152",
                      fontSize: {
                        xs: "12px",
                        sm: "13px",
                        md: "16px",
                        lg: "13px",
                        xl: "16px",
                      },
                      fontWeight: "400",
                      lineHeight: "22px",
                      textTransform: "none",
                      px: { xs: 0, sm: 2, md: 2, lg: 2, xl: 2 },
                      py: 1,
                      "&:hover": {
                        width: "100%",
                        background: "#0362F0",
                        borderRadius: "152px",
                        color: "#ffffff",
                        fontSize: {
                          xs: "12px",
                          sm: "13px",
                          md: "16px",
                          lg: "13px",
                          xl: "16px",
                        },
                        fontWeight: "400",
                        lineHeight: "22px",
                        textTransform: "none",
                        px: {
                          xs: 0,
                          sm: 2,
                          md: 2,
                          lg: 2,
                          xl: 2,
                        },
                        py: 1,
                      },
                    }}
                  >
                    {data?.slug}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Box>
          {vehicleAdd === 1 && (
            <Fragment>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} sm={12} md={12} lg={4}>
                  <Controller
                    name="brand"
                    control={control}
                    render={({ field }) => (
                      <BaseTextField
                        size={"small"}
                        placeholder={t["Brand"]}
                        variant={"outlined"}
                        name={"brand"}
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                        }}
                      />
                    )}
                  />
                  <Typography
                    variant="inherit"
                    color="textSecondary"
                    sx={{ color: "#b91c1c" }}
                  >
                    {errors.brand?.message}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={4}>
                  <Controller
                    name="model"
                    control={control}
                    render={({ field }) => (
                      <BaseTextField
                        size={"small"}
                        placeholder={t["Model"]}
                        variant={"outlined"}
                        name={"model"}
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                        }}
                      />
                    )}
                  />
                  <Typography
                    variant="inherit"
                    color="textSecondary"
                    sx={{ color: "#b91c1c" }}
                  >
                    {errors.model?.message}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={4}>
                  <Controller
                    name="year"
                    control={control}
                    render={({ field }) => (
                      <BaseTextField
                        size={"small"}
                        placeholder={t["Year"]}
                        variant={"outlined"}
                        name={"year"}
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                        }}
                      />
                    )}
                  />
                  <Typography
                    variant="inherit"
                    color="textSecondary"
                    sx={{ color: "#b91c1c" }}
                  >
                    {errors.year?.message}
                  </Typography>
                </Grid>
              </Grid>

              <Box sx={{ width: "100%", mb: 2 }}>
                <BaseMultipleImagePicker
                  files={files}
                  setFiles={setFiles}
                  languageName={"pt"}
                  isUploading={isUploading}
                  setIsUploading={setIsUploading}
                  setFileResponse={setFileResponse}
                />
              </Box>
            </Fragment>
          )}
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            sx={{ mt: 2 }}
          >
            <Button
              type="submit"
              disabled={isUploading || disabled}
              sx={{
                background: "#7450F0",
                borderRadius: "4px",
                width: {
                  xs: "50%",
                  sm: "50%",
                  md: "50%",
                  lg: "50%",
                  xl: "40%",
                  xxl: "30%",
                },
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
              {loading && <CircularProgress size={22} color="inherit" />}
              {!loading && t["Submit proposal"]}
            </Button>
          </Grid>
        </Box>
      </form>
    </Box>
  );
}

export default ProposalStep;
