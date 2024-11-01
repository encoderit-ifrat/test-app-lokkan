import { formatBrazilianCurrency } from "@/utils/useUtilities";
import { OutlinedInput, TextField } from "@mui/material";
import React from "react";

import { NumericFormat } from "react-number-format";

const NumericFormatCustom = React.forwardRef(function NumericFormatCustom(
  props,
  ref
) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      valueIsNumericString
      prefix="R$"
    />
  );
});

function BaseOutlinedCurrencyInput({
  placeholder,
  label,
  value,
  onChange,
  size,
  name,
  type,
  sx,
}) {
  return (
    <TextField
      onChange={onChange}
      name={name}
      value={formatBrazilianCurrency(value)}
      // value={value}
      type={type}
      placeholder={placeholder}
      id="formatted-text-mask-input"
      label={label}
      size={size}
      // InputProps={{
      //   inputComponent: NumericFormatCustom,
      // }}
      variant="outlined"
      sx={sx}
    />
  );
}

export default BaseOutlinedCurrencyInput;
