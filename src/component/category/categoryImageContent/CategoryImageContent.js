import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import avatarProfile from "../../../../public/Images/blog_avatar.png";
import Image from "next/image";
import blue_facebook from "../../../../public/Images/blue_facebook.png";
import blue_twitter from "../../../../public/Images/blue_twitter.png";
import blue_linkedin from "../../../../public/Images/blue_linkedin.png";
import blue_whatsapp from "../../../../public/Images/blue_whatsapp.png";

function CategoryImageContent() {
  return (
    <Box
      sx={{
        mt: 3,
        px: 3,
        py: 3,
        background: "#F9F9FB",
      }}
    >
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={2} xl={2}>
          <Box>
            <Image src={avatarProfile} alt="avatar" />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={10} xl={10}>
          <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Typography
              variant="p"
              sx={{
                color: "#52616B",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "28px",
                marginTop: "1.5vh",
              }}
            >
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo.
            </Typography>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
              gap={1}
            >
              <Box>
                <Image src={blue_facebook} alt="facebook" />
              </Box>
              <Box>
                <Image src={blue_whatsapp} alt="whatsapp" />
              </Box>
              <Box>
                <Image src={blue_linkedin} alt="linkedin" />
              </Box>
              <Box>
                <Image src={blue_twitter} alt="twitter" />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CategoryImageContent;
