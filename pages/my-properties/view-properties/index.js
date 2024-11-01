import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  LinearProgress,
  Pagination,
  Skeleton,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Link from "next/link";
import { useGetPropertyQuery } from "@/queries/useGetPropertyQuery";
import RentCard from "@/component/reuseable/rentCard/RentCard";
import SearchIcon from "@mui/icons-material/Search"; // Import the search icon
import { debounce } from "@/utils/debounce";

const drawerWidth = 240;

function ViewProperty() {
  const router = useRouter();
  const { query } = router;

  const [page, setPage] = React.useState(1);
  const [searchTerm, setSearchTerm] = useState(query?.all || "");

  // useEffect(() => {
  //   if (query?.all) {
  //     setSearchTerm(query?.all);
  //   }
  // }, [query?.all]);

  useEffect(() => {
    setPage(+query?.page);
  }, [query]);

  const {
    data: thirdProperty,
    isLoading: Loading,
    refetch,
    // isFetched,
    // isFetching,
  } = useGetPropertyQuery({
    project_id: query?.project_id,
    page: page,
    per_page: 9,
    all: searchTerm,
  });

  const handlePageChange = (event, value) => {
    setPage(value);
    router.replace({
      query: { ...router.query, page: value },
    });
  };

  useEffect(() => {
    refetch();
  }, [page, searchTerm, refetch]);

  const debouncedHandleSearch = debounce((e) => {
    setSearchTerm(e.target.value);
    router.replace({
      query: { ...router.query, all: e.target.value, page: 1 }, // Update the query with 'all' key and reset page
    });
  }, 1000);

  const handleSearchChange = (value) => {
    debouncedHandleSearch(value);
  };

  if (Loading) {
    return (
      <Container maxWidth="xl" sx={{ mt: 5 }}>
        <Grid container spacing={4}>
          {[0, 1, 2, 3].map((data, index) => (
            <Grid
              key={index}
              item
              xs={12}
              sm={12}
              md={12}
              lg={6}
              xl={6}
              xxl={6}
            >
              <Skeleton
                variant="rect"
                height={220}
                sx={{ mx: 2, my: 2, borderRadius: "8px" }}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  // if (isFetched && isFetching) {
  //   return (
  //     <Container maxWidth="md" sx={{ px: 2, py: 0 }}>
  //       <Grid
  //         container
  //         direction="row"
  //         justifyContent="center"
  //         alignItems="center"
  //         sx={{ height: "100vh" }}
  //       >
  //         <CircularProgress size="8rem" />
  //       </Grid>
  //     </Container>
  //   );
  // }

  const goBack = () => {
    router.back();
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        background: "#F2F5F6",
        minHeight: "100vh",
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        paddingX: { xs: 0, sm: 0, md: 6, lg: 6, xl: 6 },
        paddingTop: { xs: 6, sm: 6, md: 6, lg: 8, xl: 3 },
        paddingBottom: { xs: 3, sm: 3, md: 3, lg: 4, xl: 3 },
      }}
    >
      <Container maxWidth="xl" sx={{ mt: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={4} sm={4} lg={3} xl={2}>
            <Button
              color="inherit"
              fullWidth
              // disabled={activeStep === 0}
              onClick={goBack}
              sx={{
                mr: 1,
                border: "1px solid #002152",
                borderRadius: "4px",
                px: 2,
                py: 1,
                color: "#002152",
                fontSize: "16px",
                fontWeight: "600",
                lineHeight: "22px",
                textTransform: "none",
              }}
            >
              voltar
            </Button>
          </Grid>
          <Grid item xs={8} sm={8} lg={9} xl={10}>
            <TextField
              variant="outlined"
              defaultValue={searchTerm}
              sx={{ mb: 4 }}
              placeholder={"procurar"}
              size="small"
              onChange={handleSearchChange}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" aria-label="Search by broker name">
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          {thirdProperty?.data?.map((data, index) => (
            <Grid
              key={index}
              item
              xs={12}
              sm={12}
              md={12}
              lg={6}
              xl={6}
              xxl={6}
              sx={{ cursor: "pointer" }}
            >
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
                  <RentCard
                    propertyData={data}
                    languageName={"pt"}
                    page={page}
                  />
                </a>
              </Link>
            </Grid>
          ))}
        </Grid>
        <Stack spacing={2} sx={{ marginY: 8 }}>
          <Pagination
            count={Math.ceil(thirdProperty?.total / 9) || 1}
            page={page}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
          />
        </Stack>
      </Container>
    </Box>
  );
}

export default ViewProperty;
