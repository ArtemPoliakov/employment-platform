import clsx from "clsx";
import type { JobseekerDto } from "../../../../Models/Jobseeker";
import classes from "./jobseeker_data_card_styles.module.css";
import reusableClasses from "./../../../../global_styles/reusable.module.css";
import React from "react";

type Props = { jobseeker: JobseekerDto | undefined };

const JobseekerDataCard = (props: Props) => {
  const { jobseeker } = props;
  return (
    <div className={classes["jobseeker-data-card"]}>
      <div className={classes["jobseeker-data-card__data"]}>
        <p className={classes["jobseeker-data-card__info-item"]}>
          <b>Profession:</b> {jobseeker?.profession}
        </p>
        <p className={classes["jobseeker-data-card__info-item"]}>
          <b>Experience:</b> {jobseeker?.experience ?? 0}{" "}
          {jobseeker?.experience === 1 ? "year" : "years"}
        </p>
        <p className={classes["jobseeker-data-card__info-item"]}>
          <b>Education:</b> {jobseeker?.education}
        </p>
        <p className={classes["jobseeker-data-card__info-item"]}>
          <b>Location:</b> {jobseeker?.location}
        </p>
        <p className={classes["jobseeker-data-card__info-item"]}>
          <b>Previous Workplace:</b> {jobseeker?.previousWorkplace}
        </p>
        <p className={classes["jobseeker-data-card__info-item"]}>
          <b>Previous Position:</b> {jobseeker?.previousPosition}
        </p>
        <p className={classes["jobseeker-data-card__info-item"]}>
          <b>Quit Reason:</b> {jobseeker?.quitReason}
        </p>
        <p className={classes["jobseeker-data-card__info-item"]}>
          <b>Family Conditions:</b> {jobseeker?.familyConditions}
        </p>
        <p className={classes["jobseeker-data-card__info-item"]}>
          <b>Living Conditions:</b> {jobseeker?.livingConditions}
        </p>
        <p className={classes["jobseeker-data-card__info-item"]}>
          <b>Preferences:</b> {jobseeker?.preferences}
        </p>
        <p className={classes["jobseeker-data-card__info-item"]}>
          <b>Self Description:</b> {jobseeker?.selfDescription}
        </p>
        <p className={classes["jobseeker-data-card__info-item"]}>
          <b>Employment Status:</b>{" "}
          {jobseeker?.isEmployed ? "Employed" : "Unemployed"}
        </p>
        <p className={classes["jobseeker-data-card__info-item"]}>
          <b>Registration Date:</b>{" "}
          {jobseeker?.registerDate?.toString().split("T")[0]}
        </p>
      </div>
      <div className={classes["jobseeker-data-card__buttons"]}>
        <button
          className={clsx(
            reusableClasses["btn"],
            classes["jobseeker-data-card__button"]
          )}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default JobseekerDataCard;
