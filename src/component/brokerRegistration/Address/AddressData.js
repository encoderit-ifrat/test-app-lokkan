import {
  Box,
  Button,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import BaseOutlinedZipInput from "../../reuseable/baseOutlinedZipInput/BaseOutlinedZipInput";
import BaseTextField from "../../reuseable/baseTextField/BaseTextField";
import { Controller } from "react-hook-form";
import BaseAutocomplete from "../../reuseable/baseAutocomplete/BaseAutocomplete";
import { useDispatch, useSelector } from "react-redux";
import { findStateData } from "../../../redux/state/actions";
import en from "locales/en";
import pt from "locales/pt";
import BaseButton from "@/component/reuseable/baseButton/BaseButton";
import { getAddressData } from "@/api";

function AddressData({
  handleBack,
  handleNext,
  control,
  errors,
  allValues,
  setValue,
  activeStep,
  languageName,
  reset,
  replace,
}) {
  const t = languageName === "en" ? en : pt;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(findStateData());
  }, [dispatch]);

  const [disableBtn, setDisableBtn] = useState(true);
  useEffect(() => {
    if (
      allValues?.zip_code != null &&
      allValues?.address != null &&
      allValues?.number != null &&
      allValues?.neighbourhood != null &&
      allValues?.state != null &&
      allValues?.city != null
    ) {
      setDisableBtn(false);
    }
    if (
      allValues?.zip_code === "" ||
      allValues?.address === "" ||
      allValues?.number === "" ||
      allValues?.neighbourhood === "" ||
      allValues?.state === "" ||
      allValues?.city === ""
    ) {
      setDisableBtn(true);
    }
  }, [allValues]);

  const allStateData = useSelector((state) => state.state.stateData);

  // useEffect(() => {
  //   setValue("state", allStateData[0]);
  // }, [allStateData, setValue]);

  useEffect(() => {
    const getData = async () => {
      const [error, response] = await getAddressData(allValues?.zip_code);
      if (error) {
        setValue("address", "");
        setValue("neighbourhood", "");
        setValue("add_on", "");
        setValue("city", "");
        setValue("state", "");
      } else {
        setValue("address", response?.data?.logradouro);
        setValue("neighbourhood", response?.data?.bairro);
        setValue("add_on", response?.data?.complemento);
        setValue("city", response?.data?.localidade);
        setValue(
          "state",
          allStateData?.find((data) => data?.uf === response?.data?.uf)
        );
      }
    };
    if (allValues?.zip_code && allValues?.zip_code?.length > 8) {
      getData();
    }
  }, [allValues?.zip_code, setValue, allStateData]);

  return (
    <Box sx={{ mt: 4 }}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography
          variant="p"
          sx={{
            color: "#1A1859",
            fontSize: "24px",
            fontWeight: "700",
            lineHeight: "29px",
          }}
        >
          {t["Address"]}
        </Typography>
        <BaseButton
          type="button"
          variant="outlined"
          color="error"
          sx="error"
          handleFunction={() => {
            reset();
            replace("/");
          }}
        >
          {t["Cancel"]}
        </BaseButton>
      </Grid>

      <Grid container spacing={1} sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{ mb: 1 }}
          >
            <Typography
              variant="p"
              sx={{
                color: "#253858",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "16px",
              }}
            >
              {t["Zip code"]}
              <span style={{ color: "#E63333" }}>*</span>
            </Typography>
          </Grid>
          {/* <TextField
            fullWidth
            size="small"
            id="outlined-basic"
            type="number"
            value={value}
            onChange={(e) => handleValidation(e)}
            error={!valid && value.length > 0 ? true : false}
            required={true}
            // placeholder="Social Name"
            variant="outlined"
            sx={{ mb: 1 }}
          /> */}
          <FormControl variant="outlined" sx={{ width: "100%", mb: 1 }}>
            <Controller
              name="zip_code"
              control={control}
              render={({ field }) => (
                <BaseOutlinedZipInput
                  // placeholder={t["Zip code"]}
                  size={"small"}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  name={"zip_code"}
                  value={field.value}
                  // error={errors.cpf_number ? true : false}
                />
              )}
            />
            <Typography
              variant="inherit"
              color="textSecondary"
              sx={{ color: "#b91c1c" }}
            >
              {errors.zip_code?.message}
            </Typography>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={1} sx={{ mt: 2, mb: 1 }}>
        <Grid item xs={12} sm={12} md={8}>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{ mb: 1 }}
          >
            <Typography
              variant="p"
              sx={{
                color: "#253858",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "16px",
              }}
            >
              {t["Address"]}
              <span style={{ color: "#E63333" }}>*</span>
            </Typography>
          </Grid>
          <Controller
            name="address"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <BaseTextField
                size={"small"}
                // placeholder={t["Address"]}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                name={"address"}
                value={field.value}
              />
            )}
          />
          <Typography
            variant="inherit"
            color="textSecondary"
            sx={{ color: "#b91c1c" }}
          >
            {errors.address?.message}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={4} sx={{ mb: 1 }}>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{ mb: 1 }}
          >
            <Typography
              variant="p"
              sx={{
                color: "#253858",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "16px",
              }}
            >
              {t["Number"]}
              <span style={{ color: "#E63333" }}>*</span>
            </Typography>
          </Grid>
          <Controller
            name="number"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <BaseTextField
                size={"small"}
                // placeholder={t["Number"]}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                name={"number"}
                type={"number"}
                value={field.value}
              />
            )}
          />
          <Typography
            variant="inherit"
            color="textSecondary"
            sx={{ color: "#b91c1c" }}
          >
            {errors.number?.message}
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={1} sx={{ mt: 2, mb: 1 }}>
        <Grid item xs={12}>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{ mb: 1 }}
          >
            <Typography
              variant="p"
              sx={{
                color: "#253858",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "16px",
              }}
            >
              {t["Neighborhood"]}
              <span style={{ color: "#E63333" }}>*</span>
            </Typography>
          </Grid>
          <Controller
            name="neighbourhood"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <BaseTextField
                size={"small"}
                // placeholder={t["Neighborhood"]}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                name={"neighbourhood"}
                value={field.value}
              />
            )}
          />
          <Typography
            variant="inherit"
            color="textSecondary"
            sx={{ color: "#b91c1c" }}
          >
            {errors.neighbourhood?.message}
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={1} sx={{ mt: 2, mb: 1 }}>
        <Grid item xs={12}>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{ mb: 1 }}
          >
            <Typography
              variant="p"
              sx={{
                color: "#253858",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "16px",
              }}
            >
              {t["Add-on"]}
              <span
                style={{
                  color: "#7C7C99",
                  fontSize: "14px",
                  fontWeight: "400",
                }}
              >
                (optional)
              </span>
            </Typography>
          </Grid>
          <Controller
            name="add_on"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <BaseTextField
                size={"small"}
                // placeholder={t["Add-on"]}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                name={"add_on"}
                value={field.value}
              />
            )}
          />
        </Grid>
      </Grid>

      <Grid container spacing={1} sx={{ mt: 2, mb: 1 }}>
        <Grid item xs={12} sm={12} md={6}>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{ mb: 1 }}
          >
            <Typography
              variant="p"
              sx={{
                color: "#253858",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "16px",
              }}
            >
              {t["state"]}
              <span style={{ color: "#E63333" }}>*</span>
            </Typography>
          </Grid>
          <Controller
            name="state"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <BaseAutocomplete
                //   sx={{ margin: "0.6vh 0" }}
                options={allStateData || []}
                getOptionLabel={(option) => option.name || ""}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                size={"small"}
                // placeholder={t["state"]}
                onChange={(e, v, r, d) => field.onChange(v)}
                value={field.value}
              />
            )}
          />
          <Typography
            variant="inherit"
            color="textSecondary"
            sx={{ color: "#b91c1c" }}
          >
            {errors.state?.message}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{ mb: 1 }}
          >
            <Typography
              variant="p"
              sx={{
                color: "#253858",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "16px",
              }}
            >
              {t["city"]}
              <span style={{ color: "#E63333" }}>*</span>
            </Typography>
          </Grid>
          <Controller
            name="city"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <BaseTextField
                size={"small"}
                // placeholder={t["city"]}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                name={"city"}
                value={field.value}
              />
            )}
          />
          <Typography
            variant="inherit"
            color="textSecondary"
            sx={{ color: "#b91c1c" }}
          >
            {errors.city?.message}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AddressData;
