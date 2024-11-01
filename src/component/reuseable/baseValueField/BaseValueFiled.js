import { formatBrCurrency } from "@/utils/formatBrCurrency";
import { TextField } from "@mui/material";
import React from "react";

const formatBrazilianCurrency = (input) => {
  // if (!value) return value;

  // // Remove non-numeric characters except for commas and periods
  // let formattedValue = value.replace(/[^\d,]/g, "");

  // // Replace periods with temporary placeholders
  // formattedValue = formattedValue.replace(/\./g, "");

  // // Split the value into integer and decimal parts
  // let parts = formattedValue.split(",");

  // // Remove leading zeros
  // parts[0] = parts[0].replace(/^0+/, "");

  // // Add thousand separators
  // parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  // // Join integer and decimal parts
  // return "R$ " + (parts.length > 1 ? parts[0] + "," + parts[1] : parts[0]);
  let value = input.replace(/\D/g, ""); // Remove all non-numeric characters
  value = (value / 100).toFixed(2) + ""; // Convert to a float and format to 2 decimal places
  value = value.replace(".", ","); // Replace decimal point with comma
  value = value.replace(/(\d)(?=(\d{3})+\,)/g, "$1."); // Add thousand separators
  return `R$ ${value}`;
};

function BaseValueField({
  size,
  label,
  placeholder,
  value,
  onChange,
  name,
  type,
  sx,
  InputProps,
  InputLabelProps,
  inputProps,
  autoComplete,
  error,
  required,
  multiline,
  disabled,
  helperText,
}) {
  const handleChange = (e) => {
    const rawValue = e.target.value;
    const formattedValue = formatBrazilianCurrency(rawValue);
    onChange({
      ...e,
      target: {
        ...e.target,
        value: formattedValue,
      },
    });
  };
  return (
    <TextField
      fullWidth
      size={size}
      label={label}
      type={"text"}
      InputLabelProps={InputLabelProps}
      inputProps={inputProps}
      placeholder={placeholder}
      autoComplete={autoComplete}
      value={value}
      onChange={handleChange}
      name={name}
      variant="outlined"
      sx={sx}
      disabled={disabled}
      InputProps={InputProps}
      error={error}
      multiline={multiline}
      required={required}
      helperText={helperText}
    />
  );
}

export default BaseValueField;
