import React, { useEffect, useState } from "react";
import "./to-do.css";
import Task from "./Task";
import Button from "./Button";
import Inputbox from "./Form";
import { useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Todo() {
  const [todoText, setTodoText] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [isRed, setIsRed] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editedTodo, setEditedTodo] = useState({});
  const [currentCategory, setCurrentCategory] = useState("all");
  // const [deadline, setDeadline] = useState(null);
  const [date, setDate] = useState(new Date());
  const [endDate, setEndDate] = useState();

  const handleChange = (range) => {
    const [date, endDate] = range;
    setDate(date);
    setEndDate(endDate);
  };

  // console.log(editedTodo, "editedTodo");
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
      // console.log("editedData 39", editedData);
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
      deadline: endDate ? endDate.toISOString() : null,
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
      setEndDate(null);
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

  // const componentOnMount = () => {
  //   const data = JSON.parse(localStorage.getItem("todotask"));
  //   console.log("get data from localstorage", data);
  //   if (data) {
  //     setTaskList([...data]);
  //   }
  // };

  const componentOnMount = () => {
    const data = JSON.parse(localStorage.getItem("todotask"));
    if (data) {
      const tasksWithParsedDeadline = data.map((task) => {
        if (task.deadline) {
          return {
            ...task,
            deadline: new Date(task.deadline),
          };
        }
        return task;
      });

      setTaskList([...tasksWithParsedDeadline]);
    }
  };
  useEffect(componentOnMount, [endDate, editedTodo]);

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

  function getTimeRemaining(endDate) {
    if (!endDate) return "No deadline set";

    const now = new Date();
    const timeDiff = endDate - now;

    if (timeDiff <= 0) {
      const expiredDays = Math.abs(
        Math.floor(timeDiff / (1000 * 60 * 60 * 24))
      );
      const expiredHours = Math.abs(
        Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      );
      const expiredMinutes = Math.abs(
        Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
      );

      return `Deadline Expired ${expiredDays} days ${expiredHours} hours ${expiredMinutes} minutes ago`;
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

    return `Deadline in ${days} days ${hours} hours ${minutes} minutes`;
  }

  const referenceInput = useRef(null);

  const dataPickerHandler = () => {};

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
            <DatePicker
              selected={date}
              onChange={handleChange}
              startDate={date}
              endDate={endDate}
              selectsRange
              dateFormat="MM/dd/yyyy kk:mm aa"
              // showTimeSelect
              // minTime={new Date(0, 0, 0, 1, 0)}
              // maxTime={new Date(0, 0, 0, 24, 0)}
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
            getTimeRemaining={getTimeRemaining}
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
