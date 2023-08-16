import React, { useEffect, useState } from "react";
import "./to-do.css";
import Task from "./Task";
import Button from "./Button";
import Inputbox from "./Form";
import { useRef } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { TextField } from "@mui/material";
dayjs.extend(relativeTime);

export default function Todo() {
  const [todoText, setTodoText] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [isRed, setIsRed] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editedTodo, setEditedTodo] = useState({});
  const [currentCategory, setCurrentCategory] = useState("all");
  const [selectedDate, setSelectedDate] = useState(dayjs());

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
      deadline: selectedDate.format(),
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
      setSelectedDate(null);
    } else {
      setIsRed(true);
    }
  }
  const handeDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const getTimeRemaining = (deadline) => {
    const now = dayjs();
    const deadlineTime = dayjs(deadline);

    if (now.isAfter(deadlineTime)) {
      const diff = now.diff(deadlineTime);

      const days = Math.floor(diff / (24 * 60 * 60 * 1000));
      const hours = Math.floor(
        (diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
      );
      const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));

      if (days > 0) {
        return `Deadline Expired ${days} days ${hours} hours ${minutes} minutes ago`;
      } else if (hours > 0) {
        return `Deadline Expired ${hours} hours ${minutes} minutes ago`;
      } else if (minutes > 0) {
        return `Deadline Expired ${minutes} minutes ago`;
      } else {
        return "Deadline Expired just now";
      }
    } else {
      const diff = deadlineTime.diff(now);

      const days = Math.floor(diff / (24 * 60 * 60 * 1000));
      const hours = Math.floor(
        (diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
      );
      const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
      if (days > 0) {
        return `Deadline in ${days} days ${hours} hours ${minutes} minutes ago`;
      } else if (hours > 0) {
        return `Deadline in ${hours} hours ${minutes} minutes ago`;
      } else if (minutes > 0) {
        return `Deadline in ${minutes} minutes ago`;
      } else {
        return "Deadline Expired just now";
      }

      // return `Deadline in ${days} days ${hours} hours ${minutes} minutes`;
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (isEdit) {
      handleEdit(editedTodo);
    } else {
      addTaskHandler(todoText);
    }
    setSelectedDate(dayjs());
  };

  const componentOnMount = () => {
    const data = JSON.parse(localStorage.getItem("todotask"));
    console.log("get data from localstorage", data);
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateTimePicker"]}>
                <DateTimePicker
                  value={selectedDate}
                  onChange={handeDateChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </DemoContainer>
            </LocalizationProvider>
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
          <div
            className={`btn ${currentCategory === "all" ? "active-tab" : ""}`}
            onClick={() => setCurrentCategory("all")}
          >
            All
          </div>
          <div
            className={`btn ${
              currentCategory === "active" ? "active-tab" : ""
            }`}
            onClick={() => setCurrentCategory("active")}
          >
            Active
          </div>
          <div
            className={`btn ${
              currentCategory === "completed" ? "active-tab" : ""
            }`}
            onClick={() => setCurrentCategory("completed")}
          >
            Completed
          </div>
        </div>
      </div>
    </div>
  );
}
