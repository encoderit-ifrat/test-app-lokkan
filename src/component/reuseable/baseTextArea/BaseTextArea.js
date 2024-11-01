import { TextareaAutosize } from "@mui/material";
import React from "react";

function BaseTextArea({
  size,
  label,
  placeholder,
  style,
  value,
  onChange,
  name,
  type,
  sx,
  InputProps,
  error,
  required,
  minRows,
}) {
  return (
    <TextareaAutosize
      aria-label="minimum height"
      minRows={minRows}
      placeholder={placeholder}
      style={style}
      onChange={onChange}
      value={value}
    />
  );
}

export default BaseTextArea;
