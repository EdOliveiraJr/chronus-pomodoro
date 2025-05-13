
import { useRef } from "react";

import { Container } from "../../components/Container";
import { DefaultButton } from "../../components/DefaultButton";
import { DefaultInput } from "../../components/DefaultInput";
import { Heading } from "../../components/Heading";
import { MainTemplate } from "../../components/templates/MainTemplate";

import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";

import { SaveIcon } from "lucide-react";
import { showMessage } from "../../adapter/showMessage";
import { TaskActionTypes } from "../../contexts/TaskContext/taskActions";

export default function Settings() {
  const { state, dispatch } = useTaskContext();
  const workTimeInput = useRef<HTMLInputElement>(null);
  const shortBreakTimeInput = useRef<HTMLInputElement>(null);
  const longBreakTimeInput = useRef<HTMLInputElement>(null);

  function handleSaveSettings(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    showMessage.dismiss();
  
    const formErrors: string[] = [];
    const workTime = Number(workTimeInput.current?.value);
    const shortBreakTime = Number(shortBreakTimeInput.current?.value);
    const longBreakTime = Number(longBreakTimeInput.current?.value);

    if(isNaN(workTime) || isNaN(shortBreakTime) || isNaN(longBreakTime)) {
      formErrors.push('Digite apenas números em TODOS os campos.');
    };

    if(workTime < 1 || workTime > 99) {
      formErrors.push('Digite valores entre 1 e 99 para foco.');
    };

    if(shortBreakTime < 1 || shortBreakTime > 30) {
      formErrors.push('Digite valores entre 1 e 30 para descanso curto.');
    };

    if(longBreakTime < 1 || longBreakTime > 60) {
      formErrors.push('Digite valores entre 1 e 60 para descanso longo.');
    };

    if(formErrors.length > 0) {
      formErrors.forEach(error => {
        showMessage.error(error);
      });
      return;
    };

    dispatch({
      type: TaskActionTypes.CHANGE_SETTINGS,
      payload: {
        workTime,
        shortBreakTime,
        longBreakTime,
      }
    });
    showMessage.success('Configurações salvas com sucesso!');
  };
  
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
              defaultValue={state.config.workTime}
              id="workTime"
              labelText="Foco"
              ref={workTimeInput}
              type="number"
            />
          </div>
          <div className="formRow">
            <DefaultInput
              defaultValue={state.config.shortBreakTime}
              id="shortBreakTime"
              labelText="Descanso curto"
              ref={shortBreakTimeInput}
              type="number"
            />
          </div>
          <div className="formRow">
            <DefaultInput
              defaultValue={state.config.longBreakTime}
              id="longBreakTime"
              labelText="Descanso longo"
              ref={longBreakTimeInput}
              type="number"
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