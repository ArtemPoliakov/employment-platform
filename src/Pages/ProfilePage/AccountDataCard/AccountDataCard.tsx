import type { AppUserPublicDataDto } from "../../../Models/User";
import classes from "./account_data_card_styles.module.css";
import reusableClasses from "./../../../global_styles/reusable.module.css";
import React, { useState } from "react";
import clsx from "clsx";
import DialogWindow from "../../../reusable_components/DialogWindow/DialogWindow";
import YesNoDialog from "../../../reusable_components/YesNoDialog/YesNoDialog";
import { useAuth } from "../../../Context/useAuth";
import { useNavigate } from "react-router-dom";

type Props = { accountData: AppUserPublicDataDto | undefined };

const AccountDataCard = (props: Props) => {
  const { accountData } = props;
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  return (
    <>
      <div className={classes["account-data-card"]}>
        <div className={classes["account-data-card__data"]}>
          <h1 className={classes["account-data-card__username"]}>
            {accountData?.userName}
          </h1>
          <h2 className={classes["account-data-card__info-item"]}>
            {accountData?.role.toLowerCase()}
          </h2>
          <p className={classes["account-data-card__info-item"]}>
            {accountData?.email}
          </p>
          <p className={classes["account-data-card__info-item"]}>
            {accountData?.phoneNumber}
          </p>
        </div>
        <div className={classes["account-data-card__buttons"]}>
          <button
            className={clsx(
              reusableClasses["btn"],
              classes["account-data-card__button"]
            )}
          >
            Edit
          </button>
          <button
            onClick={() => setIsLogoutDialogOpen(true)}
            className={clsx(
              reusableClasses["btn"],
              classes["account-data-card__button"]
            )}
          >
            Log out
          </button>
          <button
            className={clsx(
              reusableClasses["btn"],
              classes["account-data-card__button"]
            )}
          >
            Change password
          </button>
        </div>
      </div>
      <DialogWindow
        show={isLogoutDialogOpen}
        onClose={() => setIsLogoutDialogOpen(false)}
        onSubmit={() => {
          setIsLogoutDialogOpen(false);
          logout();
          navigate("/auth");
        }}
      >
        <YesNoDialog message={"Are you sure to log out?"} />
      </DialogWindow>
    </>
  );
};

export default AccountDataCard;
