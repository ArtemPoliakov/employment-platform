import classes from "./change_password_form_styles.module.css";
import formClasses from "./../../../global_styles/reusable_form_styles.module.css";
import reusableClasses from "./../../../global_styles/reusable.module.css";
import * as Yup from "yup";
import React, { use } from "react";
import type { InferType } from "yup";
import { useAuth } from "../../../Context/useAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import { useDialogContext } from "../../../Context/DialogWindowContext";

type Props = {};

const validation = Yup.object().shape({
  oldPassword: Yup.string()
    .required("Password is required")
    .min(12, "Password must be at least 12 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[^a-zA-Z0-9]/,
      "Password must contain at least one special character"
    ),
  newPassword: Yup.string()
    .required("Password is required")
    .min(12, "Password must be at least 12 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[^a-zA-Z0-9]/,
      "Password must contain at least one special character"
    ),
});

type ChangePasswordFormType = InferType<typeof validation>;

const ChangePasswordForm = (props: Props) => {
  const { changePassword, user } = useAuth();
  const { onSubmit } = useDialogContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFormType>({ resolver: yupResolver(validation) });

  const handleChangePassword = async (form: ChangePasswordFormType) => {
    await changePassword({ ...form, userName: user?.userName ?? "" });
    onSubmit();
  };
  return (
    <section className={formClasses["form-container"]}>
      <h1 className={formClasses["form__heading"]}>Change password</h1>
      <form
        onSubmit={handleSubmit(handleChangePassword)}
        className={formClasses["form"]}
      >
        <div className={formClasses["form__input-block"]}>
          <label
            htmlFor="oldPassword"
            className={formClasses["form__input-label"]}
          >
            Old password
          </label>
          <input
            className={reusableClasses["input-field"]}
            type="password"
            id="oldPassword"
            placeholder="●●●●●●●●●●●●"
            {...register("oldPassword")}
          />
          {errors.oldPassword ? (
            <p className={formClasses["form__format-warning-text"]}>
              {errors.oldPassword.message}
            </p>
          ) : (
            ""
          )}
        </div>

        <div className={formClasses["form__input-block"]}>
          <label
            htmlFor="newPassword"
            className={formClasses["form__input-label"]}
          >
            New password
          </label>
          <input
            className={reusableClasses["input-field"]}
            type="password"
            id="newPassword"
            placeholder="●●●●●●●●●●●●"
            {...register("newPassword")}
          />
          {errors.newPassword ? (
            <p className={formClasses["form__format-warning-text"]}>
              {errors.newPassword.message}
            </p>
          ) : (
            ""
          )}
        </div>
        <button
          className={clsx(
            reusableClasses["btn"],
            classes["change-password__btn"]
          )}
          type="submit"
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default ChangePasswordForm;
