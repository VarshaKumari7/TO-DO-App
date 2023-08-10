import React, { useEffect, useState } from "react";
import "./to-do.css";
import Task from "./Task";
import Button from "./Button";
import Inputbox from "./Form";
import { useRef } from "react";
export default function Todo() {
  const [todoText, setTodoText] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [isRed, setIsRed] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editedTodo, setEditedTodo] = useState({});
  const [currentCategory, setCurrentCategory] = useState("all");

  console.log(editedTodo, "editedTodo");
  function formInput(event) {
    const valueData = event.target.value;
    setTodoText(valueData);
  }

  function handleEdit(editEvent) {
    const task = editEvent;
    setTaskList((preval) => {
      const editedData = preval.map((taskval) => {
        if (taskval.id === task.id) {
          taskval["taskName"] = todoText;
        }
        return taskval;
      });
      console.log("editedData 39", editedData);
      const data = JSON.stringify([...editedData]);
      localStorage.setItem("todotask", data);
      return [...editedData];
    });
    setIsEdit(false);
    setTodoText("");
  }

  function addTaskHandler() {
    const task = {
      id: Math.random() * 1234,
      taskName: todoText,
      completed: false,
    };
    if (
      todoText.trim() !== "" &&
      !taskList.some((task) => task.taskName === todoText)
    ) {
      setTaskList((pretask) => {
        const data = JSON.stringify([...pretask, task]);
        localStorage.setItem("todotask", data);
        return [...pretask, task];
      });
      setTodoText("");
      setIsRed(false);
    } else {
      setIsRed(true);
    }
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if (isEdit) {
      handleEdit(editedTodo);
    } else {
      addTaskHandler(todoText);
    }
  };

  const componentOnMount = () => {
    const data = JSON.parse(localStorage.getItem("todotask"));
    if (data) {
      setTaskList([...data]);
    }
  };
  useEffect(componentOnMount, []);

  const handleCheckboxChange = (id) => {
    taskList.map((task) => {
      if (task.id === id) {
        task.completed = !task.completed;
        setIsChecked(!isChecked);
        return { ...task };
      }
      return task;
    });
  };

  const referenceInput = useRef(null);

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
              referenceInput={referenceInput}
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
            setEditedTodo={setEditedTodo}
            referenceInput={referenceInput}
            currentCategory={currentCategory}
          />
        </div>
        <div className="book-list" style={{ cursor: "pointer" }}>
          <div className="btn" onClick={() => setCurrentCategory("all")}>
            All
          </div>
          <div className="btn" onClick={() => setCurrentCategory("active")}>
            Active
          </div>
          <div className="btn" onClick={() => setCurrentCategory("completed")}>
            Completed
          </div>
        </div>
      </div>
    </div>
  );
}
