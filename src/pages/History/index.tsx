import { useEffect, useState } from "react";

import { MainTemplate } from "../../components/templates/MainTemplate";
import { Container } from "../../components/Container";
import { DefaultButton } from "../../components/DefaultButton";
import { Heading } from "../../components/Heading";

import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { TaskActionTypes } from "../../contexts/TaskContext/taskActions";

import { formatDate } from "../../utils/formatDate";
import { getTaskStatus } from "../../utils/getTaskStatus";
import { sortTasks, SortTasksOptions } from "../../utils/sortTasks";

import { showMessage } from "../../adapter/showMessage";

import { TrashIcon } from "lucide-react";

import styles from "./styles.module.css";

export function History() {
  const {state, dispatch} = useTaskContext();
  const [confirmClearHistory, setConfirmClearHistory] = useState(false);
  const hasTasks = state.tasks.length > 0;
  const [sortTasksOptions, setSortTasksOptions] = useState<SortTasksOptions>(
    () => {
      return {
        tasks: sortTasks({tasks: state.tasks}),
        field: 'startDate',
        direction: 'desc',
      }
    }
  );

  function handleSortTasks({field} : Pick<SortTasksOptions, 'field'>) {
    const newDirection = sortTasksOptions.direction === 'asc' ? 'desc' : 'asc';
    
    setSortTasksOptions({
      tasks: sortTasks({
        direction: newDirection,
        tasks: sortTasksOptions.tasks,
        field,
      }),
      direction: newDirection,
      field,
    });
  };
  
  function handleResetHistory() {
    showMessage.dismiss();
    showMessage.confirm(
      'Tem certeza que deseja apagar o histórico?',
      confirmation => {
        setConfirmClearHistory(confirmation)
      }   
    )
  };
  
  useEffect(() => {
    setSortTasksOptions(prevState => ({
      ...prevState,
      tasks: sortTasks({
        tasks: state.tasks,
        direction: prevState.direction,
        field: prevState.field,
      })
    }))
  }, [state.tasks])

  useEffect(() => {
    if(!confirmClearHistory) return;
    setConfirmClearHistory(false);

    dispatch({ type: TaskActionTypes.RESET_STATE });
  }, [confirmClearHistory, dispatch])
  
  useEffect(() => {
    return () => {
      showMessage.dismiss();
    }
  }, []);


  return (
    <MainTemplate>
      <Container>
        <Heading>
          <span>Histórico</span>
          <span className={styles.buttonContainer}>
            { hasTasks && (
              <DefaultButton 
                aria-label="Apagar todo o histórico" 
                color="red"
                icon={<TrashIcon/>} 
                title="Apagar todo o histórico"
                onClick={handleResetHistory}
              />
            )}
          </span>
        </Heading>
      </Container>

      <Container>
        { hasTasks && (
          <div className={styles.responsiveTable}>	
            <table>
              <thead>
                <tr>
                  <th className={styles.thSort} onClick={()=> handleSortTasks({field: 'name'})} >Tarefa ↕</th>
                  <th className={styles.thSort} onClick={()=> handleSortTasks({field: 'duration'})} >Duração ↕</th>
                  <th className={styles.thSort} onClick={()=> handleSortTasks({field: 'startDate'})} >Data ↕</th>
                  <th>Status</th>
                  <th>Tipo</th>
                </tr>
              </thead>
              <tbody>
                {sortTasksOptions.tasks.map((task) => {
                  const taskTypeDictionary = {
                    workTime: "Foco",
                    shortBreakTime: "Descanso curto",
                    longBreakTime: "Descanso longo",
                  }

                  return (
                    <tr key={task.id}>
                      <td>{task.name}</td>
                      <td>{task.duration}</td>
                      <td>{formatDate(task.startDate)}</td>
                      <td>{getTaskStatus(task, state.activeTask)}</td>
                      <td>{taskTypeDictionary[task.type]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        { !hasTasks && (
          <p style={{ textAlign: 'center', fontWeight: 'bold'}} >Ainda não existem tarefas criadas.</p>
        )}
      </Container>
    </MainTemplate>
  );
}