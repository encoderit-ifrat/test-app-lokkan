import { Box, Grid } from "@mui/material";
import React from "react";
import mobileLaptop from "../../../../public/Images/mobile_laptop.png";

import Image from "next/image";

function MobileSideContent() {
  return (
    <Box>
      <Image src={mobileLaptop} alt="mobileLaptop" />
    </Box>
  );
}

export default MobileSideContent;
