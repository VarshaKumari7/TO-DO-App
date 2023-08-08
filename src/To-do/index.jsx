import React, { useEffect, useState } from "react";
import "./to-do.css";
import Task from "./Task";
import Button from "./Button";
import Inputbox from "./Form";
export default function Todo() {
  const [todoText, setTodoText] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [isRed, setIsRed] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  function formInput(event) {
    const valueData = event.target.value;
    setTodoText(valueData);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    const task = {
      id: Math.random() * 1234,
      taskName: todoText,
      completed: false,
    };
    if (isEdit) {
      setTaskList((preval) => {
        const editedData = preval.map((taskval) => {
          if (taskval.id === task.id) {
            return task.taskName;
          } else {
            return taskval;
          }
        });
        console.log("editedData 39", editedData);
        const data = JSON.stringify([...editedData]);
        localStorage.setItem("candidate", data);
        return [...editedData];
      });
    } else {
      if (
        todoText.trim() !== "" &&
        !taskList.some((task) => task.taskName === todoText)
      ) {
        setTaskList((pretask) => {
          // const task = {
          //   id: Math.random() * 1234,
          //   taskName: todoText,
          //   completed: false,
          // };
          const data = JSON.stringify([...pretask, task]);
          localStorage.setItem("todotask", data);
          // console.log("26 localData", data);
          return [...pretask, task];
        });
        setTodoText("");
        // console.log(taskList, "35");
        // console.log("36", todoText);
        setIsRed(false);
      } else {
        setIsRed(true);
      }
    }
  };

  const componentOnMount = () => {
    const data = JSON.parse(localStorage.getItem("todotask"));
    // console.log(data, "Data Value");
    if (data) {
      setTaskList([...data]);
    }
  };
  useEffect(componentOnMount, []);

  const handleCheckboxChange = (id) => {
    // console.log(id, taskList);
    taskList.map((task) => {
      if (task.id === id) {
        task.completed = !task.completed;
        setIsChecked(!isChecked);
        return { ...task };
      }
      return task;
    });
    // console.log(taskList);
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
            setTodoText={setTodoText}
            setIsEdit={setIsEdit}
          />
        </div>
      </div>
    </div>
  );
}
