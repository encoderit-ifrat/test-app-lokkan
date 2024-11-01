import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import BaseTableReferrer from "./BaseTableReferrer";
import BaseCloseButton from "../reuseable/baseCloseButton/BaseCloseButton";
import { useSession } from "next-auth/react";
import { useGetSingleRefererQuery } from "@/queries/useGetSingleRefererQuery";

function ReferrerModal({ handleClose, referrer_id }) {
  const style = {
    position: "absolute",
    top: "45%",
    left: "50%",
    // top:{xs:"80%"},
    transform: "translate(-50%, -50%)",
    width: { xs: "80%", sm: "80%", md: "60%", lg: "60%", xl: "60%" },
    bgcolor: "#ffffff",
    // border: "2px solid #000",
    boxShadow: "none",
    borderRadius: "12px",
    height: "40vh",
    overflowY: "scroll",
    px: 3,
    py: 2,
  };
  const { data: session } = useSession();

  const {
    data: refererData,
    isLoading: referrerLoading,
    isFetching,
    isFetched,
  } = useGetSingleRefererQuery(+referrer_id);

  if (referrerLoading || isFetching) {
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
    </Container>;
  }
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
    <Box sx={style}>
      <BaseCloseButton handleClose={handleClose} />
      <Box sx={{ width: "100%", mt: 5 }}>
        <BaseTableReferrer
          headers={[
            "Pessoas nomeadas",
            "Quantia",
            "Valor recebido",
            "Saldo a receber",
          ]}
          rowData={refererData}
        />
      </Box>
    </Box>
  );
}

export default ReferrerModal;
