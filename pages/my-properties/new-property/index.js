import dynamic from "next/dynamic";
import Head from "next/head";
import {
  Alert,
  Button,
  CircularProgress,
  Container,
  Grid,
  LinearProgress,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/material";
const BasicBreadcrumbs = dynamic(() =>
  import("@/component/reuseable/baseBreadCrumb/BaseBreadCrumb")
);
const BaseStepper = dynamic(() =>
  import("@/component/reuseable/baseStepper/BaseStepper")
);
import { Fragment, useEffect, useState } from "react";
const BaseModal = dynamic(() =>
  import("@/component/reuseable/baseModal/BaseModal")
);
const Address = dynamic(() =>
  import("@/component/new property/Address/Address")
);
const ValuesAndDescription = dynamic(() =>
  import("@/component/new property/ValuesAndDescription/ValuesAndDescription")
);
const PhotosAndVideos = dynamic(() =>
  import("@/component/new property/PhotosAndVideos/PhotosAndVideos")
);
const Features = dynamic(() =>
  import("@/component/new property/Features/Features")
);

const Owner = dynamic(() => import("@/component/new property/Owner/Owner"));
const PropertySubmittedModal = dynamic(() =>
  import(
    "@/component/new property/PropertySubmittedModal/PropertySubmittedModal"
  )
);
import { useSession } from "next-auth/react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  apiInstance,
  propertyCreateApi,
  propertyUpdateApi,
} from "../../../src/api";
import { serialize } from "object-to-formdata";
import { useRouter } from "next/router";
import { findSinglePropertyData } from "../../../src/redux/singleProperty/actions";
import en from "locales/en";
import pt from "locales/pt";
import BaseButton from "@/component/reuseable/baseButton/BaseButton";
import uploadImage from "@/utils/uploadImage";
import { reverseBrCurrencyFormat } from "@/utils/reverseBrCurrencyFormat";
import toast from "react-hot-toast";
import { formatBrazilianCurrency } from "@/utils/useUtilities";

const drawerWidth = 240;

