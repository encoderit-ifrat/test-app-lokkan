import {
  Box,
  Grid,
  LinearProgress,
  Pagination,
  Skeleton,
  Stack,
} from "@mui/material";
import React from "react";
import NewRegistrationCard from "../NewRegistrationCard/NewRegistrationCard";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { findPropertyData } from "../../../redux/property/actions";
import { useEffect } from "react";
import { useGetPropertyQuery } from "@/queries/useGetPropertyQuery";
import HouseCard from "@/component/reuseable/HouseCard/HouseCard";
import WishPropertyCard from "../WishPropertyCard/WishPropertyCard";
import Link from "next/link";

function WishProperty({ languageName, loadingRefetch }) {
  const router = useRouter();
  const { query } = router;

  const [page, setPage] = React.useState(1);
  useEffect(() => {
    setPage(+query?.page);
  }, [query]);

  const {
    data: newProperty,
    isLoading: Loading,
    refetch,
    isFetched,
    isFetching,
  } = useGetPropertyQuery({ status: "wishlist", page: page, per_page: 9 });

  console.log({ newProperty });

  const handlePageChange = (event, value) => {
    setPage(value);
    router.replace({
      query: { ...router.query, page: value },
    });
  };

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  if (Loading) {
    return (
      <Grid container spacing={4}>
        {[0, 1, 2, 3].map((data, index) => (
          <Grid key={index} item xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
            <Skeleton
              variant="rect"
              height={220}
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
      <Grid container spacing={4}>
        {newProperty?.data?.map((data, index) => (
          <Grid key={index} item xs={12} sm={12} md={12} lg={6} xl={4} xxl={4}>
            <Link
              href={`/visualizacao-da-propriedade/${data?.id}/${data?.property_title}`}
              as={`/visualizacao-da-propriedade/${data.id}/${data?.property_title}`}
            >
              <a
                style={{
                  textDecoration: "none",
                  listStyle: "none",
                  width: "100%",
                }}
              >
                <WishPropertyCard
                  propertyInfo={data}
                  languageName={languageName}
                  refetch={refetch}
                  loadingRefetch={loadingRefetch}
                />
              </a>
            </Link>
          </Grid>
        ))}
      </Grid>
      <Stack spacing={2} sx={{ marginY: 8 }}>
        <Pagination
          count={Math.ceil(newProperty?.total / 9) || 1}
          page={page}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
        />
      </Stack>
    </Box>
  );
}

export default WishProperty;
