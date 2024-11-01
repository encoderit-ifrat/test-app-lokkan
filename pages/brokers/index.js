import dynamic from "next/dynamic";
import Image from "next/image";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import notifyImage from "../../public/Images/notify.png";
const TabRegistered = dynamic(() =>
  import("@/component/brokers/TabRegistered/TabRegistered")
);
const TabPendant = dynamic(() =>
  import("@/component/brokers/TabPendant/TabPendant")
);
import { useSession } from "next-auth/react";
import SearchIcon from "@mui/icons-material/Search";
import pt from "locales/pt";
import en from "locales/en";
import { useGetBrokerCountQuery } from "@/queries/useGetBrokerCountQuery";
import BrokerSearch, {
  MemoizedSearch,
} from "@/component/reuseable/brokerSearch/BrokerSearch";
import { debounce } from "@/utils/debounce";
import { useRouter } from "next/router";
import { useGetBrokerDataQuery } from "@/queries/useGetBrokerDataQuery";

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

export default function Brokers({ language }) {
  const [myValue, setMyValue] = useState(language || "pt");

  const t = myValue === "en" ? en : pt;
  const { data: session } = useSession();

  const {
    data,
    isLoading: countLoading,
    refetch: loadingRefetch,
    isFetching,
    isFetched,
  } = useGetBrokerCountQuery();

  const brokerCountData = data?.data;

  const [value, setValue] = useState(0);
  const router = useRouter();
  const { query } = router;

  const [searchValue, setSearchValue] = useState(() => query.name || "");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setSearchValue("");
    router.replace({
      query: {
        name: "",
      },
    });
    loadingRefetch();
  };
  // useEffect(() => {
  //   console.log("🟥 ~ Brokers ~ value:", value);
  // }, [value]);

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
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Typography
          variant="p"
          sx={{
            color: "#002152",
            fontSize: "24px",
            fontWeight: "700",
            lineHeight: "32px",
            ml: { xs: 4, sm: 4, md: 0, lg: 0, xl: 0 },
            mt: { xs: 1, sm: 1, md: 0, lg: 0, xl: 0 },
          }}
        >
          {t["Brokers"]}
        </Typography>
      </Grid>
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
                    ? t["Registered"]
                    : `${t["Registered"]}(${brokerCountData?.register || 0})`
                }
                {...a11yProps(0)}
              />
              {session?.user?.role === "admin" && (
                <Tab
                  sx={{ fontWeight: "600", textTransform: "none" }}
                  label={
                    countLoading
                      ? t["Pending"]
                      : `${t["Pending"]}(${brokerCountData?.pending || 0})`
                  }
                  {...a11yProps(1)}
                />
              )}
            </Tabs>
          </Box>

          <TabPanel value={value} index={0}>
            {/* <Pendants /> */}
            <TabRegistered
              languageName={myValue.toString()}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              brokerCountRefetch={loadingRefetch}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            {/* <Accepted /> */}
            <TabPendant
              languageName={myValue.toString()}
              brokerCountRefetch={loadingRefetch}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            />
          </TabPanel>
        </Box>
      </Container>
    </Box>
  );
}
