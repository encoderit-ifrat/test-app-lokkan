import { Box, Grid, Skeleton } from "@mui/material";
import dynamic from "next/dynamic";

import React from "react";
const HouseCard = dynamic(
  () => import("@/component/reuseable/HouseCard/HouseCard"),
  {
    ssr: false,
  }
);
import Link from "next/link";
import { stripHtmlTags } from "@/utils/stripHtmlTags";

function PropertyList({ propertyData, isLoading, handleLoginOpen }) {
  return (
    <Box>
      <Grid container spacing={1}>
        {isLoading
          ? [0, 1, 2, 3].map((data, index) => (
              <Grid
                key={index}
                item
                xs={12}
                sm={12}
                md={12}
                lg={4}
                xl={4}
                xxl={4}
              >
                <Skeleton
                  variant="rect"
                  height={220}
                  sx={{ mx: 2, my: 2, borderRadius: "8px" }}
                />
                <Box sx={{ mx: 2, my: 1 }}>
                  <Skeleton width="60%" />
                  <Skeleton width="60%" />
                  <Skeleton width="60%" />
                  <Skeleton />
                </Box>
              </Grid>
            ))
          : propertyData?.properties?.data?.map((data, index) => (
              <Grid item xs={12} sm={12} md={6} lg={4} xxl={3} key={index}>
                <Link
                  href={`/visualizacao-da-propriedade/${data.id}/${data?.property_title}`}
                  as={`/visualizacao-da-propriedade/${data.id}/${data?.property_title}`}
                >
                  <a
                    style={{
                      textDecoration: "none",
                      listStyle: "none",
                      width: "100%",
                      cursor: "pointer",
                    }}
                  >
                    <HouseCard
                      shadow={"0px 4px 18px rgba(0, 0, 0, 0.1)"}
                      marginTop={"4vh"}
                      propertyInfo={data}
                      handleLoginOpen={handleLoginOpen}
                      imageSize={propertyData.imageSize}
                    />
                  </a>
                </Link>
              </Grid>
            ))}
      </Grid>
    </Box>
  );
}

export default PropertyList;
