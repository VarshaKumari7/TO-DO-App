import React from "react";
import "../Form/form.css";
export default function Button({
  submitHandler,
  className = "bttn",
  title,
  // children,
  ...props
}) {
  return (
    <div className="btn-section">
      <button className={className} onClick={submitHandler} {...props}>
        {/* {children} */}
        {title}
      </button>
    </div>
  );
}
