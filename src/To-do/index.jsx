import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addTask,
  toggleTask,
  editTask,
  deleteTask,
  setCurrentCategory,
} from "../actions";
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
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [isRed, setIsRed] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editedTodo, setEditedTodo] = useState({});

  const { currentCategory } = useSelector((state) => state.reducer);

  const list = useSelector((state) => state.reducer.taskList);
  // const entireStore = useSelector((state) => state);
  // console.log("List value 38", entireStore, list);
  // const allState = useSelector((state) => state);

  console.log(currentCategory, "currentCategory");
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (localStorage.getItem("")) {
  //     dispatch(addTask(localStorage.getItem("")));
  //   }
  // }, []);

  // useEffect(()=>{
  //   dispatch(())
  // },[list])

  function formInput(event) {
    const valueData = event.target.value;
    setTodoText(valueData);
  }

  function addTaskHandler() {
    if (
      todoText.trim() !== "" &&
      !list.some((listval) => listval.taskName === todoText)
    ) {
      dispatch(addTask(todoText, selectedDate));
      // console.log("46 todo text of input", todoText, selectedDate);
      setTodoText("");
      setSelectedDate(dayjs());
      setIsRed(false);
    } else {
      setIsRed(true);
    }
  }

  const deleteHandler = (id) => {
    dispatch(deleteTask(id));
  };

  const updateHandler = (taskValue) => {
    setTodoText(taskValue.taskName);
    setEditedTodo(taskValue);
    setIsEdit(true);
    setSelectedDate(dayjs(taskValue.deadline));
    referenceInput.current.focus();
  };

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
        return `Deadline in ${days} days ${hours} hours ${minutes} minutes`;
      } else if (hours > 0) {
        return `Deadline in ${hours} hours ${minutes} minutes`;
      } else if (minutes > 0) {
        return `Deadline in ${minutes} minutes`;
      } else {
        return "Deadline Expired just now";
      }
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (isEdit) {
      if (todoText.trim() === "") {
        setIsRed(true);
      } else {
        dispatch(
          editTask(editedTodo.id, {
            ...editedTodo,
            taskName: todoText,
            deadline: selectedDate.format(),
          })
        );
        setIsRed(false);
      }
      setIsEdit(false);
      setEditedTodo({});
      setTodoText("");
    } else {
      addTaskHandler(todoText);
      setTodoText("");
    }
    setSelectedDate(dayjs());
  };

  // const componentOnMount = () => {
  //   const data = JSON.parse(localStorage.getItem("todotask"));
  //   console.log("get data from localstorage", data);
  //   if (data) {
  //     setTaskList([...data]);
  //   }
  // };

  // useEffect(componentOnMount, []);

  const handleCheckboxChange = (id) => {
    dispatch(toggleTask(id));
  };

  const referenceInput = useRef(null);

  return (
    <div className="container">
      <div className="body-container"></div>
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
          onChange={handleCheckboxChange}
          list={list}
          currentCategory={currentCategory}
          onDelete={deleteHandler}
          updateHandler={updateHandler}
          getTimeRemaining={getTimeRemaining}
        />
        <div className="book-list" style={{ cursor: "pointer" }}>
          <div
            className={`btn ${currentCategory === "all" ? "active-tab" : ""}`}
            onClick={() => dispatch(setCurrentCategory("all"))}
          >
            All
          </div>
          <div
            className={`btn ${
              currentCategory === "active" ? "active-tab" : ""
            }`}
            onClick={() => dispatch(setCurrentCategory("active"))}
          >
            Active
          </div>
          <div
            className={`btn ${
              currentCategory === "completed" ? "active-tab" : ""
            }`}
            onClick={() => dispatch(setCurrentCategory("completed"))}
          >
            Completed
          </div>
        </div>
      </div>
    </div>
  );
}
