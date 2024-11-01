import {
  Box,
  Grid,
  LinearProgress,
  Pagination,
  Skeleton,
  Stack,
} from "@mui/material";
import React, { useEffect } from "react";
import AcceptedCard from "../acceptedCard/AcceptedCard";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { findPropertyData } from "../../../redux/property/actions";
import { useGetPropertyQuery } from "@/queries/useGetPropertyQuery";

function Accepted({ languageName }) {

  console.log('hhh')
  const router = useRouter();
  const { query } = router;
  const [page, setPage] = React.useState(1);

  useEffect(() => {
    setPage(+query?.page);
  }, [query]);

  const {
    data: acceptedProperty,
    isLoading: Loading,
    refetch,
    isFetched,
    isFetching,
  } = useGetPropertyQuery({
    ...query,
    proposal_status:'accepted',
    status: "approved",
    page: page || 1,
    per_page: 9,
  });

  const handlePageChange = (event, value) => {
    setPage(value);
    router.replace({
      query: { ...router.query, page: value },
    });
  };

  useEffect(() => {
    refetch();
  }, [page, query, refetch]);

  if (Loading) {
    return (
      <Grid container spacing={1}>
        {[0, 1, 2].map((data, index) => (
          <Grid key={index} item xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
            <Skeleton
              variant="rect"
              height={500}
              sx={{ mx: 2, my: 2, borderRadius: "8px" }}
            />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (isFetched && isFetching) {
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );
  }
  return (
    <Box>
      <Grid container spacing={2}>
        {acceptedProperty?.data?.map((data, index) => (
          <Grid key={data?.id} item xs={12} sm={12} md={12} lg={4} xl={4} >
            <AcceptedCard propertyData={data} languageName={languageName} />
          </Grid>
        ))}
      </Grid>
      <Stack spacing={2} sx={{ marginY: 8 }}>
        <Pagination
          count={Math.ceil(acceptedProperty?.total / 9) || 1}
          page={page}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
        />
      </Stack>
    </Box>
  );
}

export default Accepted;
