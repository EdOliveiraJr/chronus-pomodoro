// import { useState } from "react";
import { useRef } from "react";
import { Cycles } from "../Cycles";
import { DefaultButton } from "../DefaultButton";
import { DefaultInput } from "../DefaultInput";

import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
import { TaskModel } from "../../models/TaskModel";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";
import { formatSecondsToMinutes } from "../../utils/formatSecondsToMinutes";

export function MainForm() {
  // const [taskName, setTaskName] = useState(''); 
  const taskName = useRef<HTMLInputElement>(null);
  
  const {state, setState} = useTaskContext();

  const nextCycle = getNextCycle(state.currentCycle);  

  const nextCycleType = getNextCycleType(nextCycle)

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

    const secondsRemaining = newTask.duration * 60;

    setState(prevState => {
      return {
        ...prevState,
        activeTask: newTask,
        currentCycle: nextCycle,
        secondsRemaining,
        formattedSecondsRemaining: formatSecondsToMinutes(secondsRemaining),
        tasks: [...prevState.tasks, newTask],
        config: {...prevState.config}
      };
    })

  };

  return(
    <form onSubmit={handleCreateNewTask} action="" className="form">
      <div className="formRow">
        <DefaultInput
          labelText="Task"
          id="meuInput"
          type="text"
          placeholder="Digite algo"
          // value={taskName}
          // onChange={(event) => setTaskName(event.target.value)}
          ref={taskName}
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
        <DefaultButton icon={<PlayCircleIcon/>} />
        <DefaultButton icon={<StopCircleIcon/>} color='red' />
      </div>    
    </form>
  );
};
