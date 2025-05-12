import { ToastContentProps } from "react-toastify";

import { DefaultButton } from "../DefaultButton";

import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";

import styles from "./styles.module.css";

export function Dialog({closeToast, data} : ToastContentProps<string>) {
  return (
    <>
      <div className={styles.container}>
        <p>{data}</p>

        <div className={styles.buttonsContainer}>
          <DefaultButton
            aria-label="Confirmar ação e fechar"
            icon={<ThumbsUpIcon/>}
            title="Confirmar ação e fechar" 
            onClick={() => closeToast(true)}
          />
          <DefaultButton
            aria-label="Cancelar ação e fechar"
            color="red"
            icon={<ThumbsDownIcon/>}
            title="Cancelar ação e fechar"
            onClick={() => closeToast(false)}
          />
        </div>
      </div>
    </>
  );

}