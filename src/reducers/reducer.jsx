const initialState = {
  taskList: [],
  currentCategory: "all",
};

const localState = localStorage.getItem("redux");
const initialStateFromLocalStorage = localState
  ? JSON.parse(localState)
  : initialState;

const reducer = (state = initialStateFromLocalStorage, action) => {
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
      // localStorage.setItem("redux", JSON.stringify(updatedAddTaskList)); Error //
      localStorage.setItem(
        "redux",
        JSON.stringify({ ...state, taskList: updatedAddTaskList })
      );
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
      localStorage.setItem(
        "redux",
        JSON.stringify({ ...state, taskList: updatedToggleTaskList })
      );
      return {
        ...state,
        taskList: updatedToggleTaskList,
      };

    case "EDIT_TASK":
      const updatedEditTaskList = state.taskList.map((task) =>
        task.id === action.payload.id ? action.payload.updatedTask : task
      );
      localStorage.setItem(
        "redux",
        JSON.stringify({ ...state, taskList: updatedEditTaskList })
      );
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
