const initialState = {
  taskList: [],
  currentCategory: "all",
  // todoText: "",
  // selectedDate: dayjs(),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        taskList: [...state.taskList, action.payload],
      };
    case "TOGGLE_TASK":
      return {
        ...state,
        taskList: state.taskList.map((task) =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        ),
      };
    case "EDIT_TASK":
      return {
        ...state,
        taskList: state.taskList.map((task) =>
          task.id === action.payload.id ? action.payload.newData : task
        ),
      };
    case "DELETE_TASK":
      return {
        ...state,
        taskList: state.taskList.filter((task) => task.id !== action.payload),
      };
    case "SET_CURRENT_CATEGORY":
      return {
        ...state,
        currentCategory: action.payload,
      };
    case "SET_TODO_TEXT":
      return {
        ...state,
        todoText: action.payload,
      };
    case "SET_SELECTED_DATE":
      return {
        ...state,
        selectedDate: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
