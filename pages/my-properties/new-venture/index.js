import dynamic from "next/dynamic";
import React, { Fragment, useState } from "react";
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  LinearProgress,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/material";
import { useForm, useFieldArray } from "react-hook-form";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { serialize } from "object-to-formdata";
import {
  createProjectApi,
  omitEmpties,
  updateProjectApi,
} from "../../../src/api";
import { useDispatch } from "react-redux";
import { GetPhotoTypeData } from "../../../src/redux/photo/actions";
const requiredFields = [
  [
    "address",
    "city",
    "description",
    "name",
    "neighbourhood",
    "number",
    "state",
    "zip_code",
  ],
  ["features"],
  ["images"],
  [
    "prohibited",
    "adjustment_index",
    "number_of_installments",
    "value_per_square_meter",
  ],
];
import en from "locales/en";
import pt from "locales/pt";
import uploadImage from "@/utils/uploadImage";
import { useGetSingleProjectQuery } from "@/queries/useGetSingleProjectQuery";
import { useSession } from "next-auth/react";
const NewVentureSentModal = dynamic(() =>
  import("@/component/new venture/NewVentureSentModal/NewVentureSentModal")
);
const BaseModal = dynamic(() =>
  import("@/component/reuseable/baseModal/BaseModal")
);
const BasicBreadcrumbs = dynamic(() =>
  import("@/component/reuseable/baseBreadCrumb/BaseBreadCrumb")
);
const BaseStepper = dynamic(() =>
  import("@/component/reuseable/baseStepper/BaseStepper")
);
const PhotosAndVideos = dynamic(() =>
  import("@/component/new venture/PhotosAndVideos/PhotosAndVideos")
);
const Features = dynamic(() =>
  import("@/component/new venture/Features/Features")
);
const FinancialData = dynamic(() =>
  import("@/component/new venture/FinancialData/FinancialData")
);
const Address = dynamic(() =>
  import("@/component/new venture/Address/Address")
);

const drawerWidth = 240;

