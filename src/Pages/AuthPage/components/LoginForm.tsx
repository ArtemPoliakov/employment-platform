import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import type { LoginUser } from "../../../Models/User";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../../Context/useAuth";
import classes from "./../styles/auth_styles.module.css";
import reusableClasses from "./../../../global_styles/reusable.module.css";
import clsx from "clsx";
const validation = Yup.object().shape({
  userName: Yup.string().required("Username is required"),
  password: Yup.string()
    .required("Password is required")
    .min(12, "Password must be at least 12 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[^a-zA-Z0-9]/,
      "Password must contain at least one special character"
    ),
});

const LoginForm = () => {
  const { loginUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUser>({ resolver: yupResolver(validation) });

  const handleLogin = (form: LoginUser) => {
    loginUser(form);
  };

  return (
    <section className={classes["auth__form-container"]}>
      <h1 className={classes["auth__heading"]}>Sign in to your account</h1>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className={classes["auth__form"]}
      >
        <div className={classes["auth__input-block"]}>
          <label htmlFor="username" className={classes["auth__input-label"]}>
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
            <p className={classes["auth__format-warning-text"]}>
              {errors.userName.message}
            </p>
          ) : (
            ""
          )}
        </div>
        <div className={classes["auth__input-block"]}>
          <label htmlFor="password" className={classes["auth__input-label"]}>
            Password
          </label>
          <input
            className={reusableClasses["input-field"]}
            type="password"
            id="password"
            placeholder="●●●●●●●●●●●●"
            {...register("password")}
          />
          {errors.password ? (
            <p className={classes["auth__format-warning-text"]}>
              {errors.password.message}
            </p>
          ) : (
            ""
          )}
        </div>
        <button
          className={clsx(reusableClasses["btn"], classes["auth__btn"])}
          type="submit"
        >
          Sign in
        </button>
      </form>
    </section>
  );
};

export default LoginForm;
