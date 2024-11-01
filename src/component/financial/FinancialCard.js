import {
  Box,
  CircularProgress,
  Container,
  Grid,
  LinearProgress,
  Pagination,
  Skeleton,
  Stack,
} from "@mui/material";
import React, { useEffect } from "react";
import FinancialElement from "./FinancialElement";
import { useGetFinancialQuery } from "@/queries/useGetFinancialQuery";
import { useRouter } from "next/router";

function FinancialCard({ language }) {
  const router = useRouter();
  const { query } = router;
  const [page, setPage] = React.useState(1);
  const {
    data: financialData,
    isLoading: financialLoading,
    isFetched,
    isFetching,
    refetch,
  } = useGetFinancialQuery({ page: page, per_page: 12 });

  const handlePageChange = (event, value) => {
    setPage(value);
    router.replace({
      query: { ...router.query, page: +value },
    });
  };

  useEffect(() => {
    setPage(+query?.page || 1);
  }, [query?.page]);

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  if (financialLoading || isFetching) {
    return (
      <Grid container spacing={1}>
        {[0, 1, 2, 3].map((data, index) => (
          <Grid key={index} item xs={12} sm={12} md={12} lg={6}>
            <Skeleton
              variant="rect"
              height={460}
              sx={{ mx: 2, my: 2, borderRadius: "8px" }}
            />
          </Grid>
        ))}
      </Grid>
    );
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
    <Box>
      <Grid container spacing={3}>
        {financialData?.data?.map((data) => (
          <Grid key={data?.id} item xs={12} lg={6} xl={6}>
            <FinancialElement
              financialInfo={data}
              language={language}
              refetch={refetch}
            />
          </Grid>
        ))}
      </Grid>
      <Stack spacing={2} sx={{ marginY: 8 }}>
        <Pagination
          count={Math.ceil(+financialData?.data?.users?.total / 12) || 1}
          page={page}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
        />
      </Stack>
    </Box>
  );
}

export default FinancialCard;
