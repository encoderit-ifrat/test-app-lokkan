import dynamic from "next/dynamic";
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/material";
const BasicBreadcrumbs = dynamic(() =>
  import("@/component/reuseable/baseBreadCrumb/BaseBreadCrumb")
);
import BaseStepper from "../../../src/component/reuseable/baseStepper/BaseStepper";
import { Fragment, useEffect, useState } from "react";
const ProposalValueStep = dynamic(() =>
  import("@/component/properties/ProposalValueStep/ProposalValueStep")
);
const BuyerDataStep = dynamic(() =>
  import("@/component/properties/BuyerDataStep/BuyerDataStep")
);
const BaseModal = dynamic(() =>
  import("@/component/reuseable/baseModal/BaseModal")
);
const ProposalSentModal = dynamic(() =>
  import("@/component/properties/ProposalSentModal/ProposalSentModal")
);
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { proposalCreateApi } from "../../../src/api";
import { useDispatch, useSelector } from "react-redux";
import { findSinglePropertyData } from "../../../src/redux/singleProperty/actions";
import { useMemo } from "react";
const PropertyCard = dynamic(() =>
  import("@/component/properties/PropertyCard/PropertyCard")
);
import en from "locales/en";
import pt from "locales/pt";
import { _imageURL } from "consts";
import { reverseBrCurrencyFormat } from "@/utils/reverseBrCurrencyFormat";

const drawerWidth = 240;

const omitEmpties = (obj) => {
  return Object.entries(obj).reduce((carry, [key, value]) => {
    if (![null, undefined, ""].includes(value)) {
      carry[key] = value;
    }
    return carry;
  }, {});
};

