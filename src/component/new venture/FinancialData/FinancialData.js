import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect } from "react";
import ventureImage from "../../../../public/Images/certidoes.png";
import { useDropzone } from "react-dropzone";
import { useMemo } from "react";
import BaseTextField from "@/component/reuseable/baseTextField/BaseTextField";
import { Controller } from "react-hook-form";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import BaseAutocomplete from "@/component//reuseable/baseAutocomplete/BaseAutocomplete";
import en from "locales/en";
import pt from "locales/pt";
import BaseButton from "@/component/reuseable/baseButton/BaseButton";
import { useRouter } from "next/router";
import BaseValueField from "@/component/reuseable/baseValueField/BaseValueFiled";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "50px",
  borderWidth: 2,
  borderRadius: "4px",
  borderColor: "#DBE1E5",
  borderStyle: "dashed",
  backgroundColor: "#F2F5F6",

  color: "#c4c4c4",
  outline: "none",
  transition: "border .24s ease-in-out",
  width: "100%",
  marginTop: "2vh",
};

const activeStyle = {
  borderColor: "#f2f",
};

const acceptStyle = {
  borderColor: "#f8f",
};

const rejectStyle = {
  borderColor: "#f2f",
};

function FinancialData({
  control,
  errors,
  documents,
  setDocuments,
  languageName,
  allValues,
  setValue,
  reset,
  replace,
}) {
  const t = languageName === "en" ? en : pt;

  const router = useRouter();

  console.log({ allValues });

  const onDrop = (acceptedFiles) => {
    acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );

    const allFiles = [...documents, ...acceptedFiles]; //save all files here

    setDocuments(allFiles);
  };
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [],
      "application/msword": [],
    },
  });

  const handleDelete = (index) => {
    const filterItem = documents.filter(
      (file, fileIndex) => fileIndex !== index
    );
    setDocuments(filterItem);
  };

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  return (
    <Box sx={{ mt: 4 }}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mt: 2 }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Image src={ventureImage} alt="venture" />

          <Typography
            variant="p"
            sx={{
              color: "#002152",
              fontSize: "24px",
              fontWeight: "700",
              lineHeight: "32px",
              ml: 1,
            }}
          >
            {t["Financial Data"]}
          </Typography>
        </Stack>
        <BaseButton
          color="error"
          sx="error"
          variant="outlined"
          handleFunction={() => {
            router.back();
          }}
        >
          {t["Cancel"]}
        </BaseButton>
      </Grid>

      <Grid container spacing={4} sx={{ mt: 3 }}>
        <Grid item xs={12} md={6}>
          <Grid
            item
            xs={12}
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Typography
              variant="p"
              sx={{
                color: "#253858",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "16px",
                mb: 1,
              }}
            >
              {t["Prohibited"]}
            </Typography>
          </Grid>
          <Controller
            name="prohibited"
            control={control}
            // defaultValue={{}}
            render={({ field }) => (
              <BaseAutocomplete
                //   sx={{ margin: "0.6vh 0" }}
                options={demoData || []}
                getOptionLabel={(option) => option || ""}
                isOptionEqualToValue={(option, value) => option === value}
                size={"medium"}
                placeholder={`% ${t["Prohibited"]}`}
                onChange={(e, v, r, d) => field.onChange(v)}
                value={field.value || null}
              />
            )}
          />
          <Typography
            variant="inherit"
            color="textSecondary"
            sx={{ color: "#b91c1c" }}
          >
            {errors.state?.message}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid
            item
            xs={12}
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Typography
              variant="p"
              sx={{
                color: "#253858",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "16px",
                mb: 1,
              }}
            >
              {t["Adjustment index"]}
            </Typography>
          </Grid>
          <Controller
            name="adjustment_index"
            control={control}
            // defaultValue={{}}
            render={({ field }) => (
              <BaseAutocomplete
                //   sx={{ margin: "0.6vh 0" }}
                options={demoData || []}
                getOptionLabel={(option) => option || ""}
                isOptionEqualToValue={(option, value) => option === value}
                size={"medium"}
                placeholder={t[`Adjustment index`]}
                onChange={(e, v, r, d) => field.onChange(v)}
                value={field.value || null}
              />
            )}
          />
          <Typography
            variant="inherit"
            color="textSecondary"
            sx={{ color: "#b91c1c" }}
          >
            {errors.state?.message}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid
            item
            xs={12}
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Typography
              variant="p"
              sx={{
                color: "#253858",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "16px",
                mb: 1,
              }}
            >
              {t["Number of installments"]}
            </Typography>
          </Grid>
          <Controller
            name="number_of_installments"
            control={control}
            // defaultValue={{}}
            render={({ field }) => (
              <BaseAutocomplete
                //   sx={{ margin: "0.6vh 0" }}
                options={numberOfInstallment || []}
                getOptionLabel={(option) => option || ""}
                isOptionEqualToValue={(option, value) => option === value}
                size={"medium"}
                placeholder={t[`Number of installments`]}
                onChange={(e, v, r, d) => field.onChange(v)}
                value={field.value || null}
              />
            )}
          />
          <Typography
            variant="inherit"
            color="textSecondary"
            sx={{ color: "#b91c1c" }}
          >
            {errors.state?.message}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid
            item
            xs={12}
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Typography
              variant="p"
              sx={{
                color: "#253858",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "16px",
                mb: 1,
              }}
            >
              {t["Value per square meter"]}
            </Typography>
          </Grid>
          <Controller
            name="value_per_square_meter"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <BaseValueField
                size={"medium"}
                placeholder={`R$ ${t["Value per square meter"]}`}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                name={"city"}
                value={field.value}
              />
            )}
          />
          <Typography
            variant="inherit"
            color="textSecondary"
            sx={{ color: "#b91c1c" }}
          >
            {errors.city?.message}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ mt: 3 }}>
            <Typography
              variant="p"
              sx={{
                color: "#002152",
                fontSize: "16px",
                fontWeight: "400",
                lineHeight: "22px",
              }}
            >
              Purchase and sale contract
            </Typography>
          </Box>

          <Box {...getRootProps({ style })}>
            <input {...getInputProps()} />
            <Typography
              variant="p"
              sx={{
                color: "#6C7A84",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "18px",
                mt: 1,
              }}
            >
              {t["Drag and drop documents here"]}
            </Typography>
            <Typography
              variant="p"
              sx={{
                color: "#6C7A84",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "18px",
                mt: 1,
              }}
            >
              {t["or"]}
            </Typography>
            <Button
              variant="contained"
              sx={{
                textTransform: "none",
                mt: 1,
                background: "#0362F0",
                color: "#ffffff",
                fontSize: "14px",
                fontWeight: "600",
                lineHeight: "18px",
              }}
            >
              {t["select documents"]}
            </Button>
            <Typography
              variant="inherit"
              color="textSecondary"
              sx={{ color: "#b91c1c" }}
            >
              {errors?.document_files?.message}
            </Typography>
          </Box>
          {documents?.length > 0 && (
            <Grid container spacing={1} sx={{ mt: 3 }}>
              {documents?.map((file, index) => (
                <Grid item xs={12} sm={12} md={4} lg={3} xl={3} key={index}>
                  <Box
                    sx={{
                      p: 2,
                      boxSizing: "border-box",
                      border: "1px solid #DBE1E5",
                      borderRadius: "6px",
                    }}
                  >
                    <Grid
                      container
                      direction="row"
                      justifyContent="flex-end"
                      alignItems="flex-start"
                    >
                      <DeleteOutlineOutlinedIcon
                        sx={{
                          background: "#F44336",
                          color: "#ffffff",
                          borderRadius: "50%",
                          height: "3vh",
                          width: "3vh",
                          paddingY: "3px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleDelete(index)}
                      />
                    </Grid>

                    <Typography
                      variant="p"
                      sx={{ color: "#38bdf8", fontWeight: "600" }}
                    >
                      {file?.name?.slice(0, 15) || file?.title?.slice(0, 15)}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default FinancialData;

const featureTypeData = [
  "condominium",
  "accessibility",
  "amenties",
  "appliances",
  "room",
  "sorrounding",
  "wellbeing",
  "feature",
];

const numberOfInstallment = ["2", "4", "6", "8"];

const demoData = [
  "The Godfather",
  "The Godfather: Part II",
  "The Dark Knight",
  "12 Angry Men",
];
