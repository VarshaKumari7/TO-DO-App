import React, { useState } from "react";
import "./to-do.css";
import Form from "./Form";
import Task from "./Task";
import Button from "./Button";
export default function Todo() {
  const [todoText, setTodoText] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  function formInput(event) {
    const valueData = event.target.value;
    setTodoText(valueData);
  }

  const submitHandler = () => {
    if (todoText.trim() !== "") {
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
    }
  };

  const handleCheckboxChange = (id) => {
    console.log(id, taskList);
    taskList.map((task) => {
      if (task.id == id) {
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
          <div className="form-box">
            <Form
              type={"text"}
              placeholder={"What needs to be done?"}
              value={todoText}
              onChange={formInput}
            />
            <Button submitHandler={submitHandler} title={"Add task"}></Button>
          </div>
          <Task
            type={"checkbox"}
            checked={isChecked}
            onChange={handleCheckboxChange}
            taskList={taskList}
          />
        </div>
      </div>
    </div>
  );
}