export default function NewProperty({ language }) {
  const { data: session } = useSession();

  const { query, replace } = useRouter();

  const [myValue, setMyValue] = useState(language || "pt");
  const t = myValue === "en" ? en : pt;

  const BreadCrumbsData = [
    { stage: t["Start"], route: "" },
    { stage: t["My Properties"], route: "my-properties" },
  ];

  const otherSteps = [
    t["Address"],
    t["Values and description"],
    t["Features"],
    t["Photos and videos"],
    t["Owner"],
  ];

  const ownerSteps = [
    t["Address"],
    t["Values and description"],
    t["Features"],
    t["Photos and videos"],
  ];

  const steps = session?.user?.role === "owner" ? ownerSteps : otherSteps;
  const [maritalStatus, setMaritalStatus] = useState("Married");

  const validateCPF = (cpf) => {
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
  };

  const validationSchema = Yup.object().shape({
    zip_code: Yup.string().required(t["Zip code is required"]),
    address: Yup.string().required(t["Address is required"]),
    number: Yup.string().required(t["Number is required"]),
    neighbourhood: Yup.string().required(t["Neighbourhood is required"]),
    city: Yup.string().required(t["City is required"]),
    // state: Yup.object().required(t["State is required"]), // Assuming state is a string
    owner_cpf:
      session?.user?.role === "owner"
        ? Yup.string().optional()
        : Yup.string()
            .required(t["CPF number is required"])
            .test("isValidCPF", t["CPF number is required"], validateCPF),
    owner_spouse_cpf:
      session?.user?.role === "owner"
        ? Yup.string().notRequired()
        : maritalStatus === "Married"
        ? Yup.string()
            .required(t["CPF number is required"])
            .test("isValidCPF", t["CPF number is required"], validateCPF)
        : Yup.string().notRequired(),
    owner_rg:
      session?.user?.role === "owner"
        ? Yup.string().optional()
        : Yup.string()
            .required(t["RG number is required"])
            .length(12, t["RG number is required"]),
    owner_spouse_rg:
      session?.user?.role === "owner"
        ? Yup.string().notRequired()
        : maritalStatus === "Married"
        ? Yup.string()
            .required(t["RG number is required"])
            .length(12, t["RG number is required"])
        : Yup.string().notRequired(),
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(findSinglePropertyData(query?.property_id));
  }, [dispatch, query?.property_id]);
  const singleData = useSelector(
    (state) => state?.singleProperty?.singlePropertyData
  );
  const singleDataLoading = useSelector(
    (state) => state?.singleProperty?.loading
  );

  const {
    register,
    watch,
    control,
    setError,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      description: "",
      videos: [
        {
          url: "",
        },
      ],
    },
  });
  console.log({ errors });
  const allValues = watch();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "videos",
  });
  const [loading, setLoading] = useState(false);
  const [draftloading, setDraftLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [featuretypes, setFeatureTypes] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [adType, setAdType] = useState("new");
  const [propertyType, setPropertyType] = useState("residential");
  const [property_detail_id, setPropertyDetailId] = useState(1);
  const [files, setFiles] = useState([]);
  const [videoFiles, setVideoFiles] = useState([]);
  const [imageError, setImageError] = useState(false);
  const [imageErrorMessage, setImageErrorMessage] = useState("");
  const [ErrorsData, setErrorsData] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState({});
  const [sentModalOpen, setSentModalOpen] = useState(false);
  const [action, setAction] = useState("");
  const [deletedContent, setDeletedContent] = useState([]);
  const handleOpen = () => setSentModalOpen(true);
  const handleClose = () => setSentModalOpen(false);

  useEffect(() => {
    if (files?.length > 0) {
      delete errors?.images;
    }
  }, [files, errors]);

  useEffect(() => {
    if (documents?.length > 0) {
      delete errors?.document_files;
    }
  });

  const [single, setSingle] = useState(false);
  const [married, setMarried] = useState(true);

  console.log({ singleData });

  useEffect(() => {
    if (query?.property_id) {
      setAdType(singleData?.ad_type);
      setPropertyType(singleData?.property_type);
      setDocuments(singleData?.documents);
      setPropertyDetailId(+singleData?.property_detail_id);
      setDocuments(singleData?.documents);
      setValue("project_id", singleData?.project);
      setValue("zip_code", singleData?.address?.zip_code);
      setValue("address", singleData?.address?.address);
      setValue("number", singleData?.address?.number),
        setValue("neighbourhood", singleData?.address?.neighbourhood);
      setValue("complement", singleData?.address?.complement);
      setValue("city", singleData?.address?.city);
      setValue("complement", singleData?.address?.complement);
      setValue("state", singleData?.address?.state);
      setValue(
        "brl_rent",
        formatBrazilianCurrency((+singleData?.brl_rent)?.toFixed(2))
      );
      setValue(
        "brl_iptu",
        formatBrazilianCurrency((+singleData?.brl_iptu)?.toFixed(2))
      );
      setValue(
        "condominium",
        formatBrazilianCurrency((+singleData?.condominium)?.toFixed(2))
      );
      setValue("land_area", singleData?.land_area);
      setValue("property_area", singleData?.property_area);
      setValue("no_of_rooms", singleData?.no_of_rooms);
      setValue("no_of_suites", singleData?.no_of_suites);
      setValue("no_of_bathrooms", singleData?.no_of_bathrooms);
      setValue("no_of_parking_spaces", singleData?.no_of_parking_spaces);
      setValue("property_title", singleData?.property_title);
      setValue("owner_email", singleData?.property_owner?.email);
      setValue("owner_phone", singleData?.property_owner?.phone);
      setValue("email_authorization", singleData?.is_sales_authorized === 1);
      setValue("description", singleData?.property_description || "");

      let selectFeatures = [];
      singleData?.features?.forEach((data) => {
        selectFeatures.push(data.id);
      });
      setFeatureTypes(selectFeatures);
      let allSelectImages = singleData?.attachments?.filter(
        (data) => data?.file_type === "image"
      );

      setFiles(allSelectImages);

      let allSelectVideos = singleData?.attachments?.filter(
        (data) => data?.file_type === "url"
      );

      setVideoFiles(
        allSelectVideos?.map((data) => {
          return {
            url: data?.file_path,
            photo_type: data?.photo_type,
            id: data?.id,
          };
        })
      );

      setValue("owner_name", singleData?.property_owner?.name);
      setValue("owner_rg", singleData?.property_owner?.rg);
      setValue("owner_cpf", singleData?.property_owner?.cpf);
      setMaritalStatus(singleData?.property_owner?.marital_status || "Single");
      setSingle(
        singleData?.property_owner?.marital_status === "Married" ? false : true
      );
      setMarried(
        singleData?.property_owner?.marital_status === "Married" ? true : false
      );
      setValue("owner_spouse_name", singleData?.property_owner?.spouse_name);
      setValue("owner_spouse_rg", singleData?.property_owner?.spouse_rg);
      setValue("owner_spouse_cpf", singleData?.property_owner?.spouse_cpf);
      setValue("owner_zip_code", singleData?.property_owner?.address?.zip_code);
      setValue("owner_address", singleData?.property_owner?.address?.address);
      setValue("owner_number", singleData?.property_owner?.address?.number);
      setValue(
        "owner_neighbourhood",
        singleData?.property_owner?.address?.neighbourhood
      );
      setValue("owner_city", singleData?.property_owner?.address?.city);

      setValue("owner_state", singleData?.property_owner?.address?.state);
      setValue(
        "owner_complement",
        singleData?.property_owner?.address?.complement
      );
      setValue(
        "owner_registry",
        singleData?.property_owner?.registry[0]?.registry_office
      );
      setValue(
        "owner_registration_number",
        singleData?.property_owner?.registry[0]?.registry_number
          ? +singleData?.property_owner?.registry[0]?.registry_number
          : ""
      );
      setValue("owner_documnentation", {
        label: singleData?.property_owner?.registry[0]?.title,
        year: "2009",
      });

      // setValue("registry", singleData?.registry?.[0]?.registry_office);
      // setValue(
      //   "registration_number",
      //   +singleData?.registry?.[0]?.registry_number
      // );
      // setValue("documentation", {
      //   label: singleData?.registry?.[0]?.title,
      //   year: "2009",
      // });
    }
  }, [query?.property_id, setValue, singleData]);

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

  const omitEmpties = (obj) => {
    return Object.entries(obj).reduce((carry, [key, value]) => {
      if (![null, undefined, "", [], {}].includes(value)) {
        carry[key] = value;
      }
      return carry;
    }, {});
  };

  const [progress, setProgress] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [uploadedCount, setUploadedCount] = useState(0);

  const onSubmit = async (data) => {
    console.log("🟥 ~ onSubmit ~ data:", data);
    action === "new" ? setLoading(true) : setDraftLoading(true);

    const filterNewImageTitleData = [];
    files.forEach((data, index) => {
      if (data?.title !== allValues[`title_${index}`]?.slug) {
        if (data?.id) {
          filterNewImageTitleData.push({
            attachment_id: data?.id,
            title: allValues[`title_${index}`].slug,
          });
        }
      }
    });

    const filterNewVideoTitleData = [];
    videoFiles?.forEach((data, index) => {
      if (data?.title !== allValues[`video_title_${index}`]?.slug) {
        if (data?.id) {
          filterNewVideoTitleData.push({
            attachment_id: data?.id,
          });
        }
      }
    });

    const filterNewTitleData = [
      ...filterNewImageTitleData,
      ...filterNewVideoTitleData,
    ];

    // if (files.length > 0 && featuretypes.length > 0) {
    let newArr = [];
    files?.forEach((data, index) => {
      if (data instanceof File) {
        newArr.push({ file: data, title: allValues[`title_${index}`].slug });
      }
    });

    let newVideoArr = [];
    videoFiles?.forEach((data, index) => {
      if (!data?.id) {
        newVideoArr.push({
          url: data?.url,
        });
      }
    });

    const newDocuments = documents?.filter((data) => data instanceof File);

    console.log({ data });
    console.log({ allValues });

    const firstPartData = omitEmpties({
      user_id: query?.property_id
        ? singleData?.user_id
        : +session?.user?.userId,
      project_id: data?.project_id?.id && +data?.project_id?.id,
      property_id: query?.property_id,
      property_title: data?.property_title,
      property_description: data?.description?.toString("html"),
      property_detail_id: +property_detail_id,
      ad_type: adType.toLocaleLowerCase(),
      property_type: propertyType.toLocaleLowerCase(),
      condominium: reverseBrCurrencyFormat(data?.condominium),
      brl_rent: reverseBrCurrencyFormat(data?.brl_rent),
      brl_iptu: reverseBrCurrencyFormat(data?.brl_iptu),
      land_area: data?.land_area,
      property_area: data?.property_area,
      no_of_rooms: data?.no_of_rooms,
      no_of_suites: data?.no_of_suites,
      no_of_bathrooms: data?.no_of_bathrooms,
      no_of_parking_spaces: data?.no_of_parking_spaces,
      features: featuretypes,
      deprecated_images: deletedContent,
      is_sales_authorized: data?.email_authorization ? 1 : 0,
      document_files: newDocuments,
      content_url: newVideoArr,
      // images: newArr,
      new_title: filterNewTitleData,
      // documents: "",
      // registry: "",
      // registration_number: "",
    });

    const addressData = omitEmpties({
      zip_code: data?.zip_code,
      address: data?.address,
      city: data?.city,
      state_id: data?.state?.id || 26,
      number: data?.number,
      neighbourhood: data?.neighbourhood,
      complement: data?.complement,
    });

    const ownerRegistryData = omitEmpties({
      registry_office: data?.owner_registry,
      registry_number: data?.owner_registration_number,
      document_title: data?.owner_documnentation?.label,
    });

    const ownerData = omitEmpties({
      marital_status: maritalStatus,
      name: data?.owner_name,
      rg: data?.owner_rg,
      cpf: data?.owner_cpf,
      email: data?.owner_email,
      phone: data?.owner_phone,
      spouse_name: data?.owner_spouse_name,
      spouse_rg: data?.owner_spouse_rg,
      spouse_cpf: data?.owner_spouse_cpf,
      registry_data: ownerRegistryData,
    });

    const ownerDataAddress = omitEmpties({
      zip_code: data?.owner_zip_code,
      address: data?.owner_address,
      city: data?.owner_city,
      state_id: data?.owner_state?.id || 26,
      number: data?.number,
      neighbourhood: data?.neighbourhood,
      complement: data?.complement,
    });

    const requireData = omitEmpties({
      ...firstPartData,
      // registry_data: registryData,
      address: addressData,
      owner_datas:
        session?.user?.role !== "owner"
          ? {
              ...ownerData,
              address: ownerDataAddress,
            }
          : null,
    });

    const formData = serialize(requireData, { indices: true });
    if (query?.property_id) {
      const [error, response] = await propertyUpdateApi(formData);
      if (!error) {
        const id = response?.data?.property?.id;
        const type = "property";
        setIsUploading(true);
        setUploadComplete(false);
        setUploadedCount(0); // Reset count before starting upload
        const uploadPromises = newArr.map((image, index) =>
          uploadImage(image, index, id, type, setProgress, setUploadedCount)
        );
        await Promise.all(uploadPromises);
        setIsUploading(false);
        setLoading(false);
        setDraftLoading(false);
        setUploadComplete(true);
        setSentModalOpen(true);
      } else {
        setLoading(false);
        const errors = error?.response?.data?.errors ?? {};
        if (error.response.status === 500) {
          toast.error(error?.response?.data?.message, {
            duration: 20000,
          });
        }
        Object.entries(errors).forEach(([name, messages]) => {
          setError(name, { type: "manual", message: messages[0] });
          toast.error(`${name}: ${messages[0]}`);
        });
      }
    } else {
      const [error, response] = await propertyCreateApi(formData);
      // setLoading(false);
      setDraftLoading(false);
      if (!error) {
        const id = response?.data?.property?.id;
        const type = "property";
        setIsUploading(true);
        setUploadComplete(false);
        setUploadedCount(0); // Reset count before starting upload
        const uploadPromises = newArr.map((image, index) =>
          uploadImage(image, index, id, type, setProgress, setUploadedCount)
        );
        await Promise.all(uploadPromises);
        setIsUploading(false);
        setLoading(false);
        setDraftLoading(false);
        setUploadComplete(true);
        setSentModalOpen(true);
      } else {
        setLoading(false);
        const errors = error?.response?.data?.errors ?? {};
        if (error.response.status === 500) {
          toast.error(error?.response?.data?.message, {
            duration: 20000,
          });
        }
        Object.entries(errors).forEach(([name, messages]) => {
          setError(name, { type: "manual", message: messages[0] });
          toast.error(`${name}: ${messages[0]}`);
        });
      }
    }
  };

  const getTotalProgress = () => {
    const totalImages = files.length;
    return totalImages > 0 ? (uploadedCount / totalImages) * 100 : 0;
  };

  const [disableBtn, setDisableBtn] = useState(true);
  useEffect(() => {
    if (
      allValues?.owner_name != null &&
      allValues?.owner_cpf != null &&
      allValues?.owner_rg != null &&
      allValues?.owner_zip_code != null &&
      allValues?.owner_address != null &&
      allValues?.owner_number != null &&
      allValues?.owner_neighbourhood != null &&
      allValues?.owner_city != null &&
      allValues?.owner_state != null &&
      allValues?.owner_email !== null &&
      allValues?.owner_phone !== null
    ) {
      setDisableBtn(false);
    }
    if (
      allValues?.owner_name === "" ||
      allValues?.owner_cpf === "" ||
      allValues?.owner_rg === "" ||
      allValues?.owner_zip_code === "" ||
      allValues?.owner_address === "" ||
      allValues?.owner_number === "" ||
      allValues?.owner_neighbourhood === "" ||
      allValues?.owner_city === "" ||
      allValues?.owner_state === "" ||
      allValues?.owner_email === "" ||
      allValues?.owner_phone === ""
    ) {
      setDisableBtn(true);
    }
  }, [allValues]);

  if (query?.property_id && singleDataLoading) {
    return (
      <Container maxWidth="md" sx={{ px: 2, py: 0 }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ height: "100vh" }}
        >
          <CircularProgress size="8rem" />
        </Grid>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        //   backgroundColor: "#f6f8fc",
        flexGrow: 1,
        mb: 10,
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
            lastStageData={t["New property"]}
          />
        </Grid>
        <Box sx={{ mt: 3 }}>
          <BaseStepper
            steps={steps}
            activeStep={activeStep}
            isStepSkipped={isStepSkipped}
            setActiveStep={setActiveStep}
            marginTop={"2vh"}
          />
          <Fragment>
            <form onSubmit={handleSubmit(onSubmit)}>
              {activeStep === 0 ? (
                <Address
                  handleNext={handleNext}
                  control={control}
                  errors={errors}
                  adType={adType}
                  setValue={setValue}
                  setAdType={setAdType}
                  propertyType={propertyType}
                  setPropertyType={setPropertyType}
                  property_detail_id={property_detail_id}
                  setPropertyDetailId={setPropertyDetailId}
                  languageName={myValue.toString()}
                  allValues={allValues}
                />
              ) : activeStep === 1 ? (
                <ValuesAndDescription
                  handleNext={handleNext}
                  handleBack={handleBack}
                  control={control}
                  property_detail_id={property_detail_id}
                  errors={errors}
                  allValues={allValues}
                  languageName={myValue.toString()}
                  reset={reset}
                  replace={replace}
                />
              ) : activeStep === 2 ? (
                <Features
                  handleNext={handleNext}
                  handleBack={handleBack}
                  control={control}
                  errors={errors}
                  featuretypes={featuretypes}
                  setFeatureTypes={setFeatureTypes}
                  languageName={myValue.toString()}
                  reset={reset}
                  replace={replace}
                />
              ) : activeStep === 3 ? (
                <PhotosAndVideos
                  handleNext={handleNext}
                  handleBack={handleBack}
                  control={control}
                  errors={errors}
                  files={files}
                  setFiles={setFiles}
                  videoFiles={videoFiles}
                  setVideoFiles={setVideoFiles}
                  setDeletedContent={setDeletedContent}
                  deletedContent={deletedContent}
                  imageError={imageError}
                  imageErrorMessage={imageErrorMessage}
                  fields={fields}
                  append={append}
                  remove={remove}
                  allValues={allValues}
                  languageName={myValue.toString()}
                  reset={reset}
                  replace={replace}
                />
              ) : (
                <Owner
                  handleNext={handleNext}
                  handleBack={handleBack}
                  control={control}
                  errors={errors}
                  documents={documents}
                  setDocuments={setDocuments}
                  maritalStatus={maritalStatus}
                  setMaritalStatus={setMaritalStatus}
                  languageName={myValue.toString()}
                  setSingle={setSingle}
                  single={single}
                  married={married}
                  setMarried={setMarried}
                  reset={reset}
                  replace={replace}
                  trigger={trigger}
                  allValues={allValues}
                  setValue={setValue}
                />
              )}

              <Stack
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
                  <Grid
                    container
                    spacing={1}
                    direction={"row"}
                    justifyContent={"flex-end"}
                    alignItems={"center"}
                  >
                    <Grid item xs={3}>
                      <BaseButton
                        handleFunction={handleBack}
                        fullWidth
                        sx="outlined"
                        disabled={loading}
                      >
                        {t["come back"]}
                      </BaseButton>
                    </Grid>
                    <Grid item xs={3}>
                      <BaseButton
                        type="submit"
                        fullWidth
                        disabled={
                          (session?.user?.role !== "owner" && disableBtn) ||
                          loading
                        }
                        handleFunction={() => setAction("draft")}
                        sx="secondary"
                      >
                        {draftloading && (
                          <CircularProgress size={22} color="inherit" />
                        )}
                        {!draftloading && t["Save as draft"]}
                      </BaseButton>
                    </Grid>
                    <Grid item xs={3}>
                      <BaseButton
                        type="submit"
                        disabled={session?.user?.role !== "owner" && disableBtn}
                        fullWidth
                        handleFunction={() => setAction("new")}
                        sx="secondary"
                      >
                        {loading && (
                          <CircularProgress size={22} color="inherit" />
                        )}
                        {!loading && t["Submit approval"]}
                      </BaseButton>
                    </Grid>
                  </Grid>
                )}
              </Stack>
            </form>
          </Fragment>
          {loading && (
            <Box>
              <Typography variant="p" color="text.primary">
                Enviando fotos :
              </Typography>
              {!uploadComplete && (
                <Box sx={{ mt: 2 }}>
                  <LinearProgress
                    variant="determinate"
                    value={getTotalProgress()}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      "& .MuiLinearProgress-bar": {
                        transition: "width 0.3s ease-in-out",
                      },
                    }}
                  />
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    align="center"
                  >
                    {`${uploadedCount}/${files.length}`}
                  </Typography>
                </Box>
              )}
            </Box>
          )}
        </Box>
        <BaseModal
          isShowing={sentModalOpen}
          isClose={handleClose}
          disableBackdropClick={true}
          disableEscapeKeyDown={true}
        >
          <Tooltip title="Something">
            <>
              <PropertySubmittedModal
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
