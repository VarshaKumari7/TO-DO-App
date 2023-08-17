import React, { useState } from "react";
import "./task.css";
export default function Task({
  type,
  className = "checkbox",
  onChange,
  taskList,
  setTodoText,
  setTaskList,
  setIsEdit,
  setEditedTodo,
  referenceInput,
  currentCategory,
  getTimeRemaining,
}) {
  const [showModel, setShowModel] = useState(false);
  const [taskToDeleteId, setTaskToDeleteId] = useState(null);
  const activeTasks = taskList.filter((task) => !task.completed);
  const completedTasks = taskList.filter((task) => task.completed);

  const deleteHandler = (id) => {
    setTaskToDeleteId(id);
    setShowModel(true);
  };

  const closeModel = () => {
    setShowModel(false);
  };

  const confirmDelete = () => {
    const data = taskList.filter((e) => {
      return taskToDeleteId !== e.id;
    });
    setTaskList(data);
    const updatedData = JSON.stringify(data);
    localStorage.setItem("todotask", updatedData);
    closeModel();
  };
  const updateHandler = (taskValue) => {
    setTodoText(taskValue.taskName);
    setEditedTodo(taskValue);
    setIsEdit(true);
    referenceInput.current.focus();
    console.log("object3444444", taskValue);
  };

  const renderTasks = () => {
    switch (currentCategory) {
      case "all":
        return taskList.map((taskValue, index) => (
          <div key={taskValue.id} className="items-row">
            <div className="check-box">
              <input
                key={taskValue.id}
                className={className}
                type={type}
                id={taskValue.id}
                checked={taskValue.completed}
                onChange={() => onChange(taskValue.id)}
              />
              <div
                className={`todos ${
                  taskValue.completed ? "todos-checked" : ""
                }`}
              >
                {taskValue.taskName}
              </div>
              <div className="deadline">
                {taskValue.deadline
                  ? getTimeRemaining(taskValue.deadline)
                  : "Not set"}
              </div>
              <div className="icon">
                <div className="edit-icon">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/6065/6065488.png"
                    alt="img"
                    onClick={() => {
                      updateHandler(taskValue);
                    }}
                  />
                </div>
                <div className="delete-icon">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvIPngagWTJiM6DRcYNZgsY87vlDVmqhdzwlTvW7moFf-hvzV4JQqmZ1xNnpP_XpYp2G4&usqp=CAU"
                    alt="img"
                    onClick={() => {
                      deleteHandler(taskValue.id);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ));
      case "active":
        return activeTasks.map((taskValue, index) => (
          <div key={taskValue.id} className="items-row">
            <div className="check-box">
              <input
                key={taskValue.id}
                className={className}
                type={type}
                id={taskValue.id}
                checked={taskValue.completed}
                onChange={() => onChange(taskValue.id)}
              />
              <div
                className={`todos ${
                  taskValue.completed ? "todos-checked" : ""
                }`}
              >
                {taskValue.taskName}
              </div>
              <div className="deadline">
                {taskValue.deadline
                  ? getTimeRemaining(taskValue.deadline)
                  : "Not set"}
              </div>
              <div className="icon">
                <div className="edit-icon">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/6065/6065488.png"
                    alt="img"
                    onClick={() => {
                      updateHandler(taskValue);
                    }}
                  />
                </div>
                <div className="delete-icon">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvIPngagWTJiM6DRcYNZgsY87vlDVmqhdzwlTvW7moFf-hvzV4JQqmZ1xNnpP_XpYp2G4&usqp=CAU"
                    alt="img"
                    onClick={() => {
                      deleteHandler(taskValue.id);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ));
      case "completed":
        return completedTasks.map((taskValue, index) => (
          <div key={taskValue.id} className="items-row">
            <div className="check-box">
              <input
                key={taskValue.id}
                className={className}
                type={type}
                id={taskValue.id}
                checked={taskValue.completed}
                onChange={() => onChange(taskValue.id)}
              />
              <div
                className={`todos ${
                  taskValue.completed ? "todos-checked" : ""
                }`}
              >
                {taskValue.taskName}
              </div>
              <div className="deadline">
                {taskValue.deadline
                  ? getTimeRemaining(taskValue.deadline)
                  : "Not set"}
              </div>
              <div className="icon">
                <div className="edit-icon">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/6065/6065488.png"
                    alt="img"
                    onClick={() => {
                      updateHandler(taskValue);
                    }}
                  />
                </div>
                <div className="delete-icon">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvIPngagWTJiM6DRcYNZgsY87vlDVmqhdzwlTvW7moFf-hvzV4JQqmZ1xNnpP_XpYp2G4&usqp=CAU"
                    alt="img"
                    onClick={() => {
                      deleteHandler(taskValue.id);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ));
      default:
        return null;
    }
  };
  //
  return (
    <div className="task-box-container">
      {renderTasks()}
      {showModel && (
        <div className="model">
          <div className="model-content">
            <p>Are you sure?</p>

            <div className="model-button">
              <button className="cancel" onClick={closeModel}>
                cancel
              </button>
              <button className="ok" onClick={confirmDelete}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
