import { InputAdornment, OutlinedInput, Typography } from "@mui/material";
import React from "react";
import { IMaskInput } from "react-imask";

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="00 00000 0000"
      definitions={{
        "#": /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

function BaseOutlinedPhoneInput({
  placeholder,
  label,
  value,
  onChange,
  size,
  name,
  error,
}) {
  // const [values, setValues] = React.useState({
  //   textmask: "",
  // });

  // const handleChange = (event) => {
  //   setValues({
  //     ...values,
  //     [event.target.name]: event.target.value,
  //   });
  // };

  return (
    <OutlinedInput
      fullWidth
      // value={values.textmask}
      onChange={onChange}
      name={name}
      value={value}
      placeholder={placeholder}
      id="formatted-text-mask-input"
      inputComponent={TextMaskCustom}
      label={label}
      size={size}
      startAdornment={
        <InputAdornment position="start">
          <Typography variant="p" sx={{ color: "#7450F0" }}>
            +55
          </Typography>
        </InputAdornment>
      }
    />
  );
}

export default BaseOutlinedPhoneInput;
