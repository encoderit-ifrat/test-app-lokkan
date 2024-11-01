import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import logoWhiteIcon from "../../../../public/Images/branca-op1.png";
import facebook from "../../../../public/Images/facebook.png";
import twitter from "../../../../public/Images/twitter.png";
import instagram from "../../../../public/Images/instagram.png";
import linkedin from "../../../../public/Images/linkedin.png";
import { flexbox } from "@mui/system";
import Link from "next/link";
import BaseTextField from "../../reuseable/baseTextField/BaseTextField";

function BrokerRegistrationFooter() {
  return (
    <Box sx={{ backgroundColor: "#1A1859", py: 2 }}>
      {/* <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Box sx={{ paddingX: 4, paddingY: 3 }}>
          <Image src={logoWhiteIcon} height={40} width={200} alt="logo" />
        </Box>
      </Grid> */}
      <Grid container spacing={2} sx={{ paddingX: 4, paddingBottom: 4 }}>
        <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
          <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{ color: "#ffffff", fontSize: "14px" }}
          >
            <Box sx={{ mb: 1 }}>
              <Image src={logoWhiteIcon} height={40} width={180} alt="logo" />
            </Box>
            <Typography variant="p">
              Lokkan Serviços Imobiliários LTDA.
            </Typography>
            <Typography variant="p">
              Avenida Paulista, 1439 - 1 andar - conj. 12
            </Typography>
            <Typography variant="p">
              Jardim Paulista - CEP 01311-200 - São Paulo / SP
            </Typography>
            <Typography variant="p">CRECI - SP 28810J</Typography>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            gap={3}
          >
            <Box>
              <Link href="https://web.facebook.com/lokkan.com.br">
                <a target="_blank">
                  <Image src={facebook} height={30} width={15} alt="facebook" />
                </a>
              </Link>
            </Box>
            <Box sx={{ marginLeft: 2 }}>
              <Link href="https://www.instagram.com/lokkan.com.br/">
                <a target="_blank">
                  <Image
                    src={instagram}
                    height={30}
                    width={30}
                    alt="instagram"
                  />
                </a>
              </Link>
            </Box>
            <Box sx={{ marginLeft: 2 }}>
              <Link href="">
                <a target="_blank">
                  <Image src={twitter} height={30} width={30} alt="twitter" />
                </a>
              </Link>
            </Box>
            <Box sx={{ marginLeft: 2 }}>
              <Link href="https://www.linkedin.com/company/lokkan/">
                <a target="_blank">
                  <Image src={linkedin} height={30} width={30} alt="linkedin" />
                </a>
              </Link>
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
          <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{ color: "#ffffff", fontSize: "14px" }}
          >
            <BaseTextField
              size={"small"}
              placeholder={"Email"}
              sx={{
                mb: 1,
                fieldset: { borderColor: "#ffffff" },
                input: {
                  color: "#ffffff",
                  "&::placeholder": {
                    opacity: 1,
                  },
                },
              }}
            />
            <Button
              fullWidth
              sx={{
                background: "#0E97F7",
                boxShadow: "0px 4px 34px rgba(0, 0, 0, 0.08)",
                borderRadius: "4px",
                color: "#ffffff",
                fontSize: "16px",
                lineHeight: "22px",
                fontWeight: "600",
                mt: 1,
                // mb: 5,
                textTransform: "none",
                py: 1,
                "&:hover": {
                  background: "#0E97F7",
                  boxShadow: "0px 4px 34px rgba(0, 0, 0, 0.08)",
                  borderRadius: "4px",
                  color: "#ffffff",
                  fontSize: "16px",
                  lineHeight: "22px",
                  fontWeight: "600",
                  mt: 1,
                  textTransform: "none",
                  py: 1,
                },
              }}
            >
              Assine nossa Newsletter!
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Divider sx={{ backgroundColor: "#3E50D8", height: 4 }} />
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ paddingY: 2, paddingX: 3 }}
      >
        <Typography variant="p" sx={{ color: "#ffffff", fontSize: "14px" }}>
          © 2024. Todos os direitos reservados a Lokkan Serviços Imobiliários
          LTDA.
        </Typography>
      </Grid>
    </Box>
  );
}

export default BrokerRegistrationFooter;
