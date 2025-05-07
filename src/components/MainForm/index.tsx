import { Cycles } from "../Cycles";
import { DefaultButton } from "../DefaultButton";
import { DefaultInput } from "../DefaultInput";
import { HomeProps } from "../../pages/Home";

import { PlayCircleIcon, StopCircleIcon } from "lucide-react";

export function MainForm({state}: HomeProps) {
      return(
       <form action="" className="form">
          <div className="formRow">
            <DefaultInput
              labelText="Task"
              id="meuInput"
              type="text"
              placeholder="Digite algo"
            />
          </div>

          <div className="formRow">
            <p>
              Próximo intervalo é de {state.config.workTime} minutos.
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
