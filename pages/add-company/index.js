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
const AddCompanyPersonalData = dynamic(
  () => import("@/component/addCompany/AddCompanyPersonalData"),
  { ssr: false }
);

const BaseStepper = dynamic(() =>
  import("@/component/reuseable/baseStepper/BaseStepper")
);
const AddCompanyAddressData = dynamic(() =>
  import("@/component/addCompany/AddCompanyAddressData")
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
const drawerWidth = 240;

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { serialize } from "object-to-formdata";
import { userInfoRegistrationApi } from "@/api";

import dayjs from "dayjs";
import en from "locales/en";
import pt from "locales/pt";
import BaseButton from "@/component/reuseable/baseButton/BaseButton";
import { useRouter } from "next/router";
import useRequiredFieldsToDisableButton from "@/hooks/useRequiredFieldsToDisableButton";
import triggerValidation from "@/hooks/triggerValidation";
import { useAddCompanyMutation } from "@/queries/useAddCompanyMutation";
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

export default function AddCompany({
  loginOpen,
  setLoginOpen,
  handleLoginOpen,
  handleLoginClose,
  language,
}) {
  const [selectedBroker, setSelectedBroker] = useState(null);

  const [myValue, setMyValue] = useState(language || "pt");

  const t = myValue === "en" ? en : pt;

  // const [addPerson, setAddPerson] = useState("Physical person");
  const [addType, setAddType] = useState("car");

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

  // const [actingPreferenceBtn, setActingPreferenceBtn] = useState(
  //   preferenceData[0]?.name
  // );
  const [aboutLokkanBtn, setAboutLokkanBtn] = useState(aboutLokkanData[0]);
  const [loading, setLoading] = useState(false);
  const validationSchema = Yup.object().shape({
    image: Yup.mixed()
      .required("File is required")
      .test("fileType", "Unsupported File Format", (value) => {
        return (
          value && ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
        );
      }),
    name: Yup.string().required(t["Full Name is required"]),
    dob: Yup.string()
      .required(t["Date of Birth number is required"])
      .optional(),
    description: Yup.string().required(t["Description is required"]).optional(),
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

    zip_code: Yup.string().required(t["Zip code number is required"]),
    address: Yup.string().required(t["Address is required"]),
    number: Yup.string().required(t["Number is required"]).optional(),
    neighbourhood: Yup.string().required(t["Neighbourhood is required"]),
    state: Yup.mixed()
      .test("is-object", t["State is required"], (value) => !!value)
      .required(t["State is required"]),
    city: Yup.string().required(t["City is required"]),
  });
  const {
    register,
    watch,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
    trigger,
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  console.log("🟥 ~ errors:", errors);

  const mutation = useAddCompanyMutation();

  const allValues = watch();
  const { replace } = useRouter();
  const requiredFields = {
    // physical_person: [
    //   "image",
    //   "full_name",
    //   "cpf_number",
    //   "rg_number",
    //   "dob",
    //   "description",
    // ],
    legal_person: [
      "image",
      "name",
      "state_registration",
      "cnpj",
      "corporate_reason",
      "cpf_number",
      "rg_number",
    ],
    address_data: [
      "zip_code",
      "address",
      "neighbourhood",
      "add_on",
      "city",
      "state",
    ],
  };
  const [disableBtn, setDisableBtn] = useRequiredFieldsToDisableButton(
    activeStep === 0
      ? requiredFields.legal_person
      : requiredFields.address_data,
    allValues
  );
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      handleClickSnackbar();
    }
  }, [errors]);

  const transformData = (data) => {
    return Object.keys(data).reduce((acc, key) => {
      if (key === "state") {
        acc["state_id"] = data[key].id;
      } else {
        acc[key] = data[key];
      }
      return acc;
    }, {});
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const body = transformData(data);
    const formData = serialize({ ...body, type: addType }, { indices: true });
    mutation.mutate(formData, {
      onError(error) {
        setLoading(false);
        toast.error("Algo deu errado. Empresa criada falhou",{
          duration: 10000,
        });
      },
      onSuccess: async (data) => {
        setLoading(false);
        toast.success("Empresa criada com sucesso", {
          duration: 20000,
        });
      },
    });
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        background: "#F2F5F6",
        minHeight: "100vh",
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        paddingX: { xs: 0, sm: 0, md: 6, lg: 1, xl: 6 },
        paddingTop: { xs: 6, sm: 6, md: 6, lg: 8, xl: 3 },
        paddingBottom: { xs: 3, sm: 3, md: 3, lg: 4, xl: 3 },
      }}
    >
      <Container maxWidth="lg">
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
                <AddCompanyPersonalData
                  handleNext={handleNext}
                  trigger={trigger}
                  control={control}
                  errors={errors}
                  allValues={allValues}
                  activeStep={activeStep}
                  languageName={myValue.toString()}
                  selectedBroker={selectedBroker}
                  setSelectedBroker={setSelectedBroker}
                  reset={reset}
                  replace={replace}
                  // addPerson={addPerson}
                  // setAddPerson={setAddPerson}
                  addType={addType}
                  setAddType={setAddType}
                />
              ) : (
                <AddCompanyAddressData
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
                />
              )}
              {/* {errors && (
                <Stack sx={{ width: "100%", mt: 2 }} spacing={2}>
                  {Object.keys(errors).map((key, index) => (
                    <Alert key={index} severity="error">
                      {errors[key].message}
                    </Alert>
                  ))}
                </Stack>
              )} */}
              <Grid container spacing={1} sx={{ mt: 2, mb: 5 }}>
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
                {activeStep == 0 && (
                  <Grid item xs={3}>
                    <BaseButton
                      handleFunction={async () => {
                        if (
                          await triggerValidation(
                            activeStep === 0
                              ? requiredFields.legal_person
                              : requiredFields.address_data,
                            trigger
                          )
                        ) {
                          handleNext();
                        }
                      }}
                      // handleFunction={handleNext}
                      disabled={disableBtn}
                      fullWidth
                      type="button"
                      sx="success"
                    >
                      {t["Continue"]}
                    </BaseButton>
                  </Grid>
                )}
                {activeStep == 1 && (
                  <Grid item xs={3}>
                    <BaseButton
                      type={"submit"}
                      fullWidth
                      sx="success"
                      disabled={disableBtn}
                    >
                      {loading && (
                        <CircularProgress size={22} color="inherit" />
                      )}
                      {!loading && t["Register"]}
                    </BaseButton>
                  </Grid>
                )}
              </Grid>
            </form>

            {/* <Snackbar
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
            </Snackbar> */}
          </Fragment>
        )}
        {/* <BaseModal isShowing={sentModalOpen} isClose={handleClose}>
          <Tooltip title="Something">
            <>
              <BrokerRegistrationSentModal handleClose={handleClose} />
            </>
          </Tooltip>
        </BaseModal> */}
      </Container>
    </Box>
  );
}
