import React from "react";
import { useDialogContext } from "../../../../Context/DialogWindowContext";
import classes from "./cancel_application_dialog_styles.module.css";
import reusableClasses from "./../../../../global_styles/reusable.module.css";
import clsx from "clsx";
type Props = { message: string };

const CancelApplicationDialog = (props: Props) => {
  const { onSubmit, onClose } = useDialogContext();
  return (
    <div className={classes["dialog"]}>
      <p className={classes["dialog__heading"]}>{props.message}</p>
      <div className={classes["dialog__button-container"]}>
        <button
          onClick={onSubmit}
          className={clsx(reusableClasses["btn"], classes["yes-button"])}
        >
          Yes
        </button>
        <button
          onClick={onClose}
          className={clsx(reusableClasses["btn"], classes["no-button"])}
        >
          No
        </button>
      </div>
    </div>
  );
};

export default CancelApplicationDialog;
