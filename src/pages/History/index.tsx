import { MainTemplate } from "../../components/templates/MainTemplate";
import { Container } from "../../components/Container";
import { Heading } from "../../components/Heading";
import { DefaultButton } from "../../components/DefaultButton";

import { TrashIcon } from "lucide-react";

import styles from "./styles.module.css";

export function History() {
  return (
    <MainTemplate>
      <Container>
        <Heading>
          <span>Histórico</span>
          <span className={styles.buttonContainer}>
            <DefaultButton 
              aria-label="Apagar todo o histórico" 
              color="red"
              icon={<TrashIcon/>} 
              title="Apagar todo o histórico"
            />
          </span>
        </Heading>
      </Container>

      <Container>
        <div className={styles.responsiveTable}>	
          <table>
            <thead>
              <tr>
                <th>Tarefa</th>
                <th>Duração</th>
                <th>Data</th>
                <th>Status</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 10 }).map((_, index) => (
                <tr key={index}>
                  <td>Estudar React</td>
                  <td>2h</td>
                  <td>01/01/2023</td>
                  <td>Concluído</td>
                  <td>Estudo</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </MainTemplate>
  );
}