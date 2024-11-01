import dynamic from "next/dynamic";
import Head from "next/head";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
const Releases = dynamic(() =>
  import("@/component/properties/Releases/Releases")
);
const ThirdTab = dynamic(() => import("@/component/properties/Third/ThirdTab"));
const NewRegistration = dynamic(() =>
  import("@/component/properties/NewRegistration/NewRegistration")
);
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { omitEmpties, userDetailsApi } from "@/api";
import en from "locales/en";
import pt from "locales/pt";
import WishProperty from "@/component/properties/WishProperty/WishProperty";
import { useGetPropertyCountQuery } from "@/queries/useGetPropertyCountQuery";
import useParams from "@/hooks/useParams";
import BaseButton from "@/component/reuseable/baseButton/BaseButton";
const NotificationContent = dynamic(() =>
  import("@/component/notificationContent/NotificationContent")
);

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

export default function MyProperties({ language }) {
  const router = useRouter();
  const { query } = router;
  const { data: session } = useSession();

  const { setParams } = useParams();

  useEffect(() => {
    userDetailsApi();
  }, []);

  const [myValue, setMyValue] = useState(language || "pt");

  const t = myValue === "en" ? en : pt;

  const {
    data,
    isLoading: countLoading,
    refetch: loadingRefetch,
    isFetched,
    isFetching
  } = useGetPropertyCountQuery();
  const propertyCountData = data?.data;

  const [value, setValue] = useState(
    query?.status === "new"
      ? 3
      : query?.status === "third"
      ? 2
      : query?.status === "projects"
      ? 1
      : 0
  );
  useEffect(() => {
    setValue(
      query?.status === "new"
        ? 3
        : query?.status === "third"
        ? 2
        : query?.status === "projects"
        ? 1
        : 0
    );
  }, [query?.status, value]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setParams(
      omitEmpties({
        status:
          newValue === 3
            ? "new"
            : newValue === 2
            ? "third"
            : newValue === 1
            ? "projects"
            : "wishlist",
        page: 1,
        per_page: 9,
      })
    );
    loadingRefetch()
  };

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
        pageName={"My Properties"}
        session={session}
        language={"pt"}
      />
      <Container maxWidth="xl">
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              variant="scrollable"
            >
              <Tab
                sx={{ fontWeight: "600", textTransform: "none" }}
                label={
                  countLoading
                    ? `${"Meus imóveis"}(${
                        propertyCountData?.wish_property || 0
                      })`
                    : `${"Meus imóveis"}(${
                        propertyCountData?.wish_property || 0
                      })`
                }
                {...a11yProps(0)}
              />
              <Tab
                sx={{ fontWeight: "600", textTransform: "none" }}
                label={
                  countLoading
                    ? t["Releases"]
                    : `${t["Releases"]}(${propertyCountData?.project || 0})`
                }
                {...a11yProps(1)}
              />
              <Tab
                sx={{ fontWeight: "600", textTransform: "none" }}
                label={
                  countLoading
                    ? t["Third"]
                    : `${t["Third"]}(${propertyCountData?.third || 0})`
                }
                {...a11yProps(2)}
              />
              {session?.user?.role === "admin" && (
                <Tab
                  sx={{
                    fontWeight: "600",
                    textTransform: "none",
                    textWrap: "nowrap",
                  }}
                  label={
                    countLoading
                      ? t["New Registration"]
                      : `${t["New Registration"]}(${
                          propertyCountData?.register_property || 0
                        })`
                  }
                  {...a11yProps(3)}
                />
              )}
            </Tabs>
          </Box>
          <Container maxWidth="xl">
            <Grid
              container
              direction="row"
              justifyContent={{
                xs: "flex-start",
                sm: "flex-start",
                md: "flex-start",
                lg: "flex-end",
              }}
              alignItems="center"
              gap={2}
              sx={{ mt: 3 }}
            >
              {session?.user?.role !== "buyer" && (
                <Grid item xs={12} md={4}>
                  <BaseButton
                    fullWidth
                    handleFunction={() =>
                      router.push({
                        pathname: "/my-properties/new-property",
                      })
                    }
                  >
                    <Typography sx={{ textWrap: "nowrap", fontWeight: 600 }}>
                      {t["New property"]}
                    </Typography>
                  </BaseButton>
                </Grid>
              )}

              {(session?.user?.role === "admin" || session?.user?.role === "construction_company" ) && (
                <Grid item xs={12} md={6}>
                  <BaseButton
                    fullWidth
                    sx="outlined"
                    handleFunction={() =>
                      router.push({
                        pathname: "/my-properties/new-venture",
                      })
                    }
                  >
                    <Typography sx={{ textWrap: "nowrap", fontWeight: 600 }}>
                      {t["New venture"]}
                    </Typography>
                  </BaseButton>
                </Grid>
              )}
            </Grid>
          </Container>
          <TabPanel value={value} index={0}>
            <WishProperty
              languageName={myValue.toString()}
              loadingRefetch={loadingRefetch}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Releases
              queryData={query}
              languageName={myValue.toString()}
              loadingRefetch={loadingRefetch}
            />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <ThirdTab
              languageName={myValue.toString()}
              loadingRefetch={loadingRefetch}
            />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <NewRegistration
              languageName={myValue.toString()}
              loadingRefetch={loadingRefetch}
            />
          </TabPanel>
        </Box>
      </Container>
    </Box>
  );
}
