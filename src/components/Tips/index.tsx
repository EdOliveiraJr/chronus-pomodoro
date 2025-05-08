import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";

export function Tips() {
  const { state } = useTaskContext();

  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  const tipsForWhenActiveTask = {
    workTime: <span>Foque por <b>{state.config.workTime} minutos</b></span>,
    shortBreakTime: <span>Descanse por <b>{state.config.shortBreakTime} minutos</b> </span>,
    longBreakTime: <span>Descanso longo</span>,
  };

  const tipsForNoActiveTask = {
    workTime: <span>Próximo ciclo é de <b>{state.config.workTime} minutos</b> </span>,
    shortBreakTime: <span>Próximo descanso é de <b>{state.config.shortBreakTime} minutos</b> </span>,
    longBreakTime: <span>Próximo descanso será longo</span>,
  };
  
  return (
    <>
      {!!state.activeTask && tipsForWhenActiveTask[state.activeTask.type]}
      {!state.activeTask && tipsForNoActiveTask[nextCycleType]}
    </>
  );
}