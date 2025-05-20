import type { AppUserPublicDataDto } from "../../../Models/User";
import classes from "./account_data_card_styles.module.css";
import reusableClasses from "./../../../global_styles/reusable.module.css";
import React, { useState } from "react";
import clsx from "clsx";
import DialogWindow from "../../../reusable_components/DialogWindow/DialogWindow";
import YesNoDialog from "../../../reusable_components/YesNoDialog/YesNoDialog";
import { useAuth } from "../../../Context/useAuth";
import { useNavigate } from "react-router-dom";
import EditAccountDataForm from "../EditAccountDataForm/EditAccountDataForm";
import { useQueryClient } from "@tanstack/react-query";
import ChangePasswordForm from "../ChangePasswordForm/ChangePasswordForm";

type Props = {
  accountData: AppUserPublicDataDto | undefined;
  queryKey: string;
};

const AccountDataCard = (props: Props) => {
  const { accountData, queryKey } = props;
  const { logout } = useAuth();
  const navigate = useNavigate();
  const client = useQueryClient();

  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isChangePasswordDialogOpen, setIsChangePasswordDialogOpen] =
    useState(false);

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
            onClick={() => setIsEditDialogOpen(true)}
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
            onClick={() => setIsChangePasswordDialogOpen(true)}
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

      <DialogWindow
        show={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSubmit={() => {
          setIsEditDialogOpen(false);
        }}
      >
        <EditAccountDataForm accountData={accountData} queryKey={queryKey} />
      </DialogWindow>

      <DialogWindow
        show={isChangePasswordDialogOpen}
        onClose={() => setIsChangePasswordDialogOpen(false)}
        onSubmit={() => {
          setIsChangePasswordDialogOpen(false);
        }}
      >
        <ChangePasswordForm />
      </DialogWindow>
    </>
  );
};

export default AccountDataCard;
