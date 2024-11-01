import {
  Box,
  FormControl,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useEffect } from "react";
import pinImage from "../../../../public/Images/pin.png";
import ventureImage from "../../../../public/Images/certidoes.png";

import { useDropzone } from "react-dropzone";
import { useState } from "react";
import { useMemo } from "react";
import BaseOutlinedZipInput from "../../reuseable/baseOutlinedZipInput/BaseOutlinedZipInput";
import BaseTextField from "../../reuseable/baseTextField/BaseTextField";
import { findPropertyTypeData } from "../../../redux/propertyType/actions";
import { useDispatch, useSelector } from "react-redux";
import { findProjectsData } from "../../../redux/projects/actions";
import { Controller } from "react-hook-form";
import BaseAutocomplete from "../../reuseable/baseAutocomplete/BaseAutocomplete";
import { findStateData } from "../../../redux/state/actions";
import en from "locales/en";
import pt from "locales/pt";
import dynamic from "next/dynamic";
import BaseTextArea from "@/component/reuseable/baseTextArea/BaseTextArea";
import BaseButton from "@/component/reuseable/baseButton/BaseButton";
import { useRouter } from "next/router";
import { getAddressData } from "@/api";
import { useGetCompanyListQuery } from "@/queries/UseGetCompanyListQuery";
import { useSession } from "next-auth/react";

const BaseTextEditor = dynamic(
  () => import("@/component/reuseable/baseTextEditor/BaseTextEditor"),
  {
    ssr: false, // This ensures that the component is not rendered on the server
  }
);

function Address({
  control,
  errors,
  reset,
  replace,
  languageName,
  allValues,
  setValue,
}) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(findStateData());
  }, [dispatch]);
  const t = languageName === "en" ? en : pt;

  const {data: session} = useSession()

  const router = useRouter()

  console.log({ allValues });

  const allStateData = useSelector((state) => state.state.stateData);

  const {data : companyData} = useGetCompanyListQuery({type:'construction'})
  console.log({companyData})

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
        alignItems="flex-start"
        sx={{ mt: 2 }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
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
            {t["Address"]}
          </Typography>
        </Stack>
        <BaseButton
          handleFunction={() => {
           router.back()
          }}
          sx="error"
          color="error"
          variant="outlined"
        >
          {t["Cancel"]}
        </BaseButton>
      </Grid>
      <Grid container sx={{ mt: 2 }}>
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
            {t["Enterprise Name"]}
          </Typography>
        </Grid>
        <Controller
          name="name"
          control={control}
          defaultValue={""}
          render={({ field }) => (
            <BaseTextField
              // size={"small"}
              placeholder={t["Enterprise Name"]}
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
          sx={{ color: "#b91c1c", mt: 0.5 }}
        >
          {errors.name?.message}
        </Typography>
      </Grid>

      <Grid container spacing={1} sx={{ mt: 3 }}>
        <Grid item xs={12}>
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
              {t["Property Description"]}
            </Typography>
          </Grid>
          <Controller
            name="description"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <BaseTextEditor
                name="description"
                control={control}
                allValues={allValues}
              />
            )}
          />
          <Typography
            variant="inherit"
            color="textSecondary"
            sx={{ color: "#b91c1c" }}
          >
            {errors.description?.message}
          </Typography>
        </Grid>
      </Grid>
{
  session?.user?.role !== "construction_company" &&
  <Grid container spacing={1} sx={{ mt: 3 }}>
  <Grid item xs={12} sm={12} md={12} lg={12}>
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
          empresa de construção
        </Typography>
      </Grid>
      <Controller
        name="construction_company"
        control={control}
        // defaultValue={{}}
        render={({ field }) => (
          <BaseAutocomplete
            //   sx={{ margin: "0.6vh 0" }}
            options={companyData || []}
            getOptionLabel={(option) => option?.user?.name || ""}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            size={"medium"}
            placeholder={`empresa de construção*`}
            onChange={(e, v, r, d) => field.onChange(v)}
            value={field.value || null}
          />
        )}
      />
      <Typography
        variant="inherit"
        color="textSecondary"
        sx={{ color: "#b91c1c" }}
      >
        {errors.construction_company?.message}
      </Typography>
    </Grid>
    </Grid>
}

      <Grid container spacing={1} sx={{ mt: 3 }}>
        <Grid item xs={12} sm={12} md={12} lg={3}>
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
              {t["Zip code"]}
              <span style={{ color: "#E63333" }}>*</span>
            </Typography>
          </Grid>
          <FormControl variant="outlined" sx={{ width: "100%" }}>
            <Controller
              name="zip_code"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <BaseOutlinedZipInput
                  placeholder={`${t["Zip code"]}*`}
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

        <Grid item xs={12} sm={12} md={12} lg={6}>
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
                size={"medium"}
                placeholder={`${t["Address"]}*`}
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
        <Grid item xs={12} sm={12} md={12} lg={3}>
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
                size={"medium"}
                placeholder={`${t["Number"]}*`}
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
      <Grid container spacing={1} sx={{ mt: 3 }}>
        <Grid item xs={12} sm={12} md={12} lg={4}>
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
                size={"medium"}
                placeholder={`${t["Neighborhood"]}*`}
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
        <Grid item xs={12} sm={12} md={12} lg={8}>
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
              {t["Complement"]}
            </Typography>
          </Grid>
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
      <Grid container spacing={1} sx={{ mt: 3 }}>
        <Grid item xs={12} sm={12} md={12} lg={6}>
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
              {t["City"]}
              <span style={{ color: "#E63333" }}>*</span>
            </Typography>
          </Grid>
          <Controller
            name="city"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <BaseTextField
                size={"medium"}
                placeholder={`${t["City"]}*`}
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
        <Grid item xs={12} sm={12} md={12} lg={6}>
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
              {t["State"]}
              <span style={{ color: "#E63333" }}>*</span>
            </Typography>
          </Grid>
          <Controller
            name="state"
            control={control}
            // defaultValue={{}}
            render={({ field }) => (
              <BaseAutocomplete
                //   sx={{ margin: "0.6vh 0" }}
                options={allStateData || []}
                getOptionLabel={(option) => option.name || ""}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                size={"medium"}
                placeholder={`${t["State"]}*`}
                onChange={(e, v, r, d) => field.onChange(v)}
                value={field.value || null}
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
      </Grid>
    </Box>
  );
}

export default Address;
