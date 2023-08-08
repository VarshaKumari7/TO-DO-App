import React, { useState } from "react";
import "./to-do.css";
import Task from "./Task";
import Button from "./Button";
import Inputbox from "./Form";
export default function Todo() {
  const [todoText, setTodoText] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [isRed, setIsRed] = useState(false);

  function formInput(event) {
    const valueData = event.target.value;
    setTodoText(valueData);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      todoText.trim() !== "" &&
      !taskList.some((task) => task.taskName === todoText)
    ) {
      setTaskList((pretask) => {
        const task = {
          id: Math.random() * 1234,
          taskName: todoText,
          completed: false,
        };
        return [...pretask, task];
      });
      setTodoText("");
      console.log(taskList);
      console.log("30", todoText);
      setIsRed(false);
    } else {
      setIsRed(true);
    }
  };

  const handleCheckboxChange = (id) => {
    console.log(id, taskList);
    taskList.map((task) => {
      if (task.id === id) {
        task.completed = !task.completed;
        setIsChecked(!isChecked);
        return { ...task };
      }
      return task;
    });
    console.log(taskList);
  };
  return (
    <div className="container">
      <div className="body-container">
        <div className="content-part">
          <form className="form-box">
            <Inputbox
              type={"text"}
              placeholder={"What needs to be done?"}
              value={todoText}
              onChange={formInput}
              isRed={isRed}
            />
            <Button submitHandler={submitHandler} title={"Add task"}></Button>
          </form>
          <Task
            type={"checkbox"}
            checked={isChecked}
            onChange={handleCheckboxChange}
            taskList={taskList}
            setTaskList={setTaskList}
          />
        </div>
      </div>
    </div>
  );
}
