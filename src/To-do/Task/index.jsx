import React, { useState } from "react";
import "./task.css";
export default function Task({
  type,
  className = "checkbox",
  onChange,
  taskList,
}) {
  return (
    <div className="task-box-container">
      {taskList.map((taskValue, index) => {
        return (
          <div className="items-row">
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
            </div>

            <div className="delete-icon">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvIPngagWTJiM6DRcYNZgsY87vlDVmqhdzwlTvW7moFf-hvzV4JQqmZ1xNnpP_XpYp2G4&usqp=CAU"
                alt="img"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
