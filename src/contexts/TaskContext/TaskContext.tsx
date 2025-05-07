import { createContext } from "react";
import { initialTaskState } from "./initialTaskState";
import { TaskStateModel } from "../../models/TaskStateModel";

type TaskContextType = {
  state: TaskStateModel;
  setState: React.Dispatch<React.SetStateAction<TaskStateModel>>;
};

const initialContextValue = {
  state: initialTaskState,
  setState: () => {},
};

export const TaskContext = createContext<TaskContextType>(initialContextValue);
