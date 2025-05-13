
import { useRef } from "react";

import { Container } from "../../components/Container";
import { DefaultButton } from "../../components/DefaultButton";
import { DefaultInput } from "../../components/DefaultInput";
import { Heading } from "../../components/Heading";
import { MainTemplate } from "../../components/templates/MainTemplate";

import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";

import { SaveIcon } from "lucide-react";

export default function Settings() {
  const { state } = useTaskContext();
  const workTimeInput = useRef<HTMLInputElement>(null);
  const shortBreakTimeInput = useRef<HTMLInputElement>(null);
  const longBreakTimeInput = useRef<HTMLInputElement>(null);

  function handleSaveSettings(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  
    const workTime = workTimeInput.current?.value;
    const shortBreakTime = shortBreakTimeInput.current?.value;
    const longBreakTime = longBreakTimeInput.current?.value;

    console.log( workTime, shortBreakTime, longBreakTime);
  }
  
  return (
    <MainTemplate>
      <Container> 
        <Heading>Configurações</Heading>
      </Container>

      <Container>
        <p style={{textAlign: 'center'}} >Modifique as configurações para tempo de foco descanso curto e descanso longo.</p>
      </Container>

      <Container>
        <form onSubmit={handleSaveSettings } action="" className="form">
          <div className="formRow">
            <DefaultInput
              id="workTime"
              labelText="Foco"
              ref={workTimeInput}
              defaultValue={state.config.workTime}
            />
          </div>
          <div className="formRow">
            <DefaultInput
              id="shortBreakTime"
              labelText="Descanso curto"
              ref={shortBreakTimeInput}
              defaultValue={state.config.shortBreakTime}
            />
          </div>
          <div className="formRow">
            <DefaultInput
              id="longBreakTime"
              labelText="Descanso longo"
              ref={longBreakTimeInput}
              defaultValue={state.config.longBreakTime}
            />
          </div>
          <div className="formRow">
            <DefaultButton 
              aria-label="Salvar configurações"
              icon={<SaveIcon/>} 
              title="Salvar configurações"
            />
          </div>
        </form>
      </Container>
    </MainTemplate>
  );
};