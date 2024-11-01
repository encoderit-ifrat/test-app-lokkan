import {
  Box,
  Button,
  Grid,
  LinearProgress,
  Pagination,
  Skeleton,
  Stack,
} from "@mui/material";
import React, { useEffect } from "react";
import PendantsCard from "../pendantsCard/PendantsCard";
import { useDispatch, useSelector } from "react-redux";
import { findPropertyData } from "../../../redux/property/actions";
import { useRouter } from "next/router";
import { Language } from "@mui/icons-material";
import { useSession } from "next-auth/react";
import dayjs from "dayjs";
import { useGetPropertyQuery } from "@/queries/useGetPropertyQuery";

function Pendants({ languageName, loadingRefetch }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { query } = router;

  const { data: session } = useSession();

  // const [page, setPage] = React.useState(+query?.page || 1);

  // useEffect(() => {
  //   dispatch(
  //     findPropertyData({
  //       ...query,
  //       status: "approved",
  //       page: query?.page ? query?.page : 1,
  //       per_page: 9,
  //       proposal_status: "pending",
  //     })
  //   );
  // }, [dispatch, query]);

  // const pendingProperty = useSelector((state) => state.property.propertyData);
  // console.log({ pendingProperty });
  // const timeString = dayjs(
  //   "2023-06-14T07:36:38.000000Z",
  //   "YYYY-MM-DD+h:mm"
  // ).format("HH:mm:00");

  const [page, setPage] = React.useState(1);
  useEffect(() => {
    setPage(+query?.page);
  }, [query]);

  const {
    data: pendingProperty,
    isLoading: Loading,
    refetch,
    isFetched,
    isFetching,
  } = useGetPropertyQuery({
    ...query,
    proposal_status: "pending",
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
        {pendingProperty?.data?.map((data, index) => (
          <Grid key={index} item xs={12} sm={12} md={12} lg={4} xl={4}>
            <PendantsCard
              propertyData={data}
              languageName={languageName}
              refetch={refetch}
              loadingRefetch={loadingRefetch}
            />
          </Grid>
        ))}
      </Grid>
      <Stack spacing={2} sx={{ marginY: 8 }}>
        <Pagination
          count={Math.ceil(pendingProperty?.total / 9) || 1}
          page={page}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
        />
      </Stack>
    </Box>
  );
}

export default Pendants;
