export const addTask = (task) => {
  return {
    type: "ADD_TASK",
    payload: {
      id: Math.random() * 1234,
      taskName: task,
      completed: false,
      // deadline: selectedDate.format(),
    },
  };
};

export const toggleTask = (taskId) => ({
  type: "TOGGLE_TASK",
  payload: taskId,
});

export const editTask = (task) => ({
  type: "EDIT_TASK",
  payload: task,
});

export const deleteTask = (taskId) => ({
  type: "DELETE_TASK",
  payload: taskId,
});

export const setCurrentCategory = (category) => ({
  type: "SET_CURRENT_CATEGORY",
  payload: category,
});

export const setTodoText = (text) => ({
  type: "SET_TODO_TEXT",
  payload: text,
});

export const setSelectedDate = (date) => ({
  type: "SET_SELECTED_DATE",
  payload: date,
});
