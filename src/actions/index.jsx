// export const addTask = (task) => {
//   return {
//     type: "ADD_TASK",
//     payload: {
//       id: Math.random() * 1234,
//       taskName: task,
//       completed: false,
//       //   deadline: selectedDate.format(),
//     },
//   };
// };

export const addTask = (taskName, deadline) => ({
  type: "ADD_TASK",
  payload: {
    taskName: taskName,
    deadline: deadline,
  },
});

export const toggleTask = (taskId) => ({
  type: "TOGGLE_TASK",
  payload: taskId,
});

export const editTask = (taskId, updatedTask) => ({
  type: "EDIT_TASK",
  payload: {
    id: taskId,
    updatedTask: updatedTask,
  },
});

export const deleteTask = (taskId) => ({
  type: "DELETE_TASK",
  payload: taskId,
});

export const setCurrentCategory = (category) => ({
  type: "SET_CURRENT_CATEGORY",
  payload: category,
});
