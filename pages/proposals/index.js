import dynamic from "next/dynamic";
import Head from "next/head";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
const ResponsiveDrawer = dynamic(() =>
  import("@/component/sharedProposal/ResponsiveDrawer/ResponsiveDrawer")
);
import {
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  LinearProgress,
  Slider,
  SwipeableDrawer,
  TextField,
} from "@mui/material";
import { useState } from "react";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
const Pendants = dynamic(() =>
  import("@/component/proposals/pendants/Pendants")
);
const Accepted = dynamic(() =>
  import("@/component/proposals/accepted/Accepted")
);
const Completed = dynamic(() =>
  import("@/component/proposals/completed/Completed")
);
import { getSession, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findProposalCountData } from "../../src/redux/proposalCount/actions";
import en from "locales/en";
import pt from "locales/pt";
import { useRouter } from "next/router";
import NotificationContent from "@/component/notificationContent/NotificationContent";
import { useGetProposalCountQuery } from "@/queries/useGetProposalCountQuery";
import useParams from "@/hooks/useParams";
import { omitEmpties } from "@/api";
import { useForm, Controller } from "react-hook-form";
import SearchIcon from "@mui/icons-material/Search";
import BaseOutlinedCurrencyInput from "@/component/reuseable/baseOutlinedCurrencyInput/BaseOutlinedCurrencyInput";
import BaseOutlinedAreaInput from "@/component/reuseable/baseOutlinedAreaInput/BaseOutlinedAreaInput";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { findPropertyTypeData } from "@/redux/propertyType/actions";
import { findFeatureData } from "@/redux/features/actions";
import { useQueryClient } from "@tanstack/react-query";
import BaseCloseButton from "@/component/reuseable/baseCloseButton/BaseCloseButton";

const drawerWidth = 240;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function valuetext(value) {
  return `${value}°C`;
}

