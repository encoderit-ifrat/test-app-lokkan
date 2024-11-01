import {
  Box,
  Button,
  Grid,
  LinearProgress,
  Pagination,
  Skeleton,
  Stack,
} from "@mui/material";
import React from "react";
import ReleaseCard from "../ReleaseCard/ReleaseCard";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findProjectsData } from "../../../redux/projects/actions";
import { useRouter } from "next/router";
import en from "locales/en";
import pt from "locales/pt";
import { useGetAllProjectsQuery } from "@/queries/useGetAllProjectsQuery";

function Releases({ queryData, languageName, loadingRefetch }) {
  const router = useRouter();
  const { query } = router;
  const [page, setPage] = React.useState(1);

  useEffect(() => {
    setPage(+query?.page);
  }, [query]);

  const {
    data: AllProjects,
    isLoading: Loading,
    refetch,
    isFetched,
    isFetching,
  } = useGetAllProjectsQuery({ page: page, per_page: 9 });

  const handlePageChange = (event, value) => {
    setPage(value);
    router.replace({
      query: { ...router.query, page: value },
    });
    // setData(datas.slice(firstIndex + pageSize * (value - 1), pageSize * value));
  };

  useEffect(() => {
    refetch();
  }, [page]);

  if (Loading) {
    return (
      <Grid container spacing={4}>
        {[0, 1, 2, 3].map((data, index) => (
          <Grid key={index} item xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
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
        {AllProjects?.data?.map((data, index) => (
          <Grid key={index} item xs={12} sm={12} md={12} lg={4} xl={4}>
            <ReleaseCard
              projectData={data}
              languageName={languageName}
              refetch={refetch}
              loadingRefetch={loadingRefetch}
              page={page}
            />
          </Grid>
        ))}
      </Grid>
      <Stack spacing={2} sx={{ marginY: 8 }}>
        <Pagination
          count={Math.ceil(+AllProjects?.total / 9) || 1}
          page={page}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
        />
      </Stack>
    </Box>
  );
}

export default Releases;
