import React, { useState } from "react";

export default function Form() {
  const [inputValue, setInputValue] = useState("");

  function formInput(event) {
    console.log("formInput", event);
    setInputValue(event.target.value);
  }

  function submitHandler() {
    // setRow((preval) => {
    console.log("Task", inputValue);
    localStorage.setItem("Task-to-do", inputValue);
    //   return [...preval, inputValue];
    // });
  }
  return (
    <div className="form">
      <h2>Todo</h2>
      <div>
        <input
          type="text"
          name="task"
          //   value={}
          onChange={formInput}
        />
      </div>
      <div>
        <button className="bttn" onClick={submitHandler}>
          Submit
        </button>
      </div>
    </div>
  );
}
