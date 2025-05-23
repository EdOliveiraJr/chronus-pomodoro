import { useState, useEffect } from 'react';

import { RouterLink } from '../RouterLink';

import { HistoryIcon, HouseIcon, MoonIcon, SettingsIcon, SunIcon } from 'lucide-react';

import styles from './styles.module.css';

type AvailableThemes = 'dark' | 'light';

export function Menu() {
  const[theme, setTheme] = useState <AvailableThemes>(()=> {
    const storedTheme = localStorage.getItem('theme') as AvailableThemes;
    return storedTheme ? storedTheme : 'dark';
  }); // Define o tema padrão como 'dark' se não houver valor armazenado);

  const nextThemeIcon = {
    dark: <SunIcon/>,
    light: <MoonIcon/>,
  }

  function handleThemeChange (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault();
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme); // Altera o tema do HTML
    localStorage.setItem('theme', theme); // Salva o tema no localStorage
    return () => {} //Função de cleanup
  },[theme]);
  
  return (
    <nav className={styles.menu}>
      <RouterLink href='/' className={styles.menuLink} aria-label='Ir para a tela inicial' title='Ir para a tela inicial'>
        <HouseIcon/>
      </RouterLink>
      <RouterLink href='/history' className={styles.menuLink} aria-label='Ver histórico' title='Ver histórico'>
        <HistoryIcon/>
      </RouterLink>
      <RouterLink href='/settings' className={styles.menuLink} aria-label='Ir para configurações' title='Ir para configurações'>
        <SettingsIcon/>
      </RouterLink>
      <a 
        aria-label='Alterar tema' 
        className={styles.menuLink} 
        title='Alterar tema'
        onClick={handleThemeChange}>
        {nextThemeIcon[theme]}
      </a>
    </nav>
  );
}