export default function NewVenture({ language }) {
  const { data: session } = useSession();
  const [myValue, setMyValue] = useState(language || "pt");
  const t = myValue === "en" ? en : pt;
  const steps = [
    t["Address"],
    t["Features"],
    t["Photos and videos"],
    "Financial data",
  ];
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [disableBtn, setDisableBtn] = useState(false);
  const [draftloading, setDraftLoading] = useState(false);

  const BreadCrumbsData = [
    { stage: t["Start"], route: "" },
    { stage: t["My Properties"], route: "my-properties" },
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetPhotoTypeData("project"));
  }, [dispatch]);

  const {
    register,
    reset,
    watch,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      description: "",
    },
  });
  const { replace, query } = useRouter();

  const { data: singleProjectData, isLoading: isSingleProjectLoading } =
    useGetSingleProjectQuery(query.project_id);

  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [videoFiles, setVideoFiles] = useState([]);
  const [deletedContent, setDeletedContent] = useState([]);
  const [featuretypes, setFeatureTypes] = useState([]);
  console.log("🟥 ~ NewVenture ~ featuretypes:", featuretypes);
  const [documents, setDocuments] = useState([]);
  const [imageError, setImageError] = useState(false);
  const [imageErrorMessage, setImageErrorMessage] = useState("");

  const [sentModalOpen, setSentModalOpen] = useState(false);
  // const handleOpen = () => setSentModalOpen(true);
  const handleClose = () => setSentModalOpen(false);

  const allValues = watch();
  console.log("🟥 ~ NewVenture ~ allValues:", allValues);

  const [progress, setProgress] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [uploadedCount, setUploadedCount] = useState(0);

  console.log({ singleProjectData });

  console.log({ errors });

  useEffect(() => {
    if (singleProjectData) {
      console.log("🟥 ~ useEffect ~ singleProjectData:", singleProjectData);
      setValue("name", singleProjectData?.project?.name);
      setValue("description", singleProjectData?.project?.description);
      setValue("address", singleProjectData?.project?.address?.address);
      setValue(
        "neighbourhood",
        singleProjectData?.project?.address?.neighbourhood
      );
      setDocuments(singleProjectData?.project?.documents);
      setValue("add_on", singleProjectData?.project?.address?.add_on);
      setValue("city", singleProjectData?.project?.address?.city);
      setValue("complement", singleProjectData?.project?.address?.complement);
      setValue("zip_code", singleProjectData?.project?.address?.zip_code);
      setValue("number", singleProjectData?.project?.address?.number);
      setValue("state", singleProjectData?.project?.address?.state);
      setValue("prohibited", singleProjectData?.project?.finance.prohibited);
      setValue(
        "adjustment_index",
        singleProjectData?.project?.finance.adjustment_index
      );
      setValue(
        "number_of_installments",
        singleProjectData?.project?.finance.number_of_installments
      );
      setValue(
        "value_per_square_meter",
        singleProjectData?.project?.finance.value_per_square_meter
      );

      let selectFeatures = [];
      singleProjectData?.project?.features?.forEach((data) => {
        selectFeatures.push(data.id);
      });
      setFeatureTypes(selectFeatures);
      let allSelectImages = singleProjectData?.project?.attachments?.filter(
        (data) => data?.file_type === "image"
      );

      setFiles(allSelectImages);

      let allSelectVideos = singleProjectData?.project?.attachments?.filter(
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
    }
  }, [singleProjectData, setValue]);
  const onSubmit = async (data) => {
    setLoading(true);
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
            // title: allValues[`video_title_${index}`].slug,
          });
        }
      }
    });

    const filterNewTitleData = [
      ...filterNewImageTitleData,
      ...filterNewVideoTitleData,
    ];
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
          // title: allValues[`video_title_${index}`].slug,
        });
      }
    });
    const newDocuments = documents?.filter((data) => data instanceof File);
    const requireData = omitEmpties({
      features: featuretypes,
      user_id:
        session?.user?.role === "construction_company"
          ? +session?.user?.userId
          : data?.construction_company?.user?.id,
      content_url: newVideoArr,
      description: data?.description?.toString("html"),
      name: data?.name,
      new_title: filterNewTitleData,
      financial: {
        prohibited: data?.prohibited,
        adjustment_index: data?.adjustment_index,
        number_of_installments: data?.number_of_installments,
        value_per_square_meter: data?.value_per_square_meter,
        document_files: newDocuments,
      },
      address: omitEmpties({
        zip_code: data?.zip_code,
        address: data?.address,
        city: data?.city,
        state_id: data?.state?.id,
        number: data?.number,
        neighbourhood: data?.neighbourhood,
        complement: data?.complement,
      }),
    });
    const formData = query.project_id
      ? serialize(
          { ...requireData, project_id: query.project_id },
          { indices: true }
        )
      : serialize(requireData, { indices: true });
    if (query.project_id) {
      const [error, response] = await updateProjectApi(formData);
      if (!error) {
        const id = response?.data?.project?.id;
        const type = "project";
        setIsUploading(true);
        setUploadComplete(false);
        setUploadedCount(0); // Reset count before starting upload
        const uploadPromises = newArr.map((image, index) =>
          uploadImage(image, index, id, type, setProgress, setUploadedCount)
        );
        await Promise.all(uploadPromises);
        setIsUploading(false);
        setLoading(false);
        setUploadComplete(true);
        setSentModalOpen(true);
      } else {
        setLoading(false);
        const errors = error?.response?.data?.errors ?? {};
        Object.entries(errors).forEach(([name, messages]) => {
          setError(name, { type: "manual", message: messages[0] });
        });
      }
    } else {
      const [error, response] = await createProjectApi(formData);
      if (!error) {
        const id = response?.data?.project?.id;
        const type = "project";
        setIsUploading(true);
        setUploadComplete(false);
        setUploadedCount(0); // Reset count before starting upload
        const uploadPromises = newArr.map((image, index) =>
          uploadImage(image, index, id, type, setProgress, setUploadedCount)
        );
        await Promise.all(uploadPromises);
        setIsUploading(false);
        setLoading(false);
        setUploadComplete(true);
        setSentModalOpen(true);
      } else {
        setLoading(false);
        const errors = error?.response?.data?.errors ?? {};
        Object.entries(errors).forEach(([name, messages]) => {
          setError(name, { type: "manual", message: messages[0] });
        });
      }
    }
  };

  const getTotalProgress = () => {
    const totalImages = files.length;
    return totalImages > 0 ? (uploadedCount / totalImages) * 100 : 0;
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
  const { fields, append, remove } = useFieldArray({
    control,
    name: "videos",
  });

  useEffect(() => {
    if (activeStep == 0 || activeStep == 3) {
      setDisableBtn(() =>
        requiredFields[activeStep].every((field) => !!allValues[field])
      );
    } else if (activeStep == 1) {
      setDisableBtn(() => featuretypes.length > 0);
    } else if (activeStep == 2) {
      setDisableBtn(() => files.length > 0);
    }
  }, [allValues, activeStep, files, featuretypes, loading]);

  if (query?.project_id && isSingleProjectLoading) {
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
            lastStageData={t["new venture"]}
          />
        </Grid>
        <Box sx={{ mt: 3 }}>
          {/* 👇 */}
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
                    control={control}
                    errors={errors}
                    setValue={setValue}
                    languageName={myValue.toString()}
                    allValues={allValues}
                    reset={reset}
                    replace={replace}
                  />
                ) : activeStep === 1 ? (
                  <Features
                    control={control}
                    errors={errors}
                    featuretypes={featuretypes}
                    setFeatureTypes={setFeatureTypes}
                    languageName={myValue.toString()}
                    reset={reset}
                    replace={replace}
                  />
                ) : activeStep === 2 ? (
                  <PhotosAndVideos
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
                  <FinancialData
                    control={control}
                    errors={errors}
                    setValue={setValue}
                    documents={documents}
                    setDocuments={setDocuments}
                    languageName={myValue.toString()}
                    allValues={allValues}
                    reset={reset}
                    replace={replace}
                  />
                )}
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="center"
                  sx={{
                    pt: 2,
                  }}
                  spacing={1}
                >
                  {activeStep > 0 && activeStep <= steps.length - 1 && (
                    <Grid item xs={2}>
                      <Button
                        color="inherit"
                        onClick={handleBack}
                        disabled={loading}
                        fullWidth
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
                    </Grid>
                  )}
                  {activeStep < steps.length - 1 && (
                    <Grid item xs={2}>
                      <Button
                        color="inherit"
                        disabled={!disableBtn}
                        onClick={handleNext}
                        fullWidth
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
                  )}
                  {activeStep === steps.length - 1 && (
                    <Grid item xs={2}>
                      <Button
                        type="submit"
                        disabled={!disableBtn || loading}
                        fullWidth
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
                        {loading && (
                          <CircularProgress size={22} color="inherit" />
                        )}
                        {!loading && t["Save"]}
                      </Button>
                    </Grid>
                  )}
                </Grid>
              </form>
            </Fragment>
          </Box>

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
      </Container>
      <BaseModal
        isShowing={sentModalOpen}
        isClose={handleClose}
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
      >
        <Tooltip title="Something">
          <>
            <NewVentureSentModal
              handleClose={handleClose}
              languageName={myValue.toString()}
            />
          </>
        </Tooltip>
      </BaseModal>
    </Box>
  );
}
