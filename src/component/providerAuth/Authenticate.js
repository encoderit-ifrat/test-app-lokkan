import { apiInstance, socialLoginApi, userDetailsApi } from "@/api";
import { CircularProgress, Container, Grid } from "@mui/material";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

function Authenticate({ provider = "google" }) {
  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    const getData = async () => {
      // Retrieve custom parameters from localStorage
      const storedParams = localStorage.getItem("customParams");

      const customParams = JSON.parse(storedParams);

      // Remove parameters from localStorage after retrieval
      localStorage.removeItem("customParams");

      // Clone and clean the query parameters
      let queryParams = { ...query, ...customParams };

      // Remove null, undefined, or empty string values
      Object.keys(queryParams).forEach(
        (key) =>
          (queryParams[key] === null ||
            queryParams[key] === undefined ||
            queryParams[key] === "") &&
          delete queryParams[key]
      );

      console.log({ query: queryParams }); // Debugging purpose

      try {
        const [errorAuth, responseAuth] = await socialLoginApi(
          queryParams,
          provider
        );

        if (!errorAuth) {
          if (responseAuth?.data?.data?.additional_info) {
            console.log("token", responseAuth?.data?.data?.token);
            localStorage.setItem("token", responseAuth?.data?.data?.token);
            apiInstance.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${responseAuth?.data?.data?.token}`;
            const [error, response] = await userDetailsApi();
            if (!error) {
              signIn("credentials", {
                userId: response?.data?.user?.id,
                userEmail: response?.data?.user?.email,
                name: response?.data?.user?.name,
                phone: response?.data?.user?.phone,
                status: response?.data?.user?.status,
                role: response?.data?.user?.roles[0]?.slug,
                roleId: response?.data?.user?.roles[0]?.id,
                userImage: response?.data?.user?.attachments[0]?.file_path,
                callbackUrl: "/my-properties",
              });
            }
          } else {
            localStorage.setItem(
              "registration_id",
              responseAuth?.data?.data?.user?.id
            );
            localStorage.setItem(
              "user_role",
              responseAuth?.data?.data?.user?.roles[0]?.id === 3
                ? "owner"
                : responseAuth?.data?.data?.user?.roles[0]?.id === 2
                ? "broker"
                : "buyer"
            );
            localStorage.setItem(
              "Reg_user_name",
              responseAuth?.data?.data?.user?.name
            );
            router.replace({ pathname: "/other-information" });
          }
        } else {
          toast.error(
            errorAuth?.response?.data?.message ||
              "Ocorreu um erro inesperado. Por favor, tente novamente.",
            {
              duration: 15000, // Duration in milliseconds (5000 ms = 5 seconds)
            }
          );
          router.replace({ pathname: "/" });
        }
      } catch (error) {
        console.error("An unexpected error occurred:", error);
        toast.error("Ocorreu um erro inesperado. Por favor, tente novamente.");
        router.replace({ pathname: "/" });
      }
    };

    if (query?.state) {
      getData();
    }
  }, [query, router, provider]); // Ensure to include `router` in the dependency array
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

export default Authenticate;
