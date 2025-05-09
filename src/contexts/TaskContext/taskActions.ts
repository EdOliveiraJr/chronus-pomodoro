import { TaskModel } from "../../models/TaskModel";

export enum TaskActionTypes {
  START_TASK = 'START_TASK',
  INTERRUPT_TASK = 'INTERRUPT_TASK',
  RESET_STATE = 'RESET_STATE',
  COUNT_DOWN = 'COUNT_DOWN',
  COMPLETED_TASK = 'COMPLETED_TASK',
};

export type TaskActionModel = {
  type: TaskActionTypes.START_TASK;
  payload: TaskModel;
} | {
  type: TaskActionTypes.COUNT_DOWN;
  payload: {secondsRemaining: number};
} | {
  type: TaskActionTypes.INTERRUPT_TASK;
} | {
  type: TaskActionTypes.COMPLETED_TASK;
} | {
  type: TaskActionTypes.RESET_STATE;
};