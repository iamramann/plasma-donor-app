import React from "react";
import { ErrorMessage, useField } from "formik";
const TextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <input
        className={meta.touched && meta.error && "is-invalid"}
        {...field}
        {...props}
      />
      <small style={{ color: "red" }}>
        <ErrorMessage component="div" name={field.name} className="error" />
      </small>
    </>
  );
};

export default TextField;
