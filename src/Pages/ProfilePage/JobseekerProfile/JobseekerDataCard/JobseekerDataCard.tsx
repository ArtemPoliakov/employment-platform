import clsx from "clsx";
import type { JobseekerDto } from "../../../../Models/Jobseeker";
import classes from "./jobseeker_data_card_styles.module.css";
import reusableClasses from "./../../../../global_styles/reusable.module.css";
import React, { useState } from "react";
import DialogWindow from "../../../../reusable_components/DialogWindow/DialogWindow";
import JobseekerDataEditForm from "../../JobseekerDataEditForm/JobseekerDataEditForm";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  jobseeker: JobseekerDto | undefined;
  queryKey: string;
  viewMode: string;
};

const JobseekerDataCard = (props: Props) => {
  const { jobseeker, queryKey, viewMode } = props;
  const [isEditJobseekerDataDialogOpen, setIsEditJobseekerDataDialogOpen] =
    useState(false);
  const client = useQueryClient();
  return (
    <>
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
            <b>Education:</b>{" "}
            {jobseeker?.education.toLowerCase().replace("_", " ")}
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
          {viewMode == "owner" && (
            <button
              onClick={() => setIsEditJobseekerDataDialogOpen(true)}
              className={clsx(
                reusableClasses["btn"],
                classes["jobseeker-data-card__button"]
              )}
            >
              Edit
            </button>
          )}
        </div>
      </div>

      <DialogWindow
        show={isEditJobseekerDataDialogOpen}
        onClose={() => setIsEditJobseekerDataDialogOpen(false)}
        onSubmit={() => {
          client.invalidateQueries({ queryKey: [queryKey] });
          setIsEditJobseekerDataDialogOpen(false);
        }}
      >
        <JobseekerDataEditForm jobseeker={jobseeker!} />
      </DialogWindow>
    </>
  );
};

export default JobseekerDataCard;
