import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import cardMedia from "../../../../public/Images/CardMedia.png";
import Image from "next/image";
import Link from "next/link";
import { _baseURL, _imageURL } from "../../../../consts";
import en from "locales/en";
import pt from "locales/pt";
import { useSession } from "next-auth/react";
import { useProjectDeleteMutation } from "@/queries/useProjectDeleteMutation";

function ReleaseCard({
  projectData,
  languageName,
  page,
  refetch,
  loadingRefetch,
}) {
  const t = languageName === "en" ? en : pt;
  const { data: session } = useSession();
  const myLoader = ({ src }) => {
    return `${_imageURL}/${src}`;
  };

  const mutation = useProjectDeleteMutation(page);

  const handleDeleteProject = (id, event) => {
    event.preventDefault();
    const body = {
      project_id: id,
    };
    mutation.mutate(body, {
      onError(error) {
        console.log(error);
      },
      onSuccess: async (data) => {
        await refetch();
        await loadingRefetch();
      },
    });
  };

  return (
    <Link href={`/visualizacao-do-projeto/${projectData?.id}`}>
      <Box
        sx={{
          background: "#ffffff",
          boxShadow: "0px 4px 8px rgba(0, 33, 82, 0.08)",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Image
            loader={myLoader}
            src={`${projectData?.attachments[0]?.file_path}`}
            width={600}
            height={400}
            alt="aston"
          />
        </Box>
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Typography
            variant="p"
            sx={{
              fontSize: "22px",
              fontWeight: "700",
              color: "#1A1859",
              lineHeight: "32px",
              px: 2,
              py: 2,
            }}
          >
              {projectData?.name.length > 35
              ? `${projectData?.name.slice(0, 35)}..`
              : projectData?.name}
            {/* {projectData?.name} */}
          </Typography>
          <Typography
            variant="p"
            sx={{
              fontSize: "18px",
              fontWeight: "400",
              color: "#6C7A84",
              lineHeight: "28px",
              px: 2,
              py: 1,
            }}
          >
            {`${projectData?.properties_count} ${t["Properties"]} cadastrados`}
          </Typography>
          <Typography
            variant="p"
            sx={{
              fontSize: "18px",
              fontWeight: "400",
              color: "#6C7A84",
              lineHeight: "28px",
              px: 2,
              py: 1,
            }}
          >
            {`${projectData?.sold} ${t["Properties"]} vendidos`}
          </Typography>

          <Link
            href={{
              pathname: "/my-properties/view-properties",
              query: {
                status: "approved",
                project_id: projectData?.id,
                page: 1,
                per_page: 9,
              },
            }}
          >
            <a
              style={{
                textDecoration: "none",
                listStyle: "none",
                width: "100%",
              }}
            >
              <Button
                sx={{
                  textTransform: "none",
                  border: "1px solid #002152",
                  borderRadius: "4px",
                  color: "#002152",
                  fontSize: "16px",
                  fontWeight: "600",
                  width: {
                    xs: "92%",
                    sm: "92%",
                    md: "92%",
                    lg: "85%",
                    xl: "92%",
                  },
                  mx: 2,
                  my: 2,
                }}
              >
                {t["View Properties"]}
              </Button>
            </a>
          </Link>
          {session?.user?.role === "admin" && (
            <Link
              href={{
                pathname: "/my-properties/new-venture",
                query: {
                  project_id: projectData?.id,
                },
              }}
            >
              <Button
                sx={{
                  textTransform: "none",
                  border: "1px solid #002152",
                  borderRadius: "4px",
                  color: "#002152",
                  fontSize: "16px",
                  fontWeight: "600",
                  width: {
                    xs: "92%",
                    sm: "92%",
                    md: "92%",
                    lg: "85%",
                    xl: "92%",
                  },
                  mx: 2,
                  mb: 2,
                }}
              >
                {t["Edit"]}
              </Button>
            </Link>
          )}
          {session?.user?.role === "admin" && (
            <Button
              sx={{
                textTransform: "none",
                border: "1px solid red",
                borderRadius: "4px",
                color: "red",
                fontSize: "16px",
                fontWeight: "600",
                width: {
                  xs: "92%",
                  sm: "92%",
                  md: "92%",
                  lg: "85%",
                  xl: "92%",
                },
                mx: 2,
                mb: 2,
              }}
              onClick={(event) => handleDeleteProject(projectData?.id, event)}
            >
              Excluir
            </Button>
          )}
        </Grid>
      </Box>
    </Link>
  );
}

export default ReleaseCard;
