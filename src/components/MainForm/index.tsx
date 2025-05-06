import { Cycles } from "../Cycles";
import { DefaultButton } from "../DefaultButton";
import { DefaultInput } from "../DefaultInput";

import { PlayCircleIcon, StopCircleIcon } from "lucide-react";



export function MainForm() {
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
              Lorem ipsum dolor sit amet.
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
