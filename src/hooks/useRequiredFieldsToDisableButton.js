import React, { useEffect, useState } from "react";

const useRequiredFieldsToDisableButton = (
  fields,
  values,
  initialState = true
) => {
  const [disableBtn, setDisableBtn] = useState(initialState);
  useEffect(() => {
    setDisableBtn(
      fields.some((field) => values[field] == null || values[field] == "")
    );
  }, [values, fields]);
  return [disableBtn, setDisableBtn];
};

export default useRequiredFieldsToDisableButton;
