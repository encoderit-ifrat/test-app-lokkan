import dynamic from "next/dynamic";
import Head from "next/head";
import {
  Box,
  Container,
  Grid,
  Tooltip,
  Snackbar,
  Alert,
  CircularProgress,
  Stack,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
const PersonalData = dynamic(
  () => import("@/component/brokerRegistration/personalData/PersonalData"),
  { ssr: false }
);

const BaseStepper = dynamic(() =>
  import("@/component/reuseable/baseStepper/BaseStepper")
);
const AddressData = dynamic(() =>
  import("@/component/brokerRegistration/Address/AddressData")
);
const BrokerRegistrationFooter = dynamic(() =>
  import("@/component/shared/Footer/BrokerRegistrationFooter")
);
const BaseModal = dynamic(() =>
  import("@/component/reuseable/baseModal/BaseModal")
);
const BrokerRegistrationSentModal = dynamic(() =>
  import(
    "@/component/brokerRegistration/BrokerRegistrationSendModal/BrokerRegistrationSendModal"
  )
);
const Navbar = dynamic(() => import("@/component/shared/Navbar/Navbar"), {
  ssr: false,
});

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { serialize } from "object-to-formdata";

import dayjs from "dayjs";
import en from "locales/en";
import pt from "locales/pt";
import BaseButton from "@/component/reuseable/baseButton/BaseButton";
import { useRouter } from "next/router";
const Footer = dynamic(() => import("@/component/shared/Footer/Footer"), {
  ssr: false,
});
import { userInfoRegistrationApi } from "@/api";
import { isValidDate } from "@/utils/dateValidate";
import toast from "react-hot-toast";

const aboutLokkanData = [
  "Indicação de amigo",
  "Facebook",
  "Instagram",
  "Linkedin",
  "Notícias",
  "Parcerias",
];

const omitEmpties = (obj) => {
  return Object.entries(obj).reduce((carry, [key, value]) => {
    if (![null, undefined, "", [], {}].includes(value)) {
      carry[key] = value;
    }
    return carry;
  }, {});
};

export default function OtherInformation({
  loginOpen,
  setLoginOpen,
  handleLoginOpen,
  handleLoginClose,
  language,
}) {
  const [selectedBroker, setSelectedBroker] = useState(null);
  const userRole = localStorage.getItem("user_role");

  const [myValue, setMyValue] = useState(language || "pt");

  const t = myValue === "en" ? en : pt;

  const validationSchema = Yup.object().shape({
    full_name: Yup.string().required(t["Full Name is required"]),
    creci_number:
      userRole == "broker" &&
      Yup.string().required(t["CRECI number is required"]),
    cpf_number: Yup.string()
      .required(t["CPF number is required"])
      .test("isValid", t["CPF number is required"], (cpf) => {
        cpf = cpf.replace(/\D/g, ""); // Remove non-numeric characters
        if (cpf.length !== 11) {
          return false;
        }
        // Eliminate known invalid CPFs
        if (/(\d)\1{10}/.test(cpf)) {
          return false;
        }
        // Validate the check digits
        for (let t = 9; t < 11; t++) {
          let d = 0;
          for (let c = 0; c < t; c++) {
            d += parseInt(cpf.charAt(c)) * (t + 1 - c);
          }
          d = ((10 * d) % 11) % 10;
          if (cpf.charAt(t) != d) {
            return false;
          }
        }
        return true;
      }),
    rg_number: Yup.string()
      .required(t["RG number is required"])
      .min(12, t["RG number is required"]),
    dob: Yup.string().required(t["Date of Birth number is required"]),
    zip_code: Yup.string().required(t["Zip code number is required"]),
    address: Yup.string().required(t["Address is required"]),
    number: Yup.string().required(t["Number is required"]),
    neighbourhood: Yup.string().required(t["Neighbourhood is required"]),
    state: Yup.mixed()
      .test("is-object", t["State is required"], (value) => !!value)
      .required(t["State is required"]),
    city: Yup.string().required(t["City is required"]),
  });

  const preferenceData = [
    { name: "rent", slug: t["rent"] },
    { name: "sale", slug: t["sale"] },
    { name: "both", slug: t["both"] },
  ];

  const steps = [t["Personal data"], t["Address"]];

  const [successMessage, setSuccessMessage] = useState("");
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);

  const handleClickSuccessSnackbar = () => {
    setSuccessSnackbarOpen(true);
  };

  const handleCloseSuccessSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessSnackbarOpen(false);
  };

  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const dispatch = useDispatch();
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

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleClickSnackbar = () => {
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const [sentModalOpen, setSentModalOpen] = useState(false);
  const handleOpen = () => setSentModalOpen(true);
  const handleClose = () => setSentModalOpen(false);

  const [actingPreferenceBtn, setActingPreferenceBtn] = useState(
    preferenceData[0]?.name
  );
  const [aboutLokkanBtn, setAboutLokkanBtn] = useState(aboutLokkanData[0]);
  const [loading, setLoading] = useState(false);
  const {
    register,
    watch,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
    reset,
    trigger,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  console.log({ errors });

  const allValues = watch();

  console.log({ allValues });
  const { replace } = useRouter();

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      handleClickSnackbar();
    }
  }, [errors]);

  const onSubmit = async (data) => {
    if(isValidDate(dayjs(data.dob).format("DD-MM-YYYY"))){
      setLoading(true);
      const registrationId = localStorage.getItem("registration_id");
  
      const additionalInfoData = omitEmpties({
        full_name: data.full_name,
        description: data.description,
        creci_number: data.creci_number,
        cpf: data.cpf_number,
        rg: data.rg_number,
        dob: dayjs(data.dob).format("YYYY-MM-DD"),
        social_name: data.social_name,
        broker_type: actingPreferenceBtn,
        referred_from: aboutLokkanBtn,
        broker_referral_id: selectedBroker?.id,
      });
      const addressData = omitEmpties({
        zip_code: data.zip_code,
        address: data.address,
        number: data.number,
        neighbourhood: data.neighbourhood,
        add_on: data.add_on,
        city: data.city,
        state_id: data.state.id,
      });
  
      const firstPartData = omitEmpties({
        image: data.image,
        user_id: registrationId,
        broker_url: window.location.origin,
        redirect_url: `${window.location.origin}/user-loading`,
      });
  
      const requireData = {
        ...firstPartData,
        additional_info: additionalInfoData,
        address: addressData,
      };
  
      console.log(requireData);
  
      const formData = serialize(requireData, { indices: true });
      const [error, responseToken] = await userInfoRegistrationApi(formData);
  
      setLoading(false);
      if (!error) {
        setSentModalOpen(true);
        setSuccessMessage(responseToken?.data?.message);
        handleClickSuccessSnackbar();
        localStorage.removeItem("Reg_user_name");
        localStorage.removeItem("user_role");
        localStorage.removeItem("registration_id");
      } else {
        const errors = error?.response?.data?.errors ?? {};
  
        Object.entries(errors).forEach(([name, messages]) => {
          setError(name, { type: "manual", message: messages[0] });
        });
      }
    }
    else{
      toast.error("A data de nascimento é inválida")
    }
  };

  useEffect(() => {
    const user_name = localStorage.getItem("Reg_user_name") || "";
    setValue("full_name", user_name);
  }, [setValue]);

  return (
    <div>
      <Head>
        <title>Lokkan - A imobiliária digital</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/negotiate.png" />
      </Head>

      <main className="section">
        <Navbar
          shape={false}
          loginOpen={loginOpen}
          setLoginOpen={setLoginOpen}
          handleLoginClose={handleLoginClose}
          handleLoginOpen={handleLoginOpen}
          languageName={language}
          setMyValue={setMyValue}
          myValue={myValue}
          colorLogo={true}
        />
        <Box>
          <Container maxWidth="md">
            <BaseStepper
              steps={steps}
              activeStep={activeStep}
              isStepSkipped={isStepSkipped}
              setActiveStep={setActiveStep}
              marginTop={"2vh"}
            />

            {activeStep === steps.length ? (
              <Container maxWidth="xs">
                <Fragment></Fragment>
              </Container>
            ) : (
              <Fragment>
                <form onSubmit={handleSubmit(onSubmit)}>
                  {activeStep === 0 ? (
                    <PersonalData
                      handleNext={handleNext}
                      control={control}
                      errors={errors}
                      allValues={allValues}
                      activeStep={activeStep}
                      languageName={myValue.toString()}
                      selectedBroker={selectedBroker}
                      setSelectedBroker={setSelectedBroker}
                      reset={reset}
                      replace={replace}
                      trigger={trigger}
                    />
                  ) : (
                    <AddressData
                      handleNext={handleNext}
                      handleBack={handleBack}
                      control={control}
                      errors={errors}
                      allValues={allValues}
                      setValue={setValue}
                      activeStep={activeStep}
                      languageName={myValue.toString()}
                      reset={reset}
                      replace={replace}
                      trigger={trigger}
                    />
                  )}

                  <Grid container spacing={1} sx={{ mt: 2, mb: 5 }}>
                    {activeStep === 1 && (
                      <>
                        <Grid item xs={3} sx={{ ml: "auto" }}>
                          <BaseButton
                            fullWidth
                            disabled={activeStep === 0}
                            handleFunction={handleBack}
                            sx="mute"
                          >
                            {t["Come back"]}
                          </BaseButton>
                        </Grid>
                        <Grid item xs={3}>
                          <BaseButton type="submit" fullWidth sx="success">
                            {loading && (
                              <CircularProgress size={22} color="inherit" />
                            )}
                            {!loading && t["Register"]}
                          </BaseButton>
                        </Grid>
                      </>
                    )}
                  </Grid>
                </form>

                <Snackbar
                  open={snackbarOpen}
                  autoHideDuration={6000}
                  onClose={handleCloseSnackbar}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  key={"top"}
                >
                  <Alert
                    onClose={handleCloseSnackbar}
                    severity="error"
                    sx={{ width: "100%" }}
                  >
                    Fill up the required field!
                  </Alert>
                </Snackbar>
                <Snackbar
                  open={successSnackbarOpen}
                  autoHideDuration={6000}
                  onClose={handleCloseSuccessSnackbar}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  key={"bottom"}
                >
                  <Alert
                    onClose={handleCloseSuccessSnackbar}
                    severity="success"
                    sx={{ width: "100%" }}
                  >
                    {successMessage && successMessage}
                  </Alert>
                </Snackbar>
              </Fragment>
            )}
          </Container>
          <BaseModal isShowing={sentModalOpen} isClose={handleClose}   disableBackdropClick={true}
          disableEscapeKeyDown={true}>
            <Tooltip title="Something">
              <>
                <BrokerRegistrationSentModal handleClose={handleClose} />
              </>
            </Tooltip>
          </BaseModal>
        </Box>
        <Footer />
      </main>
    </div>
  );
}
