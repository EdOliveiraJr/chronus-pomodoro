import { Container } from './components/Container';
import { CountDown } from './components/CountDown';
import { Cycles } from './components/Cycles';
import { DefaultInput } from './components/DefaultInput';
import { Logo } from './components/Logo';
import { Menu } from './components/Menu';

import './styles/theme.css';
import './styles/global.css';

export function App() {
  return (
    <>
      <Container>
        <Logo/>
      </Container>
      
      <Container>
        <Menu/>
      </Container>
      
      <Container>
        <CountDown/>
      </Container>

      <Container>
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
            <p>
              00000
            </p>
          </div>    
        </form>
      </Container>
    </>
  );
}