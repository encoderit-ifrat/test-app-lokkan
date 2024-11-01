import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useEffect, useMemo } from "react";
import buyerProfile from "../../../../public/Images/buyer_profile.png";
import BaseOutlinedZipInput from "../../reuseable/baseOutlinedZipInput/BaseOutlinedZipInput";
import BaseOutlinedCpfInput from "../../reuseable/baseOutlinedCpfInput/BaseOutlinedCpfInput";
import BaseOutlinedRgInput from "../../reuseable/baseOutlinedRgInput/BaseOutlinedRgInput";
import BaseTextField from "../../reuseable/baseTextField/BaseTextField";
import { Controller } from "react-hook-form";
import BaseAutocomplete from "../../reuseable/baseAutocomplete/BaseAutocomplete";
import { useDispatch, useSelector } from "react-redux";
import { findStateData } from "../../../redux/state/actions";
import pt from "locales/pt";
import en from "locales/en";
import { useDropzone } from "react-dropzone";
import { useSession } from "next-auth/react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import pinImage from "../../../../public/Images/pin.png";
import BaseCancelButton from "@/component/reuseable/button/BaseCancelButton";
import BaseButton from "@/component/reuseable/baseButton/BaseButton";
import { getAddressData } from "@/api";
import { useRouter } from "next/router";
import BaseOutlinedPhoneInput from "@/component/reuseable/baseOutlinedPhoneInput/BaseOutlinedPhoneInput";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "50px",
  borderWidth: 2,
  borderRadius: "4px",
  borderColor: "#DBE1E5",
  borderStyle: "dashed",
  backgroundColor: "#F2F5F6",

  color: "#c4c4c4",
  outline: "none",
  transition: "border .24s ease-in-out",
  width: "100%",
  marginTop: "2vh",
};

const activeStyle = {
  borderColor: "#f2f",
};

const acceptStyle = {
  borderColor: "#f8f",
};

const rejectStyle = {
  borderColor: "#f2f",
};

