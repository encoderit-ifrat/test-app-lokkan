import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

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
          <Typography component={"span"} variant={"body2"}>
            {children}
          </Typography>
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

function TabView({ tabArray, upperTabValue, setUpperTabValue }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClick = (data) => {
    setUpperTabValue(data?.slug);
  };

  const AntTab = styled((props) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
      textTransform: "none",

      "&.Mui-selected": {
        backgroundColor: "#7450F0",
        color: "#ffffff",
        fontWeight: theme.typography.fontWeightMedium,
      },
      "&.Mui-focusVisible": {
        backgroundColor: "red",
      },
    })
  );

  return (
    <Box sx={{ maxWidth: { xs: 320, sm: 480, md: 500, lg: 700, xl: 700 } }}>
      <Box
        sx={{
          border: "1px solid #7450F0",
          borderColor: "divider",
          borderRadius: "0px 4px 4px 0p",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          indicatorColor="transparent"
          variant="scrollable"
          scrollButtons={false}
        >
          {tabArray?.map((data, index) => (
            <AntTab
              key={index}
              sx={{ borderRight: 1, paddingX: 4 }}
              label={data?.name}
              onClick={() => handleClick(data)}
              {...a11yProps(index)}
            />
          ))}
          {/* <AntTab
            sx={{ borderRight: 1, paddingX: 4 }}
            label="Kitchen"
            {...a11yProps(1)}
          />
          <AntTab
            sx={{ borderRight: 1, paddingX: 4 }}
            label="Room 1"
            {...a11yProps(2)}
          />
          <AntTab
            sx={{ borderRight: 1, paddingX: 4 }}
            label="Bedroom 1"
            {...a11yProps(3)}
          />
          <AntTab
            sx={{ borderRight: 1, paddingX: 4 }}
            label="WC"
            {...a11yProps(4)}
          />
          <AntTab
            sx={{ borderRight: 1, paddingX: 4 }}
            label="Balcony"
            {...a11yProps(5)}
          /> */}
        </Tabs>
      </Box>
      {/* <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel> */}
    </Box>
  );
}

export default TabView;
