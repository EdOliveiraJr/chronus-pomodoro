// import { useState } from "react";
import { useRef } from "react";
import { Cycles } from "../Cycles";
import { DefaultButton } from "../DefaultButton";
import { DefaultInput } from "../DefaultInput";

import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
import { TaskModel } from "../../models/TaskModel";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { TaskActionTypes } from "../../contexts/TaskContext/taskActions";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";

export function MainForm() {
  const {state, dispatch} = useTaskContext();
  const taskName = useRef<HTMLInputElement>(null);

  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if(taskName.current === null) return;
    
    const taskNameValue = taskName.current.value.trim();
    
    if(!taskNameValue) {
      alert('Digite o nome da tarefa!');
      return;
    } 
      
    const newTask : TaskModel = {
      id: Date.now().toString(),
      name: taskNameValue,
      startDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      duration: state.config[nextCycleType],
      type: nextCycleType
    };

    dispatch({ type: TaskActionTypes.START_TASK, payload: newTask });
    
  };


  function handleInterruptTask() {
    dispatch({ type: TaskActionTypes.INTERRUPT_TASK });
  };

  return(
    <form onSubmit={handleCreateNewTask} action="" className="form">
      <div className="formRow">
        <DefaultInput
          labelText="Task"
          id="meuInput"
          type="text"
          placeholder="Digite algo"
          ref={taskName}
          disabled={!!state.activeTask}
        />
      </div>

      <div className="formRow">
        <p>
          Próximo intervalo é de 25 minutos.
        </p>
      </div>    
      
      {state.currentCycle > 0 && (
        <div className="formRow">
          <Cycles/>
        </div>    
      )}
      
      <div className="formRow">
        {!state.activeTask && (
          <DefaultButton 
            aria-label="Iniciar nova tarefa"
            key='startButton'
            icon={<PlayCircleIcon/>} 
            title="Iniciar nova tarefa"
            type="submit"
          />
        )}
        
        {!!state.activeTask &&(
          <DefaultButton 
            aria-label="Interromper tarefa atual"
            color="red"
            key='stopButton'
            icon={<StopCircleIcon/>} 
            title="Interromper tarefa atual"
            type="button"
            onClick={handleInterruptTask}
          />
        )}
      </div>    
    </form>
  );
};
