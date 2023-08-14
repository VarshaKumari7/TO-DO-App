import React from "react";
import "./form.css";
export default function Inputbox({
  name,
  type,
  value,
  onChange,
  placeholder,
  isRed,
  referenceInput,
}) {
  return (
    <div className={`form ${isRed ? "form-validation" : ""}`}>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        // autoFocus
        ref={referenceInput}
      />
    </div>
  );
}
