import React from "react";
import classes from "./info_dialog_styles.module.css";
import reusableClasses from "./../../global_styles/reusable.module.css";
import clsx from "clsx";
import { useDialogContext } from "../../Context/DialogWindowContext";
type Props = { message: string };

const InfoDialog = (props: Props) => {
  const { onClose } = useDialogContext();
  return (
    <div className={classes["dialog"]}>
      <p className={classes["msg"]}>{props.message}</p>
      <button
        className={clsx(reusableClasses["btn"], classes["ok-button"])}
        onClick={onClose}
      >
        Ok
      </button>
    </div>
  );
};

export default InfoDialog;
