import React from "react";
import "./task.css";
export default function Task({
  type,
  className = "checkbox",
  onChange,
  list,
  onDelete,
  updateHandler,
  currentCategory,
  getTimeRemaining,
}) {
  const activeTasks = list.filter((task) => !task.completed);
  const completedTasks = list.filter((task) => task.completed);

  console.log("list value in task component 22", list, currentCategory);

  {
    console.log(list, currentCategory, "list");
  }

  const renderTasks = () => {
    switch (currentCategory) {
      case "all":
        return list.map((taskValue, index) => (
          <div key={taskValue.id} className="items-row">
            {console.log("object53333333", taskValue)}
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
                    onClick={() => onDelete(taskValue.id)}
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
                    onClick={() => onDelete(taskValue.id)}
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
                    onClick={() => onDelete(taskValue.id)}
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
      {/* {showModel && (
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
      )} */}
    </div>
  );
}
