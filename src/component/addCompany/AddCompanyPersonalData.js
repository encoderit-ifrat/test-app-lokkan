import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  ListItemAvatar,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import accountIcon from "../../../public/Images/account.png";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import BaseOutlinedRgInput from "@/component/reuseable/baseOutlinedRgInput/BaseOutlinedRgInput";
import BaseOutlinedCpfInput from "@/component/reuseable/baseOutlinedCpfInput/BaseOutlinedCpfInput";
import BaseTextField from "@/component/reuseable/baseTextField/BaseTextField";
import { Controller } from "react-hook-form";
import BaseDateField from "@/component/reuseable/baseDateField/BaseDateField";
import { formatISO } from "date-fns";
import en from "locales/en";
import pt from "locales/pt";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import ListItemText from "@mui/material/ListItemText";

import { InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { _imageURL } from "consts";
import { useGetAllReferralBrokerQuery } from "@/queries/useGetAllReferralBrokerQuery";
import { debounce } from "@/utils/debounce";
import { omitEmpties } from "@/api";
import BaseButton from "@/component/reuseable/baseButton/BaseButton";
// import useCurrentUser from "@/hooks/useCurrentUser";

import useRequiredFieldsToDisableButton from "@/hooks/useRequiredFieldsToDisableButton";

function AddCompanyPersonalData({
  handleNext,
  control,
  errors,
  allValues,
  languageName,
  selectedBroker,
  setSelectedBroker,
  activeStep,
  reset,
  replace,
  // addPerson,
  // setAddPerson,
  addType,
  setAddType,
  trigger,
}) {
  console.log("🟥 ~ control:", control);
  const [preview, setPreview] = useState();
  // const [addPerson, setAddPerson] = useState("Physical person");
  // const [addType, setAddType] = useState("Car");

  const t = languageName === "en" ? en : pt;
  // const currentUser = useCurrentUser();

  const userRole = localStorage.getItem("user_role");

  const [searchValue, setSearchValue] = useState(null);

  const {
    data: brokerUserData,
    isLoading: brokerLoading,
    refetch,
    isFetched,
    isFetching,
  } = useGetAllReferralBrokerQuery(
    omitEmpties({
      user_type: userRole === "broker" ? "broker" : null,
      status: "active",
      name: searchValue,
    })
  );

  useEffect(() => {
    if (searchValue !== null) {
      refetch();
    }
  }, [searchValue, refetch]);

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!allValues.image) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(allValues.image);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [allValues.image]);

  const myLoader = ({ src }) => {
    return `${_imageURL}/${src}`;
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Stack
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
          {t["Personal data"]}
        </Typography>
        <BaseButton
          type="button"
          variant="outlined"
          color="error"
          sx="error"
          handleFunction={() => {
            reset();
            replace("/my-properties");
          }}
        >
          {t["Cancel"]}
        </BaseButton>
      </Stack>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{
          mt: 4,
        }}
      >
        <Stack
          spacing={1}
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Typography
            variant="p"
            sx={{
              color: "#002152",
              fontSize: "16px",
              fontWeight: "400",
              lineHeight: "22px",
            }}
          >
            {`${t["Ad type"]}:`}
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Grid container spacing={1}>
              {[
                { name: "car", slug: t["Car"] },
                { name: "construction", slug: t["Construction"] },
              ].map((data, index) => (
                <Grid item xs={6} key={index}>
                  <Button
                    onClick={() => setAddType(data?.name)}
                    sx={{
                      width: "100%",
                      background:
                        addType === data?.name ? "#0362F0" : "#F2F5F6",

                      borderRadius: "152px",
                      color: addType === data?.name ? "#ffffff" : "#002152",

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
                      px: { xs: 0, sm: 2, md: 2, lg: 2, xl: 2 },
                      py: 1,
                      "&:hover": {
                        width: "100%",
                        background: "#0362F0",
                        borderRadius: "152px",
                        color: "#ffffff",
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
                        px: {
                          xs: 0,
                          sm: 2,
                          md: 2,
                          lg: 2,
                          xl: 2,
                        },
                        py: 1,
                      },
                    }}
                  >
                    {data?.slug}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Stack>

        {/* <Stack
          spacing={1}
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Typography
            variant="p"
            sx={{
              color: "#002152",
              fontSize: "16px",
              fontWeight: "400",
              lineHeight: "22px",
            }}
          >
            {`${t["profile"]}:`}
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Grid container spacing={1}>
              {[
                { name: "Physical person", slug: t["Physical person"] },
                { name: "Legal person", slug: t["Legal person"] },
              ].map((data, index) => (
                <Grid item xs={6} key={index}>
                  <Button
                    onClick={() => {
                      reset();
                      setAddPerson(data?.name);
                    }}
                    sx={{
                      textWrap: "nowrap",
                      width: "100%",
                      background:
                        addPerson == data?.name ? "#0362F0" : "#F2F5F6",

                      borderRadius: "152px",
                      color: addPerson == data?.name ? "#ffffff" : "#002152",
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
                      px: { xs: 0, sm: 2, md: 2, lg: 2, xl: 2 },
                      py: 1,
                      "&:hover": {
                        width: "100%",
                        background: "#0362F0",
                        borderRadius: "152px",
                        color: "#ffffff",
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
                        px: {
                          xs: 0,
                          sm: 2,
                          md: 2,
                          lg: 2,
                          xl: 2,
                        },
                        py: 1,
                      },
                    }}
                  >
                    {data?.slug}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Stack> */}
      </Stack>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={12} md={3}>
          <Box
            sx={{
              border: "1px dashed #DBE1E5",
              background: "#F2F5F6",
              borderRadius: "4px",
              pt: 3,
            }}
          >
            <Box>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <Box>
                  <Image
                    src={preview != null ? preview : accountIcon}
                    alt="account"
                    width={50}
                    height={50}
                  />
                </Box>
                <Typography
                  variant="p"
                  sx={{
                    color: "#6C7A84",
                    fontSize: "14px",
                    fontWeight: "400",
                    lineHeight: "18px",
                  }}
                >
                  {t["Profile picture"]}
                </Typography>

                <Button
                  variant="contained"
                  component="label"
                  sx={{
                    mt: 3,
                    background: "#0362F0",
                    borderRadius: "4px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#ffffff",
                    lineHeight: "18px",
                    textTransform: "none",
                    "&: hover": {
                      background: "#0362F0",
                      borderRadius: "4px",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#ffffff",
                    },
                  }}
                >
                  {t["Select"]}
                  <Controller
                    name="image"
                    control={control}
                    render={({ field }) => {
                      return (
                        <input
                          name="image"
                          hidden
                          accept="image/*"
                          type="file"
                          // value={field.value}
                          onChange={(e) => {
                            field.onChange(e.target.files[0]);
                          }}
                        />
                      );
                    }}
                  />
                </Button>
              </Grid>
              <Typography
                variant="inherit"
                color="textSecondary"
                sx={{ color: "#b91c1c", mt: 4.5 }}
              >
                {errors.image?.message}
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={9}>
          {/* {addPerson == "Physical person" ? (
            <Stack direction={"column"} spacing={2}>
              
              <Stack direction={"column"} spacing={1}>
                <Typography
                  variant="p"
                  sx={{
                    color: "#253858",
                    fontSize: "14px",
                    fontWeight: "400",
                    lineHeight: "16px",
                  }}
                >
                  {t["Full Name"]}
                  <span style={{ color: "#E63333" }}>*</span>
                </Typography>
                <Controller
                  name="full_name"
                  control={control}
                  defaultValue={""}
                  render={({ field }) => (
                    <BaseTextField
                      size={"small"}
                      placeholder={t["Full Name"]}
                      // sx={{ mb: 2 }}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                      name={"full_name"}
                      value={field.value}
                    />
                  )}
                />
                <Typography
                  variant="inherit"
                  color="textSecondary"
                  sx={{ color: "#b91c1c" }}
                >
                  {errors.full_name?.message}
                </Typography>
              </Stack>
              
              <Stack direction={"column"} spacing={1}>
                <Typography
                  variant="p"
                  sx={{
                    color: "#253858",
                    fontSize: "14px",
                    fontWeight: "400",
                    lineHeight: "16px",
                  }}
                >
                  {t["Date of Birth"]}
                  <span style={{ color: "#E63333" }}>*</span>
                </Typography>
                <Controller
                  name="dob"
                  control={control}
                  defaultValue={formatISO(new Date())}
                  render={({ field }) => (
                    <BaseDateField
                      placeholder={"Date of Birth"}
                      size={"small"}
                      onChange={(value) => {
                        field.onChange(value);
                      }}
                      sx={{ width: "100%" }}
                      name={"dob"}
                      value={field.value}

                      // error={errors.dob ? true : false}
                    />
                  )}
                />
                <Typography
                  variant="inherit"
                  color="textSecondary"
                  sx={{ color: "#b91c1c" }}
                >
                  {errors?.dob?.message}
                </Typography>
              </Stack>
            
              <Stack direction={"column"} spacing={1}>
                <Typography
                  variant="p"
                  sx={{
                    color: "#253858",
                    fontSize: "14px",
                    fontWeight: "400",
                    lineHeight: "16px",
                  }}
                >
                  {t["Description"]}
                  <span style={{ color: "#E63333" }}>*</span>
                </Typography>
                <Controller
                  name="description"
                  control={control}
                  defaultValue={""}
                  render={({ field }) => (
                    <BaseTextField
                      size={"small"}
                      placeholder={t["Description"]}
                      // sx={{ mb: 2 }}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                      name={"description"}
                      value={field.value}
                      multiline={true}
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
              </Stack>
           
            </Stack>
          ) : (
            <Stack direction={"column"} spacing={2}>
            
              <Stack direction={"column"} spacing={1}>
                <Typography
                  variant="p"
                  sx={{
                    color: "#253858",
                    fontSize: "14px",
                    fontWeight: "400",
                    lineHeight: "16px",
                  }}
                >
                  {t["State registration"]}
                  <span style={{ color: "#E63333" }}>*</span>
                </Typography>
                <Controller
                  name="state_registration"
                  control={control}
                  defaultValue={""}
                  render={({ field }) => (
                    <BaseTextField
                      size={"small"}
                      placeholder={t["State registration"]}
                      // sx={{ mb: 2 }}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                      name={"state_registration"}
                      value={field.value}
                    />
                  )}
                />
                <Typography
                  variant="inherit"
                  color="textSecondary"
                  sx={{ color: "#b91c1c" }}
                >
                  {errors.state_registration?.message}
                </Typography>
              </Stack>
            
              <Stack direction={"column"} spacing={1}>
                <Typography
                  variant="p"
                  sx={{
                    color: "#253858",
                    fontSize: "14px",
                    fontWeight: "400",
                    lineHeight: "16px",
                  }}
                >
                
                  CNPJ
                  <span style={{ color: "#E63333" }}>*</span>
                </Typography>
                <Controller
                  name="cnpj"
                  control={control}
                  defaultValue={""}
                  render={({ field }) => (
                    <BaseTextField
                      size={"small"}
                      placeholder={t["CNPJ"]}
                      // sx={{ mb: 2 }}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                      name={"cnpj"}
                      value={field.value}
                    />
                  )}
                />
                <Typography
                  variant="inherit"
                  color="textSecondary"
                  sx={{ color: "#b91c1c" }}
                >
                  {errors.cnpj?.message}
                </Typography>
              </Stack>
             
              <Stack direction={"column"} spacing={1}>
                <Typography
                  variant="p"
                  sx={{
                    color: "#253858",
                    fontSize: "14px",
                    fontWeight: "400",
                    lineHeight: "16px",
                  }}
                >
                  {t["Corporate reason"]}
                  <span style={{ color: "#E63333" }}>*</span>
                </Typography>
                <Controller
                  name="corporate_reason"
                  control={control}
                  defaultValue={""}
                  render={({ field }) => (
                    <BaseTextField
                      size={"small"}
                      placeholder={t["Corporate reason"]}
                      // sx={{ mb: 2 }}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                      name={"corporate_reason"}
                      value={field.value}
                    />
                  )}
                />
                <Typography
                  variant="inherit"
                  color="textSecondary"
                  sx={{ color: "#b91c1c" }}
                >
                  {errors.corporate_reason?.message}
                </Typography>
              </Stack>
             
            </Stack>
          )} */}
          <Stack direction={"column"} spacing={2}>
            {/* state_registration */}
            <Stack direction={"column"} spacing={1}>
              <Typography
                variant="p"
                sx={{
                  color: "#253858",
                  fontSize: "14px",
                  fontWeight: "400",
                  lineHeight: "16px",
                }}
              >
                {t["State registration"]}
                <span style={{ color: "#E63333" }}>*</span>
              </Typography>
              <Controller
                name="state_registration"
                control={control}
                defaultValue={""}
                render={({ field }) => (
                  <BaseTextField
                    size={"small"}
                    placeholder={t["State registration"]}
                    // sx={{ mb: 2 }}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                    name={"state_registration"}
                    value={field.value}
                  />
                )}
              />
              <Typography
                variant="inherit"
                color="textSecondary"
                sx={{ color: "#b91c1c" }}
              >
                {errors.state_registration?.message}
              </Typography>
            </Stack>
            {/* state_registration */}

            {/* CNPJ */}
            <Stack direction={"column"} spacing={1}>
              <Typography
                variant="p"
                sx={{
                  color: "#253858",
                  fontSize: "14px",
                  fontWeight: "400",
                  lineHeight: "16px",
                }}
              >
                {/* {t["State registration"]} */}
                CNPJ
                <span style={{ color: "#E63333" }}>*</span>
              </Typography>
              <Controller
                name="cnpj"
                control={control}
                defaultValue={""}
                render={({ field }) => (
                  <BaseTextField
                    size={"small"}
                    placeholder={"CNPJ"}
                    // sx={{ mb: 2 }}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                    name={"cnpj"}
                    value={field.value}
                  />
                )}
              />
              <Typography
                variant="inherit"
                color="textSecondary"
                sx={{ color: "#b91c1c" }}
              >
                {errors.cnpj?.message}
              </Typography>
            </Stack>
            {/* CNPJ */}

            {/* Corporate reason */}
            <Stack direction={"column"} spacing={1}>
              <Typography
                variant="p"
                sx={{
                  color: "#253858",
                  fontSize: "14px",
                  fontWeight: "400",
                  lineHeight: "16px",
                }}
              >
                {t["Corporate reason"]}
                <span style={{ color: "#E63333" }}>*</span>
              </Typography>
              <Controller
                name="corporate_reason"
                control={control}
                defaultValue={""}
                render={({ field }) => (
                  <BaseTextField
                    size={"small"}
                    placeholder={t["Corporate reason"]}
                    // sx={{ mb: 2 }}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                    name={"corporate_reason"}
                    value={field.value}
                  />
                )}
              />
              <Typography
                variant="inherit"
                color="textSecondary"
                sx={{ color: "#b91c1c" }}
              >
                {errors.corporate_reason?.message}
              </Typography>
            </Stack>
            {/* Corporate reason */}
          </Stack>
        </Grid>
      </Grid>
      <Divider sx={{ mt: 3 }} />
      <Grid container spacing={1} sx={{ mt: 3 }}>
        {/* {addPerson != "Physical person" && (
          <Grid item xs={12}>
           
            <Stack direction={"column"} spacing={1}>
              <Typography
                variant="p"
                sx={{
                  color: "#253858",
                  fontSize: "14px",
                  fontWeight: "400",
                  lineHeight: "16px",
                }}
              >
                {t["Full Name"]}
                <span style={{ color: "#E63333" }}>*</span>
              </Typography>
              <Controller
                name="full_name"
                control={control}
                defaultValue={""}
                render={({ field }) => (
                  <BaseTextField
                    size={"small"}
                    placeholder={t["Full Name"]}
                    // sx={{ mb: 2 }}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                    name={"full_name"}
                    value={field.value}
                  />
                )}
              />
              <Typography
                variant="inherit"
                color="textSecondary"
                sx={{ color: "#b91c1c" }}
              >
                {errors.full_name?.message}
              </Typography>
            </Stack>
           
          </Grid>
        )} */}
        <Grid item xs={12}>
          <Stack direction={"column"} spacing={1}>
            <Typography
              variant="p"
              sx={{
                color: "#253858",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "16px",
              }}
            >
              {t["Full Name"]}
              <span style={{ color: "#E63333" }}>*</span>
            </Typography>
            <Controller
              name="name"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <BaseTextField
                  size={"small"}
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
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack direction={"column"} spacing={1}>
            <Typography
              variant="p"
              sx={{
                color: "#253858",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "16px",
              }}
            >
              {t["Email"]}
              <span style={{ color: "#E63333" }}>*</span>
            </Typography>
            <Controller
              name="email"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <BaseTextField
                  size={"small"}
                  placeholder={t["Email"]}
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
              {errors.email?.message}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack direction={"column"} spacing={1}>
            <Typography
              variant="p"
              sx={{
                color: "#253858",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "16px",
              }}
            >
              CPF<span style={{ color: "#E63333" }}>*</span>
            </Typography>
            <Controller
              name="cpf_number"
              control={control}
              render={({ field }) => (
                <BaseOutlinedCpfInput
                  placeholder={"CPF"}
                  size={"small"}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  name={"cpf_number"}
                  value={field.value}
                  onBlur={() => trigger("cpf_number")}
                  // error={errors.cpf_number ? true : false}
                />
              )}
            />
            <Typography
              variant="inherit"
              color="textSecondary"
              sx={{ color: "#b91c1c" }}
            >
              {errors.cpf_number?.message}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack direction={"column"} spacing={1}>
            <Typography
              variant="p"
              sx={{
                color: "#253858",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "16px",
              }}
            >
              RG<span style={{ color: "#E63333" }}>*</span>
            </Typography>
            <Controller
              name="rg_number"
              control={control}
              render={({ field }) => (
                <BaseOutlinedRgInput
                  placeholder={"RG"}
                  size={"small"}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  name={"RG_number"}
                  value={field.value}
                  onBlur={() => trigger("rg_number")}

                  // error={errors?.rg_number ? true : false}
                />
              )}
            />
            <Typography
              variant="inherit"
              color="textSecondary"
              sx={{ color: "#b91c1c" }}
            >
              {errors?.rg_number?.message}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
      {/* <Grid container spacing={1} sx={{ mt: 2 }}>
        <Grid container spacing={1} sx={{ mt: 2, mb: 5 }}>
          <Grid item xs={3} sx={{ ml: "auto" }}>
            <BaseButton
              disabled={activeStep === 0}
              custom_sx={{
                background: "#ffffff",
                px: 2,
                py: 1,
                color: "#4B4B66",
                fontSize: "16px",
                fontWeight: "600",
                lineHeight: "22px",
                textTransform: "none",
              }}
            >
              {t["Come back"]}
            </BaseButton>
          </Grid>
          <Grid item xs={3}>
            <BaseButton
              handleFunction={handleNext}
              // disabled={disableBtn}
              fullWidth
              sx="success"
            >
              {t["Continue"]}
            </BaseButton>
          </Grid>
        </Grid>
      </Grid> */}
    </Box>
  );
}

export default AddCompanyPersonalData;
