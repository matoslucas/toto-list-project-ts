import React, { createContext, useReducer, Dispatch } from "react";
import { taskReducer, TaskActions } from "../reducers/TaskReducer";

import { TaskType } from "../types";

type InitialStateType = {
  tasks: TaskType[];
};

const initialState = {
  tasks: [],
};

export const TaskContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<TaskActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

type Props = {
  children: JSX.Element | JSX.Element[] | string | string[];
};

const TaskContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(taskReducer, []);

  const sortedTasks = state.sort((t, f) =>
    f.isChecked === t.isChecked ? 0 : f.isChecked ? -1 : 1
  );

  return (
    <TaskContext.Provider value={{ state: { tasks: sortedTasks }, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};
export default TaskContextProvider;
