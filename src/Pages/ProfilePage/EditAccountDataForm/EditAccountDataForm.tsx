import classes from "./edit_account_data_form_styles.module.css";
import reusableClasses from "./../../../global_styles/reusable.module.css";
import formClasses from "./../../../global_styles/reusable_form_styles.module.css";
import * as Yup from "yup";
import React, { use } from "react";
import { useAuth } from "../../../Context/useAuth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import { jwtDecode } from "jwt-decode";
import type { AppUserPublicDataDto } from "../../../Models/User";
import { useDialogContext } from "../../../Context/DialogWindowContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  accountData: AppUserPublicDataDto | undefined;
  queryKey: string;
};

const validation = Yup.object().shape({
  userName: Yup.string().required("Username is required"),

  email: Yup.string().required("Email is required").email("Invalid email"),

  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(/^\+\d{10,15}$/, "Invalid phone number"),
});
type EditUserForm = Yup.InferType<typeof validation>;

const EditAccountDataForm = (props: Props) => {
  const { accountData, queryKey } = props;
  const { onSubmit } = useDialogContext();
  const { user, editUser, token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const client = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditUserForm>({
    resolver: yupResolver(validation),
    defaultValues: {
      userName: accountData?.userName ?? "",
      email: accountData?.email ?? "",
      phoneNumber: accountData?.phoneNumber ?? "",
    },
  });

  const handleRegister = async (form: EditUserForm) => {
    let isSuccess = await editUser({
      ...form,
      id: jwtDecode(token ?? "").sub ?? "",
    });
    if (isSuccess) {
      let currentPath = location.pathname;
      let pathBeforeUsername = currentPath.substring(
        0,
        currentPath.lastIndexOf("/")
      );
      let newPath = `${pathBeforeUsername}/${form.userName}`;
      navigate(newPath, {
        replace: true,
      });
      if (user?.userName == form.userName) {
        client.invalidateQueries({ queryKey: [queryKey, user?.userName] });
      }
      onSubmit();
    }
  };

  return (
    <section className={formClasses["form-container"]}>
      <h1 className={formClasses["form__heading"]}>Edit your account</h1>
      <form
        onSubmit={handleSubmit(handleRegister)}
        className={formClasses["form"]}
      >
        <div className={formClasses["form__input-block"]}>
          <label
            htmlFor="username"
            className={formClasses["form__input-label"]}
          >
            Username
          </label>
          <input
            className={reusableClasses["input-field"]}
            type="text"
            id="username"
            placeholder="Username"
            {...register("userName")}
          />
          {errors.userName ? (
            <p className={formClasses["form__format-warning-text"]}>
              {errors.userName.message}
            </p>
          ) : (
            ""
          )}
        </div>
        <div className={formClasses["form__input-block"]}>
          <label htmlFor="email" className={formClasses["form__input-label"]}>
            Email
          </label>
          <input
            className={reusableClasses["input-field"]}
            type="text"
            id="email"
            placeholder="example@gmail.com"
            {...register("email")}
          />
          {errors.email ? (
            <p className={formClasses["form__format-warning-text"]}>
              {errors.email.message}
            </p>
          ) : (
            ""
          )}
        </div>
        <div className={formClasses["form__input-block"]}>
          <label
            htmlFor="phoneNumber"
            className={formClasses["form__input-label"]}
          >
            Phone Number
          </label>
          <input
            className={reusableClasses["input-field"]}
            type="text"
            id="phoneNumber"
            placeholder="+xxxxxxxxxxxx"
            {...register("phoneNumber")}
          />
          {errors.phoneNumber ? (
            <p className={formClasses["form__format-warning-text"]}>
              {errors.phoneNumber.message}
            </p>
          ) : (
            ""
          )}
        </div>
        <button
          className={clsx(reusableClasses["btn"], classes["submit-btn"])}
          type="submit"
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default EditAccountDataForm;
