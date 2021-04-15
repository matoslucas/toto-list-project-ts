import Services from "../api/services";
import { TaskType } from "../types";

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum Types {
  ADD_TASK = "add-task",
  CHECK_TASK = "check-task",
  REMOVE_TASK = "remove-task",
  LOAD_TASKS = "load-tasks",
}

type TaskPayload = {
  [Types.ADD_TASK]: TaskType;
  [Types.CHECK_TASK]: {
    id: string;
    isChecked: boolean;
  };
  [Types.REMOVE_TASK]: {
    id: string;
  };
  [Types.LOAD_TASKS]: TaskType[];
};

export type TaskActions = ActionMap<TaskPayload>[keyof ActionMap<TaskPayload>];

export const taskReducer = (state: TaskType[], action: TaskActions) => {
  switch (action.type) {
    case Types.ADD_TASK: {
      Services.postTask(action.payload)
        .then((response) => {
          //console.log("hello", response);
        })
        .catch((error) => {
          console.log("error", error);
        });
      return [...state, action.payload];
    }
    case Types.CHECK_TASK:
      Services.updateTask(action.payload.id, action.payload);

      return state.map((task) => {
        if (task.id === action.payload.id) {
          task.isChecked = action.payload.isChecked;
        }
        return task;
      });

    case Types.REMOVE_TASK: {
      Services.deleteTask(action.payload.id);
      return state.filter((task) => task.id !== action.payload.id);
    }

    case Types.LOAD_TASKS: {
      return [...state, ...action.payload];
    }
    default:
      return state;
  }
};
