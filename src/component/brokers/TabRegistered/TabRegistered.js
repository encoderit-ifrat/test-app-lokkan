import { Grid, Pagination, Skeleton, Stack } from "@mui/material";
import React, { useCallback, useState } from "react";
import TabRegisteredCard from "../TabRegisteredCard/TabRegisteredCard";
import { useDispatch, useSelector } from "react-redux";
import { findBrokerData } from "../../../redux/broker/actions";
import { useEffect } from "react";
import { useGetBrokerDataQuery } from "@/queries/useGetBrokerDataQuery";

import LinearProgress from "@mui/material/LinearProgress";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import BrokerSearch from "@/component/reuseable/brokerSearch/BrokerSearch";
import { debounce } from "@/utils/debounce";
import { set } from "date-fns";

function TabRegistered({
  languageName,
  searchValue,
  setSearchValue,
  brokerCountRefetch,
}) {
  const router = useRouter();
  const { query } = router;
  const [page, setPage] = React.useState(1);

  // const [searchValue, setSearchValue] = useState(() => query.name | "");

  // useEffect(() => {
  //   setSearchValue(query?.name);
  // }, [query?.name]);

  const {
    data: brokerUserData,
    isLoading: brokerLoading,
    isFetched,
    isFetching,
    refetch,
  } = useGetBrokerDataQuery({
    user_type: "broker",
    status: "active",
    page: page,
    per_page: 12,
    name: searchValue,
  });

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
  }, [page, searchValue, refetch]);

  const debouncedHandleSearch = debounce((e) => {
    setSearchValue(e.target.value);
    router.replace({
      query: { ...router.query, name: e.target.value, page: 1 },
    });
  }, 500);

  const handleSearchBroker = (value) => {
    debouncedHandleSearch(value);
  };

  if (brokerLoading || isFetching) {
    return (
      <Grid container spacing={1}>
        {[0, 1, 2, 3, 4, 5].map((data, index) => (
          <Grid key={index} item xs={12} sm={12} md={12} lg={4} xl={3} xxl={3}>
            <Skeleton
              variant="rect"
              height={260}
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
      <BrokerSearch
        handleSearchBroker={handleSearchBroker}
        searchValue={searchValue}
      />
      <Grid container spacing={2}>
        {brokerUserData?.data?.users?.data?.map((data, index) => (
          <Grid key={index} item xs={12} sm={12} md={12} lg={4} xl={3}>
            <TabRegisteredCard
              brokerInfo={data}
              languageName={languageName}
              brokerCountRefetch={brokerCountRefetch}
              refetch={refetch}
              page={page}
            />
          </Grid>
        ))}
      </Grid>
      <Stack spacing={2} sx={{ marginY: 8 }}>
        <Pagination
          count={Math.ceil(+brokerUserData?.data?.users?.total / 12) || 1}
          page={page}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
        />
      </Stack>
    </Box>
  );
}

export default TabRegistered;
