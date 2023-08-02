import React, { useEffect, useState } from "react";
import "./to-do.css";
export default function Todo() {
  const [inputValue, setInputValue] = useState({ task: "" });
  const [row, setRow] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  function formInput(event) {
    console.log("formInput", event);
    const nameData = event.target.name;
    const valueData = event.target.value;
    console.log("9", valueData);
    console.log("10", inputValue);
    setInputValue((preval) => {
      return {
        ...preval,
        [nameData]: valueData,
      };
    });
  }

  const submitHandler = () => {
    setRow((preval) => {
      console.log("Task", inputValue);
      const data = JSON.stringify([...preval, inputValue]);
      localStorage.setItem("Task-to-do", data);
      return [...preval, inputValue];
    });
    console.log("object", row);
  };

  const onComponentMount = () => {
    const data = localStorage.getItem("Task-to-do");
    if (data) {
      const originaldata = JSON.parse(data);
      setRow([...originaldata]);
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  useEffect(onComponentMount, []);

  return (
    <center>
      <div className="container">
        <h1>Todo App</h1>

        {row.map((ele) => (
          <div className="items-row">
            <div class="check-box">
              <input
                className="checkbox"
                type="checkbox"
                value=""
                id="flexCheckChecked"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <span className="todos">{ele.task}</span>
            </div>
            {isChecked && <small className="msg">complete</small>}
          </div>
        ))}

        <div className="form">
          <h2>Todo</h2>
          <div>
            <input type="text" name="task" onChange={formInput} />
          </div>
          <div>
            <button className="bttn" onClick={submitHandler}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </center>
  );
}
