import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import buildingImage from "../../../../public/Images/buildingRed.png";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useDispatch, useSelector } from "react-redux";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import BaseTextField from "../../reuseable/baseTextField/BaseTextField";
import { findFeatureData } from "../../../redux/features/actions";
import en from "locales/en";
import pt from "locales/pt";
import { useSession } from "next-auth/react";
import BaseAutocomplete from "@/component/reuseable/baseAutocomplete/BaseAutocomplete";
import { featureDataCreate } from "@/redux/featureWithoutGroup/actions";
import BaseButton from "@/component/reuseable/baseButton/BaseButton";
import { useRouter } from "next/router";
import { useFeatureTypeDeleteMutation } from "@/queries/useFeatureTypeDeleteMutation";
import { useGetFeatureTypesQuery } from "@/queries/useGetFetaureTypesQuery";

function Features({
  featuretypes,
  setFeatureTypes,
  errors,
  languageName,
  reset,
  replace,
}) {
  const t = languageName === "en" ? en : pt;

  const [featureSelectData, setFeatureSelectData] = useState(null);
  const { data: session } = useSession();
  const [item, setItem] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(findFeatureData());
  }, [dispatch]);

  const featureData = useSelector((state) => state.feature.featureData);

  const loading = useSelector((state) => state.feature?.loading);
  const { data: featureTypesData, refetch } = useGetFeatureTypesQuery();
  console.log({ featureTypesData });

  useEffect(() => {
    if (featuretypes.length > 0) {
      delete errors.features;
    }
  }, [featuretypes, errors]);

  const [inputValue, setInputValue] = useState(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddFeature = async () => {
    if (item.length > 0) {
      await dispatch(
        featureDataCreate({
          name: item,
          type: inputValue ? inputValue : featureSelectData,
        })
      );
      await dispatch(findFeatureData());
      await refetch();
    }
  };

  const mutation = useFeatureTypeDeleteMutation();

  const handleDeleteFeature = (key) => {
    const body = {
      type: key,
    };
    mutation.mutate(body, {
      onError(error) {
        console.log(error);
      },
      onSuccess: async (data) => {
        await dispatch(findFeatureData());
        await refetch();
      },
    });
  };

  const FeatureAddLoading = useSelector(
    (state) => state?.featureButton?.buttonData
  );

  const [disableBtn, setDisableBtn] = useState(true);
  useEffect(() => {
    if (featuretypes?.length > 0) {
      setDisableBtn(false);
    }
    if (featuretypes?.length < 1) {
      setDisableBtn(true);
    }
  }, [featuretypes]);
  const router = useRouter();

  return (
    <Box sx={{ mt: 4 }}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Image height={40} width={40} src={buildingImage} alt="building" />
          <Typography
            variant="p"
            sx={{
              color: "#002152",
              fontSize: "24px",
              fontWeight: "700",
              lineHeight: "32px",
              ml: 1,
            }}
          >
            {t["Features"]}
          </Typography>
        </Stack>
        <BaseButton
          handleFunction={() => {
            router.back();
          }}
          sx="error"
          color="error"
          variant="outlined"
        >
          {t["Cancel"]}
        </BaseButton>
      </Grid>
      <Box sx={{ mt: 2 }}>
        <Typography
          variant="p"
          sx={{
            color: "#002152",
            fontSize: "16px",
            fontWeight: "400",
            lineHeight: "22px",
          }}
        >
          {`${t["select property features"]}:`}
        </Typography>
      </Box>
      {loading ? (
        <Grid
          container
          sx={{ height: "60vh" }}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress sx={{ color: "#22d3ee" }} />
        </Grid>
      ) : (
        <Grid container spacing={1} sx={{ mt: 2 }}>
          {Object.keys(featureData).map((key, index) => (
            <Box key={index} sx={{ width: "100%" }}>
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  variant="p"
                  sx={{
                    color: "#4B4B66",
                    fontSize: "16px",
                    fontWeight: "600",
                    lineHeight: "19px",
                  }}
                >
                  {key}
                </Typography>
                {session?.user?.role === "admin" && (
                  <DeleteOutlinedIcon
                    sx={{ color: "red", cursor: "pointer" }}
                    onClick={() => handleDeleteFeature(key)}
                  />
                )}
              </Grid>
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                gap={1}
                sx={{ mt: 2 }}
              >
                {featureData[key].map((data, index) => (
                  <Button
                    key={index}
                    onClick={() => {
                      if (!featuretypes?.includes(data.id)) {
                        setFeatureTypes((current) => [...current, data.id]);
                      } else {
                        const newArray = featuretypes?.filter(
                          (value) => value !== data.id
                        );
                        setFeatureTypes(newArray);
                      }
                    }}
                    sx={{
                      background: `${
                        featuretypes?.includes(data.id)
                          ? "#7450F0"
                          : "transparent"
                      }`,
                      borderRadius: "56px",
                      // width: "100%",
                      color: `${
                        featuretypes?.includes(data.id) ? "#FFFFFF" : "#32414C"
                      }`,
                      border: `${
                        featuretypes?.includes(data.id)
                          ? ""
                          : "1px solid #9FAAB1"
                      }`,
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
                      px: { xs: 2, sm: 2, md: 2, lg: 2, xl: 2 },
                      py: 1,
                      "&:hover": {
                        background: "#7450F0",
                        borderRadius: "56px",
                        color: "#FFFFFF",
                        border: `${index === 0 ? "" : "1px solid #9FAAB1"}`,
                        // width: "100%",
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
                        px: { xs: 2, sm: 2, md: 2, lg: 2, xl: 2 },
                        py: 1,
                      },
                    }}
                  >
                    {data?.name?.slice(0, 20)}
                  </Button>
                ))}
              </Grid>
              <Divider sx={{ mt: 1, mb: 1 }} />
            </Box>
          ))}
        </Grid>
      )}

      <Typography
        variant="inherit"
        color="textSecondary"
        sx={{ color: "#b91c1c" }}
      >
        {errors?.features?.message}
      </Typography>
      {session?.user?.role === "admin" && (
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          sx={{ mt: 3 }}
        >
          <BaseTextField
            sx={{ width: "35%" }}
            placeholder={t["Add feature"]}
            onChange={(e) => setItem(e.target.value)}
          />
          <BaseAutocomplete
            //   sx={{ margin: "0.6vh 0" }}
            options={featureTypesData || []}
            sx={{ ml: 1, width: "35%" }}
            isOptionEqualToValue={(option, value) => option === value}
            size={"large"}
            placeholder={"Feature Type"}
            onChange={(e, v, r, d) => setFeatureSelectData(v)}
            onInputChange={handleInputChange}
            value={featureSelectData}
          />
          <Button
            onClick={handleAddFeature}
            sx={{
              backgroundColor: "#0362F0",
              py: 2,
              ml: 1,
              borderRadius: "4px",
              "&:hover": {
                backgroundColor: "#0362F0",
                py: 2,
                ml: 1,
                borderRadius: "4px",
              },
            }}
          >
            <AddOutlinedIcon sx={{ color: "#ffffff" }} />
          </Button>
        </Grid>
      )}
    </Box>
  );
}

export default Features;

const featureTypeData = [
  { id: 1, name: "condominium" },
  { id: 2, name: "accessibility" },
  { id: 3, name: "amenities" },
  { id: 4, name: "appliances" },
  { id: 5, name: "room" },
  { id: 6, name: "sorrounding" },
  { id: 7, name: "wellbeing" },
  { id: 8, name: "feature" },
  { id: 9, name: "rooms" },
];
