import React from "react";
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
  const activeTasks = taskList.filter((task) => !task.completed);
  const completedTasks = taskList.filter((task) => task.completed);
  const deleteHandler = (id) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (shouldDelete) {
      const data = taskList.filter((e) => {
        return id !== e.id;
      });
      setTaskList(data);
      const updatedData = JSON.stringify(data);
      localStorage.setItem("todotask", updatedData);
    }
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
        ));
      default:
        return null;
    }
  };
  return <div className="task-box-container">{renderTasks()}</div>;
}
