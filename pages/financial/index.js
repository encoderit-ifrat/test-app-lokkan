import dynamic from "next/dynamic";
const ResponsiveDrawer = dynamic(
  () => import("@/component/sharedProposal/ResponsiveDrawer/ResponsiveDrawer"),
  {
    ssr: false,
  }
);
import Head from "next/head";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { Container, Grid } from "@mui/material";
import { useState } from "react";
import { useSession } from "next-auth/react";
import pt from "locales/pt";
import en from "locales/en";
import FinancialCard from "@/component/financial/FinancialCard";
import RefererTable from "@/component/referer/RefererTable";
const BaseDataTable = dynamic(
  () => import("@/component/reuseable/baseDataTable/BaseDataTable"),
  {
    ssr: false,
  }
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

export default function Financial({ language }) {
  const [myValue, setMyValue] = useState(language || "pt");

  const t = myValue === "en" ? en : pt;
  const { data: session } = useSession();

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Head>
        <title>Lokkan - A imobiliária digital</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/negotiate.png" />
      </Head>

      <main>
        <Box sx={{ display: "flex" }}>
          <ResponsiveDrawer languageName={myValue.toString()} />
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
                {t["Financial"]}
              </Typography>
            </Grid>
            <Container maxWidth="xl">
              <Box sx={{ width: "100%" }}>
                <Box
                // sx={{ borderBottom: 1, borderColor: "divider" }}
                >
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    variant="scrollable"
                    sx={{
                      borderBottom: 1,
                      borderColor: "divider",
                    }}
                  >
                    <Tab
                      sx={{
                        fontWeight: "600",
                        textTransform: "none",
                      }}
                      label={t["sales"]}
                      {...a11yProps(0)}
                    />
                    {(session?.user?.role === "admin" ||
                      session?.user?.role === "broker") && (
                        <Tab
                          sx={{
                            fontWeight: "600",
                            textTransform: "none",
                          }}
                          label={t["Referral Credits"]}
                          {...a11yProps(1)}
                        />
                      )}
                  </Tabs>
                </Box>

                <TabPanel value={value} index={0}>
                  <FinancialCard language={language} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <RefererTable />
                </TabPanel>
              </Box>
            </Container>
          </Box>
        </Box>
      </main>
    </div>
  );
}
