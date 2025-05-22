import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./loading_spinner_styles.module.css";

import React from "react";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

type Props = {};

const LoadingSpinner = (props: Props) => {
  return (
    <div className={classes["spinner__container"]}>
      <FontAwesomeIcon
        className={classes["spinner"]}
        icon={faSpinner}
        size="2x"
      />
      <div className={classes["spinner__msg"]}>Loading...</div>
    </div>
  );
};

export default LoadingSpinner;
