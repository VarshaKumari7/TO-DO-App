import React from "react";
import Task from "../Task";

export default function Tasklist({
  taskList,
  handleCheckboxChange,
  isChecked,
}) {
  return (
    <div>
      {
        <Task
          type={"checkbox"}
          // value={value}
          checked={isChecked}
          onChange={handleCheckboxChange}
          taskList={taskList}
        />
      }
    </div>
  );
}
