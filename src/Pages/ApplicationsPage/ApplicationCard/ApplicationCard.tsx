import React from "react";
import type { ApplicationWithVacancyDto } from "../../../Models/Application";
import classes from "./application_card_styles.module.css";
import ApplicationCardButtons from "./ApplicationCardButtons/ApplicationCardButtons";

type Props = { application: ApplicationWithVacancyDto };

const ApplicationCard = (props: Props) => {
  const statusColorMap = {
    PENDING: "var(--pending-color)",
    ACCEPTED: "var(--ok-color)",
    REJECTED: "var(--danger-color)",
    NONE: "var(--primary-text-color)",
  };
  return (
    <div className={classes["application-card"]}>
      <p className={classes["card__title"]}>
        {props.application.vacancyCompactDto.title}
      </p>
      <p className={classes["card__position"]}>
        Position: {props.application.vacancyCompactDto.position}
      </p>
      <p className={classes["card__applied-date"]}>
        Applied on: {props.application.creationDate.toString().split("T")[0]}
      </p>
      <p className={classes["card__company-name"]}>
        {props.application.vacancyCompactDto.companyUserName}
      </p>
      <p
        className={classes["card__status"]}
        style={{ color: statusColorMap[props.application.status ?? "NONE"] }}
      >
        {props.application.status}
      </p>
      <div className={classes["card__button-container"]}>
        <ApplicationCardButtons application={props.application} />
      </div>
    </div>
  );
};

export default ApplicationCard;
