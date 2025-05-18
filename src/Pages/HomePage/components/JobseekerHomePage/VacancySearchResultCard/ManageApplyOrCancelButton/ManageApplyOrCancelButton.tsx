import React from "react";
import type { ApplicationStatus } from "../../../../../../Models/Application";
import reusableCLasses from "./../../../../../../global_styles/reusable.module.css";
import classes from "./manage_apply_or_cancel_button_styles.module.css";
import {
  applyToVacancyAPI,
  deleteApplicationAPI,
} from "../../../../../../Services/ApplicationService";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../../../../../Context/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
type Props = {
  vacancyId: string;
  applicationStatus: ApplicationStatus;
  size: string;
  queryKeys: string[];
};

const ManageApplyVacancyButton = (props: Props) => {
  const { user, token } = useAuth();
  const client = useQueryClient();

  const applyToVacancy = async () => {
    await applyToVacancyAPI(props.vacancyId, user?.userName || "");
    client.invalidateQueries({ queryKey: props.queryKeys });
  };

  const deleteApplication = async () => {
    await deleteApplicationAPI(props.vacancyId, user?.accountDataId || "");
    client.invalidateQueries({ queryKey: props.queryKeys });
  };
  const getContent = () => {
    switch (props.applicationStatus) {
      case "PENDING":
        return (
          <button
            style={{ fontSize: props.size }}
            className={clsx(
              reusableCLasses["btn"],
              reusableCLasses["btn--danger"]
            )}
            onClick={deleteApplication}
          >
            Cancel
          </button>
        );
      case "ACCEPTED":
        return <div className={classes["accepted-msg"]}>ACCEPTED</div>;
      case "REJECTED":
        return <div className={classes["rejected-msg"]}>REJECTED</div>;
      default:
        return (
          <button
            style={{ fontSize: props.size }}
            className={reusableCLasses["btn"]}
            onClick={applyToVacancy}
          >
            Apply
          </button>
        );
    }
  };

  return getContent();
};

export default ManageApplyVacancyButton;
