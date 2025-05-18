import { DialogWindowContext } from "../../Context/DialogWindowContext";
import classes from "./dialog_window_styles.module.css";

import React from "react";

type Props = {
  show: boolean;
  onClose: () => void;
  onSubmit: () => void;
  children: React.ReactNode;
};

const DialogWindow = (props: Props) => {
  const { show, onClose, onSubmit, children } = props;

  if (!show) return null;
  return (
    <div className={classes["backdrop"]} onClick={onClose}>
      <div className={classes["modal"]} onClick={(e) => e.stopPropagation()}>
        <button className={classes["closeButton"]} onClick={onClose}>
          ×
        </button>
        <DialogWindowContext.Provider value={{ onClose, onSubmit }}>
          {children}
        </DialogWindowContext.Provider>
      </div>
    </div>
  );
};

export default DialogWindow;
