import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../../../Context/useAuth";
import type {
  OfferStatus,
  OfferWithVacancyDto,
} from "../../../../Models/Offer";
import classes from "./offer_card_buttons_styles.module.css";
import reusableClasses from "./../../../../global_styles/reusable.module.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setJobseekerReactionToOfferAPI } from "../../../../Services/OfferService";
import DialogWindow from "../../../../reusable_components/DialogWindow/DialogWindow";
import YesNoDialog from "../../../../reusable_components/YesNoDialog/YesNoDialog";
import { set } from "react-hook-form";
import ReactionDialogForm from "../ReactionDialogForm/ReactionDialogForm";
import clsx from "clsx";

type Props = { offer: OfferWithVacancyDto };

const OfferCardButtons = (props: Props) => {
  const { offer } = props;

  const { user } = useAuth();
  const client = useQueryClient();
  const navigate = useNavigate();

  const [isAcceptDialogShown, setIsAcceptDialogShown] = useState(false);
  const [isRejectDialogShown, setIsRejectDialogShown] = useState(false);
  const [isReactionDialogShown, setIsReactionDialogShown] = useState(false);
  const [newStatus, setNewStatus] = useState<OfferStatus | null>(null);

  const navigateToVacancyPage = () => {
    navigate(`/vacancy/${props.offer.vacancyId}/${"jobseekerOfferView"}`);
  };

  const getContent = () => {
    switch (offer.status) {
      case "PENDING": {
        return (
          <div className={classes["card__buttons-container"]}>
            <button
              className={reusableClasses["btn"]}
              onClick={navigateToVacancyPage}
            >
              Detailed
            </button>
            <div className={classes["card__status-buttons-container"]}>
              <button
                className={clsx(
                  reusableClasses["btn"],
                  classes["offer-card__button--accept"]
                )}
                onClick={() => setIsAcceptDialogShown(true)}
              >
                Accept
              </button>
              <button
                className={clsx(
                  reusableClasses["btn"],
                  classes["offer-card__button--reject"]
                )}
                onClick={() => setIsRejectDialogShown(true)}
              >
                Reject
              </button>
            </div>
          </div>
        );
      }
      case "ACCEPTED": {
        return (
          <div className={classes["offer-card__accepted-msg"]}>ACCEPTED</div>
        );
      }
      default:
        return null;
    }
  };
  return (
    <>
      {getContent()}
      <DialogWindow
        show={isAcceptDialogShown}
        onClose={() => setIsAcceptDialogShown(false)}
        onSubmit={() => {
          setIsAcceptDialogShown(false);
          setNewStatus("ACCEPTED");
          setIsReactionDialogShown(true);
        }}
      >
        <YesNoDialog message={"Are you sure to accept the offer?"} />
      </DialogWindow>

      <DialogWindow
        show={isRejectDialogShown}
        onClose={() => setIsRejectDialogShown(false)}
        onSubmit={() => {
          setIsRejectDialogShown(false);
          setNewStatus("REJECTED");
          setIsReactionDialogShown(true);
        }}
      >
        <YesNoDialog message={"Are you sure to reject the offer?"} />
      </DialogWindow>

      <DialogWindow
        show={isReactionDialogShown}
        onClose={() => setIsReactionDialogShown(false)}
        onSubmit={() => {
          setIsReactionDialogShown(false);
        }}
      >
        <ReactionDialogForm
          offer={offer}
          newStatus={newStatus || offer.status!}
        />
      </DialogWindow>
    </>
  );
};
export default OfferCardButtons;