function Owner({
  control,
  errors,
  maritalStatus,
  setMaritalStatus,
  languageName,
  documents,
  setDocuments,
  setSingle,
  allValues,
  single,
  married,
  setMarried,
  reset,
  setValue,
  replace,
  trigger,
}) {
  const t = languageName === "en" ? en : pt;
  const router = useRouter();
  const dispatch = useDispatch();
  const { query } = router;
  const { data: session } = useSession();
  const onDrop = (acceptedFiles) => {
    acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );

    const allFiles = [...documents, ...acceptedFiles]; //save all files here

    setDocuments(allFiles);
  };
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [],
      "application/msword": [],
    },
  });

  const handleDelete = (index) => {
    const filterItem = documents.filter(
      (file, fileIndex) => fileIndex !== index
    );
    setDocuments(filterItem);
  };

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  useEffect(() => {
    dispatch(findStateData());
  }, [dispatch]);
  const allStateData = useSelector((state) => state.state.stateData);

  useEffect(() => {
    const getData = async () => {
      const [error, response] = await getAddressData(allValues?.owner_zip_code);
      if (error) {
        setValue("owner_address", "");
        setValue("owner_neighbourhood", "");
        setValue("owner_complement", "");
        setValue("owner_city", "");
        setValue("owner_state", "");
      } else {
        setValue("owner_address", response?.data?.logradouro);
        setValue("owner_neighbourhood", response?.data?.bairro);
        setValue("owner_complement", response?.data?.complemento);
        setValue("owner_city", response?.data?.localidade);
        setValue(
          "owner_state",
          allStateData?.find((data) => data?.uf === response?.data?.uf)
        );
      }
    };
    if (allValues?.owner_zip_code && allValues?.owner_zip_code?.length > 8) {
      getData();
    }
  }, [allValues?.owner_zip_code, setValue, allStateData]);

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
            {t["Owner&apos;s Data"]}
          </Typography>
        </Stack>
        <BaseButton
          color="error"
          sx="error"
          variant="outlined"
          handleFunction={() => {
            router.back();
          }}
        >
          {t["Cancel"]}
        </BaseButton>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        sx={{ mt: 3, mb: 2 }}
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
        {[
          { name: "Married", slug: t["Married"] },
          { name: "Single", slug: t["Single"] },
        ].map((data, index) => (
          <Button
            key={index}
            onClick={() => {
              setMaritalStatus(data?.name);
              if (data?.name === "Single") {
                setSingle(true);
                setMarried(false);
              } else {
                setMarried(true);
                setSingle(false);
              }
            }}
            sx={{
              textTransform: "none",
              padding: "3px 10px",

              borderRadius: "56px",
              ml: index === 1 ? 1 : 0,
              background: maritalStatus === data?.name ? "#0362F0" : "#F2F5F6",

              color: maritalStatus === data?.name ? "#ffffff" : "#002152",
              "&:hover": {
                background: "#0362F0",
                color: "#ffffff",
              },
            }}
          >
            {data?.slug}
          </Button>
        ))}
      </Grid>
      <Grid container sx={{ mt: 2 }}>
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
              {t["Full Name"]}
              <span style={{ color: "#E63333" }}>*</span>
            </Typography>
          </Grid>
          <Controller
            name="owner_name"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <BaseTextField
                size={"medium"}
                placeholder={`${t["Full Name"]}*`}
                // sx={{ mb: 2 }}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                name={"owner_name"}
                value={field.value}
              />
            )}
          />
          <Typography
            variant="inherit"
            color="textSecondary"
            sx={{ color: "#b91c1c" }}
          >
            {errors.owner_name?.message}
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={1} sx={{ mt: 1 }}>
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
              E-mail
              <span style={{ color: "#E63333" }}>*</span>
            </Typography>
          </Grid>
          <FormControl variant="outlined" sx={{ width: "100%" }}>
            <Controller
              name="owner_email"
              control={control}
              render={({ field }) => (
                <BaseTextField
                  placeholder={"E-mail"}
                  size={"medium"}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  name={"owner_email"}
                  value={field.value}
                  disabled={query?.property_id ? true : false}
                  // error={errors?.rg_number ? true : false}
                />
              )}
            />
            <Typography
              variant="inherit"
              color="textSecondary"
              sx={{ color: "#b91c1c" }}
            >
              {errors?.owner_email?.message}
            </Typography>
          </FormControl>
        </Grid>
      </Grid>
      <Grid spacing={1} sx={{ mt: 1 }}>
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
              Phone
            </Typography>
          </Grid>
          <Controller
            name="owner_phone"
            control={control}
            render={({ field }) => (
              <BaseOutlinedPhoneInput
                size={"large"}
                placeholder={t["Phone"]}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                name={"owner_phone"}
                value={field.value}
                error={errors.owner_phone ? true : false}
              />
            )}
          />
        </Grid>
      </Grid>
      <Grid container spacing={1} sx={{ mt: 1 }}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
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
              RG
              <span style={{ color: "#E63333" }}>*</span>
            </Typography>
          </Grid>
          <FormControl variant="outlined" sx={{ width: "100%" }}>
            <Controller
              name="owner_rg"
              control={control}
              render={({ field }) => (
                <BaseOutlinedRgInput
                  placeholder={"RG*"}
                  size={"medium"}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  name={"owner_rg"}
                  value={field.value}
                  onBlur={() => trigger("owner_rg")}

                  // error={errors?.rg_number ? true : false}
                />
              )}
            />
            <Typography
              variant="inherit"
              color="textSecondary"
              sx={{ color: "#b91c1c" }}
            >
              {errors?.owner_rg?.message}
            </Typography>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
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
              CPF
              <span style={{ color: "#E63333" }}>*</span>
            </Typography>
          </Grid>
          <FormControl variant="outlined" sx={{ width: "100%" }}>
            <Controller
              name="owner_cpf"
              control={control}
              render={({ field }) => (
                <BaseOutlinedCpfInput
                  placeholder={"CPF*"}
                  size={"medium"}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  name={"owner_cpf"}
                  value={field.value}
                  onBlur={() => trigger("owner_cpf")}

                  // error={errors.cpf_number ? true : false}
                />
              )}
            />
            <Typography
              variant="inherit"
              color="textSecondary"
              sx={{ color: "#b91c1c" }}
            >
              {errors.owner_cpf?.message}
            </Typography>
          </FormControl>
        </Grid>
      </Grid>
      {married && (
        <Box>
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
                dados do cônjuge:
              </Typography>
            </Grid>
          </Grid>
          <Grid container sx={{ mt: 2 }}>
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
                  {t["Full Name"]}
                  <span style={{ color: "#E63333" }}>*</span>
                </Typography>
              </Grid>
              <Controller
                name="owner_spouse_name"
                control={control}
                defaultValue={""}
                render={({ field }) => (
                  <BaseTextField
                    size={"medium"}
                    placeholder={`${t["Full Name"]}*`}
                    // sx={{ mb: 2 }}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                    name={"owner_spouse_name"}
                    value={field.value}
                  />
                )}
              />
              <Typography
                variant="inherit"
                color="textSecondary"
                sx={{ color: "#b91c1c" }}
              >
                {errors.owner_spouse_name?.message}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={1} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
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
                  RG
                  <span style={{ color: "#E63333" }}>*</span>
                </Typography>
              </Grid>
              <FormControl variant="outlined" sx={{ width: "100%" }}>
                <Controller
                  name="owner_spouse_rg"
                  control={control}
                  render={({ field }) => (
                    <BaseOutlinedRgInput
                      placeholder={"RG*"}
                      size={"medium"}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                      name={"owner_spouse_rg"}
                      value={field.value}
                      onBlur={() => trigger("owner_spouse_rg")}

                      // error={errors?.rg_number ? true : false}
                    />
                  )}
                />
                <Typography
                  variant="inherit"
                  color="textSecondary"
                  sx={{ color: "#b91c1c" }}
                >
                  {errors?.owner_spouse_rg?.message}
                </Typography>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
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
                  CPF
                  <span style={{ color: "#E63333" }}>*</span>
                </Typography>
              </Grid>
              <FormControl variant="outlined" sx={{ width: "100%" }}>
                <Controller
                  name="owner_spouse_cpf"
                  control={control}
                  render={({ field }) => (
                    <BaseOutlinedCpfInput
                      placeholder={"CPF*"}
                      size={"medium"}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                      name={"owner_spouse_cpf"}
                      value={field.value}
                      onBlur={() => trigger("owner_spouse_cpf")}

                      // error={errors.cpf_number ? true : false}
                    />
                  )}
                />
                <Typography
                  variant="inherit"
                  color="textSecondary"
                  sx={{ color: "#b91c1c" }}
                >
                  {errors.owner_spouse_cpf?.message}
                </Typography>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      )}
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
            Endereço:
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={1} sx={{ mt: 1 }}>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
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
              name="owner_zip_code"
              control={control}
              render={({ field }) => (
                <BaseOutlinedZipInput
                  placeholder={`${t["Zip code"]}*`}
                  size={"medium"}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  name={"owner_zip_code"}
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
              {errors.owner_zip_code?.message}
            </Typography>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
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
            name="owner_address"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <BaseTextField
                size={"medium"}
                placeholder={`${t["Address"]}*`}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                name={"owner_address"}
                value={field.value}
              />
            )}
          />
          <Typography
            variant="inherit"
            color="textSecondary"
            sx={{ color: "#b91c1c" }}
          >
            {errors.owner_address?.message}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
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
            name="owner_number"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <BaseTextField
                size={"medium"}
                placeholder={`${t["Number"]}*`}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                name={"owner_number"}
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
            {errors.owner_number?.message}
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={1} sx={{ mt: 1 }}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
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
            name="owner_neighbourhood"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <BaseTextField
                size={"medium"}
                placeholder={`${t["Neighborhood"]}*`}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                name={"owner_neighbourhood"}
                value={field.value}
              />
            )}
          />
          <Typography
            variant="inherit"
            color="textSecondary"
            sx={{ color: "#b91c1c" }}
          >
            {errors.owner_neighbourhood?.message}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
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
            name="owner_complement"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <BaseTextField
                size={"medium"}
                placeholder={t["Complement"]}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                name={"owner_complement"}
                value={field.value}
              />
            )}
          />
          <Typography
            variant="inherit"
            color="textSecondary"
            sx={{ color: "#b91c1c" }}
          >
            {errors.owner_complement?.message}
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={1} sx={{ mt: 1 }}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
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
            name="owner_city"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <BaseTextField
                size={"medium"}
                placeholder={`${t["City"]}*`}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                name={"owner_city"}
                value={field.value}
              />
            )}
          />
          <Typography
            variant="inherit"
            color="textSecondary"
            sx={{ color: "#b91c1c" }}
          >
            {errors.owner_city?.message}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
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
            name="owner_state"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <BaseAutocomplete
                //   sx={{ margin: "0.6vh 0" }}
                options={allStateData || []}
                getOptionLabel={(option) => option.name || ""}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                size={"medium"}
                placeholder={`${t["State"]}*`}
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
            {errors.owner_state?.message}
          </Typography>
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
            {t["Property ownership document"]}
            {/* {`${t["Document data"]}:`} */}
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={1} sx={{ mt: 1 }}>
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
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
              {t["documents"]}
            </Typography>
          </Grid>
          <Controller
            name="owner_documnentation"
            control={control}
            render={({ field }) => (
              <BaseAutocomplete
                //   sx={{ margin: "0.6vh 0" }}
                options={agreementType || []}
                getOptionLabel={(option) => option.label || ""}
                isOptionEqualToValue={(option, value) =>
                  option.year === value.year
                }
                size={"medium"}
                placeholder={`${t["documents"]}`}
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
            {errors.owner_documentation?.message}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
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
              {t["registry office"]}
            </Typography>
          </Grid>
          <Controller
            name="owner_registry"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <BaseTextField
                size={"medium"}
                placeholder={`${t["registry office"]}`}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                name={"owner_registry"}
                value={field.value}
              />
            )}
          />
          <Typography
            variant="inherit"
            color="textSecondary"
            sx={{ color: "#b91c1c" }}
          >
            {errors.owner_registry?.message}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
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
              {t["registration number"]}
            </Typography>
          </Grid>
          <Controller
            name="owner_registration_number"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <BaseTextField
                size={"medium"}
                placeholder={`${t["registration number"]}`}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                name={"owner_registartion_number"}
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
            {errors.owner_registration_number?.message}
          </Typography>
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
            Selected document:
          </Typography>
        </Grid>
      </Grid>
      <Box {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <Typography
          variant="p"
          sx={{
            color: "#6C7A84",
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "18px",
            mt: 1,
          }}
        >
          {t["Drag and drop documents here"]}
        </Typography>
        <Typography
          variant="p"
          sx={{
            color: "#6C7A84",
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "18px",
            mt: 1,
          }}
        >
          {t["or"]}
        </Typography>
        <Button
          variant="contained"
          sx={{
            textTransform: "none",
            mt: 1,
            background: "#0362F0",
            color: "#ffffff",
            fontSize: "14px",
            fontWeight: "600",
            lineHeight: "18px",
          }}
        >
          {t["select documents"]}
        </Button>
        <Typography
          variant="inherit"
          color="textSecondary"
          sx={{ color: "#b91c1c" }}
        >
          {errors?.document_files?.message}
        </Typography>
      </Box>
      {documents?.length > 0 && (
        <Grid container spacing={1} sx={{ mt: 3 }}>
          {documents?.map((file, index) => (
            <Grid item xs={12} sm={12} md={4} lg={3} xl={3} key={index}>
              <Box
                sx={{
                  p: 2,
                  boxSizing: "border-box",
                  border: "1px solid #DBE1E5",
                  borderRadius: "6px",
                }}
              >
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="flex-start"
                >
                  <DeleteOutlineOutlinedIcon
                    sx={{
                      background: "#F44336",
                      color: "#ffffff",
                      borderRadius: "50%",
                      height: "3vh",
                      width: "3vh",
                      paddingY: "3px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleDelete(index)}
                  />
                </Grid>

                <Typography
                  variant="p"
                  sx={{ color: "#38bdf8", fontWeight: "600" }}
                >
                  {file?.name?.slice(0, 15) || file?.title?.slice(0, 15)}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
      <Grid container sx={{ mt: 1 }}>
        <Grid item xs={12}>
          <Controller
            name="email_authorization"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    {...field}
                    checked={field.value}
                    onChange={(v) => field.onChange(v)}
                  />
                }
                label={
                  <Typography variant="p" sx={{ color: "#002152" }}>
                    {t["Send sales authorization by email"]}
                  </Typography>
                }
                labelPlacement="end"
              />
            )}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Owner;

const agreementType = [
  { label: "Matrícula", year: 1994 },
  { label: "Escritura sem registro", year: 1972 },
  { label: "Contrato de compra e venda", year: 1974 },
];
