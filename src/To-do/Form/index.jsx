import React from "react";
import "./form.css";
export default function Form({ name, type, value, onChange, placeholder }) {
  return (
    <div className="form form-validation">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}
