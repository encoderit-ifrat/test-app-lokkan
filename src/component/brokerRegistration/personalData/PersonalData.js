import {
  Avatar,
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  ListItemAvatar,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import accountIcon from "../../../../public/Images/account.png";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import BaseOutlinedRgInput from "../../reuseable/baseOutlinedRgInput/BaseOutlinedRgInput";
import BaseOutlinedCpfInput from "../../reuseable/baseOutlinedCpfInput/BaseOutlinedCpfInput";
import BaseTextField from "../../reuseable/baseTextField/BaseTextField";
import { Controller } from "react-hook-form";
import BaseDateField from "../../reuseable/baseDateField/BaseDateField";
import { formatISO } from "date-fns";
import en from "locales/en";
import pt from "locales/pt";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import ListItemText from "@mui/material/ListItemText";

import { InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import { _imageURL } from "consts";
import { useGetAllReferralBrokerQuery } from "@/queries/useGetAllReferralBrokerQuery";
import { debounce } from "@/utils/debounce";
import { omitEmpties } from "@/api";
import BaseButton from "@/component/reuseable/baseButton/BaseButton";
// import useCurrentUser from "@/hooks/useCurrentUser";

import useRequiredFieldsToDisableButton from "@/hooks/useRequiredFieldsToDisableButton";
import BaseCloseButton from "@/component/reuseable/baseCloseButton/BaseCloseButton";
import triggerValidation from "@/hooks/triggerValidation";

function PersonalData({
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
  trigger,
}) {
  const [preview, setPreview] = useState();

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

  // const [disableBtn, setDisableBtn] = useState(true);
  // const requiredFields = {
  //   broker: ["full_name", "cpf_number", "rg_number", "dob", "description"],
  //   owner: ["full_name", "cpf_number", "rg_number", "dob"],
  // };
  const requiredFields =
    userRole === "broker"
      ? [
          "full_name",
          "cpf_number",
          "rg_number",
          "dob",
          "description",
          "creci_number",
        ]
      : ["full_name", "cpf_number", "rg_number", "dob"];
  const [disableBtn, setDisableBtn] = useRequiredFieldsToDisableButton(
    requiredFields,
    allValues
  );
  // async function triggerValidation() {
  //   try {
  //     const data = await Promise.all(
  //       requiredFields.map(async (field) => {
  //         try {
  //           const response = await trigger(field);
  //           return response;
  //         } catch (error) {
  //           console.error(error);
  //           return false;
  //         }
  //       })
  //     );
  //     const allTrue = data.every((result) => result === true);
  //     console.log("🟥 ~ triggerValidation ~ allTrue:", allTrue);
  //     return allTrue;
  //   } catch (error) {
  //     console.error("Error in triggerValidation:", error);
  //     return false;
  //   }
  // }
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    console.log("🟥 ~ toggleDrawer ");
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const myLoader = ({ src }) => {
    return `${_imageURL}/${src}`;
  };

  const handleSearchBroker = (e) => {
    setSearchValue(e.target.value);
    refetch({});
  };

  const debouncedHandleChangeBroker = debounce(handleSearchBroker);

  const list = (anchor) => (
    <Box
      sx={{ width: { xs: "auto", sm: "auto", md: 380 } }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mt: 2, px: 2 }}
      >
        <Typography
          variant="p"
          sx={{
            color: "#1A1859",
            fontSize: "24px",
            lineHeight: "32px",
            fontWeight: "700",
          }}
        >
          {t["Select broker"]}
        </Typography>
        <BaseCloseButton handleClose={toggleDrawer("right", false)} />
      </Grid>
      <Box sx={{ px: 2, mt: 1 }}>
        <TextField
          variant="outlined"
          placeholder={t["Search by broker name"]}
          size="small"
          onChange={debouncedHandleChangeBroker}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" aria-label="Search by broker name">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Box sx={{ px: 2 }}>
        <List
          sx={{
            width: "100%",
            bgcolor: "background.paper",
          }}
        >
          {brokerUserData?.data?.users?.data?.map((brokerInfo, index) => (
            <Box
              key={index}
              onClick={(event) => {
                setSelectedBroker(brokerInfo);
                toggleDrawer("right", false)(event);
              }}
            >
              <ListItem
                sx={{
                  background: `${
                    selectedBroker?.id === brokerInfo?.id
                      ? "#bae6fd"
                      : "#ffffff"
                  }`,
                  "&:hover": {
                    background: "#bae6fd",
                  },
                }}
              >
                <ListItemAvatar>
                  {brokerInfo?.attachments[0]?.file_path ? (
                    <Image
                      loader={myLoader}
                      src={`${brokerInfo?.attachments[0]?.file_path}`}
                      alt="brokerImahe"
                      height={50}
                      width={50}
                      style={{ borderRadius: "50px" }}
                    />
                  ) : (
                    <Avatar sx={{ height: 50, width: 50 }} />
                  )}
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: "16px",
                        fontWeight: 700,
                        lineHeight: "22px",
                        color: "#002152",
                      }}
                    >
                      {brokerInfo?.name}
                    </Typography>
                  }
                  secondary={
                    <Rating
                      name="size-large"
                      defaultValue={brokerInfo?.user_reviews_avg_rating}
                      readOnly
                    />
                  }
                />
              </ListItem>
              <Divider />
            </Box>
          ))}
        </List>
      </Box>
    </Box>
  );

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
          {t["Personal data"]}
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
              }}
            >
              {t["Full Name"]}
              <span style={{ color: "#E63333" }}>*</span>
            </Typography>
          </Grid>
          <Controller
            name="full_name"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <BaseTextField
                size={"small"}
                // placeholder={t["Full Name"]}
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
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{ mb: 1, mt: 1 }}
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
              {t["Social Name"]}
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
            name="social_name"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <BaseTextField
                size={"small"}
                // placeholder={t["Social Name"]}
                sx={{ mb: 1 }}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                value={field.value}
                name={"social_name"}
              />
            )}
          />
          {/* Description */}
          {userRole === "broker" && (
            <>
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
                  }}
                >
                  {t["Description"]}
                  <span style={{ color: "#E63333" }}>*</span>
                </Typography>
              </Grid>
              <Controller
                name="description"
                control={control}
                defaultValue={""}
                render={({ field }) => (
                  <BaseTextField
                    size={"small"}
                    // placeholder={t["Description"]}
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
            </>
          )}
          {/* Description */}
        </Grid>
      </Grid>
      <Box sx={{ mt: 3 }}>
        <Divider />
      </Box>
      <Grid container spacing={1} sx={{ mt: 3 }}>
        {userRole === "broker" && (
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
                {t["CRECI Number"]}
                <span style={{ color: "#E63333" }}>*</span>
              </Typography>
            </Grid>
            <Controller
              name="creci_number"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <BaseTextField
                  size={"small"}
                  type={"number"}
                  autoComplete={"off"}
                  // placeholder={t["CR Number"]}
                  onChange={(e) => {
                    if (e.target.value.length <= 6) {
                      field.onChange(e.target.value);
                    }
                  }}
                  value={field.value}
                  name={"creci_number"}
                  max
                  onBlur={() => trigger("creci_number")}
                />
              )}
            />
            <Typography
              variant="inherit"
              color="textSecondary"
              sx={{ color: "#b91c1c" }}
            >
              {errors?.creci_number?.message}
            </Typography>
          </Grid>
        )}
        <Grid item xs={12} sm={12} md={userRole !== "broker" ? 12 : 6}>
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
                  // placeholder={"CPF"}
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
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={1} sx={{ mt: 2 }}>
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
              RG<span style={{ color: "#E63333" }}>*</span>
            </Typography>
          </Grid>
          <FormControl
            variant="outlined"
            sx={{ width: "100%", marginBottom: 1 }}
          >
            <Controller
              name="rg_number"
              control={control}
              render={({ field }) => (
                <BaseOutlinedRgInput
                  // placeholder={"RG"}
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
          </FormControl>
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
              {t["Date of Birth"]}
              <span style={{ color: "#E63333" }}>*</span>
            </Typography>
          </Grid>
          <Controller
            name="dob"
            control={control}
            defaultValue={formatISO(new Date())}
            render={({ field }) => (
              <BaseDateField
                // placeholder={"Date of Birth"}
                size={"small"}
                onChange={(value) => {
                  field.onChange(value);
                }}
                // sx={{ mb: 1 }}
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
        </Grid>
        {userRole === "broker" && (
          <Grid container spacing={1} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={12} md={selectedBroker ? 12 : 6}>
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
                  {t["Name of broker you referred"]}
                </Typography>
              </Grid>
              {selectedBroker ? (
                <Box
                  sx={{
                    border: "1px solid #000F1A",
                    borderRadius: "4px",
                    padding: "8px 16px 8px 16px",
                  }}
                >
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ cursor: "pointer" }}
                  >
                    <List>
                      <ListItem>
                        <ListItemAvatar>
                          {selectedBroker?.attachments[0]?.file_path ? (
                            <Image
                              loader={myLoader}
                              src={`${selectedBroker?.attachments[0]?.file_path}`}
                              alt="brokerImahe"
                              height={70}
                              width={70}
                              style={{ borderRadius: "50px" }}
                            />
                          ) : (
                            <Avatar />
                          )}
                        </ListItemAvatar>
                        <ListItemText
                          sx={{ pl: 1 }}
                          primary={
                            <Typography
                              variant="body1"
                              sx={{
                                fontSize: "16px",
                                fontWeight: 700,
                                lineHeight: "22px",
                                color: "#002152",
                              }}
                            >
                              {selectedBroker?.name}
                            </Typography>
                          }
                          secondary={
                            <Rating
                              name="size-large"
                              defaultValue={
                                selectedBroker?.user_reviews_avg_rating
                              }
                              readOnly
                            />
                          }
                        />
                      </ListItem>
                    </List>
                    <BorderColorOutlinedIcon
                      onClick={toggleDrawer("right", true)}
                    />
                    <SwipeableDrawer
                      anchor={"right"}
                      open={state["right"]}
                      onClose={toggleDrawer("right", false)}
                      onOpen={toggleDrawer("right", true)}
                    >
                      {list("right")}
                    </SwipeableDrawer>
                  </Grid>
                </Box>
              ) : (
                <Box
                  sx={{
                    border: "1px solid #000F1A",
                    borderRadius: "4px",
                    padding: "8px 16px 8px 16px",
                  }}
                >
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography
                      variant="p"
                      sx={{
                        fontSize: "14px",
                        fontWeight: "400",
                        lineHeight: "24px",
                        color: "#253858",
                      }}
                    >
                      {t["Select broker"]}
                    </Typography>
                    <ArrowForwardIcon onClick={toggleDrawer("right", true)} />
                    <SwipeableDrawer
                      anchor={"right"}
                      open={state["right"]}
                      onClose={toggleDrawer("right", false)}
                      onOpen={toggleDrawer("right", true)}
                    >
                      {list("right")}
                    </SwipeableDrawer>
                  </Grid>
                </Box>
              )}
            </Grid>
          </Grid>
        )}

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
              handleFunction={async () => {
                if (await triggerValidation(requiredFields, trigger)) {
                  handleNext();
                }
              }}
              disabled={disableBtn}
              fullWidth
              sx="success"
            >
              {t["Continue"]}
            </BaseButton>
          </Grid>
        </Grid>
      </Grid>

      {/* <Button
        onClick={handleNext}
        fullWidth
        sx={{
          background: "#00C1B4",
          boxShadow: "0px 4px 34px rgba(0, 0, 0, 0.08)",
          borderRadius: "4px",
          color: "#ffffff",
          fontSize: "16px",
          lineHeight: "22px",
          fontWeight: "600",
          mt: 3,
          mb: 5,
          textTransform: "none",
          py: 1,
          "&:hover": {
            background: "#00C1B4",
            boxShadow: "0px 4px 34px rgba(0, 0, 0, 0.08)",
            borderRadius: "4px",
            color: "#ffffff",
            fontSize: "16px",
            lineHeight: "22px",
            fontWeight: "600",
            mt: 3,
            textTransform: "none",
            py: 1,
          },
        }}
      >
        Continue
      </Button> */}
    </Box>
  );
}

export default PersonalData;
