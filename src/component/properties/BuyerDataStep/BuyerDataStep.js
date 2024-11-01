import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import PropertyCard from "../PropertyCard/PropertyCard";
import proposeImage from "../../../../public/Images/proposal_modal.png";
import buyerProfile from "../../../../public/Images/buyer_profile.png";
import BaseOutlinedZipInput from "../../reuseable/baseOutlinedZipInput/BaseOutlinedZipInput";
import BaseOutlinedCpfInput from "../../reuseable/baseOutlinedCpfInput/BaseOutlinedCpfInput";
import BaseOutlinedRgInput from "../../reuseable/baseOutlinedRgInput/BaseOutlinedRgInput";
import BaseTextField from "../../reuseable/baseTextField/BaseTextField";
import { Controller } from "react-hook-form";
import BaseAutocomplete from "../../reuseable/baseAutocomplete/BaseAutocomplete";
import { useDispatch, useSelector } from "react-redux";
import { findStateData } from "../../../redux/state/actions";
import en from "locales/en";
import pt from "locales/pt";

function BuyerDataStep({
  setMaritalStatus,
  maritalStatus,
  control,
  errors,
  setValue,
  languageName,
}) {
  const t = languageName === "en" ? en : pt;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(findStateData());
  }, [dispatch]);

  const allStateData = useSelector((state) => state.state.stateData);

  useEffect(() => {
    setValue("state", allStateData[0]);
  }, [allStateData, setValue]);

  return (
    <Box sx={{ mt: 4 }}>
      {/* <PropertyCard /> */}
      <Box sx={{ mt: 2, mb: 1 }}>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Box>
            <Image src={buyerProfile} alt="buyerProfile" />
          </Box>
          <Typography
            variant="p"
            sx={{
              marginLeft: 1,
              fontWeight: "700",
              fontSize: "24px",
              lineHeight: "32px",
            }}
          >
            {t["Buyer data"]}
          </Typography>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          sx={{ my: 2 }}
        >
          <Grid container>
            <Typography
              variant="p"
              sx={{
                fontSize: "16px",
                fontWeight: 400,
                color: "#002152",
                lineHeight: "22px",
                mb: 1,
              }}
            >
              {`${t["Marital status"]}:`}
            </Typography>
          </Grid>

          <Button
            onClick={() => setMaritalStatus("Married")}
            sx={{
              textTransform: "none",
              padding: "3px 6px",
              backgroundColor:
                maritalStatus === "Married" ? "#0362F0" : "#F2F5F6",
              color: maritalStatus === "Married" ? "#ffffff" : "#002152",
              borderRadius: "56px",
              "&: hover": {
                padding: "3px 6px",
                backgroundColor: "#0362F0",
                color: "#ffffff",
                borderRadius: "56px",
              },
            }}
          >
            {t["Married"]}
          </Button>
          <Button
            onClick={() => setMaritalStatus("Single")}
            sx={{
              textTransform: "none",
              padding: "3px 6px",
              backgroundColor:
                maritalStatus === "Single" ? "#0362F0" : "#F2F5F6",
              color: maritalStatus === "Single" ? "#ffffff" : "#002152",
              borderRadius: "56px",
              ml: 1,
              "&: hover": {
                padding: "3px 6px",
                backgroundColor: "#0362F0",
                color: "#ffffff",
                borderRadius: "56px",
              },
            }}
          >
            {t["Single"]}
          </Button>
        </Grid>
        <Grid container sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <Controller
              name="name"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <BaseTextField
                  size={"medium"}
                  placeholder={t["Full Name"]}
                  // sx={{ mb: 2 }}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  name={"name"}
                  value={field.value}
                />
              )}
            />
            <Typography
              variant="inherit"
              color="textSecondary"
              sx={{ color: "#b91c1c" }}
            >
              {errors.name?.message}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={1} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <FormControl variant="outlined" sx={{ width: "100%" }}>
              <Controller
                name="rg"
                control={control}
                render={({ field }) => (
                  <BaseOutlinedRgInput
                    placeholder={"RG"}
                    size={"medium"}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                    name={"RG_number"}
                    value={field.value}
                    // error={errors?.rg_number ? true : false}
                  />
                )}
              />
              <Typography
                variant="inherit"
                color="textSecondary"
                sx={{ color: "#b91c1c" }}
              >
                {errors?.rg?.message}
              </Typography>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <FormControl variant="outlined" sx={{ width: "100%" }}>
              <Controller
                name="cpf"
                control={control}
                render={({ field }) => (
                  <BaseOutlinedCpfInput
                    placeholder={"CPF"}
                    size={"medium"}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                    name={"cpf_number"}
                    value={field.value}
                    // onBlur={() => trigger("cpf")}

                    // error={errors.cpf_number ? true : false}
                  />
                )}
              />
              <Typography
                variant="inherit"
                color="textSecondary"
                sx={{ color: "#b91c1c" }}
              >
                {errors.cpf?.message}
              </Typography>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container sx={{ mt: 2 }}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Typography
              variant="p"
              sx={{
                fontSize: "16px",
                fontWeight: "400",
                color: "#002152",
                lineHeight: "22px",
              }}
            >
              {`${t["Address"]}:`}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <FormControl variant="outlined" sx={{ width: "100%" }}>
              <Controller
                name="zip_code"
                control={control}
                render={({ field }) => (
                  <BaseOutlinedZipInput
                    placeholder={t["Zip code"]}
                    size={"medium"}
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
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <Controller
              name="address"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <BaseTextField
                  size={"medium"}
                  placeholder={t["Address"]}
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
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <Controller
              name="number"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <BaseTextField
                  size={"medium"}
                  placeholder={t["Number"]}
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
        <Grid container spacing={1} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Controller
              name="neighbourhood"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <BaseTextField
                  size={"medium"}
                  placeholder={t["Neighborhood"]}
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
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Controller
              name="complement"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <BaseTextField
                  size={"medium"}
                  placeholder={t["Complement"]}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  name={"complement"}
                  value={field.value}
                />
              )}
            />
            <Typography
              variant="inherit"
              color="textSecondary"
              sx={{ color: "#b91c1c" }}
            >
              {errors.complement?.message}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={1} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Controller
              name="city"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <BaseTextField
                  size={"medium"}
                  placeholder={t["City"]}
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
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Controller
              name="state"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <BaseAutocomplete
                  //   sx={{ margin: "0.6vh 0" }}
                  options={allStateData || []}
                  getOptionLabel={(option) => option.name || ""}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  size={"medium"}
                  placeholder={t["State"]}
                  onChange={(e, v, r, d) => field.onChange(v)}
                  value={field.value}
                />
              )}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default BuyerDataStep;
