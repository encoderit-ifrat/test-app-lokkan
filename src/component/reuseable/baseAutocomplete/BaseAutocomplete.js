import { Autocomplete, TextField } from "@mui/material";
import React from "react";

function BaseAutocomplete({
  options,
  placeholder,
  sx,
  size,
  value,
  onChange,
  getOptionLabel,
  label,
  isOptionEqualToValue,
  inputTextColor,
  defaultValue,
  inputValue,
  onInputChange,
}) {
  return (
    <Autocomplete
      sx={sx}
      disablePortal
      fullWidth
      size={size}
      id="combo-box-demo"
      options={options}
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={isOptionEqualToValue}
      onChange={onChange}
      defaultValue={defaultValue}
      value={value}
      inputValue={inputValue}
      onInputChange={onInputChange}
      freeSolo
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder}
          {...params}
          label={label}
          InputProps={{
            ...params.InputProps,
            sx: inputTextColor, // Change input text color
          }}
          InputLabelProps={{
            ...params.InputLabelProps,
            sx: inputTextColor, // Change label color
          }}
        />
      )}
    />
  );
}

export default BaseAutocomplete;
