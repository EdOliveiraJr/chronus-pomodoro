import { Container } from './components/Container';
import { CountDown } from './components/CountDown';
import { Cycles } from './components/Cycles';
import { DefaultButton } from './components/DefaultButton';
import { DefaultInput } from './components/DefaultInput';
import { Logo } from './components/Logo';
import { Menu } from './components/Menu';

import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';

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
            <DefaultButton icon={<PlayCircleIcon/>} />
            <DefaultButton icon={<StopCircleIcon/>} color='red' />
          </div>    
        </form>
      </Container>

      <Container>
        <p>Footer</p>
      </Container>
    </>
  );
}