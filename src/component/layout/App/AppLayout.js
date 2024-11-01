import dynamic from "next/dynamic";
const ResponsiveDrawer = dynamic(() => import("@/component/sharedProposal/ResponsiveDrawer/ResponsiveDrawer"), {ssr: false});
import { Box } from "@mui/material";
import Head from "next/head";

const AppLayout = ({ children }) => (
  <div>
    <Head>
      <title>Lokkan - A imobiliária digital</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/negotiate.png" />
    </Head>

    <main className="wrapper">
      <Box sx={{ display: "flex" }}>
        <ResponsiveDrawer languageName={"pt"} />
        {children}
      </Box>
    </main>
  </div>
);

export default AppLayout;