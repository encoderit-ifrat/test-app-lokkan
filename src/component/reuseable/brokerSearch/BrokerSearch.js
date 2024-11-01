import { Box, Button, Grid, IconButton, InputAdornment } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import BaseTextField from "../baseTextField/BaseTextField";
import pt from "locales/pt";
import { useRouter } from "next/router";
import { debounce } from "@/utils/debounce";

function BrokerSearch({ handleSearchBroker, searchValue }) {
  const t = pt;

  return (
    <Box sx={{ mt: 1, mb: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <BaseTextField
            defaultValue={searchValue}
            variant="outlined"
            placeholder={t["Search by name, city or neighborhood"]}
            size="small"
            fullWidth
            onChange={handleSearchBroker}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    aria-label="Search by business name or address..."
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        {/* <Grid item xs={2}>
        <Button
          variant="outlined"
          fullWidth
          onClick={handleFunction}
          sx={{
            fontSize: "16px",
            fontWeight: "600",
            lineHeight: "22px",
            color: "#002152",
            textTransform: "none",
            borderColor: "#002152",
            px: 2,
            py: 1,
            "&:hover": {
              color: "#002152",
              borderColor: "#002152",
            },
          }}
        >
          {t["filter"]}
        </Button>
      </Grid> */}
      </Grid>
    </Box>
  );
}

export default BrokerSearch;
