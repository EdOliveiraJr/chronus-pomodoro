import { useEffect, useReducer, useRef } from "react";
import { initialTaskState } from "./initialTaskState";
import { TaskContext } from "./TaskContext";
import { taskReducer } from "./taskReducer";
import { TimerWorkerManager } from "../../workers/TimerWorkerManager";
import { TaskActionTypes } from "./taskActions";
import { loadBeep } from "../../utils/loadBeep";
import { TaskStateModel } from "../../models/TaskStateModel";

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {

  const [state, dispatch] = useReducer(taskReducer, initialTaskState, () => {
    const storedState = localStorage.getItem('state');

    if (storedState === null)  return initialTaskState;

    const parsedStorageState = JSON.parse(storedState) as TaskStateModel;

    return {
      ...parsedStorageState,
      activeTask: null,
      secondsRemaining: 0,
      formattedSecondsRemaining: '00:00',
    };
  });

  const playBeepRef = useRef<ReturnType<typeof loadBeep> | null>(null);

  const worker = TimerWorkerManager.getInstance();
    
  worker.onmessage(event => {
    const countDownSeconds = event.data;
    
    if(countDownSeconds <= 0) {
      if (playBeepRef.current) {
        playBeepRef.current();
      }
      dispatch({
        type: TaskActionTypes.COMPLETED_TASK,
      })
      worker.terminate();
    } else {
      dispatch({
        type: TaskActionTypes.COUNT_DOWN , 
        payload: {secondsRemaining: countDownSeconds} 
      });
    }

  });

  useEffect(() => {
    localStorage.setItem('state', JSON.stringify(state));

      if (!state.activeTask) {
      worker.terminate();
    }

    document.title = `${state.formattedSecondsRemaining} - Chronos Pomodor`;

    worker.postMessage(state);
  }, [worker, state]);

  useEffect(() => {
    if(state.activeTask && playBeepRef.current === null) {
      playBeepRef.current = loadBeep();
    } else {
      playBeepRef.current = null;
    };
  }, [state.activeTask]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}
