import BaseAutocomplete from "@/component/reuseable/baseAutocomplete/BaseAutocomplete";
import BaseOutlinedZipInput from "@/component/reuseable/baseOutlinedZipInput/BaseOutlinedZipInput";
import BaseTextField from "@/component/reuseable/baseTextField/BaseTextField";
import { toast } from "react-hot-toast";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import NoEncryptionOutlinedIcon from "@mui/icons-material/NoEncryptionOutlined";
import Image from "next/image";
import en from "locales/en";
import pt from "locales/pt";
import { useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import useCurrentUser from "@/hooks/useCurrentUser";
import { _baseURL, _imageURL } from "consts";
import { useUserUpdateMutation } from "@/queries/useUserQuery";
import { getAddressData, omitEmpties, userDetailsApi } from "@/api";
import { serialize } from "object-to-formdata";
import { useRouter } from "next/router";
import BaseOutlinedCpfInput from "@/component/reuseable/baseOutlinedCpfInput/BaseOutlinedCpfInput";
import BaseOutlinedRgInput from "@/component/reuseable/baseOutlinedRgInput/BaseOutlinedRgInput";
const UserUpdateForm = ({ language }) => {
  const [myValue, setMyValue] = useState(language || "pt");
  const currentUser = useCurrentUser();
  const router = useRouter();
  const myLoader = ({ src }) => {
    return `${src}`;
  };
  const allStateData = useSelector((state) => state.state.stateData);

  const goBack = () => {
    router.back();
  };

  useEffect(() => {
    setValue("user_id", currentUser?.id);
    setValue(
      "image",
      currentUser?.attachments?.length > 0
        ? `${_imageURL}/${currentUser?.attachments[0]?.file_path}`
        : ""
    );
    setValue("name", currentUser?.name);

    setValue("email", currentUser?.email);
    setValue("description", currentUser?.additional_info?.description);
    setValue("phone", currentUser?.phone);
    setValue(
      "zip_code",
      currentUser?.address?.zip_code || currentUser?.company?.zip_code
    );
    setValue(
      "address",
      currentUser?.address?.address || currentUser?.company?.address
    );
    setValue("number", currentUser?.address?.number);
    setValue(
      "neighbourhood",
      currentUser?.address?.neighbourhood || currentUser?.company?.neighbourhood
    );
    setValue("city", currentUser?.address?.city || currentUser?.company?.city);
    setValue(
      "state_id",
      currentUser?.address?.state || currentUser?.company?.state
    );
    setValue(
      "cpf_number",
      currentUser?.additional_info?.cpf || currentUser?.company?.cpf_number
    );
    setValue(
      "rg_number",
      currentUser?.additional_info?.rg || currentUser?.company?.rg_number
    );
  }, [setValue, currentUser]);
  const mutation = useUserUpdateMutation();
  const [loading, setLoading] = useState(false);
  const onSubmit = (data) => {
    console.log({ data });
    setLoading(true);
    const {
      email,
      phone,
      user_id,
      image,
      name,
      password,
      description,
      repeat_password,
      rg_number,
      cpf_number,
      ...rest
    } = data;
    const body = serialize(
      omitEmpties({
        email: email,
        // description: description,
        phone: phone,
        user_id: user_id,
        image: image instanceof File ? data?.image : null,
        name: name,
        password: password,
        password_confirmation: repeat_password,
        address: omitEmpties({
          ...rest,
          state_id: data.state_id.id,
        }),
        additional_info: { description, rg_number, cpf_number },
      }),
      {
        indices: true,
        allowEmptyArrays: false,
        booleansAsIntegers: true,
        nullsAsUndefineds: true,
      }
    );
    mutation.mutate(body, {
      onError(error) {
        setLoading(false);
        toast.error("opa! algo deu errado");
      },
      onSuccess: async (data) => {
        await userDetailsApi();
        setLoading(false);
        toast.success("User profile updated successfully");
      },
    });
  };
  const userRole = currentUser?.roles ? currentUser?.roles[0]?.slug : null;
  const t = myValue === "en" ? en : pt;

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t["Name is required"]),
    phone: Yup.string().required(t["Phone is required"]),
    password: Yup.mixed().test(
      "is-long-enough",
      "Password must be at least 6 characters long",
      function (value) {
        if (!value) return true; // Return true if the password is empty (optional)
        return value.length >= 6; // Otherwise, check if the password is at least 6 characters long
      }
    ),
    repeat_password: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
    zip_code: Yup.string().required(t["Zip code number is required"]),
    address: Yup.string().required(t["Address is required"]),
    description:
      userRole == "broker" &&
      Yup.string().required(t["Description is required"]),
    // description: Yup.string().optional(),

    number: Yup.string().required(t["Number is required"]),
    neighbourhood: Yup.string().required(t["Neighbourhood is required"]),
    state_id: Yup.mixed()
      .test(
        "is-object",
        "State is required",
        (value) => value !== null && typeof value === "object"
      )
      .required(t["State is required"]),
    city: Yup.string().required(t["City is required"]),
    email: Yup.string()
      .required(t["Email is required"])
      .matches(/.+@.+\.[A-Za-z]+$/, t["Email is invalid"]),
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
  });
  const {
    watch,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  console.log("🟥 ~ UserUpdateForm ~ errors:", errors);
  const allValues = watch();
  console.log("🟥 ~ UserUpdateForm ~ allValues:", allValues);
  const [showPass, setShowPass] = useState(false);
  const [showRepeatPass, setShowRepeatPass] = useState(false);

  const handleClickShowPassword = () => {
    setShowPass(!showPass);
  };

  const handleClickShowRepeatPassword = () => {
    setShowRepeatPass(!showRepeatPass);
  };

  useEffect(() => {
    const getData = async () => {
      const [error, response] = await getAddressData(allValues?.zip_code);
      if (error) {
        setValue("address", "");
        setValue("neighbourhood", "");
        setValue("add_on", "");
        setValue("city", "");
        setValue("state_id", "");
      } else {
        setValue("address", response?.data?.logradouro);
        setValue("neighbourhood", response?.data?.bairro);
        setValue("add_on", response?.data?.complemento);
        setValue("city", response?.data?.localidade);
        setValue(
          "state_id",
          allStateData?.find((data) => data?.uf === response?.data?.uf)
        );
      }
    };
    if (allValues?.zip_code && allValues?.zip_code?.length > 8) {
      getData();
    }
  }, [allValues?.zip_code, setValue, allStateData]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        spacing={2}
        sx={{
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "32px 24px",
          mt: 1,
        }}
      >
        <Grid item xs={12} lg={2}>
          <Box
            component="div"
            sx={{
              borderRadius: "6px",
              padding: "40px 0",
              backgroundColor: "#ECF0F3",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box>
              {allValues?.image == "" ? (
                <Avatar sx={{ width: 100, height: 100 }} />
              ) : (
                <Image
                  loader={myLoader}
                  src={
                    allValues.image instanceof File
                      ? URL.createObjectURL(allValues?.image)
                      : allValues.image
                  }
                  alt="account"
                  width={100}
                  height={100}
                  style={{
                    borderRadius: 1111,
                  }}
                  objectFit="cover"
                />
              )}
            </Box>
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
              {t["Edit"]}
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
          </Box>
        </Grid>

        <Grid item xs={12} lg={10}>
          <Grid item xs={12}>
            <Controller
              name="name"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <BaseTextField
                  size={"medium"}
                  placeholder={t["Name"]}
                  label={t["Name"]}
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
          {/* Description */}
          {userRole == "broker" && (
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <Grid item xs={12}>
                  <Controller
                    name="description"
                    control={control}
                    defaultValue={""}
                    render={({ field }) => (
                      <BaseTextField
                        size={"medium"}
                        placeholder={t["Description"]}
                        label={t["Description"]}
                        // sx={{ mb: 2 }}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                        }}
                        name={"Description"}
                        value={field.value}
                        multiline
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
            </Grid>
          )}

          {/* Description */}
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <Controller
                name="email"
                control={control}
                defaultValue={""}
                render={({ field }) => (
                  <BaseTextField
                    size={"medium"}
                    placeholder={t["Email"]}
                    label={t["Email"]}
                    disabled={true}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                    name={"email"}
                    value={field.value}
                    // error={errors.email ? true : false}
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
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="phone"
                control={control}
                defaultValue={""}
                render={({ field }) => (
                  <BaseTextField
                    size={"medium"}
                    placeholder={t["Telephone"]}
                    label={t["Telephone"]}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                    name={"phone"}
                    value={field.value}
                    // error={errors.telephone ? true : false}
                  />
                )}
              />
              <Typography
                variant="inherit"
                color="textSecondary"
                sx={{ color: "#b91c1c" }}
              >
                {errors.phone?.message}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <BaseTextField
                    size={"medium"}
                    placeholder={t["Password"]}
                    label={t["Password"]}
                    type={showPass ? "text" : "password"}
                    name={"password"}
                    autoComplete={"new-password"}
                    // helperText="Password Must be 6 characters long"
                    // {...field}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                    // value={field.value}
                    error={errors.password ? true : false}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment
                          sx={{ cursor: "pointer" }}
                          position="end"
                          onClick={handleClickShowPassword}
                        >
                          {showPass ? (
                            <NoEncryptionOutlinedIcon />
                          ) : (
                            <LockOutlinedIcon />
                          )}
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.password?.message}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="repeat_password"
                control={control}
                render={({ field }) => (
                  <BaseTextField
                    size={"medium"}
                    placeholder={t["repeat password"]}
                    label={t["repeat password"]}
                    type={showRepeatPass ? "text" : "password"}
                    name={"password"}
                    // {...field}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                    // value={field.value}
                    error={errors.repeat_password ? true : false}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment
                          sx={{ cursor: "pointer" }}
                          position="end"
                          onClick={handleClickShowRepeatPassword}
                        >
                          {showRepeatPass ? (
                            <NoEncryptionOutlinedIcon />
                          ) : (
                            <LockOutlinedIcon />
                          )}
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.repeat_password?.message}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <FormControl variant="outlined" sx={{ width: "100%" }}>
                <Controller
                  name="zip_code"
                  control={control}
                  defaultValue={""}
                  render={({ field }) => (
                    <BaseOutlinedZipInput
                      placeholder={`${t["Zip code"]}*`}
                      // label={`${t["Zip code"]}*`} //! white color
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
            <Grid item xs={12} md={6}>
              <Controller
                name="address"
                control={control}
                defaultValue={""}
                render={({ field }) => (
                  <BaseTextField
                    size={"medium"}
                    placeholder={`${t["Address"]}*`}
                    label={`${t["Address"]}*`}
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
          </Grid>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <Controller
                name="neighbourhood"
                control={control}
                defaultValue={""}
                render={({ field }) => (
                  <BaseTextField
                    size={"medium"}
                    placeholder={`${t["Neighborhood"]}*`}
                    label={`${t["Neighborhood"]}*`}
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
            <Grid item xs={12} md={6}>
              <Controller
                name="number"
                control={control}
                defaultValue={""}
                render={({ field }) => (
                  <BaseTextField
                    size={"medium"}
                    placeholder={`${t["Number"]}*`}
                    label={`${t["Number"]}*`}
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
            {/* <Grid item xs={12} md={6}>
              <Controller
                name="complement"
                control={control}
                defaultValue={""}
                render={({ field }) => (
                  <BaseTextField
                    size={"medium"}
                    placeholder={t["Complement"]}
                    label={t["Complement"]}
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
            </Grid> */}
          </Grid>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <Controller
                name="city"
                control={control}
                defaultValue={""}
                render={({ field }) => (
                  <BaseTextField
                    size={"medium"}
                    placeholder={`${t["City"]}*`}
                    label={`${t["City"]}*`}
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
            <Grid item xs={12} md={6}>
              <Controller
                name="state_id"
                control={control}
                defaultValue={""}
                render={({ field }) => (
                  <BaseAutocomplete
                    //   sx={{ margin: "0.6vh 0" }}
                    options={allStateData || []}
                    getOptionLabel={(option) => option.name || ""}
                    isOptionEqualToValue={(option, value) => {
                      return option.id === value.id;
                    }}
                    size={"medium"}
                    placeholder={`${t["State"]}*`}
                    label={`${t["State"]}*`}
                    onChange={(e, v, r, d) => {
                      console.log("🟥 ~ UserUpdateForm ~ v:", v);

                      field.onChange(v);
                    }}
                    value={field.value || null}
                  />
                )}
              />
              <Typography
                variant="inherit"
                color="textSecondary"
                sx={{ color: "#b91c1c" }}
              >
                {errors.state_id?.message}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
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
                  CPF<span style={{ color: "#E63333" }}>*</span>
                </Typography>
              </Grid>
              <FormControl variant="outlined" sx={{ width: "100%" }}>
                <Controller
                  name="cpf_number"
                  control={control}
                  render={({ field }) => (
                    <BaseOutlinedCpfInput
                      placeholder={"CPF"}
                      // size={"small"}
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
              </FormControl>
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

          <Grid
            container
            sx={{
              pt: 2,
              ml: { lg: "auto" },
              width: {
                xs: "100%",
                lg: "fit-content",
              },
            }}
            spacing={1}
          >
            <Grid item xs={12} md={6}>
              <Button
                color="inherit"
                fullWidth
                sx={{
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
                onClick={goBack}
              >
                {t["Cancel"]}
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                color="inherit"
                type="submit"
                fullWidth
                sx={{
                  background: "#34BE84",
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
                    background: "#34BE84",
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
                {loading && <CircularProgress size={22} color="inherit" />}
                {!loading && t["Save"]}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default UserUpdateForm;