export default function Proposals({ language }) {
  const router = useRouter();
  const { query } = router;
  const { data: session } = useSession();
  const dispatch = useDispatch();

  const {
    register,
    watch,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = useForm();

  const allValues = watch();

  const [myValue, setMyValue] = useState(language || "pt");

  const t = myValue === "en" ? en : pt;
  const [searchValue, setSearchValue] = useState(null);
  const [type, setType] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [furnished, setFurnished] = useState("");
  const [pets, setPets] = useState("");
  const [closeToTheMetro, setCloseToTheMetro] = useState("");
  const [availability, setAvailability] = useState("");
  const [featuretypes, setFeatureTypes] = useState([]);
  const [valueSlider, setValueSlider] = useState([22, 5000000]);
  const [areaSlider, setAreaSlider] = useState([20, 370000]);
  const [relevantValue, setRelevantValue] = useState("");
  const [proposalStatus, setProposalStatus] = useState("");
  const [journeyStage, setJourneyStage] = useState("");

  useEffect(() => {
    dispatch(findPropertyTypeData());
    dispatch(findFeatureData());
  }, [dispatch]);

  const propertyType = useSelector(
    (state) => state.propertyType.propertyTypeData
  );
  const featureData = useSelector((state) => state.feature.featureData);

  const onSubmit = async (data) => {
    const allFilterData = {
      ...data,
      type: type,
      bedroom: bedrooms,
      bathroom: bathrooms,
      furnish: furnished,
      pets: pets,
      metro: closeToTheMetro,
      tag: featuretypes,
      proposal_status: proposalStatus,
      journey_stage: journeyStage,
      status: "approved",
    };
    const filteredData = omitEmpties(allFilterData);

    // Update the URL query parameters
    router.push({
      query: filteredData,
    });
    toggleDrawer("left", false)();
  };

  const {
    data,
    isLoading: countLoading,
    refetch: loadingRefetch,
    isFetching,
    isFetched,
  } = useGetProposalCountQuery();
  const proposalCountData = data?.data;

  const [value, setValueType] = useState(
    query?.proposal_status === "completed"
      ? 2
      : query?.proposal_status === "accepted"
      ? 1
      : 0
  );

  const { setParams } = useParams();

  const handleChange = (event, newValue) => {
    setValueSlider(newValue);
    setValue("min_value", newValue[0]);
    setValue("max_value", newValue[1]);
  };

  const handleAreaChange = (event, newValue) => {
    setAreaSlider(newValue);
    setValue("min_area", newValue[0]);
    setValue("max_area", newValue[1]);
  };

  const handleChangeValue = (event, newValue) => {
    setValueType(newValue);
    setParams(
      omitEmpties({
        proposal_status:
          newValue === 1
            ? "accepted"
            : newValue === 2
            ? "completed"
            : "pending",
        status: "approved",
        page: 1,
        per_page: 9,
      })
    );
    loadingRefetch();
  };

  useEffect(() => {
    if (query?.proposal_status === "accepted") {
      setValueType(1);
    } else if (query?.proposal_status === "completed") {
      setValueType(2);
    } else {
      setValueType(0);
    }
  }, [query]);

  const handleCancelFilter = () => {
    setJourneyStage("");
    setProposalStatus("");
    router.replace({
      query: omitEmpties({
        proposal_status: "pending",
        status: "approved",
        page: 1,
        per_page: 9,
      }),
    });
  };

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: { xs: "auto", sm: "auto", md: 450 } }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
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
            {t["filters"]}
          </Typography>
          <BaseCloseButton handleClose={toggleDrawer(anchor, false)} />
        </Grid>

        <Box sx={{ mx: 2, mt: 3 }}>
          <Box sx={{ mt: 1, mb: 1 }}>
            <Controller
              name="all"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  placeholder="Pesquisar"
                  size="small"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          aria-label="Search by broker name"
                        >
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
            <Typography
              variant="p"
              sx={{
                color: "#6C7A84",
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "18px",
              }}
            >
              {t["You can search by broker,development or condominium"]}
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="p"
              sx={{
                color: "#4B4B66",
                fontSize: "16px",
                fontWeight: "400",
                lineHeight: "19px",
              }}
            >
              {t["Proposal Status"]}
            </Typography>

            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
              gap={1}
              sx={{ mt: 2 }}
            >
              {[
                { name: "pending", slug: "Pending" },
                { name: "accepted", slug: "Accepted" },
              ].map((data, index) => (
                // <Grid xs={6} sm={6} md={6} lg={3} xl={3} key={index}>
                <Button
                  key={index}
                  onClick={() => setProposalStatus(data?.name)}
                  sx={{
                    background: `${
                      data?.name === proposalStatus ? "#7450F0" : "transparent"
                    }`,
                    borderRadius: "56px",
                    // width: "100%",
                    color: `${
                      data?.name === proposalStatus ? "#ffffff" : "#32414C"
                    }`,
                    border: `${
                      data?.name === proposalStatus ? "" : "1px solid #9FAAB1"
                    }`,
                    ml: 0.5,
                    fontSize: {
                      xs: "12px",
                      sm: "13px",
                      md: "14px",
                      lg: "13px",
                      xl: "14px",
                    },
                    fontWeight: "400",
                    lineHeight: "17px",
                    textTransform: "none",
                    px: { xs: 0, sm: 1, md: 1, lg: 1, xl: 1 },
                    py: 1,
                    "&:hover": {
                      background: "#7450F0",
                      borderRadius: "56px",
                      color: "#ffffff",
                    },
                  }}
                >
                  {data?.slug}
                </Button>
              ))}
            </Grid>
          </Box>
          <Divider sx={{ mt: 1, mb: 1 }} />
          <Box>
            <Typography
              variant="p"
              sx={{
                color: "#4B4B66",
                fontSize: "16px",
                fontWeight: "400",
                lineHeight: "19px",
              }}
            >
              {t["Journey Stage"]}
            </Typography>

            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
              gap={1}
              sx={{ mt: 2 }}
            >
              {[
                { name: "contract", slug: "Contract" },
                { name: "certificate", slug: "Certificates and documents" },
                { name: "pre-analysis", slug: "Pre-analysis" },
                { name: "digital-notary", slug: "Digital notary" },
              ].map((data, index) => (
                // <Grid xs={6} sm={6} md={6} lg={3} xl={3} key={index}>
                <Button
                  key={index}
                  onClick={() => setJourneyStage(data?.name)}
                  sx={{
                    background: `${
                      data?.name === journeyStage ? "#7450F0" : "transparent"
                    }`,
                    borderRadius: "56px",
                    // width: "100%",
                    color: `${
                      data?.name === journeyStage ? "#ffffff" : "#32414C"
                    }`,
                    border: `${
                      data?.name === journeyStage ? "" : "1px solid #9FAAB1"
                    }`,
                    ml: 0.5,
                    fontSize: {
                      xs: "12px",
                      sm: "13px",
                      md: "14px",
                      lg: "13px",
                      xl: "14px",
                    },
                    fontWeight: "400",
                    lineHeight: "17px",
                    textTransform: "none",
                    px: 1,
                    py: 1,
                    "&:hover": {
                      background: "#7450F0",
                      borderRadius: "56px",
                      color: "#ffffff",
                    },
                  }}
                >
                  {t[data?.slug]}
                </Button>
              ))}
            </Grid>
          </Box>
          <Divider sx={{ mt: 1, mb: 1 }} />
          {/* <Box>
            <Typography
              variant="p"
              sx={{
                color: "#4B4B66",
                fontSize: "16px",
                fontWeight: "400",
                lineHeight: "19px",
              }}
            >
              {t["Property type"]}
            </Typography>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
              gap={1}
              sx={{ mt: 2 }}
            >
              {propertyType?.map((data, index) => (
                <Button
                  key={index}
                  onClick={() => setType(data.id)}
                  sx={{
                    background: `${
                      data.id === type ? "#7450F0" : "transparent"
                    }`,
                    borderRadius: "56px",

                    color: `${data.id === type ? "#ffffff" : "#32414C"}`,
                    border: `${data.id === type ? "" : "1px solid #9FAAB1"}`,
                    fontSize: {
                      xs: "12px",
                      sm: "13px",
                      md: "14px",
                      lg: "13px",
                      xl: "14px",
                    },
                    fontWeight: "400",
                    lineHeight: "17px",
                    textTransform: "none",
                    px: { xs: 0, sm: 1, md: 1, lg: 1, xl: 1 },
                    py: 1,
                    "&:hover": {
                      background: "#7450F0",
                      borderRadius: "56px",
                      color: "#ffffff",
                    },
                  }}
                >
                  {data.name}
                </Button>
              ))}
            </Grid>
          </Box> */}
          <Divider sx={{ mt: 1, mb: 1 }} />
          <Box>
            <Typography
              variant="p"
              sx={{
                color: "#4B4B66",
                fontSize: "16px",
                fontWeight: "400",
                lineHeight: "19px",
              }}
            >
              {t["Value"]}
            </Typography>
            <Grid container spacing={2} sx={{ mt: 0.5 }}>
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <Controller
                  name="min_value"
                  control={control}
                  render={({ field }) => (
                    <BaseOutlinedCurrencyInput
                      size={"medium"}
                      placeholder={t["Minimum"]}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                      // label={"Minimum"}
                      // type={"number"}
                      name={"min_value"}
                      value={field.value}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "&.Mui-focused fieldset": {
                            borderColor: "#7450F0",
                          },
                        },
                        "& label.Mui-focused": {
                          color: "#7450F0",
                        },
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <Controller
                  name="max_value"
                  control={control}
                  render={({ field }) => (
                    <BaseOutlinedCurrencyInput
                      size={"medium"}
                      placeholder={t["Maximum"]}
                      // type={"number"}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                      // label={"Maximum"}
                      name={"max_value"}
                      value={field.value}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "&.Mui-focused fieldset": {
                            borderColor: "#7450F0",
                          },
                        },
                        "& label.Mui-focused": {
                          color: "#7450F0",
                        },
                      }}
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: 1 }}>
              <Slider
                getAriaLabel={() => "Temperature range"}
                value={
                  allValues.min_value && allValues?.max_value
                    ? [allValues.min_value, allValues?.max_value]
                    : valueSlider
                }
                size="small"
                max={30000000}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                sx={{ color: "#7450F0" }}
              />
            </Box>
          </Box>
          {/* <Divider sx={{ mt: 1, mb: 1 }} />
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                <Typography
                  variant="p"
                  sx={{
                    color: "#4B4B66",
                    fontSize: "16px",
                    fontWeight: "400",
                    lineHeight: "19px",
                  }}
                >
                  {t["bedrooms"]}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
                {[1, 2, 3, 4].map((data, index) => (
                  // <Grid xs={6} sm={6} md={6} lg={3} xl={3} key={index}>
                  <Button
                    onClick={() => setBedrooms(data)}
                    key={index}
                    sx={{
                      background: `${
                        data === bedrooms ? "#7450F0" : "transparent"
                      }`,
                      borderRadius: "56px",
                      // width: "100%",
                      color: `${data === bedrooms ? "#ffffff" : "#32414C"}`,
                      border: `${data === bedrooms ? "" : "1px solid #9FAAB1"}`,
                      ml: 0.5,
                      fontSize: {
                        xs: "12px",
                        sm: "13px",
                        md: "14px",
                        lg: "13px",
                        xl: "14px",
                      },
                      fontWeight: "400",
                      lineHeight: "17px",
                      textTransform: "none",
                      px: { xs: 0, sm: 1, md: 1, lg: 1, xl: 1 },
                      py: 1,
                      "&:hover": {
                        background: "#7450F0",
                        borderRadius: "56px",
                        color: "#ffffff",
                      },
                    }}
                  >
                    {`${data}+`}
                  </Button>
                  // </Grid>
                ))}
              </Grid>
            </Grid>
          </Box>
          <Divider sx={{ mt: 1, mb: 1 }} />
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                <Typography
                  variant="p"
                  sx={{
                    color: "#4B4B66",
                    fontSize: "16px",
                    fontWeight: "400",
                    lineHeight: "19px",
                  }}
                >
                  {t["bathrooms"]}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
                {[1, 2, 3, 4].map((data, index) => (
                  // <Grid xs={6} sm={6} md={6} lg={3} xl={3} key={index}>
                  <Button
                    onClick={() => setBathrooms(data)}
                    key={index}
                    sx={{
                      background: `${
                        data === bathrooms ? "#7450F0" : "transparent"
                      }`,
                      borderRadius: "56px",
                      // width: "100%",
                      color: `${data === bathrooms ? "#ffffff" : "#32414C"}`,
                      border: `${
                        data === bathrooms ? "" : "1px solid #9FAAB1"
                      }`,
                      ml: 0.5,
                      fontSize: {
                        xs: "12px",
                        sm: "13px",
                        md: "14px",
                        lg: "13px",
                        xl: "14px",
                      },
                      fontWeight: "400",
                      lineHeight: "17px",
                      textTransform: "none",
                      px: { xs: 0, sm: 1, md: 1, lg: 1, xl: 1 },
                      py: 1,
                      "&:hover": {
                        background: "#7450F0",
                        borderRadius: "56px",
                        color: "#ffffff",
                      },
                    }}
                  >
                    {`${index + 1}+`}
                  </Button>
                  // </Grid>
                ))}
              </Grid>
            </Grid>
          </Box>
          <Divider sx={{ mt: 1, mb: 1 }} />
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                <Typography
                  variant="p"
                  sx={{
                    color: "#4B4B66",
                    fontSize: "16px",
                    fontWeight: "400",
                    lineHeight: "19px",
                  }}
                >
                  {t["furnished"]}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
                {[
                  { name: "Yes", slug: t["yes"] },
                  { name: "No", slug: t["no"] },
                  { name: "Whatever", slug: t["whatever"] },
                ].map((data, index) => (
                  // <Grid xs={6} sm={6} md={6} lg={3} xl={3} key={index}>
                  <Button
                    key={index}
                    onClick={() => setFurnished(data?.name)}
                    sx={{
                      background: `${
                        data?.name === furnished ? "#7450F0" : "transparent"
                      }`,
                      borderRadius: "56px",
                      // width: "100%",
                      color: `${
                        data?.name === furnished ? "#ffffff" : "#32414C"
                      }`,
                      border: `${
                        data?.name === furnished ? "" : "1px solid #9FAAB1"
                      }`,
                      ml: 0.5,
                      fontSize: {
                        xs: "12px",
                        sm: "13px",
                        md: "14px",
                        lg: "13px",
                        xl: "14px",
                      },
                      fontWeight: "400",
                      lineHeight: "17px",
                      textTransform: "none",
                      px: { xs: 0, sm: 1, md: 1, lg: 1, xl: 1 },
                      py: 1,
                      "&:hover": {
                        background: "#7450F0",
                        borderRadius: "56px",
                        color: "#ffffff",
                      },
                    }}
                  >
                    {data?.slug}
                  </Button>
                  // </Grid>
                ))}
              </Grid>
            </Grid>
          </Box>
          <Divider sx={{ mt: 1, mb: 1 }} />
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                <Typography
                  variant="p"
                  sx={{
                    color: "#4B4B66",
                    fontSize: "16px",
                    fontWeight: "400",
                    lineHeight: "19px",
                  }}
                >
                  {t["do you accept pets"]}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
                {[
                  { name: "Yes", slug: t["yes"] },
                  { name: "No", slug: t["no"] },
                  { name: "Whatever", slug: t["whatever"] },
                ].map((data, index) => (
                  // <Grid xs={6} sm={6} md={6} lg={3} xl={3} key={index}>
                  <Button
                    key={index}
                    onClick={() => setPets(data?.name)}
                    sx={{
                      background: `${
                        data?.name === pets ? "#7450F0" : "transparent"
                      }`,
                      borderRadius: "56px",
                      // width: "100%",
                      color: `${data?.name === pets ? "#ffffff" : "#32414C"}`,
                      border: `${
                        data?.name === pets ? "" : "1px solid #9FAAB1"
                      }`,
                      ml: 0.5,
                      fontSize: {
                        xs: "12px",
                        sm: "13px",
                        md: "14px",
                        lg: "13px",
                        xl: "14px",
                      },
                      fontWeight: "400",
                      lineHeight: "17px",
                      textTransform: "none",
                      px: { xs: 0, sm: 1, md: 1, lg: 1, xl: 1 },
                      py: 1,
                      "&:hover": {
                        background: "#7450F0",
                        borderRadius: "56px",
                        color: "#ffffff",
                      },
                    }}
                  >
                    {data?.slug}
                  </Button>
                  // </Grid>
                ))}
              </Grid>
            </Grid>
          </Box>
          <Divider sx={{ mt: 1, mb: 1 }} />
          <Box>
            <Typography
              variant="p"
              sx={{
                color: "#4B4B66",
                fontSize: "16px",
                fontWeight: "400",
                lineHeight: "19px",
              }}
            >
              Area (m²)
            </Typography>
            <Grid container spacing={2} sx={{ mt: 0.5 }}>
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <Controller
                  name="min_area"
                  control={control}
                  render={({ field }) => (
                    <BaseOutlinedAreaInput
                      size={"medium"}
                      placeholder={"Minimum"}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                      name={"min_area"}
                      value={field.value}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "&.Mui-focused fieldset": {
                            borderColor: "#7450F0",
                          },
                        },
                        "& label.Mui-focused": {
                          color: "#7450F0",
                        },
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <Controller
                  name="max_area"
                  control={control}
                  render={({ field }) => (
                    <BaseOutlinedAreaInput
                      size={"medium"}
                      placeholder={"Maximum"}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                      name={"max_area"}
                      value={field.value}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "&.Mui-focused fieldset": {
                            borderColor: "#7450F0",
                          },
                        },
                        "& label.Mui-focused": {
                          color: "#7450F0",
                        },
                      }}
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: 1 }}>
              <Slider
                getAriaLabel={() => "Temperature range"}
                value={
                  allValues.min_area && allValues?.max_area
                    ? [allValues.min_area, allValues?.max_area]
                    : areaSlider
                }
                size="small"
                max={+allValues?.max_area + 1000 || 1000}
                onChange={handleAreaChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                sx={{ color: "#7450F0" }}
              />
            </Box>
          </Box>
          <Divider sx={{ mt: 1, mb: 1 }} />
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                <Typography
                  variant="p"
                  sx={{
                    color: "#4B4B66",
                    fontSize: "16px",
                    fontWeight: "400",
                    lineHeight: "19px",
                  }}
                >
                  {t["close to the metro"]}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
                {[
                  { name: "Yes", slug: t["yes"] },
                  { name: "No", slug: t["no"] },
                  { name: "Whatever", slug: t["whatever"] },
                ].map((data, index) => (
                  // <Grid xs={6} sm={6} md={6} lg={3} xl={3} key={index}>
                  <Button
                    onClick={() => setCloseToTheMetro(data?.name)}
                    key={index}
                    sx={{
                      background: `${
                        data?.name === closeToTheMetro
                          ? "#7450F0"
                          : "transparent"
                      }`,
                      borderRadius: "56px",
                      // width: "100%",
                      color: `${
                        data?.name === closeToTheMetro ? "#ffffff" : "#32414C"
                      }`,
                      border: `${
                        data?.name === closeToTheMetro
                          ? ""
                          : "1px solid #9FAAB1"
                      }`,
                      ml: 0.5,
                      fontSize: {
                        xs: "12px",
                        sm: "13px",
                        md: "14px",
                        lg: "13px",
                        xl: "14px",
                      },
                      fontWeight: "400",
                      lineHeight: "17px",
                      textTransform: "none",
                      px: { xs: 0, sm: 1, md: 1, lg: 1, xl: 1 },
                      py: 1,
                      "&:hover": {
                        background: "#7450F0",
                        borderRadius: "56px",
                        color: "#ffffff",
                      },
                    }}
                  >
                    {data?.slug}
                  </Button>
                  // </Grid>
                ))}
              </Grid>
            </Grid>
          </Box>
          <Divider sx={{ mt: 1, mb: 1 }} />
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                <Typography
                  variant="p"
                  sx={{
                    color: "#4B4B66",
                    fontSize: "16px",
                    fontWeight: "400",
                    lineHeight: "19px",
                  }}
                >
                  {t["Availability"]}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
                {[
                  { name: "Immediate", slug: t["immediate"] },
                  { name: "Shortly", slug: t["shortly"] },
                  { name: "Whatever", slug: t["whatever"] },
                ].map((data, index) => (
                  // <Grid xs={6} sm={6} md={6} lg={3} xl={3} key={index}>
                  <Button
                    key={index}
                    onClick={() => setAvailability(data?.name)}
                    sx={{
                      background: `${
                        data?.name === availability ? "#7450F0" : "transparent"
                      }`,
                      borderRadius: "56px",
                      // width: "100%",
                      color: `${
                        data?.name === availability ? "#ffffff" : "#32414C"
                      }`,
                      border: `${
                        data?.name === availability ? "" : "1px solid #9FAAB1"
                      }`,
                      ml: 0.5,
                      fontSize: {
                        xs: "12px",
                        sm: "13px",
                        md: "14px",
                        lg: "13px",
                        xl: "14px",
                      },
                      fontWeight: "400",
                      lineHeight: "17px",
                      textTransform: "none",
                      px: { xs: 0, sm: 1, md: 1, lg: 1, xl: 1 },
                      py: 1,
                      "&:hover": {
                        background: "#7450F0",
                        borderRadius: "56px",
                        color: "#ffffff",
                      },
                    }}
                  >
                    {data?.slug}
                  </Button>
                  // </Grid>
                ))}
              </Grid>
            </Grid>
          </Box> */}

          {/* {Object.keys(featureData).map((key, index) => (
            <Box key={index}>
              <Typography
                variant="p"
                sx={{
                  color: "#4B4B66",
                  fontSize: "16px",
                  fontWeight: "400",
                  lineHeight: "19px",
                }}
              >
                {
                  t[
                    (key === "condominium" ||
                      key === "accessibility" ||
                      key === "amenities" ||
                      key === "appliances" ||
                      key === "room" ||
                      key === "rooms" ||
                      key === "sorrounding" ||
                      key === "wellbeing" ||
                      key === "feature") &&
                      key
                  ]
                }
              </Typography>
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                gap={1}
                sx={{ mt: 2 }}
              >
                {(key === "condominium" ||
                  key === "accessibility" ||
                  key === "amenities" ||
                  key === "appliances" ||
                  key === "rooms" ||
                  key === "room" ||
                  key === "sorrounding" ||
                  key === "wellbeing" ||
                  key === "feature") &&
                  featureData[key].map((data, index) => (
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
                          featuretypes?.includes(data.id)
                            ? "#ffffff"
                            : "#32414C"
                        }`,
                        border: `${
                          featuretypes?.includes(data.id)
                            ? ""
                            : "1px solid #9FAAB1"
                        }`,
                        fontSize: {
                          xs: "12px",
                          sm: "13px",
                          md: "14px",
                          lg: "13px",
                          xl: "14px",
                        },
                        fontWeight: "400",
                        lineHeight: "17px",
                        textTransform: "none",
                        px: { xs: 0, sm: 1, md: 1, lg: 1, xl: 1 },
                        py: 1,
                        "&:hover": {
                          background: "#7450F0",
                          borderRadius: "56px",
                          color: "#ffffff",
                        },
                      }}
                    >
                      {data.name}
                    </Button>
                  ))}
              </Grid>
              <Divider sx={{ mt: 1, mb: 1 }} />
            </Box>
          ))} */}
        </Box>

        <Box
          sx={{
            // mx: 2,
            // my: 2,

            position: "sticky",
            bottom: 0,
            width: "100%",
            background: "#ffffff",
            px: 2,
            py: 2,
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <Button
                onClick={(e) => {
                  handleCancelFilter();
                  toggleDrawer("left", false)(e);
                }}
                fullWidth
                variant="outlined"
                sx={{
                  borderColor: "#002152",
                  borderRadius: "4px",
                  color: "#002152",
                  fontSize: "16px",
                  fontWeight: "600",
                  lineHeight: "22px",
                  textTransform: "none",
                  "&:hover": {
                    borderColor: "#002152",
                    borderRadius: "4px",
                    color: "#002152",
                  },
                }}
              >
                {t["cancel filter"]}
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <Button
                fullWidth
                variant="contained"
                type="submit"
                sx={{
                  background: " #7450F0",
                  borderRadius: "4px",
                  color: "#ffffff",
                  fontSize: "16px",
                  fontWeight: "600",
                  lineHeight: "22px",
                  textTransform: "none",
                  "&:hover": {
                    background: " #7450F0",
                    borderRadius: "4px",
                    color: "#ffffff",
                  },
                }}
              >
                {t["apply filters"]}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </Box>
  );

  if (isFetched && isFetching) {
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
        //   backgroundColor: "#f6f8fc",
        flexGrow: 1,
        background: "#F2F5F6",
        minHeight: "100vh",
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        paddingX: { xs: 0, sm: 0, md: 6, lg: 6, xl: 6 },
        paddingTop: { xs: 6, sm: 6, md: 6, lg: 8, xl: 3 },
        paddingBottom: { xs: 3, sm: 3, md: 3, lg: 4, xl: 3 },
      }}
    >
      <NotificationContent
        pageName={"Proposals"}
        session={session}
        language={language}
      />
      <Container maxWidth="xl">
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChangeValue}
              aria-label="basic tabs example"
              variant="scrollable"
            >
              <Tab
                sx={{ fontWeight: "600", textTransform: "none" }}
                label={
                  countLoading
                    ? t["Pending"]
                    : `${t["Pending"]}(${proposalCountData?.pending || 0})`
                }
                {...a11yProps(0)}
              />
              <Tab
                sx={{ fontWeight: "600", textTransform: "none" }}
                label={
                  countLoading
                    ? t["Accepted"]
                    : `${t["Accepted"]}(${proposalCountData?.accepted || 0})`
                }
                {...a11yProps(1)}
              />
              <Tab
                sx={{ fontWeight: "600", textTransform: "none" }}
                label={
                  countLoading
                    ? t["Completed"]
                    : `${t["Completed"]}(${proposalCountData?.completed || 0})`
                }
                {...a11yProps(2)}
              />
            </Tabs>
          </Box>
          <Container maxWidth="xl" sx={{ mt: 2 }}>
            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="flex-end"
            >
              <Button
                onClick={toggleDrawer("left", true)}
                sx={{
                  fontSize: "14px",
                  fontWeight: 600,
                  textTransform: "none",
                  lineHeight: "17px",
                  background: "#0E97F7",
                  boxShadow: "0px 4px 24px rgba(26, 85, 181, 0.3)",
                  borderRadius: "4px",
                  color: "#ffffff",
                  display: "flex",
                  "&:hover": {
                    fontSize: "14px",
                    fontWeight: 600,
                    background: "#0E97F7",
                  },
                }}
              >
                <FilterAltOutlinedIcon />
                <Typography variant="p">{t["filter"]}</Typography>
              </Button>
              <SwipeableDrawer
                anchor={"left"}
                open={state["left"]}
                onClose={toggleDrawer("left", false)}
                onOpen={toggleDrawer("left", true)}
              >
                {list("left")}
              </SwipeableDrawer>
            </Grid>
          </Container>
          <TabPanel value={value} index={0}>
            <Pendants
              languageName={myValue.toString()}
              loadingRefetch={loadingRefetch}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Accepted languageName={myValue.toString()} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Completed languageName={myValue.toString()} />
          </TabPanel>
        </Box>
      </Container>
    </Box>
  );
}
