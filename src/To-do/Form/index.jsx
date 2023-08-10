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
  // console.log("4", isRed, value, typeof value);
  // const valueValidator = () => {
  //   if (value) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };
  return (
    <div className={`form ${isRed ? "form-validation" : ""}`}>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        autoFocus
        ref={referenceInput}
      />
    </div>
  );
}
