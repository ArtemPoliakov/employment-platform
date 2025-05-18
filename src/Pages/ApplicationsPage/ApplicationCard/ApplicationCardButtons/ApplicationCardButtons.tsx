import React, { useState } from "react";
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
import DialogWindow from "../../../../reusable_components/DialogWindow/DialogWindow";
import CancelApplicationDialog from "../../dialogues/CancelApplicationDialog/CancelApplicationDialog";
type Props = { application: ApplicationWithVacancyDto };

const ApplicationCardButtons = (props: Props) => {
  const { user } = useAuth();
  const client = useQueryClient();
  const navigate = useNavigate();

  const [isViewResponseShown, setIsViewResponseShown] = useState(false);
  const [isCancelDialogShown, setIsCancelDialogShown] = useState(false);
  const [deleteApplicationMessage, setDeleteApplicationMessage] = useState("");

  const viewCompanyResponse = () => {
    setIsViewResponseShown(true);
  };
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
              onClick={() => {
                setDeleteApplicationMessage(
                  "Are you sure you want to cancel this application?"
                );
                setIsCancelDialogShown(true);
              }}
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
              onClick={() => {
                setDeleteApplicationMessage(
                  "Are you sure you want to delete this application?"
                );
                setIsCancelDialogShown(true);
              }}
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
    <>
      {" "}
      <div className={classes["application-card__buttons-container"]}>
        <button
          className={reusableClasses["btn"]}
          onClick={navigateToVacancyPage}
        >
          Detailed
        </button>
        {getButtons()}
      </div>
      <DialogWindow
        show={isViewResponseShown}
        onClose={() => setIsViewResponseShown(false)}
        onSubmit={() => {}}
      >
        {props.application.companyResponse}
      </DialogWindow>
      <DialogWindow
        show={isCancelDialogShown}
        onClose={() => setIsCancelDialogShown(false)}
        onSubmit={deleteApplication}
      >
        <CancelApplicationDialog message={deleteApplicationMessage} />
      </DialogWindow>
    </>
  );
};

export default ApplicationCardButtons;
