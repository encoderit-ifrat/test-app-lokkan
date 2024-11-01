import {
  Autocomplete,
  Box,
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import valueImage from "../../../../public/Images/proposal_modal.png";
import ventureImage from "../../../../public/Images/certidoes.png";
import BaseTextField from "../../reuseable/baseTextField/BaseTextField";
import { Controller } from "react-hook-form";
import BaseAutocomplete from "../../reuseable/baseAutocomplete/BaseAutocomplete";
import en from "locales/en";
import pt from "locales/pt";
import BaseCancelButton from "@/component/reuseable/button/BaseCancelButton";
import BaseButton from "@/component/reuseable/baseButton/BaseButton";
import BaseValueField from "@/component/reuseable/baseValueField/BaseValueFiled";
import { useRouter } from "next/router";

//matched_with_property_details
const matchedForCondominio = [1, 2, 4, 8, 10, 11, 13, 15, 16];
const matchedForAreaM2 = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
];
const matchedForQuartos = [1, 2, 3, 4, 7, 8, 9, 10, 11, 12, 13, 16];
const matchedForSuites = [1, 2, 3, 4, 7, 8, 9, 16];
const matchedForBanheiro = [1, 2, 3, 4, 7, 8, 9, 10, 11, 12, 13, 16];
const matchedForVagas = [1, 2, 3, 4, 7, 8, 9, 10, 11, 12, 13, 16];
const matchedForTerrenoAreaM2 = [2, 3, 7, 8, 9, 12, 13, 16];
const matchedForDimension = [15];

// const matchedForDimensoes = [5, 6];
function shouldDisableButton(allValues) {
  const requiredFields = [
    "brl_rent",
    "condominium",
    "brl_iptu",
    "land_area",
    "property_area",
    "no_of_rooms",
    "no_of_suites",
    "no_of_bathrooms",
    "no_of_parking_spaces",
    "documentation",
    "registry",
    "registration_number",
    "dimension",
  ];

  // Filter out hidden fields from the list of required fields
  const visibleFields = requiredFields.filter(
    (field) => allValues[field] !== undefined
  );
  if (visibleFields.length === 0) {
    return true;
  } else {
    // Check if any of the visible fields are empty
    const isAnyFieldEmpty = visibleFields.some(
      (field) => allValues[field] === ""
    );

    return isAnyFieldEmpty;
  }
}

