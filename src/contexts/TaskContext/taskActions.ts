import { TaskModel } from "../../models/TaskModel";
import { TaskStateModel } from "../../models/TaskStateModel";

export enum TaskActionTypes {
  START_TASK = 'START_TASK',
  INTERRUPT_TASK = 'INTERRUPT_TASK',
  RESET_STATE = 'RESET_STATE',
  COUNT_DOWN = 'COUNT_DOWN',
  COMPLETED_TASK = 'COMPLETED_TASK',
  CHANGE_SETTINGS = 'CHANGE_SETTINGS'
};

export type TaskActionModel = {
  type: TaskActionTypes.START_TASK;
  payload: TaskModel;
} | {
  type: TaskActionTypes.CHANGE_SETTINGS;
  payload: TaskStateModel['config'];
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