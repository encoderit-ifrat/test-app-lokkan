import dynamic from "next/dynamic";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
const UserUpdateForm = dynamic(
  () => import("@/component/user/update/UserUpdateForm"),
  {
    ssr: false,
  }
);
import { _baseURL } from "../../consts";
import { useDispatch, useSelector } from "react-redux";

import en from "locales/en";
import pt from "locales/pt";
import { findStateData } from "@/redux/state/actions";
import BaseButton from "@/component/reuseable/button/BaseButton";
import { useRouter } from "next/router";

const drawerWidth = 240;

export default function Index() {
  const [myValue, setMyValue] = useState("pt");

  const t = myValue === "pt" ? pt : en;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(findStateData());
  }, [dispatch]);

  const allStateData = useSelector((state) => state.state.stateData);
  console.log("🟥 ~ Index ~ allStateData:", allStateData);

  const router = useRouter()

  return (
    <Box
      sx={{
        flexGrow: 1,
        background: "#F2F5F6",
        minHeight: "100vh",
        paddingLeft: { xs: 4, sm: 4, md: 6, lg: 6, xl: 6 },
        paddingRight: { xs: 2, sm: 2, md: 4, lg: 4, xl: 4 },
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
          
          }}
        >
          {t["profile"]}
        </Typography>
        <BaseButton
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
              name={t["Come back"]}
              handleFunction={()=> router.replace('/my-properties') }
            />
      </Grid>
      <Box sx={{mt:2}}>
        <UserUpdateForm />
      </Box>
    </Box>
  );
}