function ValuesAndDescription({
  control,
  errors,
  languageName,
  handleNext,
  handleBack,
  allValues,
  property_detail_id,
  reset,
  replace,
}) {
  const t = languageName === "en" ? en : pt;

  console.log({ allValues });

  // const [disableBtn, setDisableBtn] = useState(true);

  // useEffect(() => {
  //   setDisableBtn(shouldDisableButton(allValues));
  // }, [allValues]);
  const router = useRouter()

  const goBack = () => {
    router.back()
  }

  const disableBtn = useMemo(() => {
    return shouldDisableButton(allValues);
  }, [allValues]);

  return (
    <Box sx={{ mt: 4 }}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Image height={40} width={40} src={valueImage} alt="value" />
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
            {t["Values"]}
          </Typography>
        </Stack>
        <BaseButton
          color="error"
          sx="error"
          variant="outlined"
          handleFunction={goBack}
        >
          {t["Cancel"]}
        </BaseButton>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Grid
            item
            xs={12}
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Typography
              variant="p"
              sx={{
                color: "#253858",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "16px",
                mb: 1,
              }}
            >
              {t["BRL Rent"]}
              <span style={{ color: "#E63333" }}>*</span>
            </Typography>
          </Grid>
          <Controller
            name="brl_rent"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <BaseValueField
                size={"medium"}
                placeholder={`${t["BRL Rent"]}*`}
                type={"number"}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                name={"brl_rent"}
                value={field.value}
              />
            )}
          />
          <Typography
            variant="inherit"
            color="textSecondary"
            sx={{ color: "#b91c1c" }}
          >
            {errors.brl_rent?.message}
          </Typography>
        </Grid>
        {matchedForCondominio.includes(property_detail_id) && (
          <Grid item xs={12} md={6}>
            <Grid
              item
              xs={12}
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Typography
                variant="p"
                sx={{
                  color: "#253858",
                  fontSize: "14px",
                  fontWeight: "400",
                  lineHeight: "16px",
                  mb: 1,
                }}
              >
                {t["Condominium"]}
                <span style={{ color: "#E63333" }}>*</span>
              </Typography>
            </Grid>
            <Controller
              name="condominium"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <BaseValueField
                  size={"medium"}
                  placeholder={`R$ ${t["Condominium"]}*`}
                  type={"number"}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  name={"condominium"}
                  value={field.value}
                />
              )}
            />
            <Typography
              variant="inherit"
              color="textSecondary"
              sx={{ color: "#b91c1c" }}
            >
              {errors.condominium?.message}
            </Typography>
          </Grid>
        )}
        <Grid item xs={12} md={6}>
          <Grid
            item
            xs={12}
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Typography
              variant="p"
              sx={{
                color: "#253858",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "16px",
                mb: 1,
              }}
            >
              R$ IPTU
              <span style={{ color: "#E63333" }}>*</span>
            </Typography>
          </Grid>
          <Controller
            name="brl_iptu"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <BaseValueField
                size={"medium"}
                placeholder={"R$ IPTU*"}
                type={"number"}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                name={"brl_iptu"}
                value={field.value}
              />
            )}
          />
          <Typography
            variant="inherit"
            color="textSecondary"
            sx={{ color: "#b91c1c" }}
          >
            {errors.brl_iptu?.message}
          </Typography>
        </Grid>
      </Grid>

      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{ mt: 3 }}
      >
        <Image src={ventureImage} alt="venture" />
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
          {t["Description"]}
        </Typography>
      </Grid>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {matchedForTerrenoAreaM2.includes(property_detail_id) && (
          <Grid item xs={12} md={6}>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Typography
                variant="p"
                sx={{
                  color: "#253858",
                  fontSize: "14px",
                  fontWeight: "400",
                  lineHeight: "16px",
                  mb: 1,
                }}
              >
                {`${t["Land area"]} m² `}
                <span style={{ color: "#E63333" }}>*</span>
              </Typography>
            </Grid>
            <Controller
              name="land_area"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <BaseTextField
                  placeholder={`m² ${t["Land area"]}`}
                  type={"number"}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  name={"land_area"}
                  value={field.value}
                />
              )}
            />
            <Typography
              variant="inherit"
              color="textSecondary"
              sx={{ color: "#b91c1c" }}
            >
              {errors.land_area?.message}
            </Typography>
          </Grid>
        )}
        {matchedForAreaM2.includes(property_detail_id) && (
          <Grid item xs={12} md={6}>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Typography
                variant="p"
                sx={{
                  color: "#253858",
                  fontSize: "14px",
                  fontWeight: "400",
                  lineHeight: "16px",
                  mb: 1,
                }}
              >
                {`${t["Size of the property"]} m² `}
                <span style={{ color: "#E63333" }}>*</span>
              </Typography>
            </Grid>
            <Controller
              name="property_area"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <BaseTextField
                  placeholder={`m² ${t["Size of the property"]}`}
                  type={"number"}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  name={"property_area"}
                  value={field.value}
                />
              )}
            />
            <Typography
              variant="inherit"
              color="textSecondary"
              sx={{ color: "#b91c1c" }}
            >
              {errors.property_area?.message}
            </Typography>
          </Grid>
        )}
        {matchedForQuartos.includes(property_detail_id) && (
          <Grid item xs={12} md={6}>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Typography
                variant="p"
                sx={{
                  color: "#253858",
                  fontSize: "14px",
                  fontWeight: "400",
                  lineHeight: "16px",
                  mb: 1,
                }}
              >
                {t["number of rooms"]}
                <span style={{ color: "#E63333" }}>*</span>
              </Typography>
            </Grid>
            <Controller
              name="no_of_rooms"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <BaseTextField
                  placeholder={`${t["number of rooms"]}`}
                  type={"number"}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  name={"no_of_rooms*"}
                  value={field.value}
                />
              )}
            />
            <Typography
              variant="inherit"
              color="textSecondary"
              sx={{ color: "#b91c1c" }}
            >
              {errors.no_of_rooms?.message}
            </Typography>
          </Grid>
        )}

        {matchedForSuites.includes(property_detail_id) && (
          <Grid item xs={12} md={6}>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Typography
                variant="p"
                sx={{
                  color: "#253858",
                  fontSize: "14px",
                  fontWeight: "400",
                  lineHeight: "16px",
                  mb: 1,
                }}
              >
                {t["number of suites"]}
                <span style={{ color: "#E63333" }}>*</span>
              </Typography>
            </Grid>
            <Controller
              name="no_of_suites"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <BaseTextField
                  placeholder={`${t["number of suites"]}`}
                  type={"number"}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  name={"no_of_suites"}
                  value={field.value}
                />
              )}
            />
            <Typography
              variant="inherit"
              color="textSecondary"
              sx={{ color: "#b91c1c" }}
            >
              {errors.no_of_suites?.message}
            </Typography>
          </Grid>
        )}
        {matchedForBanheiro.includes(property_detail_id) && (
          <Grid item xs={12} md={6}>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Typography
                variant="p"
                sx={{
                  color: "#253858",
                  fontSize: "14px",
                  fontWeight: "400",
                  lineHeight: "16px",
                  mb: 1,
                }}
              >
                {t["bathrooms"]}
                <span style={{ color: "#E63333" }}>*</span>
              </Typography>
            </Grid>
            <Controller
              name="no_of_bathrooms"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <BaseTextField
                  placeholder={`${t["bathrooms"]}`}
                  type={"number"}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  name={"no_of_bathrooms"}
                  value={field.value}
                />
              )}
            />
            <Typography
              variant="inherit"
              color="textSecondary"
              sx={{ color: "#b91c1c" }}
            >
              {errors.no_of_bathrooms?.message}
            </Typography>
          </Grid>
        )}
        {matchedForVagas.includes(property_detail_id) && (
          <Grid item xs={12} md={6}>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Typography
                variant="p"
                sx={{
                  color: "#253858",
                  fontSize: "14px",
                  fontWeight: "400",
                  lineHeight: "16px",
                  mb: 1,
                }}
              >
                {t["number of parking spaces"]}
                <span style={{ color: "#E63333" }}>*</span>
              </Typography>
            </Grid>
            <Controller
              name="no_of_parking_spaces"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <BaseTextField
                  placeholder={`${t["number of parking spaces"]}`}
                  type={"number"}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  name={"no_of_parking_spaces"}
                  value={field.value}
                />
              )}
            />
            <Typography
              variant="inherit"
              color="textSecondary"
              sx={{ color: "#b91c1c" }}
            >
              {errors.no_of_parking_spaces?.message}
            </Typography>
          </Grid>
        )}
        {matchedForDimension.includes(property_detail_id) && (
          <Grid item xs={12} md={6}>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Typography
                variant="p"
                sx={{
                  color: "#253858",
                  fontSize: "14px",
                  fontWeight: "400",
                  lineHeight: "16px",
                  mb: 1,
                }}
              >
                {t["dimension"]}
              </Typography>
            </Grid>
            <Controller
              name="dimension"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <BaseTextField
                  name="dimension"
                  placeholder={`${t["dimension"]}`}
                  type={"number"}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  value={field.value}
                />
              )}
            />
            <Typography
              variant="inherit"
              color="textSecondary"
              sx={{ color: "#b91c1c" }}
            >
              {errors.no_of_parking_spaces?.message}
            </Typography>
          </Grid>
        )}
      </Grid>

      <Grid container spacing={1} sx={{ mt: 2 }}>
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          sx={{ mt: 2, mb: 2 }}
          spacing={1}
        >
          <Grid item xs={2}>
            <BaseButton
              color="inherit"
              handleFunction={handleBack}
              fullWidth
              // disabled={activeStep === 0}
              sx="outlined"
            >
              {t["come back"]}
            </BaseButton>
          </Grid>
          <Grid item xs={2}>
            <BaseButton
              handleFunction={handleNext}
              disabled={disableBtn}
              fullWidth
              sx="secondary"
            >
              {t["Next"]}
            </BaseButton>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ValuesAndDescription;
