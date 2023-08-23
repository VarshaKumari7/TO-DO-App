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

const initialState = {
  taskList: [],
  currentCategory: "all",
};

// Get the initial state from localStorage
const localState = JSON.parse(localStorage.getItem("redux")) || initialState;

const reducer = (state = localState, action) => {
  switch (action.type) {
    case "ADD_TASK":
      const updatedAddTaskList = [
        ...state.taskList,
        {
          id: Math.random() * 1234,
          taskName: action.payload.taskName,
          completed: false,
          deadline: action.payload.deadline,
        },
      ];
      localStorage.setItem("redux", JSON.stringify(updatedAddTaskList));
      return {
        ...state,
        taskList: updatedAddTaskList,
      };

    case "TOGGLE_TASK":
      const updatedToggleTaskList = state.taskList.map((task) =>
        task.id === action.payload
          ? { ...task, completed: !task.completed }
          : task
      );
      localStorage.setItem("redux", JSON.stringify(updatedToggleTaskList));
      return {
        ...state,
        taskList: updatedToggleTaskList,
      };

    case "EDIT_TASK":
      const updatedEditTaskList = state.taskList.map((task) =>
        task.id === action.payload.id ? action.payload.updatedTask : task
      );
      localStorage.setItem("redux", JSON.stringify(updatedEditTaskList));
      return {
        ...state,
        taskList: updatedEditTaskList,
      };

    case "DELETE_TASK":
      const updatedDeleteTaskList = state.taskList.filter(
        (task) => task.id !== action.payload
      );
      localStorage.setItem("redux", JSON.stringify(updatedDeleteTaskList));
      return {
        ...state,
        taskList: updatedDeleteTaskList,
      };

    case "SET_CURRENT_CATEGORY":
      return {
        ...state,
        currentCategory: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
