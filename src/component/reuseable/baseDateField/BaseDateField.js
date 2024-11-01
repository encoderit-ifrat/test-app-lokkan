import React from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { Stack, TextField } from "@mui/material";
import { ptBR } from "date-fns/locale";

function BaseDateField({
  onChange,
  value,
  placeholder,
  name,
  onBlur,
  size,
  error,
  sx,
}) {
  return (
    <LocalizationProvider locale={ptBR} dateAdapter={AdapterDateFns}>
      <Stack>
        {/* <Controller
          name="Date_Purchased"
          control={control}
          defaultValue={formatISO(new Date())}
          render={({ field: { onChange, value } }) => ( */}
        <DesktopDatePicker
          inputFormat="dd-MM-yyyy"
          value={value}
          //   onChange={(value) => onChange(moment(value).format("YYYY-MM-DD"))}
          onChange={onChange}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={placeholder}
              name={name}
              size={size}
              variant="outlined"
              sx={sx}
            />
          )}
        />
        {/* )} /> */}
      </Stack>
    </LocalizationProvider>
  );
}

export default BaseDateField;