export default function IncludeProposal({ language }) {
  const dispatch = useDispatch();
  const { data: session } = useSession();

  const [myValue, setMyValue] = useState(language || "pt");

  const t = myValue === "en" ? en : pt;

  const validationSchemaCash = Yup.object().shape({
    total_amount: Yup.string().required(t["BRL amount is required"]),
    //   name: Yup.string().required("Full name is required"),
    //   rg: Yup.string().required("RG  is required"),
    //   cpf: Yup.string().required("CPF is required"),
    //   zip_code: Yup.string().required("Zip code is required"),
    //   address: Yup.string().required("Address is required"),
    //   number: Yup.string().required("Number is required"),
    //   neighbourhood: Yup.string().required("Neighborhood is required"),
    //   complement: Yup.string().required("Complement is required"),
    //   city: Yup.string().required("city is required"),
    //   state: Yup.object().required("State is required"),
  });

  const validationSchemaInstallment = Yup.object().shape({
    total_amount: Yup.string().required("nome é obrigatório"),
    cash_amount: Yup.string().required("valor é obrigatório"),
    payment_per_installment: Yup.string().required("valor é obrigatório"),
    no_of_installment: Yup.number().required("valor é obrigatório"),
    //   name: Yup.string().required("Full name is required"),
    //   rg: Yup.string().required("RG  is required"),
    //   cpf: Yup.string().required("CPF is required"),
    //   zip_code: Yup.string().required("Zip code is required"),
    //   address: Yup.string().required("Address is required"),
    //   number: Yup.string().required("Number is required"),
    //   neighbourhood: Yup.string().required("Neighbourhood is required"),
    //   complement: Yup.string().required("Complement is required"),
    //   city: Yup.string().required("city is required"),
    //   state: Yup.object().required("State is required"),
  });

  const BreadCrumbsData = [
    { stage: t["Start"], route: "" },
    { stage: t["My Properties"], route: "" },
  ];

  const router = useRouter();
  const { query } = router;

  // const steps =
  //   session?.user?.role === "broker"
  //     ? [t["Proposal values"], t["Buyer data"]]
  //     : session?.user?.role === "construction_company"
  //     ? [t["Proposal values"], t["Buyer data"]]
  //     : session?.user?.role === "admin"
  //     ? [t["Proposal values"], t["Buyer data"]]
  //     : [t["Proposal values"]];
  const steps = [t["proposal values"]];

  useEffect(() => {
    dispatch(findSinglePropertyData(query?.property_id));
  }, [dispatch, query]);

  const propertyData = useSelector(
    (state) => state?.singleProperty?.singlePropertyData
  );

  const srcImage = useMemo(() => {
    console.log(
      "🟥 ~ srcImage ~ propertyData?.attachments:",
      propertyData?.attachments
    );
    return propertyData?.attachments?.find(
      (data) => data.title === "cover_photo"
    );
  }, [propertyData]);

  const [cash, setCash] = useState(true);
  const [installment, setInstallment] = useState(false);
  const [maritalStatus, setMaritalStatus] = useState("Married");

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

  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false); // State to disable buttons

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

  const [sentModalOpen, setSentModalOpen] = useState(false);
  const handleOpen = () => setSentModalOpen(true);
  const handleClose = () => setSentModalOpen(false);

  const onSubmit = async (data) => {
    setLoading(true);
    data.total_amount = reverseBrCurrencyFormat(data.total_amount);
    data.cash_amount = reverseBrCurrencyFormat(data.cash_amount);
    data.payment_per_installment = reverseBrCurrencyFormat(
      data.payment_per_installment
    );

    const requireData = omitEmpties({
      user_id: session?.user?.userId,
      property_id: query?.property_id,
      payment_type: (cash && "cash") || (installment && "installment"),
      proposal_type: "general",
      total_amount: data?.total_amount,
      cash_amount: data?.cash_amount,
      payment_per_installment: data?.payment_per_installment,
      no_of_installment: data?.no_of_installment,
      observation: data?.observation,
      model: data?.model,
      year: data?.year,
      brand: data?.brand,
      images: fileResponse?.length > 0 ? fileResponse : null,
      include_vehicle: vehicleAdd,
    });

    const [error, response] = await proposalCreateApi(requireData);

    setLoading(false);
    if (!error) {
      setSentModalOpen(true);
    } else {
      const errors = error?.response?.data?.errors ?? {};
      Object.entries(errors).forEach(([name, messages]) => {
        setError(name, { type: "manual", message: messages[0] });
      });

      setLoading(false);
    }
  };

  const goBack = () => {
    router.back();
  };

  return (
    <Box
      sx={{
        flexGrow: 1,

        width: { sm: `calc(100% - ${drawerWidth}px)` },
        paddingX: { xs: 0, sm: 0, md: 6, lg: 6, xl: 6 },
        paddingY: { xs: 0, sm: 0, md: 3, lg: 3, xl: 3 },
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          sx={{ mt: { xs: 8, sm: 8, md: 8, lg: 0 } }}
        >
          <BasicBreadcrumbs
            BreadcrumbsData={BreadCrumbsData}
            lastStageData={t["Proposal"]}
          />
        </Grid>
        <Box sx={{ mt: 3 }}>
          <BaseStepper
            steps={steps}
            activeStep={activeStep}
            isStepSkipped={isStepSkipped}
            marginTop={"2vh"}
            setActiveStep={setActiveStep}
          />
          {activeStep === steps.length ? (
            <Container maxWidth="xs">
              <Fragment></Fragment>
            </Container>
          ) : (
            <Fragment>
              <Box sx={{ mt: 4 }}>
                <PropertyCard
                  srcImage={[srcImage]}
                  amount={propertyData?.brl_rent}
                />
              </Box>

              <form onSubmit={handleSubmit(onSubmit)}>
                {activeStep === 0 ? (
                  <ProposalValueStep
                    handleNext={handleNext}
                    cash={cash}
                    setCash={setCash}
                    installment={installment}
                    setInstallment={setInstallment}
                    control={control}
                    errors={errors}
                    propertyData={propertyData}
                    srcImage={srcImage}
                    watch={watch}
                    languageName={myValue.toString()}
                    files={files}
                    setFiles={setFiles}
                    fileResponse={fileResponse}
                    setFileResponse={setFileResponse}
                    vehicleAdd={vehicleAdd}
                    setVehicleAdd={setVehicleAdd}
                    isUploading={isUploading}
                    setIsUploading={setIsUploading}
                    disabled={disabled}
                    setDisabled={setDisabled}
                  />
                ) : (
                  <BuyerDataStep
                    handleNext={handleNext}
                    handleBack={handleBack}
                    control={control}
                    errors={errors}
                    setMaritalStatus={setMaritalStatus}
                    maritalStatus={maritalStatus}
                    setValue={setValue}
                    languageName={myValue.toString()}
                  />
                )}
                <Grid
                  container
                  direction="row"
                  justifyContent={{
                    xs: "flex-start",
                    sm: "flex-start",
                    md: "flex-start",
                    lg: "flex-end",
                    xl: "flex-end",
                  }}
                  alignItems="center"
                  sx={{
                    pt: 2,
                  }}
                >
                  {activeStep === steps.length - 1 && (
                    <Grid container spacing={1} sx={{ mt: 2, mb: 5 }}>
                      {session?.user?.role === "broker" ||
                      session?.user?.role === "construction_company" ||
                      session?.user?.role === "admin" ? (
                        <Grid item xs={6} sm={6} md={6}>
                          <Button
                            color="inherit"
                            // disabled={activeStep === 0}
                            onClick={handleBack}
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
                            {t["Come back"]}
                          </Button>
                        </Grid>
                      ) : (
                        <Grid item xs={6} sm={6} md={6}>
                          <Button
                            color="inherit"
                            // disabled={activeStep === 0}
                            onClick={goBack}
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
                            {t["Come back"]}
                          </Button>
                        </Grid>
                      )}

                      <Grid item xs={6} sm={6} md={6}>
                        <Box display="flex" justifyContent="flex-end">
                          <Button
                            type="submit"
                            disabled={isUploading || disabled}
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
                              width: {
                                xs: "100%",
                                sm: "100%",
                                md: "100%",
                                lg: "50%",
                              },
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
                                boxShadow:
                                  "0px 4px 8px rgba(81, 51, 182, 0.32)",
                              },
                            }}
                          >
                            {loading && (
                              <CircularProgress size={22} color="inherit" />
                            )}
                            {!loading && t["Submit proposal"]}
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  )}

                  {/* {activeStep === 0 &&
                    (session?.user?.role === "broker" ||
                      session?.user?.role === "admin") && (
                      <Grid container spacing={1} sx={{ mt: 2, mb: 5 }}>
                        <Grid item xs={6} sm={6} md={6}>
                          <Button
                            color="inherit"
                            // disabled={activeStep === 0}
                            onClick={goBack}
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
                            {t["Cancel"]}
                          </Button>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6}>
                          <Box display="flex" justifyContent="flex-end">
                            <Button
                              onClick={handleNext}
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
                                boxShadow:
                                  "0px 4px 8px rgba(81, 51, 182, 0.32)",
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
                                  boxShadow:
                                    "0px 4px 8px rgba(81, 51, 182, 0.32)",
                                },
                              }}
                            >
                              {t["Next"]}
                            </Button>
                          </Box>
                        </Grid>
                      </Grid>
                    )} */}
                </Grid>
              </form>
            </Fragment>
          )}
        </Box>
        <BaseModal isShowing={sentModalOpen} isClose={handleClose}>
          <Tooltip title="Something">
            <>
              <ProposalSentModal
                handleClose={handleClose}
                languageName={myValue.toString()}
              />
            </>
          </Tooltip>
        </BaseModal>
      </Container>
    </Box>
  );
}
