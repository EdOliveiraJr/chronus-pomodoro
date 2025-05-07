import { useState } from "react";
import { Cycles } from "../Cycles";
import { DefaultButton } from "../DefaultButton";
import { DefaultInput } from "../DefaultInput";

import { PlayCircleIcon, StopCircleIcon } from "lucide-react";

export function MainForm() {
  const [taskName, setTaskName] = useState('');

  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  };

  return(
    <form onSubmit={handleCreateNewTask} action="" className="form">
      <div className="formRow">
        <DefaultInput
          labelText="Task"
          id="meuInput"
          type="text"
          placeholder="Digite algo"
          value={taskName}
          onChange={(event) => setTaskName(event.target.value)}
        />
      </div>

      <div className="formRow">
        <p>
          Próximo intervalo é de 25 minutos.
        </p>
      </div>    
      
      <div className="formRow">
        <Cycles/>
      </div>    
      
      <div className="formRow">
        <DefaultButton icon={<PlayCircleIcon/>} />
        <DefaultButton icon={<StopCircleIcon/>} color='red' />
      </div>    
    </form>
  );
};
