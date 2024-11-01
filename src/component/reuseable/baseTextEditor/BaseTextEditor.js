import React, { useEffect, useRef, useState } from "react";
import { Controller } from "react-hook-form";
import RichTextEditor from "react-rte";
import en from "locales/en";
import pt from "locales/pt";
function BaseTextEditor({ control, name, allValues }) {
  const [editorValue, setEditorValue] = useState(RichTextEditor.createEmptyValue());
  const [initialValueSet, setInitialValueSet] = useState(false);
  const [myValue, setMyValue] = useState("pt");
  const t = myValue === "en" ? en : pt;

  // Update editorValue when allValues.description changes, but only if not already set by the user
  useEffect(() => {
    if (!initialValueSet && allValues?.description) {
      setEditorValue(RichTextEditor.createValueFromString(allValues.description, "html"));
      setInitialValueSet(true);
    }
  }, [allValues?.description, initialValueSet]);
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={editorValue.toString("html")}
      render={({ field: { onChange, value } }) => (
        <RichTextEditor
          value={editorValue}
          onChange={(newValue) => {
            setEditorValue(newValue);
            onChange(newValue.toString("html"));
          }}
          placeholder={t["Property Description"]}
          editorClassName="demo-editor"
          editorStyle={{ height: 400 }}
        />
      )}
    />
  );
}

export default BaseTextEditor;
