import React from "react";
import classes from "./application_card_buttons_styles.module.css";
import reusableClasses from "./../../../../global_styles/reusable.module.css";
import type { ApplicationWithVacancyDto } from "../../../../Models/Application";
import { deleteApplicationAPI } from "../../../../Services/ApplicationService";
import { useAuth } from "../../../../Context/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
type Props = { application: ApplicationWithVacancyDto };

const ApplicationCardButtons = (props: Props) => {
  const { user } = useAuth();
  const client = useQueryClient();
  const navigate = useNavigate();

  const deleteApplication = async () => {
    await deleteApplicationAPI(
      props.application.vacancyId,
      user?.accountDataId || ""
    );
    client.invalidateQueries({ queryKey: ["applications"] });
  };
  const navigateToVacancyPage = () => {
    navigate(`/vacancy/${props.application.vacancyId}/${"jobseekerViewApply"}`);
  };
  const viewCompanyResponse = () => {};

  const getButtons = () => {
    switch (props.application.status) {
      case "PENDING": {
        return (
          <>
            <button
              className={clsx(
                reusableClasses["btn"],
                classes["application-card__cancelButton"]
              )}
              onClick={deleteApplication}
            >
              Cancel
            </button>
          </>
        );
      }
      case "ACCEPTED":
      case "REJECTED": {
        return (
          <>
            <button
              className={clsx(
                reusableClasses["btn"],
                classes["application-card__view-company-response-button"]
              )}
              onClick={viewCompanyResponse}
            >
              View response
            </button>
            <FontAwesomeIcon
              icon={faTrashCan}
              size="2x"
              className={classes["application-card__delete-icon"]}
              onClick={deleteApplication}
            />
          </>
        );
      }
      default: {
        return (
          <FontAwesomeIcon
            icon={faTrashCan}
            size="2x"
            className={classes["application-card__delete-icon"]}
            onClick={deleteApplication}
          />
        );
      }
    }
  };

  return (
    <div className={classes["application-card__buttons-container"]}>
      <button
        className={reusableClasses["btn"]}
        onClick={navigateToVacancyPage}
      >
        Detailed
      </button>
      {getButtons()}
    </div>
  );
};

export default ApplicationCardButtons;
